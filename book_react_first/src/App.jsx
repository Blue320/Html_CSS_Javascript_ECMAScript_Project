import { useState, useEffect, useCallback, useRef } from 'react';
import './style.css';
import { fetchBooks, fetchBook, createBook, updateBook, deleteBook } from './api/bookApi';
import BookDetail from './components/BookDetail';
import BookTable from './components/BookTable';
import { EMPTY_FORM, toRequest, toFormValues } from './lib/bookData';
import BookForm from './components/BookFormField';
import { validateBook } from './lib/validation';
import { APP_MODE } from './config.js';

const MESSAGE_TIMEOUT = 3000;

function App() {
  // 표에 렌더링할 도서 목록 데이터
  const [books, setBooks] = useState([]);
  // 11개 입력칸의 현재 입력값
  const [form, setForm] = useState(EMPTY_FORM);
  // 현재 수정 중인 도서의 id (null이면 등록 모드, 숫자면 수정 모드)
  const [editingId, setEditingId] = useState(null);
  // 목록 조회 등 서버 통신 중 '로딩 중...' 표시 여부
  const [loading, setLoading] = useState(false);
  // 도서 목록 영역에 표시할 에러 문구 (문자열 또는 null)
  const [listError, setListError] = useState(null);
  // 폼 하단에 띄울 피드백 메시지 객체 ({ text, type } 또는 null)
  const [message, setMessage] = useState(null);
  // 상세 보기 모달/카드에 표시할 도서 데이터 (null이면 미표시)
  const [detailBook, setDetailBook] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const isEditing = editingId !== null;
  const modeClass = APP_MODE === 'PROD' ? 'app-mode prod' : 'app-mode test';

  /* useRef 는 화면에 그려진 실제 요소를 붙잡아 두는 자리다.
     state 와 달리 값이 바뀌어도 화면을 다시 그리지 않는다.
     수정 버튼을 눌렀을 때 폼으로 스크롤하는 데만 쓴다. */
  const formRef = useRef(null);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setListError(null);

    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error:", error);
      setListError("오류: 데이터를 불러올 수 없습니다.");
    } finally {
      setLoading(false)
    }
  }, []);

  function handleChange(event) {
    // 어느 칸이 바뀌었는지, 값은 무엇인지 꺼낸다.
    //   event.target       방금 글자를 친 input
    //   event.target.name  그 input 에 적어 둔 name
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  }//handleChange

  useEffect(() => {
    // 아래 주석은 ESLint 에게 "이 경고는 알고 있다"고 알려 주는 줄이다.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 처음 한 번 목록을 불러오는 것은 의도된 동작입니다
    loadBooks();
  }, [loadBooks]);

  /* -----------------------------------------------------
       성공 메시지는 3초 뒤에 저절로 사라진다
       4부에서 messageTimer 변수를 두고 clearTimeout 을 부르던 일을
       useEffect 가 대신한다. return 으로 돌려준 함수를 정리 함수라고
       하는데, 메시지가 바뀌기 직전에 React 가 이것을 먼저 불러 준다.
       그래서 이전 예약이 새 메시지를 지워 버리는 일이 없다.
    ----------------------------------------------------- */
  useEffect(() => {
    if (!message) {
      return;
    }

    // 오류 메시지는 사용자가 고칠 때까지 남겨 둔다.
    if (message.type !== "success") {
      return;
    }

    const timer = setTimeout(() => setMessage(null), MESSAGE_TIMEOUT);

    // 정리(clean up) 함수 — 다음 번 실행 직전과 화면에서 사라질 때 불린다.
    return () => clearTimeout(timer);
  }, [message]);

  async function handleSubmit(event) {
    // 1. 브라우저 기본 새로고침 방지 (무조건 가장 먼저 실행!)
    event.preventDefault();
    setMessage(null);

    // 2. 폼 입력값을 백엔드/검증 규격 객체로 변환
    const bookData = toRequest(form);

    // 3. 변환된 객체로 유효성 검사 실행
    const validationError = validateBook(bookData);
    if (validationError) {
      setMessage({ text: validationError, type: "error" });
      return; // 유효하지 않으면 서버 요청 중단
    }

    // 4. API 비동기 요청 전송
    try {
      setSubmitting(true);

      if (isEditing) {
        await updateBook(editingId, bookData);
        setMessage({ text: "도서 정보가 수정되었습니다.", type: "success" });
      } else {
        await createBook(bookData);
        setMessage({ text: "도서가 등록되었습니다.", type: "success" });
      }

      setForm(EMPTY_FORM);
      setEditingId(null);
      await loadBooks();
    } catch (error) {
      setMessage({
        text: error.message || "요청 처리에 실패했습니다.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteBook(id);
      setMessage({ text: "도서가 삭제되었습니다.", type: "success" });

      // 수정 중이던 도서를 삭제했다면 수정 모드 해제
      if (editingId === id) {
        setEditingId(null);
        setForm(EMPTY_FORM);
      }

      await loadBooks();
    } catch (error) {
      setMessage({
        text: error.message || "삭제에 실패했습니다.",
        type: "error",
      });
    }
  }

  function handleEdit(book) {
    setEditingId(book.id);
    setForm(toFormValues(book));
    setMessage(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setMessage(null);
  }

  async function handleDetail(id) {
    try {
      const book = await fetchBook(id);
      setDetailBook(book);
    } catch (error) {
      setMessage({
        text: error.message || "도서 상세 정보를 불러오는데 실패했습니다.",
        type: "error",
      });
    }
  }

  return (
    <>
      <h1>
        도서 관리 시스템
        <span className={modeClass}>{APP_MODE}</span>
      </h1>

      <BookForm
        form={form}
        isEditing={isEditing}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
        containerRef={formRef}
      />
      <BookTable
        books={books}
        error={listError}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={handleDetail}
      />
      <BookDetail
        book={detailBook}
        onClose={() => setDetailBook(null)}
      />
    </>
  )
}

export default App

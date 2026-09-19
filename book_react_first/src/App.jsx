import { useState, useEffect, useCallback } from 'react';
import './style.css';
import { fetchBooks } from './api/bookApi';
import BookTable from './components/BookTable';

const EMPTY_FORM = {};

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

  const loadBooks = useCallback(async () => {
    setLoading(true);

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

  useEffect(() => {
    // 아래 주석은 ESLint 에게 "이 경고는 알고 있다"고 알려 주는 줄이다.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 처음 한 번 목록을 불러오는 것은 의도된 동작입니다
    loadBooks();
  }, [loadBooks]);

  return (
    <>
      <h1>
        도서 관리 시스템
      </h1>
      <BookTable books={books} error={listError} loading={loading} onEdit={() => {}}
        onDelete={() => {}} onDetail={() => {}} />
    </>
  )
}

export default App

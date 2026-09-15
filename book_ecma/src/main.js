import "./style.css";

// 1. API 모듈 (별칭 없이 깔끔하게 가져오기)
import {
  fetchBooks,
  fetchBook,
  createBook,
  updateBook,
  deleteBook,
} from "./api/bookApi.js";

// 2. 유효성 검사 모듈
import { validateBook } from "./lib/validation.js";

// 3. UI 모듈
import {
  bookForm,
  cancelButton,
  collectBookData,
  fillForm,
  setEditMode,
  resetForm,
  scrollToForm,
} from "./ui/bookForm.js";

import {
  showError,
  showSuccess,
  clearMessages,
  setLoading,
} from "./ui/message.js";

import {
  bookTableBody,
  renderBookTable,
  renderTableError,
} from "./ui/bookTable.js";

import { formatBookDetail } from "./ui/bookDetail.js";

// 4. 상태 관리
let editingBookId = null;

// 5. 도서 목록 불러오기
async function loadBooks() {
  try {
    setLoading(true);
    const books = await fetchBooks();
    renderBookTable(books);
  } catch (error) {
    console.error("도서 목록 로드 오류:", error);
    showError(error.message || "도서 목록을 불러오는 데 실패했습니다.");
    renderTableError("도서 목록을 불러올 수 없습니다.");
  } finally {
    setLoading(false);
  }
}

// 6. 도서 수정 준비
async function startEdit(id) {
  try {
    clearMessages();
    const book = await fetchBook(id);
    editingBookId = id;
    fillForm(book);
    setEditMode(true);
    scrollToForm();
  } catch (error) {
    console.error("도서 조회 실패:", error);
    showError(error.message);
  }
}

// 7. 도서 삭제
async function removeBook(id) {
  if (!confirm("정말 이 도서를 삭제하시겠습니까?")) return;

  try {
    await deleteBook(id);
    showSuccess("도서가 삭제되었습니다.");
    await loadBooks();
  } catch (error) {
    console.error("도서 삭제 실패:", error);
    showError(error.message);
  }
}

// 8. 도서 상세 보기
async function showDetail(id) {
  try {
    const book = await fetchBook(id);
    alert(formatBookDetail(book));
  } catch (error) {
    console.error("도서 상세 조회 실패:", error);
    showError(error.message);
  }
}

// 9. 폼 제출 핸들러 (등록 및 수정)
bookForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessages();

  const bookData = collectBookData();

  // 유효성 검사
  const errorMessage = validateBook(bookData);
  if (errorMessage) {
    showError(errorMessage);
    return;
  }

  try {
    if (editingBookId) {
      await updateBook(editingBookId, bookData);
      showSuccess("도서 정보가 수정되었습니다.");
      editingBookId = null;
    } else {
      await createBook(bookData);
      showSuccess("도서가 등록되었습니다.");
    }

    resetForm();
    await loadBooks();
  } catch (error) {
    console.error("저장 실패:", error);
    showError(error.message);
  }
});

// 10. 표 클릭 이벤트 위임 (수정, 삭제, 상세)
bookTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "edit") startEdit(id);
  if (action === "delete") removeBook(id);
  if (action === "detail") showDetail(id);
});

// 11. 취소 버튼 클릭 이벤트
if (cancelButton) {
  cancelButton.addEventListener("click", () => {
    editingBookId = null;
    resetForm();
    clearMessages();
  });
}

// 12. 최초 목록 로드
loadBooks();
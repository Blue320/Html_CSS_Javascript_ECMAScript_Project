export const bookForm = document.getElementById("bookForm");
export const submitButton = bookForm.querySelector('button[type="submit"]');
export const cancelButton = document.getElementById("cancelButton");

// 1. 폼 데이터 수집 (name 기준)
export function collectBookData() {
  const elements = bookForm.elements;

  const getVal = (name) => elements[name]?.value.trim() ?? "";

  const priceVal = getVal("price");
  const pageCountVal = getVal("pageCount");

  const description = getVal("description") || null;
  const language = getVal("language") || null;
  const pageCount = pageCountVal !== "" ? Number(pageCountVal) : null;
  const publisher = getVal("publisher") || null;
  const coverImageUrl = getVal("coverImageUrl") || null;
  const edition = getVal("edition") || null;

  const hasDetail =
    description !== null ||
    language !== null ||
    pageCount !== null ||
    publisher !== null ||
    coverImageUrl !== null ||
    edition !== null;

  const detailData = hasDetail
    ? {
        description,
        language,
        pageCount,
        publisher,
        coverImageUrl,
        edition,
      }
    : null;

  return {
    title: getVal("title"),
    author: getVal("author"),
    isbn: getVal("isbn"),
    price: priceVal !== "" ? Number(priceVal) : null,
    publishDate: elements["publishDate"]?.value || null,
    // 등록 시 @JsonProperty("detailRequest") 대응
    detailRequest: detailData,
    // 수정 및 내부 validation 검사용 대응
    bookDetail: detailData,
  };
}

// 2. 수정 시 폼 입력칸 채우기 (name 기준)
export function fillForm(book) {
  if (!book) return;
  const elements = bookForm.elements;

  const setVal = (name, value) => {
    if (elements[name]) elements[name].value = value ?? "";
  };

  // 기본 정보
  setVal("title", book.title);
  setVal("author", book.author);
  setVal("isbn", book.isbn);
  setVal("price", book.price);
  setVal("publishDate", book.publishDate);

  // 상세 정보 (bookDetail)
  const detail = book.bookDetail || {};
  setVal("description", detail.description);
  setVal("language", detail.language);
  setVal("pageCount", detail.pageCount);
  setVal("publisher", detail.publisher);
  setVal("coverImageUrl", detail.coverImageUrl);
  setVal("edition", detail.edition);
}

// 3. 버튼 모드 변경
export function setEditMode(isEditing) {
  if (submitButton) {
    submitButton.textContent = isEditing ? "도서 수정" : "도서 등록";
  }
  if (cancelButton) {
    cancelButton.style.display = isEditing ? "inline-block" : "none";
  }
}

// 4. 폼 초기화
export function resetForm() {
  bookForm.reset();
  setEditMode(false);
}

// 5. 스크롤 이동
export function scrollToForm() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
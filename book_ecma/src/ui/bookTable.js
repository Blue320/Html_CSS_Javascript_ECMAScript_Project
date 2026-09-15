export const bookTableBody = document.getElementById("bookTableBody");

// 도서 목록 표 렌더링
export function renderBookTable(books) {
  bookTableBody.innerHTML = "";

  if (books.length === 0) {
    bookTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center;">등록된 도서가 없습니다.</td></tr>`;
    return;
  }

  books.forEach((book) => {
    const row = document.createElement("tr");

    // XSS 방지를 위한 textContent 설정
    const tdTitle = document.createElement("td");
    tdTitle.textContent = book.title;

    const tdAuthor = document.createElement("td");
    tdAuthor.textContent = book.author;

    const tdIsbn = document.createElement("td");
    tdIsbn.textContent = book.isbn;

    const tdPrice = document.createElement("td");
    tdPrice.textContent = book.price ? `₩${Number(book.price).toLocaleString()}` : "-";

    const tdPublishDate = document.createElement("td");
    tdPublishDate.textContent = book.publishDate || "-";

    const tdPublisher = document.createElement("td");
    tdPublisher.textContent = book.bookDetail?.publisher || "-";

    // data-action, data-id가 적용된 액션 버튼 3개
    const tdAction = document.createElement("td");
    tdAction.innerHTML = `
      <button type="button" class="edit-btn" data-action="edit" data-id="${book.id}">수정</button>
      <button type="button" class="delete-btn" data-action="delete" data-id="${book.id}">삭제</button>
      <button type="button" class="detail-btn" data-action="detail" data-id="${book.id}">상세</button>
    `;

    row.appendChild(tdTitle);
    row.appendChild(tdAuthor);
    row.appendChild(tdIsbn);
    row.appendChild(tdPrice);
    row.appendChild(tdPublishDate);
    row.appendChild(tdPublisher);
    row.appendChild(tdAction);

    bookTableBody.appendChild(row);
  });
}

// 목록 조회 실패 시 표 자리에 안내 메시지 표시
export function renderTableError(message) {
  bookTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #dc3545;">${message}</td></tr>`;
}
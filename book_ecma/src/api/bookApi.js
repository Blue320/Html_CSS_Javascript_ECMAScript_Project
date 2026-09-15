import { BOOKS_URL, JSON_HEADERS } from "../config.js";

const DEFAULT_MESSAGES = {
  400: "잘못된 요청입니다.",
  404: "존재하지 않는 도서입니다.",
  409: "이미 등록된 ISBN입니다.",
  500: "서버 오류가 발생했습니다.",
};

async function request(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData.message ??
      DEFAULT_MESSAGES[response.status] ??
      `요청에 실패했습니다. (${response.status})`;

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}

// 1. 도서 목록 조회
export const fetchBooks = () => request(BOOKS_URL);

// 2. 단일 도서 조회 (상세 및 수정용)
export const fetchBook = (id) => request(`${BOOKS_URL}/${id}`);

// 3. 도서 등록
export const createBook = (book) =>
  request(BOOKS_URL, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(book),
  });

// 4. 도서 수정
export const updateBook = (id, book) =>
  request(`${BOOKS_URL}/${id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(book),
  });

// 5. 도서 삭제
export const deleteBook = (id) =>
  request(`${BOOKS_URL}/${id}`, {
    method: "DELETE",
  });
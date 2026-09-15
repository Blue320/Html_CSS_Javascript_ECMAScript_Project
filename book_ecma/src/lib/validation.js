function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

export function validateBook(book) {
  if (!book.title) return "도서 제목을 입력해주세요.";
  if (!book.author) return "저자를 입력해주세요.";
  if (!book.isbn) return "ISBN을 입력해주세요.";

  const isbnPattern = /^[0-9X-]+$/;
  if (!isbnPattern.test(book.isbn)) {
    return "올바른 ISBN 형식이 아닙니다. (숫자와 X, - 만 허용)";
  }

  if (book.price !== null && book.price < 0) {
    return "가격은 0원 이상이어야 합니다.";
  }

  if (book.bookDetail) {
    const { pageCount, coverImageUrl } = book.bookDetail;

    if (pageCount !== null && pageCount < 0) {
      return "페이지 수는 0 이상이어야 합니다.";
    }

    // 표지 URL이 들어온 경우 검사
    if (coverImageUrl && !isValidUrl(coverImageUrl)) {
      return "올바른 이미지 URL 형식이 아닙니다.";
    }
  }

  return "";
}
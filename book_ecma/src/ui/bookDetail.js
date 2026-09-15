// 도서 상세 정보를 여러 줄 문자열로 만들어 반환
export function formatBookDetail(book) {
  let detailInfo = `=== ${book.title} 상세 정보 ===\n`;
  detailInfo += `저자: ${book.author}\n`;
  detailInfo += `ISBN: ${book.isbn}\n`;
  detailInfo += `가격: ${book.price ? "₩" + Number(book.price).toLocaleString() : "-"}\n`;
  detailInfo += `출판일: ${book.publishDate || "-"}\n`;

  if (book.bookDetail) {
    const detail = book.bookDetail;
    detailInfo += `설명: ${detail.description || "-"}\n`;
    detailInfo += `언어: ${detail.language || "-"}\n`;
    detailInfo += `페이지 수: ${detail.pageCount ? detail.pageCount + "쪽" : "-"}\n`;
    detailInfo += `출판사: ${detail.publisher || "-"}\n`;
    detailInfo += `에디션: ${detail.edition || "-"}\n`;
    detailInfo += `표지 URL: ${detail.coverImageUrl || "-"}\n`;
  }

  return detailInfo;
}
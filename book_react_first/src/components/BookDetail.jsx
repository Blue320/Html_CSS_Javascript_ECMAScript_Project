import React from 'react';

function formatPrice(price) {
    if (price === null || price === undefined) {
        return "-"
    } else if (isNaN(Number(price))) {
        return "-"
    } else {
        return '₩' + Number(price).toLocaleString()
    }
}

function BookDetail({ book, onClose }) {
    if (!book) return null;

    return (
        /* 1. 바깥쪽 컨테이너 (어두운 배경): 누르면 닫히도록 onClose 연결 */
        <div className="modal-overlay" onClick={onClose}>

            {/* 2. 안쪽 컨테이너 (모달 카드): 여기를 누를 때는 닫히지 않도록 버블링 방지 */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                {/* 모달 헤더 영역 */}
                <div className="modal-header">
                    <h2>도서 상세 정보</h2>
                </div>

                {/* 모달 본문 영역 (책 정보 출력) */}
                <div className="modal-body">
                    <p><strong>제목:</strong> {book.title}</p>
                    <p><strong>저자:</strong> {book.author}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>가격:</strong> {formatPrice(book.price)}</p>
                    <p><strong>출판일:</strong> {book.publishDate}</p>

                    <p><strong>설명:</strong> {book.bookDetail?.description ?? "-"}</p>
                    <p><strong>언어:</strong> {book.bookDetail?.language ?? "-"}</p>
                    <p><strong>페이지 수:</strong> {book.bookDetail?.pageCount ?? "-"}</p>
                    <p><strong>출판사:</strong> {book.bookDetail?.publisher ?? "-"}</p>
                    <p><strong>에디션:</strong> {book.bookDetail?.edition ?? "-"}</p>
                    <p><strong>표지 URL:</strong> {book.bookDetail?.coverImageUrl ?? "-"}</p>
                </div>

                {/* 모달 하단 버튼 영역 */}
                <div className="modal-footer">
                    <button type="button" onClick={onClose}>닫기</button>
                </div>

            </div>
        </div>
    );
}

export default BookDetail;
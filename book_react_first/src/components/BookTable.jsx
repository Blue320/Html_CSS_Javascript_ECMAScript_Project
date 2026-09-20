import { memo } from "react";

function formatPrice(price) {
    if (price === null || price === undefined) {
        return "-"
    } else if (isNaN(Number(price))) {
        return "-"
    } else {
        return '₩' + Number(price).toLocaleString()
    }
}

// 표의 열 개수. colSpan 에 쓴다.
const COLUMN_COUNT = 7;

function BookTable({ books, loading, listError, onEdit, onDelete, onDetail }) {

    let rows;

    if (listError) {
        // (1) 목록을 못 불러왔다
        rows = (
            <tr>
                <td colSpan={COLUMN_COUNT} className="error-row">{listError}</td>
            </tr>
        );
    } else if (books.length === 0 && !loading) {
        // (2) 목록이 비었다. 불러오는 중일 때는 안내를 내지 않는다.
        //     그래야 화면이 잠깐 깜빡이지 않는다.
        rows = (
            <tr>
                <td colSpan={COLUMN_COUNT} className="empty-row">등록된 책이 없습니다.</td>
            </tr>
        );
    } else {
        // (3) 책 한 권을 행 하나로 그린다.
        //     map 은 배열의 값 하나하나를 화면 조각으로 바꿔 준다.
        rows = books.map((book) => (
            // key 는 React 가 어느 행이 어느 행인지 알아보는 표시다.
            // 없으면 목록이 바뀔 때 엉뚱한 행이 다시 그려질 수 있다.
            <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{formatPrice(book.price)}</td>
                <td>{book.publishDate}</td>

                <td>{book.bookDetail?.publisher ?? "-"}</td>

                <td>
                    {/* data-id 도 Number(id) 도 필요 없다. id 를 그대로 넘긴다.
                        onClick 에는 함수를 "넘겨야" 한다. onEdit(book.id) 라고
                        쓰면 그리는 순간 바로 실행되므로 () => 로 감싼다. */}
                    <button type="button" className="edit-btn"
                            onClick={() => onEdit(book)}>수정</button>
                    <button type="button" className="delete-btn"
                            onClick={() => onDelete(book.id)}>삭제</button>
                    <button type="button" className="detail-btn"
                            onClick={() => onDetail(book.id)}>상세</button>
                </td>
            </tr>
        ));
    }
    
    return (
        <div className="table-container">
            <h2>책 목록</h2>

            {loading && <div className="loading">로딩 중...</div>}

            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>저자</th>
                        <th>ISBN</th>
                        <th>가격</th>
                        <th>출판일</th>
                        <th>출판사</th>
                        <th>액션</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export default memo(BookTable);
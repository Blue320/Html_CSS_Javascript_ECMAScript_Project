/* ---------------------------------------------------------
   학생 등록 · 수정 폼
   4부까지는 폼이 index.html 에 있었고, ui/studentForm.js 가
   그 요소를 찾아 값을 읽고 쓰고 버튼 글자를 바꿨습니다.

   React 에서는 폼이 이 파일 안에 있습니다. 그리고 입력칸의
   값은 DOM 이 아니라 부모가 준 form 객체에서 옵니다.

     화면에 보이는 값 = props.form
     값이 바뀌면      = props.onChange 로 부모에게 알린다

   이런 입력을 제어 컴포넌트(controlled component)라고 합니다.
   이 컴포넌트는 값을 저장하지 않습니다. 그리기만 합니다.

   입력칸 여섯 개가 생김새는 같지만 일부러 하나씩 펼쳐 적었습니다.
   위에서 아래로 한 번에 읽히는 것이 지금은 더 중요하기 때문입니다.
   --------------------------------------------------------- */

import MessageBox from "./MessageBox.jsx";

/* 부모(App)가 넘겨주는 값들 */
function BookForm({
    form,          // 화면에 보일 입력값 여섯 개
    isEditing,     // 수정 모드인가
    message,       // 폼 아래 보여 줄 메시지
    onChange,      // 입력칸이 바뀔 때 부를 함수
    onSubmit,      // 제출할 때 부를 함수
    onCancel,      // 취소를 누를 때 부를 함수
    containerRef,  // 수정 시 이 위치로 스크롤하기 위한 참조
}) {

    return (
        <div className="form-container" ref={containerRef}>
            <h2>도서 정보 입력</h2>

            <form onSubmit={onSubmit}>
                <div className="form-grid">
                    {/* 입력칸 한 개는 언제나 이 세 가지가 짝이다.
                          value    = {form.어느칸}   보이는 값은 부모에게서 온다
                          onChange = {onChange}      바뀌면 부모에게 알린다
                          name     = "어느칸"        부모가 어느 칸인지 알아보는 이름 */}
                    <div className="form-group">
                        <label htmlFor="title">제목:</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            value={form.title}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">저자:</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            required
                            value={form.author}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="isbn">ISBN:</label>
                        <input
                            id="isbn"
                            name="isbn"
                            type="text"
                            required
                            value={form.isbn}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">가격:</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            required
                            value={form.price}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="publishDate">출판일:</label>
                        <input
                            id="publishDate"
                            name="publishDate"
                            type="date"
                            required
                            value={form.publishDate}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">설명:</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="language">언어:</label>
                        <input
                            id="language"
                            name="language"
                            type="text"
                            value={form.language}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pageCount">페이지 수:</label>
                        <input
                            id="pageCount"
                            name="pageCount"
                            type="number"
                            value={form.pageCount}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="publisher">출판사:</label>
                        <input
                            id="publisher"
                            name="publisher"
                            type="text"
                            value={form.publisher}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edition">에디션:</label>
                        <input
                            id="edition"
                            name="edition"
                            type="text"
                            value={form.edition}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="coverImageUrl">표지 URL:</label>
                        <input
                            id="coverImageUrl"
                            name="coverImageUrl"
                            type="text"
                            value={form.coverImageUrl}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="button-group">
                    <button type="submit">{isEditing ? "도서 수정" : "도서 등록"}</button>

                    {/* 4부에서는 style.display 를 바꿨지만, 여기서는 아예 그리지 않는다.
                        조건 && 화면 은 "조건이 참일 때만 그린다"는 뜻이다. */}
                    {isEditing && <button type="button" onClick={onCancel}>취소</button>}
                    {message && <MessageBox message={message} />}
                </div>
            </form>
        </div>
    );
}

export default BookForm;
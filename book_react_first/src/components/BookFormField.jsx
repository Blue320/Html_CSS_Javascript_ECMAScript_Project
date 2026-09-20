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

function Field({ name, label, type, required, value, onChange }) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}:</label>
            <input
                id={name}
                name={name}
                type={type}
                required={required}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

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
                    <Field name="title" label="제목" type="text" required
                        value={form.title} onChange={onChange} />
                    <Field name="author" label="저자" type="text" required
                        value={form.author} onChange={onChange} />
                    <Field name="isbn" label="ISBN" type="text" required
                        value={form.isbn} onChange={onChange} />
                    <Field name="price" label="가격" type="number" required
                        value={form.price} onChange={onChange} />
                    <Field name="publishDate" label="출판일" type="date" required
                        value={form.publishDate} onChange={onChange} />

                    {/* 설명(textarea)은 태그가 달라 그대로 둔다 */}
                    <div className="form-group">
                        <label htmlFor="description">설명:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={onChange}
                        />
                    </div>

                    <Field name="language" label="언어" type="text"
                        value={form.language} onChange={onChange} />
                    <Field name="pageCount" label="페이지 수" type="number"
                        value={form.pageCount} onChange={onChange} />
                    <Field name="publisher" label="출판사" type="text"
                        value={form.publisher} onChange={onChange} />
                    <Field name="edition" label="에디션" type="text"
                        value={form.edition} onChange={onChange} />
                    <Field name="coverImageUrl" label="표지 URL" type="text"
                        value={form.coverImageUrl} onChange={onChange} />
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
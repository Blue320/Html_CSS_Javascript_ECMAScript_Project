/* ---------------------------------------------------------
   폼 값과 서버 데이터 사이의 변환
   4부 ui/studentForm.js 의 collectStudentData 와 fillForm 이
   여기로 왔습니다.

   document 를 만지던 코드는 전부 사라졌습니다. React 에서는
   입력값이 DOM 이 아니라 state 에 있기 때문입니다.

     4부 collectStudentData()  →  toRequest(form)
     4부 fillForm(student)     →  toFormValues(student)
   --------------------------------------------------------- */

// 등록 모드의 빈 폼. 폼을 되돌릴 때도 이 값을 쓴다.
// 입력칸 여섯 개의 이름이 여기에 모여 있다.
export const EMPTY_FORM = {
    // 기본 정보
    title: "",
    author: "",
    isbn: "",
    price: "",
    publishDate: "",
    //상세 정보(bookDetail)
    description: "",
    language: "",
    pageCount: "",
    publisher: "",
    coverImageUrl: "",
    edition: "",
};

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isNaN(value) ? null : value;

  const trimmed = String(value).trim();
  if (trimmed === "") return null;

  const num = Number(trimmed);
  return Number.isNaN(num) ? null : num;
}

// 폼 state 를 서버가 받는 구조로 바꾼다.
// 4부에서 FormData 로 하던 일인데, 이제 값이 form 객체에 이미 있다.
// 백엔드 StudentDTO의 Request (요청) 객체
export function toRequest(form) {
  const price = toNumberOrNull(form.price);
  const pageCount = toNumberOrNull(form.pageCount);

    return {
        title: form.title.trim(),
        author: form.author.trim(),
        isbn: form.isbn.trim(),
        price: price,
        publishDate: form.publishDate.trim() || null,
        
        detailRequest: {
            description: form.description.trim() || null,
            language: form.language.trim() || null,
            // 빈 문자열("")도 걸러야 하므로 여기서는 ?? 가 아니라 || 를 쓴다.
            pageCount: pageCount,
            publisher: form.publisher.trim() || null,
            coverImageUrl: form.coverImageUrl.trim() || null,
            edition: form.edition.trim() || null,
        },
    };
}

// 서버에서 받은 학생 정보를 폼 state 모양으로 바꾼다.
// 수정 버튼을 눌렀을 때 쓴다.
// 백엔드 StudentDTO의 Response (응답) 객체
export function toFormValues(book) {

  if (!book) return EMPTY_FORM;

    // input 의 value 에 undefined 를 넣으면 React 가 경고를 낸다.
    // 그래서 값이 없을 때는 반드시 빈 문자열로 바꿔 준다.
    //   detail?.address  detail 이 없으면 거기서 멈추고 undefined
    //   ?? ""            그 undefined 를 빈 문자열로 바꾼다
    return {
        // 기본 정보
        title: book.title ?? "",
        author: book.author ?? "",
        isbn: book.isbn ?? "",
        price: book.price ?? "",
        publishDate: book.publishDate ?? "",

        // 상세 정보
        description: book.bookDetail?.description ?? "",
        language: book.bookDetail?.language ?? "",
        pageCount: book.bookDetail?.pageCount ?? "",
        publisher: book.bookDetail?.publisher ?? "",
        coverImageUrl: book.bookDetail?.coverImageUrl ?? "",
        edition: book.bookDetail?.edition ?? "",
    };
}
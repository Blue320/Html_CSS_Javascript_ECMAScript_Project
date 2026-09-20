/* ---------------------------------------------------------
   메시지 한 줄 — 4부 ui/message.js 를 대신한다
   4부에서는 showError() 가 formError 요소를 찾아 textContent 와
   style 을 직접 바꿨습니다.

   React 에서는 "무엇을 보여줄지"만 넘겨받아 그립니다.
   보여줄 것이 없으면 아무것도 그리지 않으므로
   화면을 지우는 clearMessages() 가 따로 필요 없습니다.
   --------------------------------------------------------- */
import { memo } from "react";

/* 컴포넌트는 화면 한 조각을 돌려주는 함수다.
   중괄호 안의 message 는 부모(App)가 넘겨준 값이고, 이것을 props 라고 한다.
   부모가 <MessageBox message={...} /> 라고 쓰면 여기로 들어온다. */
export default function MessageBox({ message }) {
  if (!message) return null;

  // message가 문자열인지, 객체({ text, type })인지에 따라 처리
  const text = typeof message === 'string' ? message : message.text;
  const type = typeof message === 'string' ? 'info' : message.type; // 'success' 또는 'error'

  return (
    <span className={`message-box ${type}`}>
      {text}
    </span>
  );
}
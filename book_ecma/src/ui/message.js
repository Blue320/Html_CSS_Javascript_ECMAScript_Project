const formError = document.getElementById("formError");
const loadingMessage = document.getElementById("loadingMessage");
let timeoutId = null;

// 오류 메시지 표시 (빨간 글씨, 수동으로 지우기 전까지 유지)
export function showError(message) {
  if (timeoutId) clearTimeout(timeoutId);
  if (!formError) return;

  formError.textContent = message;
  formError.style.color = "#dc3545";
  formError.style.display = "inline";
}

// 성공 메시지 표시 (초록 글씨, 3초 뒤 자동 삭제)
export function showSuccess(message) {
  if (timeoutId) clearTimeout(timeoutId);
  if (!formError) return;

  formError.textContent = message;
  formError.style.color = "#28a745";
  formError.style.display = "inline";

  timeoutId = setTimeout(() => {
    clearMessages();
  }, 3000);
}

// 메시지 초기화
export function clearMessages() {
  if (timeoutId) clearTimeout(timeoutId);
  if (formError) {
    formError.textContent = "";
    formError.style.display = "none";
  }
}

// 로딩 표시 제어
export function setLoading(isLoading = true) {
  if (loadingMessage) {
    loadingMessage.style.display = isLoading ? "block" : "none";
  }
}
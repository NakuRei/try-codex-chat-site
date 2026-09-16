const form = document.querySelector('#prompt-form');
const input = document.querySelector('#prompt-input');
const response = document.querySelector('#demo-response');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();

  if (!value) {
    response.hidden = false;
    response.textContent = '作りたいものを入力してください。';
    input.focus();
    return;
  }

  response.hidden = false;
  response.textContent = `「${value}」を受け取りました。実際の Codex 接続では、ここからリポジトリを解析して変更案を生成します。`;
});

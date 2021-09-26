const buttons = document.querySelectorAll('.btn');

// btn을 나타내는 색상 표시
chrome.storage.sync.get('colorList', ({ colorList }) => {
  for (let i = 0; i < buttons.length; i++) {
    const color = document.createElement('div');
    color.classList.add('color');
    color.style.backgroundColor = colorList[i];
    buttons[i].insertBefore(color, buttons[i].firstChild);
  }
});

// btn 클릭 시 현재 탭 페이지를 대상으로 setBorderColor함수 호출
buttons.forEach((btn) =>
  btn.addEventListener('click', async () => {
    const borderColor = btn.querySelector('.color').style.backgroundColor;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setBorderColor,
      args: [borderColor],
    });
  }),
);

// backgroundColor Test
function setBorderColor(borderColor) {
  document.body.style.backgroundColor = borderColor;
}

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

// btn 클릭 시 현재 탭 페이지를 대상으로 setBorderColor(or removeBorderColor)함수 호출
buttons.forEach((btn) =>
  btn.addEventListener('click', async () => {
    btn.classList.toggle('clicked');
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (btn.classList.contains('clicked')) {
      const borderColor = btn.querySelector('.color').style.backgroundColor;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setBorderColor,
        args: [borderColor],
      });
    } else {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: removeBorderColor,
      });
    }
  }),
);

// HTML 구조를 확인하기 위해 자주 쓰이는 요소 테두리 변경
function setBorderColor(borderColor) {
  [
    'div',
    'span',
    'ul',
    'li',
    'dd',
    'dl',
    'section',
    'h1',
    'a',
    'img',
    'form',
    'button',
    'header',
    'footer',
    'input',
    'p',
  ].forEach((e) => {
    document.querySelectorAll(e).forEach((element) => {
      element.style.outline = `1px solid ${borderColor}`;
    });
  });
}

// 적용된 setBorderColor 함수 제거
function removeBorderColor() {
  [
    'div',
    'span',
    'ul',
    'li',
    'dd',
    'dl',
    'section',
    'h1',
    'a',
    'img',
    'form',
    'button',
    'header',
    'footer',
    'input',
    'p',
  ].forEach((e) => {
    document.querySelectorAll(e).forEach((element) => {
      element.style.outline = 'none';
    });
  });
}

// btn을 나타내는 색상 표시
chrome.storage.sync.get("colorList", ({ colorList }) => {
  const buttons = document.querySelectorAll(".btn");
  for (let i = 0; i < buttons.length; i++) {
    let color = document.createElement("div");
    color.classList.add("color");
    color.style.backgroundColor = colorList[i];
    buttons[i].insertBefore(color, buttons[i].firstChild);
  }
});

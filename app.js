
const atHome = document.querySelector("#at-home");
const showInputBox = (box, show) => {
  if (show) {
    box.style.transform = "scale(1, 1)"
    box.disabled = false;
    box.focus();
  } else {
    box.style.transform = "scale(1, 0)";
    box.disabled = true;
  }
}

const locate = atHome.parentNode.nextElementSibling;
atHome.addEventListener("change", () => {
  showInputBox(locate, !atHome.checked);
});

const inputTextToggle = document.querySelectorAll(".input-text-toggle");
inputTextToggle.forEach((checkbox) => {
  checkbox.parentElement.parentElement.addEventListener("click", () => {
    const box = document.querySelector(`#${checkbox.dataset.text}`);
    showInputBox(box, checkbox.checked);
  });
})

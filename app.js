renewTime()
function renewTime() {
  const currentTime = new Date();
  document.querySelector("#current-hour").value = currentTime.getHours();
  document.querySelector("#current-minute").value = currentTime.getMinutes();
}

const showInputBox = (box, show) => {
  if (show) {
    box.style.transform = "scale(1, 1)"
    box.disabled = false;
    box.focus();
    box.nextElementSibling.style.visibility = "visible";
  } else {
    box.style.transform = "scale(1, 0)";
    box.disabled = true;
    box.nextElementSibling.style.visibility = "hidden";
  }
}
const showReturnTime = (show) => {
  const returnTime = document.querySelector("#return-time");
  const transportation = document.querySelector("#transportation");
  if (show) {
    returnTime.style.display = "block";
    transportation.style.display = "block";
    document.querySelector("#walk").required = true;
  } else {
    returnTime.style.display = "none";
    transportation.style.display = "none";
    document.querySelector("#walk").required = false;
  }
}

const atHome = document.querySelector("#at-home");
const locate = atHome.parentNode.nextElementSibling;
atHome.addEventListener("change", () => {
  showInputBox(locate, !atHome.checked);
  showReturnTime(!atHome.checked);
});

const inputTextToggle = document.querySelectorAll(".input-text-toggle");
inputTextToggle.forEach((checkbox) => {
  checkbox.parentElement.parentElement.addEventListener("click", () => {
    const box = document.querySelector(`#${checkbox.dataset.text}`);
    showInputBox(box, checkbox.checked);
  });
})


const formResult = document.querySelector(".form-result");
function copyToClipboard() {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(formResult.innerHTML.replace(/<br>/g, "\n"));
  /* Alert the copied text */
  alert("複製到剪貼簿！");
}

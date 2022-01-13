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
function resetForm() {
  formResult.innerHTML = "";
}

const resetBtns = document.querySelectorAll(".reset-button");
resetBtns.forEach((btn, index) => {
  btn.addEventListener("click", (event) => {
    if (index === resetBtns.length - 1) {
      document.querySelector("#return-hour").value = "";
      document.querySelector("#return-minute").value = "";
      return;
    }
    event.target.previousElementSibling.value = "";
  })
})

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = getResults(event.target);
  formResult.innerText = `新兵${result[0]} ${result[1]}\n回報時間：${result[2]}\n有無飲酒：${result[3]}\n外出地點：${result[4]}\n活動：${result[5]}\n交通工具：${result[6]}\n預計幾點回家：${result[7]}`;
  window.scrollTo(0, window.scrollY + window.innerHeight);
})

function getResults(target) {
  const result = [];
  result.push(target[0].value);
  result.push(target[1].value);
  const reportTime = `${target[2].value.padStart(2, "0")}:${target[3].value.padStart(2, "0")}`;
  result.push(reportTime);
  const alcohol = document.querySelector('input[name="alcohol"]:checked').value;
  result.push(alcohol);
  const location = target[4].checked ? "在家" : target[5].value;
  result.push(location);
  let activity = document.querySelector('input[name="activity"]:checked').value;
  activity = (activity === "其他") ? target[13].value : activity;
  result.push(activity);
  let transportation = target[4].checked ? "步行" : document.querySelector('input[name="transportation"]:checked').value;
  transportation = (transportation === "其他") ? target[22].value : transportation
  result.push(transportation);
  const backTime = target[4].checked ? "（已在家）" : `${target[23].value.padStart(2, "0")}:${target[24].value.padStart(2, "0")}`;
  result.push(backTime);
  return result;
}

const form1Btn = document.getElementById("form1");
const form2Btn = document.getElementById("form2");
const formHandler = event => {
  if (event.target.id === "form1") {
    document.documentElement.setAttribute("data-theme", "form1");
    form1Btn.style.height = "100%";
    form2Btn.style.height = "80%";
  } else {
    document.documentElement.setAttribute("data-theme", "form2");
    form2Btn.style.height = "100%";
    form1Btn.style.height = "80%";
  }
};
form1Btn.addEventListener("click", formHandler);
form2Btn.addEventListener("click", formHandler);
renewTime()

const atHome = document.querySelector("#at-home");
const locate = document.querySelector('input[name="locate"]');

const form1Btn = document.getElementById("form1");
const form2Btn = document.getElementById("form2");
const form2Inputs = document.querySelectorAll(".form2-input");
const otherToggle = document.querySelectorAll(".other-toggle");
const formResult = document.querySelector(".form-result");
const resetBtns = document.querySelectorAll(".reset-button");
const form = document.querySelector("form");

/* form handle */
form1Btn.addEventListener("click", formHandler);
form2Btn.addEventListener("click", formHandler);

/* if at home */
/* remove "locate", "return time", "transportation" */
atHome.addEventListener("change", () => {
  showInputBox(locate, !atHome.checked);
  showTimeAndTransport(!atHome.checked);
});

/* check radio "other" toggle text-input */
otherToggle.forEach((checkbox) => {
  checkbox.parentElement.parentElement.addEventListener("click", () => {
    const box = document.querySelector(`#${checkbox.dataset.text}`);
    showInputBox(box, checkbox.checked);
  });
})

/* clear text-input boxes */
resetBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const data = event.target.dataset;
    if (data.type === "time") {
      document.querySelector(`#${data.target}-hour`).value = "";
      document.querySelector(`#${data.target}-minute`).value = "";
      return;
    }
    event.target.previousElementSibling.value = "";
  })
})

/* form submit */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = getResults(event.target);
  if (result.length === 8) {
    formResult.innerText = `新兵${result[0]} ${result[1]}\n回報時間：${result[2]}\n有無飲酒：${result[3]}\n外出地點：${result[4]}\n活動：${result[5]}\n交通工具：${result[6]}\n預計幾點回家：${result[7]}`;
  } else {
    formResult.innerText = `新兵${result[0]} ${result[1]}\n回報時間：${result[2]}\n有無飲酒：${result[3]}\n外出地點：${result[4]}\n活動：${result[5]}\n交通工具：${result[6]}\n預計幾點回家：${result[7]}\n本週收假時間：${result[8]}\n收假方式：${result[9]}\n預計幾點抵達成功嶺：${result[10]}`;
  }
  window.scrollTo(0, window.scrollY + window.innerHeight);
})

/* FUNCTIONS */
function renewTime() {
  const currentTime = new Date();
  document.querySelector("#current-hour").value = currentTime.getHours();
  document.querySelector("#current-minute").value = currentTime.getMinutes();
}

function showInputBox(box, show) {
  if (show) {
    box.parentNode.style.maxHeight = "800px";
    box.disabled = false;
    box.focus();
  } else {
    box.parentNode.style.maxHeight = "0";
    box.disabled = true;
  }
}

function showTimeAndTransport(show) {
  if (show) {
    document.querySelector("#return-time").style.display = "grid";
    document.querySelector("#transportation").style.display = "grid";
    document.querySelector("#walk").required = true;
    document.querySelector("#return-hour").required = true;
    document.querySelector("#return-minute").required = true;
  } else {
    document.querySelector("#return-time").style.display = "none";
    document.querySelector("#transportation").style.display = "none";
    document.querySelector("#walk").required = false;
    document.querySelector("#return-hour").required = false;
    document.querySelector("#return-minute").required = false;
  }
}

function formHandler(event) {
  /* FORM 1 */
  if (event.target.id === "form1") {
    /* change visual */
    document.documentElement.setAttribute("data-theme", "form1");
    form1Btn.style.height = "100%";
    form2Btn.style.height = "80%";

    /* change input */
    form2Inputs.forEach(input => { input.disabled = true; })
    document.getElementById("return-walk").required = false;
    document.getElementById("return-hour").value = 22;
    document.getElementById("return-minute").value = 00;
    return;
  }
  /* FORM 2 */
  /* change visual */
  document.documentElement.setAttribute("data-theme", "form2");
  form2Btn.style.height = "100%";
  form1Btn.style.height = "80%";

  /* change input */
  form2Inputs.forEach(input => { input.disabled = false; })
  document.getElementById("return-walk").required = true;
  document.getElementById("return-hour").value = "";
  document.getElementById("return-minute").value = "";
};

function copyToClipboard() {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(formResult.innerHTML.replace(/<br>/g, "\n"));
  /* Alert the copied text */
  alert("複製到剪貼簿！");
}

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
  if (document.documentElement.dataset.theme === "form2") {
    const endingTime = `${target[25].value.padStart(2, "0")}:${target[26].value.padStart(2, "0")}`;
    result.push(endingTime);
    let returnTransportation = document.querySelector('input[name="return-transportation"]:checked').value;
    returnTransportation = (returnTransportation === "其他") ? target[35].value : returnTransportation
    result.push(returnTransportation);
    const arriveTime = `${target[36].value.padStart(2, "0")}:${target[37].value.padStart(2, "0")}`;
    result.push(arriveTime);
  }
  return result;
}
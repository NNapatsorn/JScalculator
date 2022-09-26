const calculatorDisplay = document.querySelector("h1");
const inputBtn = document.querySelectorAll("button"); //array
const clearBtn = document.getElementById("clear-btn");
const calculate = {
  "/": (firstNumber, secondNumber) =>
    secondNumber > 0 ? firstNumber / secondNumber : "Error: Cannot divide by 0",
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

// no1 operator no2
let firstValue = 0;
let operatorValue = "";
let waitForNext = false; // chk. status of first & operator

setNumberValue = (number) => {
  if (waitForNext) {
    calculatorDisplay.textContent = number;
    waitForNext = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
};

callOperator = (operator) => {
  const currentValue = Number(calculatorDisplay.textContent);

  //chk repeat operator
  if (operatorValue && waitForNext) {
    operatorValue = operator;
    return;
  }

  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const result = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = result;
    firstValue = result;

    if (firstValue === "Error: Cannot divide by 0") {
      resetAll();
    }
  }
  operatorValue = operator;
  waitForNext = true;
};

addDecimal = () => {
  //ถ้า ไม่มีจุด ให้เอาจุดมาต่อท้าย ตามบันทัดที่18
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
};

inputBtn.forEach((input) => {
  // button 0-9
  if (input.classList.length === 0) {
    input.addEventListener("click", () => setNumberValue(input.value));
  } else if (input.classList.contains("operator")) {
    input.addEventListener("click", () => callOperator(input.value));
  } else if (input.classList.contains("decimal")) {
    input.addEventListener("click", () => addDecimal());
  }
});

resetAll = () => {
  firstValue = 0;
  operatorValue = "";
  waitForNext = false;
  calculatorDisplay.textContent = "0";
};

clearBtn.addEventListener("click", () => resetAll());

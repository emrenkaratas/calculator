function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let display_value = "0";
let first_one = null;
let current_operator = null;
let second_one = null;
let reset_display = false;

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clean = document.querySelector(".clean");
const dot = document.querySelector(".dot");

numbers.forEach((button) => {
  button.addEventListener("click", () => handleNumber(button.textContent));
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    handleOperator(button.textContent);
    dot.disabled = false;
  });
});

equal.addEventListener("click", () => {
  handleEquals();
  dot.disabled = false;
});

clean.addEventListener("click", () => {
  clearCalculator();
  dot.disabled = false;
});

dot.addEventListener("click", () => {
  dot.disabled = true;
});

function handleNumber(number) {
  if (reset_display) {
    display_value = number;
    reset_display = false;
  } else {
    display_value = display_value === "0" ? number : display_value + number;
  }

  updateDisplay();
}

function handleOperator(operator) {
  if (current_operator !== null) {
    handleEquals();
  }
  first_one = parseFloat(display_value);
  current_operator = operator;
  reset_display = true;
}

function handleEquals() {
  if (current_operator === null || reset_display) return;
  second_one = parseFloat(display_value);
  let result = operate(first_one, second_one, current_operator);
  display_value = result.toString();
  first_one = result;
  current_operator = null;

  updateDisplay();
}

function clearCalculator() {
  display_value = "0";
  first_one = null;
  second_one = null;
  current_operator = null;
  reset_display = false;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = display_value;
}

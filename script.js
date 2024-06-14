// script.js
document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = Array.from(document.getElementsByClassName("btn"));
  let currentInput = "0";
  let previousInput = "";
  let operator = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.getAttribute("data-value");

      if (value === "C") {
        currentInput = "0";
        previousInput = "";
        operator = "";
        updateDisplay(currentInput);
        return;
      }

      if (value === "=") {
        if (previousInput && operator) {
          currentInput = calculate(previousInput, currentInput, operator);
          operator = "";
          previousInput = "";
          updateDisplay(currentInput);
        }
        return;
      }

      if (["+", "-", "*", "/"].includes(value)) {
        if (operator) {
          currentInput = calculate(previousInput, currentInput, operator);
          updateDisplay(currentInput);
        }
        operator = value;
        previousInput = currentInput;
        currentInput = "0";
        return;
      }

      if (currentInput === "0") {
        currentInput = value;
      } else {
        currentInput += value;
      }
      updateDisplay(currentInput);
    });
  });

  function updateDisplay(value) {
    display.textContent = value;
  }

  function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
      case "+":
        return (a + b).toString();
      case "-":
        return (a - b).toString();
      case "*":
        return (a * b).toString();
      case "/":
        return (a / b).toString();
      default:
        return b;
    }
  }
});

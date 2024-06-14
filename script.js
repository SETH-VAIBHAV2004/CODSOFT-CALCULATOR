document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  let currentInput = "0";
  let firstOperand = null;
  let operator = null;
  let waitingForSecondOperand = false;

  const updateDisplay = () => {
    display.textContent = currentInput;
  };

  const inputDigit = (digit) => {
    if (currentInput === "0" || waitingForSecondOperand) {
      currentInput = digit;
      waitingForSecondOperand = false;
    } else {
      currentInput += digit;
    }
    updateDisplay();
  };

  const inputDecimal = () => {
    if (!currentInput.includes(".")) {
      currentInput += ".";
      updateDisplay();
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(currentInput);

    if (firstOperand === null) {
      firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      currentInput = String(result);
      firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const resetCalculator = () => {
    currentInput = "0";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
  };

  // Event listeners for buttons
  document.getElementById("clear").addEventListener("click", resetCalculator);
  document.getElementById("decimal").addEventListener("click", inputDecimal);
  document
    .getElementById("equals")
    .addEventListener("click", () => handleOperator());
  document
    .getElementById("add")
    .addEventListener("click", () => handleOperator("+"));
  document
    .getElementById("subtract")
    .addEventListener("click", () => handleOperator("-"));
  document
    .getElementById("multiply")
    .addEventListener("click", () => handleOperator("*"));
  document
    .getElementById("divide")
    .addEventListener("click", () => handleOperator("/"));

  const numberButtons = document.querySelectorAll(".number");
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      inputDigit(button.textContent);
    });
  });
});

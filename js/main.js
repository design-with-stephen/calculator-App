const screenValue = document.querySelector(".screenDigits");
const digitButtons = document.querySelectorAll(".digitBtn");
const operatorButtons = document.querySelectorAll(".operatorBtn");
const equalButton = document.querySelector(".equalBtn");
const deleteButton = document.querySelector(".DeleteBtn");
const clearButton = document.querySelector(".clearBtn");
const percentageButton = document.querySelector(".percentage");
const bracketButton = document.querySelector(".bracket");
const decimalButton = document.querySelector(".decimal");
const negativeToggleButton = document.querySelector(".negativePostive");

let currentInput = "";
let waitingForSecondOperand = false;
let openBracket = true; // Track open/close bracket usage

// Append numbers when clicked
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentInput += button.value; 
        updateScreen();
    });
});

// Handle operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const lastChar = currentInput.slice(-1);

        // Prevent multiple consecutive operators, except allowing "-" for negative numbers
        if (!currentInput && button.innerText === "-") {
            currentInput = "-"; // Allow negative numbers at the start
        } else if (/[\+\-\*\/]$/.test(lastChar)) {
            if (button.innerText === "-" && lastChar !== "-") {
                currentInput += "-"; // Allow negative numbers after an operator
            }
        } else {
            currentInput += button.innerText; // Append operator
        }

        updateScreen();
    });
});

// Handle equal button
equalButton.addEventListener("click", () => {
    try {
        let result = eval(currentInput.replace("%", "/100")); // Convert % to division
        currentInput = result.toString();
        updateScreen();
    } catch (error) {
        currentInput = "Error";
        updateScreen();
    }
});

// Handle percentage button
percentageButton.addEventListener("click", () => {
    if (currentInput) {
        currentInput += "%"; // Append % symbol (converted in eval)
        updateScreen();
    }
});

// Handle brackets button
bracketButton.addEventListener("click", () => {
    if (openBracket) {
        currentInput += "(";
    } else {
        currentInput += ")";
    }
    openBracket = !openBracket;
    updateScreen();
});

// Handle decimal button
decimalButton.addEventListener("click", () => {
    const lastChar = currentInput.slice(-1);
    if (!lastChar.match(/[0-9]/)) {
        currentInput += "0."; // Ensure "0." if no number before decimal
    } else {
        currentInput += ".";
    }
    updateScreen();
});

// Handle +/- button (Toggle negative number)
negativeToggleButton.addEventListener("click", () => {
    if (!currentInput) return;

    let lastNumMatch = currentInput.match(/(-?\d+\.?\d*)$/);
    if (lastNumMatch) {
        let lastNum = lastNumMatch[0];
        if (lastNum.startsWith("-")) {
            currentInput = currentInput.replace(lastNum, lastNum.slice(1)); // Remove "-"
        } else {
            currentInput = currentInput.replace(lastNum, `-${lastNum}`); // Add "-"
        }
    }
    updateScreen();
});

// Delete last character
deleteButton.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1) || "0";
    updateScreen();
});

// Clear everything
clearButton.addEventListener("click", () => {
    currentInput = "";
    openBracket = true;
    updateScreen();
});

// Update calculator screen
function updateScreen() {
    screenValue.innerText = currentInput || "0";
}

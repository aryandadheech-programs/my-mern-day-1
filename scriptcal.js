const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

const operators = ["+", "-", "*", "/"];

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        // Clear
        if (value === "C") {
            currentInput = "";
            display.value = "";
        }

        // Equals
        else if (value === "=") {
            if (currentInput === "") return;

            try {
                let result = eval(currentInput);
                display.value = result;
                currentInput = result.toString();
            } catch {
                display.value = "Error";
                currentInput = "";
            }
        }

        // Percentage
        else if (value === "%") {
            if (currentInput === "") return;

            try {
                let result = eval(currentInput) / 100;
                display.value = result;
                currentInput = result.toString();
            } catch {
                display.value = "Error";
                currentInput = "";
            }
        }

        // Prevent double operators
        else if (operators.includes(value)) {
            if (currentInput === "" || operators.includes(currentInput.slice(-1))) {
                return;
            }
            currentInput += value;
            display.value = currentInput;
        }

        // Decimal point control
        else if (value === ".") {
            let lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
            if (lastNumber.includes(".")) return;

            currentInput += value;
            display.value = currentInput;
        }

        // Numbers
        else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});


// ✅ Keyboard Support (Bonus Feature)
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || "+-*/.".includes(key)) {
        currentInput += key;
        display.value = currentInput;
    }

    else if (key === "Enter") {
        try {
            let result = eval(currentInput);
            display.value = result;
            currentInput = result.toString();
        } catch {
            display.value = "Error";
            currentInput = "";
        }
    }

    else if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }

    else if (key === "Escape") {
        currentInput = "";
        display.value = "";
    }
});
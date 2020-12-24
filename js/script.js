import Calculator from "./Calculator.js";

//Principal object
let calculator;

//Get buttons and display
let display = document.querySelector("#textArea");
let clearAll = document.querySelector("#clearAll");
let equal = document.querySelector("#equal");
let dot = document.querySelector("#dot");
let operation = document.querySelectorAll("[data-operation]");
let numbers = document.querySelectorAll("[data-number]");
let parenthese = document.querySelector("[data-parentheses]");

//These functions execute a command by click on button
clearAll.addEventListener("click", () => {
    display.value = "";
    calculator.index = 0;
    calculator.calcArray = [];
});

//Create an event for each number button
numbers.forEach((number, i) => {
    number.addEventListener("click", () => {
        if (calculator.calcArray[calculator.index] == undefined) {
            calculator.calcArray[calculator.index] = "";
        }
        calculator.calcArray[calculator.index] += number.value;
        display.value += number.value;
    });
});

//Create an event for each operation button
operation.forEach((op) => {
    op.addEventListener("click", () => {
        if (calculator.isItOperation(calculator.calcArray[calculator.index - 1]) == -1) {
            calculator.calcArray[++calculator.index] = op.value;
            calculator.index++;
            display.value += op.value;
        }
    });
});

//Create an event for dot button
dot.addEventListener("click", () => {
    if (calculator.calcArray[calculator.index] == undefined) {
        calculator.calcArray[calculator.index] = "";
    }
    calculator.calcArray[calculator.index] += ".";
    display.value += ".";
});


//Create an event for equal button
equal.addEventListener("click", () => {
    calculator.calculate();
    calculator.index = 0;
    display.value = calculator.calcArray;
});

parentheses.addEventListener("click", () => {
    
});

calculator = new Calculator();
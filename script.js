const display = document.getElementById('calculatorDisplay');
const buttons = document.querySelectorAll('.btn');
const clear = document.getElementById('clear-btn');
const equal = document.getElementById('equal-btn');

let currentInput = '';
let previousInput = '';
let operator = null;

function updateDisplay() {
  if (operator !== null) {
    display.textContent = previousInput + operator + currentInput;
  } else {
    display.textContent = currentInput;
  }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        if(button.classList.contains('operator')){
            if(currentInput === '') return;
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        } else if (value === '.') {
            if (currentInput.includes('.')) return;
            currentInput += value;
        } else {
            currentInput += value;
        }
        updateDisplay(currentInput || previousInput);
    });
});

equal.addEventListener('click', () => {
    if (previousInput === '' || currentInput === '' || operator === null) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    operator = null;
    updateDisplay(currentInput);
})

clear.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('0');
})
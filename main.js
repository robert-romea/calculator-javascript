// PROJECT REALIZED BY GABRIEL-ROBERT ROMEA; DATE: 10.01.2022
// NAME OF PROJECT: 4 OPERATORS CALCULATOR

//------------------------------ SELECTING ALL THE ELEMENTS ↓ ------------------------------ //
let input = document.querySelector('#input'); // input/output button
let number = document.querySelectorAll('.numbers div'); // number buttons
let operator = document.querySelectorAll('.operators div'); // operator buttons
let result = document.querySelector('#result'); // equal button
let clear = document.querySelector('#clear'); // clear button
let resultDisplayed = false; // to keep an eye on what is displayed on output



//------------------------------ ADD EVENT LISTENERS ↓  ------------------------------ //

//------------------------------ NUMBERS [0-9] & DOT (".") ------------------------------ //
// adding click handlers to number buttons
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", numberEvents);
}


//----------------------------- OPERATORS -> "+", "-", "×", "÷" ----------------------------- //
// adding click handlers to number buttons
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", operatorEvents);
}

//------------------------------ CLEAR (C) ------------------------------ //
// adding click handler to "clear" button
clear.addEventListener("click", clearInput);


//------------------------------ EQUAL BUTTON ------------------------------ //
// adding click handler to "equal" button
result.addEventListener("click", makeEquations);



// ------------------------------ EVENT LISTENER FUNCTIONS ↓ ------------------------------ //

// ---------------------- NUMBERS FUNCTION ---------------------- //
function numberEvents(event) {

  // storing current input string and its last character in variables - used later
  let currentString = input.innerHTML;
  let lastChar = currentString[currentString.length - 1];
  // if result is not diplayed, just keep adding
  if (resultDisplayed === false) {
    input.innerHTML += event.target.innerHTML;
  } else if ((resultDisplayed === true) && (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷")) {
    // if result is currently displayed and user pressed an operator
    // we need to keep on adding to the string for next operation
    resultDisplayed = false;
    input.innerHTML += event.target.innerHTML;
  } else {
    // if result is currently displayed and user pressed a number
    // we need clear the input string and add the new input to start the new opration
    resultDisplayed = false;
    input.innerHTML = "";
    input.innerHTML += event.target.innerHTML;
  }

  //console.log(event.target.innerHTML);
  //console.log(event);
}


// ---------------------- OPERATORS FUNCTION ---------------------- //
function operatorEvents(event) {

  // storing current input string and its last character in variables - used later
  let currentString = input.innerHTML;
  let lastChar = currentString[currentString.length - 1];

  // if last character entered is an operator, replace it with the currently pressed one
  if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
    let newString = currentString.substring(0, currentString.length - 1) + event.target.innerHTML;
    input.innerHTML = newString;
  } else if (currentString.length == 0) {
    // if first key pressed is an opearator, don't do anything
    alert("enter a number first");
  } else {
    // else just add the operator pressed to the input
    input.innerHTML += event.target.innerHTML;
  }
}


// ---------------------- CLEAR (C) FUNCTION ---------------------- // --> the most complicated function 😁😅
function clearInput() {
  input.innerHTML = "";
}


// ---------------------- EQUATIONS FUNCTION ---------------------- // 

function makeEquations() {
  // this is the string that we will be processing eg. -10+26+33-56*34/23
  let inputString = input.innerHTML;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  //when it finds one of the operators "+", "-", "÷", "×" it return an array with empty elements
  let numbers = inputString.split(/\+|\-|\×|\÷/g);


  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dots with empty string and then split
  let operators = inputString.replace(/[0-9]|\./g, "").split("");


  // ******************** JUST FOR VERIFICATION - START ********************
  console.log(inputString);
  console.log(numbers);
  console.log(operators);
  console.log("**********************************************");
  // ******************** JUST FOR VERIFICATION - END   ********************

  //*** VERY IMPORTANT: the order of the operators MUST remain like this:
  // looping through the array and doing one operation at a time.
  // the order of the operations must be taken into account, so the order will be:
  // first divide, then multiply, then subtraction and then addition
  // as its itterating, the arrays are modifying (operators and numbers)
  // the final element remaining in the array will be the output

  //first of all  division, multiplication, subtraction, addition

  //divide operation  - 1
  let divide = operators.indexOf("÷");
  console.log(divide)
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);  //
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
    //console.log(divide);
  }

  // ******************** JUST FOR VERIFICATION - START ********************
  console.log(numbers);
  console.log(operators)
  // ******************** JUST FOR VERIFICATION - END   ********************

  // eg. : 2 * 3 * 3 + 2 + 9  = 6 * 3  = 18 + 2 + 9
  //multiply operation - 2
  let multiply = operators.indexOf("×");
  console.log(multiply)
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
    console.log(multiply);
  }


  // ******************** JUST FOR VERIFICATION - START ********************
  console.log(numbers);
  console.log(operators);
  // ******************** JUST FOR VERIFICATION - END   ********************


  //subtract operation - 3
  let subtract = operators.indexOf("-");
  console.log(subtract);
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
    //console.log(subtract);
  }


  // ******************** JUST FOR VERIFICATION - START ********************
  console.log(numbers);
  console.log(operators)
  // ******************** JUST FOR VERIFICATION - END   ********************


  // 18 + 2 + 9 = 20 + 2 = 22
  //add operation - 4
  let add = operators.indexOf("+");
  console.log(add);
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string 
    //concatenation because it is an array of strings 
    //eg. : "input: 2+2+2+2+2 = 22222" ->> without parseFloat
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
    console.log(add);
  }

  // ******************** JUST FOR VERIFICATION - START ********************
  console.log(numbers);
  console.log(operators)
  // ******************** JUST FOR VERIFICATION - END   ********************

  input.innerHTML = numbers[0]; // displaying the output
  resultDisplayed = true; // turning flag if result is displayed
}














//select element
const input_element = document.querySelector(".input");
const operation_element = document.querySelector("#operation .value");
const result_element = document.querySelector("#result .value");

//variables
const OPERATION = ["+", "-", "*", "/"];
const POWER = "power(",
  FACTORIAL = "FACTORIAL(";
let data = {
  operation: [],
  formula: [],
};

let calculator_buttons = [
  {
    name: "rad",
    symbol: "Rad",
    formula: false,
    type: "key",
  },
  {
    name: "deg",
    symbol: "Deg",
    formula: false,
    type: "key",
  },
  {
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "math_function",
  },
  {
    name: "square",
    symbol: "x²",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "number",
  },
  {
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "number",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number",
  },
  {
    name: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos,",
    type: "trigo_function",
  },
  {
    name: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigo_function",
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan,",
    type: "trigo_function",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number",
  },
  {
    name: "acos",
    symbol: "acos",
    formula: "inv_trigo(Math.acos,",
    type: "trigo_function",
  },
  {
    name: "asin",
    symbol: "asin",
    formula: "inv_trigo(Math.asin,",
    type: "trigo_function",
  },
  {
    name: "atan",
    symbol: "atan",
    formula: "inv_trigo(Math.atan,",
    type: "trigo_function",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },
  {
    name: "factorial",
    symbol: "×!",
    formula: FACTORIAL,
    type: "math_function",
  },
  {
    name: "exp",
    symbol: "exp",
    formula: "Math.exp",
    type: "math_function",
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log",
    type: "math_function",
  },
  {
    name: "log",
    symbol: "log",
    formula: "Math.log10",
    type: "math_function",
  },
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "power",
    symbol: "x<sup>y</sup>",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "ANS",
    symbol: "ANS",
    formula: "ans",
    type: "number",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
];

function create_calculate_button() {
  // let addbtn=0;

  calculator_buttons.forEach(function (buttons) {
    const input = document.querySelector(".input:last-child");
    input.innerHTML += `<button id="${buttons.name}"> ${buttons.symbol}</button>`;
  });
}

create_calculate_button();

//rad-deg
let radian = true;

const rad_btn = document.getElementById("rad");
const deg_btn = document.getElementById("deg");

rad_btn.classList.add("active-angle");

function angleTaggler() {
  rad_btn.classList.toggle("active-angle");
  deg_btn.classList.toggle("active-angle");
}

//click button target
input_element.addEventListener("click", (event) => {
  const targetbtn = event.target;
  calculator_buttons.forEach((button) => {
    if (targetbtn.id === button.name) {
      calculater(button);
    }
  });
});

let powerbuttonclick;

function calculater(button) {
  if (button.type == "operator") {
    // powerbuttonclick = false;
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "number") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "math_function") {
    let symbol, formula;

    if (button.name === "factorial") {
      symbol = "!";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name === "power") {
      //   powerbuttonclick = true;
      symbol = `^(`;
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name === "square") {
      //   powerbuttonclick = true;
      symbol = `^(`;
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
      data.operation.push("2)");
      data.formula.push("2)");
    } else {
      symbol = button.symbol + "(";
      formula = button.formula + "(";
      data.operation.push(symbol);
      data.formula.push(formula);
    }
  } else if (button.type == "trigo_function") {
    // powerbuttonclick = false;
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula);
  } else if (button.type == "key") {
    // powerbuttonclick = false;
    if (button.name == "clear") {
      data.operation = [];
      data.formula = [];
      updateOutputResult(0);
    } else if (button.name == "delete") {
      data.operation.pop();
      data.formula.pop();
    } else if (button.name == "rad") {
      radian = true;
      angleTaggler();
    } else if (button.name == "deg") {
      radian = false;
      angleTaggler();
    }
  } else if (button.type == "calculate") {
    powerbuttonclick = false;
    formula_str = data.formula.join("");
    let result;
    //searching power and factorial
    let POWER_SEARCH_RESULT = search(data.formula, POWER);
    let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);
    console.log(data.formula, POWER_SEARCH_RESULT, FACTORIAL_SEARCH_RESULT);
    console.log(data.formula);
    // let BASES = powerBaseGetter(data.formula, POWER_SEARCH_RESULT);
    console.log(data.formula);
    // console.log(BASES);

    try {
      result = eval(formula_str);
    } catch (error) {
      if (error instanceof SyntaxError) {
        result = "syntax error";
        updateOutputResult(result);
        return;
      }
    }
    data.operation = [];
    data.operation.push(result);

    ans = result;
    data.operation = [result];
    data.formula = [result];

    updateOutputResult(result);

    // console.log(data.operation);
  }
  updateOutputOperations(data.operation.join(""));
}

function powerBaseGetter(formula, POWER_SEARCH_RESULT) {
  let powerBase = [];
  POWER_SEARCH_RESULT.forEach((powerIndex) => {
    let base = [];
    let parenthesis_count = 0;
    let previousIndex = powerIndex - 1;
    // console.log(formula[previousIndex]);
    while (previousIndex >= 0) {
      if ((formula[previousIndex] = "(")) {
        parenthesis_count--;
      }
      if ((formula[previousIndex] = ")")) {
        parenthesis_count++;
      }

      let is_operation = false;
      OPERATION.forEach((OPERATION) => {
        if (formula[previousIndex] == OPERATION) {
          console.log(OPERATION);
          is_operation = true;
        }
      });

      let is_power = formula[previousIndex] == POWER;

      if ((is_operation && parenthesis_count == 0) || is_power) break;

      base.unshift(formula[previousIndex]);
      previousIndex--;
    }
    powerBase.push(base.join(""));
  });
  return powerBase;
}

function search(array, keyword) {
  let search_result = [];

  array.forEach((element, index) => {
    if (element == keyword) search_result.push(index);
  });
  return search_result;
}

function updateOutputOperations(operation) {
  //   if (powerbuttonclick) {
  //     operation_element.innerHTML = `<sup>${operation}</sup>`;
  //   } else {
  //     operation_element.innerHTML = operation;
  //   }
  operation_element.innerHTML = operation;
}

function updateOutputResult(result) {
  result_element.innerHTML = result;
}

//factorial
function factorial(number) {
  if (number % 1 != 0) return gamma(number + 1);
  if (number == 0 || number == 1) return 1;
  let result = 1;
  for (let i = 1; i <= number; i++) {
    result *= i;
    if (result == Infinity) return Infinity;
  }
  return result;
}

// GAMMA FUNCTINON
function gamma(n) {
  // accurate to about 15 decimal places
  //some magic constants
  var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
    p = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
    ];
  if (n < 0.5) {
    return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
  } else {
    n--;
    var x = p[0];
    for (var i = 1; i < g + 2; i++) {
      x += p[i] / (n + i);
    }
    var t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
  }
}

//tigonomatric operation
function trigo(callback, angle) {
  if (!radian) {
    angle = angle * (Math.PI / 180);
  }
  return callback(angle);
}
function inv_trigo(callback, value) {
  angle = callback(value);
  if (!radian) {
    angle = angle * (180 / Math.PI);
  }
  return angle;
}

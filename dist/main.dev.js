"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator =
/*#__PURE__*/
function () {
  function Calculator(previousOperandTextElement, currentOperandTextElement) {
    _classCallCheck(this, Calculator);

    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  _createClass(Calculator, [{
    key: "clear",
    value: function clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  }, {
    key: "appendNumber",
    value: function appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }, {
    key: "chooseOperation",
    value: function chooseOperation(operation) {
      if (this.currentOperand === '') return;

      if (this.previousOperand !== '') {
        this.compute();
      }

      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  }, {
    key: "compute",
    value: function compute() {
      var computaion;
      var previous = parseFloat(this.previousOperand);
      var current = parseFloat(this.currentOperand);
      if (isNaN(previous) || isNaN(current)) return;

      switch (this.operation) {
        case '+':
          computaion = previous + current;
          break;

        case '-':
          computaion = previous - current;
          break;

        case '*':
          computaion = previous * current;
          break;

        case '÷':
          computaion = previous / current;
          break;

        default:
          return;
      }

      this.currentOperand = computaion;
      this.operation = undefined;
      this.previousOperand = '';
    }
  }, {
    key: "getDisplayNumber",
    value: function getDisplayNumber(number) {
      var stringNumber = number.toString();
      var intergerDigits = parseFloat(stringNumber.split('.')[0]);
      var decimalDigits = stringNumber.split('.')[1];
      var intergerDisplay;

      if (isNaN(intergerDigits)) {
        intergerDisplay = '';
      } else {
        intergerDisplay = intergerDigits.toLocaleString('en', {
          maximumFranctionDigits: 0
        });
      }

      ;

      if (decimalDigits != null) {
        return "".concat(intergerDisplay, ".").concat(decimalDigits);
      } else {
        return intergerDisplay;
      }
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

      if (this.operation != null) {
        this.previousOperandTextElement.innerText = "".concat(this.getDisplayNumber(this.previousOperand), " ").concat(this.operation);
      } else {
        this.previousOperandTextElement.innerText = '';
      }
    }
  }]);

  return Calculator;
}();

var numberButtons = document.querySelectorAll('[data-number]');
var operationButtons = document.querySelectorAll('[data-operation]');
var equalButton = document.querySelector('[data-equals]');
var deleteButton = document.querySelector('[data-delete]');
var allClearButton = document.querySelector('[data-all-clear]');
var previousOperandTextElement = document.querySelector('[data-previous-operand]');
var currentOperandTextElement = document.querySelector('[data-current-operand]');
var calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalButton.addEventListener('click', function (button) {
  calculator.compute();
  calculator.updateDisplay();
});
allClearButton.addEventListener('click', function (button) {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener('click', function (button) {
  calculator["delete"]();
  calculator.updateDisplay();
});
/*
 * Name: Juda Fernandez
 * Date: April 21, 2021
 * Section: CSE 154 AM - Fadel
 *
 * This is the JS to implement the interactivity for my math website's homepage.
 * It also implements the algorithm for the arithmetic calculator on the homepage.
 */

"use strict";

/**
 * This is an anonymous function that gets called immediately
 * This "kickstarts" the whole program
 */
(function() {

  window.addEventListener("load", init); // listen for DOM to be loaded for js to start

  /**
   * This function checks if the button to initiate the
   * arithmetic calculator is clicked. If so, it initiates the
   * actual computer functions
   */
  function init() {

    let differentiateButton = id("differentiate-button");
    differentiateButton.addEventListener("click", computeExpression);

  }

  /**
   * This function is responsible for taking the user input
   * and then outputting the result of the expression
   * to the user.
   * This function does not handle the computation
   * of the expression itself; there are other functions
   * which do that
   */
  function computeExpression() {

    let infixExpression = id("expression").value;
    let postFixExpression = infixToPostfix(infixExpression);

    let expressionAsTree = new ExpressionTree();



    /**
     * Implements Dijkstra's Shunting-yard algorithm
     * for converting mathematical expressions
     * from infix notation(standard notation) to postfix notation.
     * We want to convert the expression into postfix notation
     * because it makes it easy to compute the expression
     *
     * @param {String} expression - String which represents the
     * mathematical expression input from the user
     * ex: 3 + (6 / 2) * 2
     *
     * @returns {Array}- returns an array postfix version
     * of the origin infix expression parameter
     */
    function infixToPostfix(expression) {

      let outputQueue = [];
      let operatorStack = [];

      //use a hashmap to assign a precedence for each operator
      let operatorPrecedences = new Map([

        ['*', 2],
        ['/', 2],
        ['+', 1],
        ['-', 1],
        ['(', 0]

      ]);

      for (let i = 0; i < expression.length; i++) {

        let curr = expression.charAt(i);

        if (isNum(curr)) {

          let num = curr;
          i++;

          while (i < expression.length && !isOperator(expression.charAt(i))) {

            curr = expression.charAt(i);
            if (curr != ' ') {
              num += curr;
            }
            i++;

          }

          outputQueue.push(num);
          if (i != expression.length) {
            i--;
          }

        } else if (isOperator(curr)) {

          if (operatorStack.length == 0 || curr == '(') {
            operatorStack.push(curr);
          } else if (curr == ')') {

            let operator = operatorStack.pop();
            while (operatorStack.length > 0 && operator != '(') {
              outputQueue.push(operator);
              operator = operatorStack.pop();
            }

          } else {

            //while element on top of stack has greater or equal precedence than curr
            while (operatorStack.length > 0 &&
            operatorPrecedences.get(operatorStack[operatorStack.length - 1]) >= operatorPrecedences.get(curr)) {

              let operator = operatorStack.pop();
              outputQueue.push(operator);

            }

            operatorStack.push(curr);

          }

        } else if (curr == ' ') {
          continue;
        } else {
          alert("Expression is invalid");
          break;
        }

      }

      while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
      }

      return outputQueue;

    }

    /**
     * This function takes the postFix version of the user's expression,
     * evaluates it mathematically, then returns the result
     * @param {Array} expression - the postFix version of the user's input expression
     * @returns {int} - return the result of the expression
     */
    function evaluatePostFixExpression(expression) {

      let stackOfNumbers = [];

      for (let i = 0; i < expression.length; i++) {

        let curr = expression[i];

        if (isNum(curr)) {

          stackOfNumbers.push(curr.charCodeAt() - 48);
        } else if (isOperator(curr)) {

          if (stackOfNumbers.length < 2) {
            alert("Expression is invalid");
            break;
          } else {

            let num2Int = stackOfNumbers.pop();
            let num1Int = stackOfNumbers.pop();

            let result = 0;

            if (curr == '+') {
              result = num1Int + num2Int;
            } else if (curr == '-') {
              result = num1Int - num2Int;
            } else if (curr == '*') {
              result = num1Int * num2Int;
            } else if (curr == '/') {
              result = num1Int / num2Int;
            }

            stackOfNumbers.push(result);

          }

        }

      }

      return stackOfNumbers.pop();

    }

    /**
     * This function takes a symbol/char and determines if it is
     * a number or not.
     * @param {char} symbol - takes in a symbol(char of the expression)
     * @returns {boolean} - returns a boolean which represents whether or not
     * the symbol is a number. Returns true if it is a number, otherwise return false
     */
    function isNum(symbol) {
      return 48 <= symbol.charCodeAt() && symbol.charCodeAt() <= 57;
    }

    /**
     * This function takes a symbol/char and determines if it is
     * an operator or not.
     * @param {char} symbol - takes in a symbol(char of the expression)
     * @returns {boolean} - returns a boolean which represents whether or not
     * the symbol is an operator. Returns true if it is an operator, otherwise return false
     */
    function isOperator(symbol) {
      return symbol === '*' || symbol === '/' || symbol === '+' || symbol === '-'
      || symbol === '(' || symbol === ')';
    }

  }

  function id(elementID) {
    return document.getElementById(elementID);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

})();

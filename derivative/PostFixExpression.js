"use strict";
exports.__esModule = true;
exports.PostFixExpression = void 0;
var PostFixExpression = /** @class */ (function () {
    function PostFixExpression(infixExpression) {
        this.originalInfixExpressionAsString = infixExpression;
        this.getInfixStringToPostfixArray(infixExpression);
    }
    /**
     * Function which uses Dijkstra's shunting yard algorithm
     * to convert mathematical expressions from infix notation
     * to postfix notation
     * @param {String} infixExpression - string representation of
     * the infix expression
     */
    PostFixExpression.prototype.getInfixStringToPostfixArray = function (infixExpression) {
        var operatorValueMap = {
            ")": 5,
            "^": 4,
            "*": 3,
            "/": 3,
            "+": 2,
            "-": 2,
            "(": 1
        };
        var stack = [];
        this.postFixExpressionAsArray = [];
        for (var i = 0; i < infixExpression.length; i++) {
            var item = infixExpression.charAt(i);
            if (item === " ") { // ignore spaces
                continue;
            }
            else if (this.isOperand(item)) {
                this.postFixExpressionAsArray.push(item);
            }
            else if (this.isOperator(item)) {
                // if current operator is a closing parenthesis,
                // pop off from the stack and onto the postfix expression
                // until we reach the opening parenthesis. Then just pop off
                // the opening parenthesis into the void and leave the closing
                // parenthesis into the void as well
                if (item === ")") {
                    while (stack[stack.length - 1] !== "(") {
                        this.postFixExpressionAsArray.push(stack.pop());
                    }
                    // item on top of stack should be the opening parenthesis
                    stack.pop();
                    continue;
                }
                // if item is "(", or stack is empty, or top item of stack
                // has lower value than the current item, push the current item
                // to the stack
                if (operatorValueMap[item] === 1
                    || stack.length === 0
                    || operatorValueMap[stack[stack.length - 1]] < operatorValueMap[item]) {
                    stack.push(item);
                    continue;
                }
                // if the current operator has equal or lower value
                // than the item on top of the stack, pop off from stack
                // and to the postfix expression until we can place the
                // current operator
                if (stack.length !== 0
                    && operatorValueMap[stack[stack.length - 1]] >= operatorValueMap[item]) {
                    while (stack.length !== 0
                        && operatorValueMap[stack[stack.length - 1]] >= operatorValueMap[item]) {
                        this.postFixExpressionAsArray.push(stack.pop());
                    }
                    stack.push(item);
                    continue;
                }
            }
        }
        // at this point, there are no more items in the infix expression to
        // analyze, so just pop off the stack and onto the postfix expression
        // until the stack is empty
        while (stack.length != 0) {
            this.postFixExpressionAsArray.push(stack.pop());
        }
    };
    /**
     * This function takes a symbol/char and determines if it is
     * a number or not.
     * @param {String} symbol - takes in a symbol(char of the expression)
     * @returns {boolean} - returns a boolean which represents whether or not
     * the symbol is a number. Returns true if it is a number, otherwise return false
     */
    PostFixExpression.prototype.isOperand = function (item) {
        var LOWERNUMASCIIBOUND = 48;
        var UPPERNUMASCIIBOUND = 57;
        return LOWERNUMASCIIBOUND <= item.charCodeAt(0)
            && item.charCodeAt(0) <= UPPERNUMASCIIBOUND
            || item === "x" || item === "X";
    };
    /**
     * This function takes a symbol/char and determines if it is
     * an operator or not.
     * @param {String} symbol - takes in a symbol(char of the expression)
     * @returns {boolean} - returns a boolean which represents whether or not
     * the symbol is an operator. Returns true if it is an operator, otherwise return false
     */
    PostFixExpression.prototype.isOperator = function (symbol) {
        return symbol === '^' || symbol === '*' || symbol === '/' || symbol === '+'
            || symbol === '-' || symbol === '(' || symbol === ')';
    };
    return PostFixExpression;
}());
exports.PostFixExpression = PostFixExpression;

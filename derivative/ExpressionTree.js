"use strict";
exports.__esModule = true;
exports.ExpressionTree = void 0;
// An Expression tree object will hold
// a math expression in binary tree form
var ExpressionTree = /** @class */ (function () {
    // constructor takes the post fix expression and converts it into
    // a binary expression tree. This instance of the tree will hold the
    // head of the tree
    function ExpressionTree(expression) {
        this.convertStringToTree(expression);
    }
    ExpressionTree.prototype.convertStringToTree = function (expression) {
        var stack = [];
        for (var i = 0; i < expression.length; i++) {
            // create a new tree node of the current item
            var node = new TreeNode(expression[i]);
            if (this.isOperand(expression[i])) {
                stack.push(node);
            }
            else if (this.isOperator(expression[i])) {
                // take the last two items and set them as
                // the children of the current node
                var rightChild = stack.pop();
                var leftChild = stack.pop();
                node.left = leftChild;
                node.right = rightChild;
                stack.push(node);
            }
        }
        // the last node in the stack is the overall tree
        var overallTree = stack.pop();
        this.head = overallTree;
    };
    ExpressionTree.prototype.differentiateTree = function () {
        // IF    Info(Ptr) == V
        // THEN  Diff <-- 1    /* Rule-2 */
        // ELSE  IF    Info(Ptr) == a constant OR Info(Ptr) == a different variable
        // THEN  Diff <-- 0   /* Rule-1 */
        // ELSE
        //      CASE Info(Ptr) OF
        //  '+': apply Rule-3 ;
        //  '-': apply Rule-4;
        //  '*': apply Rule-5;
        //        '/': apply Rule-6;
        //  '#': apply Rule-7;
        // END CASE
        var derivative = this.differentiateTreeDFS(this.head);
        return derivative;
    };
    ExpressionTree.prototype.differentiateTreeDFS = function (node) {
        if (node === null) {
            return "";
        }
        else {
            var item = node.item;
            if (this.isOperand(item)) { // is a number
                if (item === "X" || item === "x") {
                    return "1";
                }
                else {
                    return "0";
                }
            }
            else {
                var expressionLeft = this.getExpressionFromTree(node.left);
                var expressionRight = this.getExpressionFromTree(node.right);
                var derivativeLeft = this.differentiateTreeDFS(node.left);
                var derivativeRight = this.differentiateTreeDFS(node.right);

                var derivative = "";
                if (item === "^") {
                    var exponent = parseInt(expressionRight);
                    var base = expressionLeft;
                    derivative = exponent + "*" + base + "^" + (exponent - 1);
                    return derivative;
                }
                else if (item === "*") {
                    // u'v + uv'
                    let leftComponent = derivativeLeft + "*" + expressionRight;
                    let rightComponent = expressionLeft + "*" + derivativeRight;
                    if (parseInt(derivativeLeft) === 0 || parseInt(expressionRight) === 0) {
                        leftComponent = "";
                    }
                    if (expressionLeft === "0" || derivativeRight === "0") {
                        rightComponent = "";
                    }
                    if (leftComponent === "" && rightComponent === "") {
                        return "";
                    }
                    derivative = leftComponent + "+"
                        + rightComponent;
                }
                else if (item === "/") {
                    // (u'v - uv')(v)^2
                    derivative = "(" + derivativeLeft + "*" + expressionRight
                        + "-" + expressionLeft + "*" + derivativeRight + ")"
                        + "/" + "(" + expressionRight + ")^2";
                }
                else if (item === "+") {
                    derivative = derivativeLeft + "+" + derivativeRight;
                }
                else if (item === "-") {
                    derivative = derivativeLeft + "-" + derivativeRight;
                }
                return "(" + derivative + ")";
            }
        }
    };
    ExpressionTree.prototype.getExpressionFromTree = function (node) {
        if (node === null) {
            return "";
        }
        else if (this.isOperator(node.item)) {

            return this.getExpressionFromTree(node.left)
                + node.item + this.getExpressionFromTree(node.right);
        }
        else {
            return node.item;
        }
    };
    // print the tree to ensure it has the correct structure
    ExpressionTree.prototype.print = function () {
        this.printDFS(this.head);
    };
    ExpressionTree.prototype.printDFS = function (node) {
        if (node === null) {
            return;
        }
        else {
            console.log(node.item);
            this.printDFS(node.left);
            this.printDFS(node.right);
        }
    };

    /**
     * This function takes a symbol/char and determines if it is
     * an operator or not.
     * @param {String} symbol - takes in a symbol(char of the expression)
     * @returns {boolean} - returns a boolean which represents whether or not
     * the symbol is an operator. Returns true if it is an operator, otherwise return false
     */
    ExpressionTree.prototype.isOperator = function (symbol) {
        return symbol === '^' || symbol === '*' || symbol === '/' || symbol === '+'
            || symbol === '-' || symbol === '(' || symbol === ')';
    };
    /**
     * This function takes a symbol/char and determines if it is
     * a number or not.
     * @param {String} symbol - takes in a symbol(char of the expression)
     * @returns {boolean} - returns a boolean which represents whether or not
     * the symbol is a number. Returns true if it is a number, otherwise return false
     */
    ExpressionTree.prototype.isOperand = function (item) {
        var LOWERNUMASCIIBOUND = 48;
        var UPPERNUMASCIIBOUND = 57;
        return LOWERNUMASCIIBOUND <= item.charCodeAt(0)
            && item.charCodeAt(0) <= UPPERNUMASCIIBOUND
            || item === "x" || item === "X";
    };
    return ExpressionTree;
}());
exports.ExpressionTree = ExpressionTree;

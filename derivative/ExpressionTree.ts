
import { TreeNode } from "./TreeNode";
export { ExpressionTree };
// An Expression tree object will hold
// a math expression in binary tree form
class ExpressionTree {

  head: TreeNode;

  // constructor takes the post fix expression and converts it into
  // a binary expression tree. This instance of the tree will hold the
  // head of the tree
  constructor(expression: Array<string>) {
    this.convertStringToTree(expression);
  }

  /**
  * Takes an array representation of a post fix math expression and constructs
  * a binary expression tree out of it.
  * @param {Array<string>} expression - post fix expression represented as an array of strings
  */
  convertStringToTree(expression: Array<string>) {

    let stack: Array<TreeNode> = [];
    for (let i = 0; i < expression.length; i++) {

      // create a new tree node of the current item
      let node = new TreeNode(expression[i]);
      if (this.isOperand(expression[i])) {
        stack.push(node);
      } else if (this.isOperator(expression[i])) {

        // take the last two items and set them as
        // the children of the current node
        let rightChild:TreeNode = stack.pop();
        let leftChild:TreeNode = stack.pop();
        node.left = leftChild;
        node.right = rightChild;
        stack.push(node);
      }
    }

    // the last node in the stack is the overall tree
    let overallTree = stack.pop();
    this.head = overallTree;

  }

  /**
  * Differentiates the tree by applying a recursive DFS algorithm and determining what 
  * actions to take / differentiation rule to apply based on what operator the 
  * current node is. 
  * @returns {string} - return the derivative of the tree as a string
  */
  differentiateTree(): string {

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
    let derivative:string = this.differentiateTreeDFS(this.head);
    return derivative;

  }

  // helper function of the function above
  differentiateTreeDFS(node:TreeNode): string {

    if (node === null) {
      return "";
    } else {
      let item:string = node.item;
      if (this.isOperand(item)) { // is a number
        if (item === "X" || item === "x") {
          return "1";
        } else {
          return "0";
        }
      } else {
        let derivativeLeft:string = this.differentiateTreeDFS(node.left);
        let derivativeRight:string = this.differentiateTreeDFS(node.right);
        let expressionLeft:string = this.getExpressionFromTree(node.left);
        let expressionRight:string = this.getExpressionFromTree(node.right);
        let derivative:string = "";
        if (item === "^") {
          let exponent:number = parseInt(node.right.item);
          let base:string = node.left.item;
          derivative = exponent + "*" + base + "^" + (exponent - 1);
          return derivative;
        } else if (item === "*") {
          // u'v + uv'
          derivative = derivativeLeft + "*" + expressionRight
          + "+"
          + expressionLeft + "*" + derivativeRight;
        } else if (item === "/") {
          // (u'v - uv')(v)^2
          derivative = "(" + derivativeLeft + "*" + expressionRight
          + "-" + expressionLeft + "*" + derivativeRight + ")"
          + "/" + "(" + expressionRight + ")^2";
        } else if (item === "+") {
          derivative = derivativeLeft + "+" + derivativeRight;
        } else if (item === "-") {
          derivative = derivativeLeft + "-" + derivativeRight;
        }
        return derivative;
      }
    }

  }

  /**
  * constructs the math expression using the given tree by
  * applying a recursive DFS algorithm
  * @returns {string} - returns a string representing the math expression
  * that the input tree represents
  */
  getExpressionFromTree(node:TreeNode):string {
    if (node === null) {
      return "";
    } else if (this.isOperand(node.item)) {
      return this.getExpressionFromTree(node.left)
      + node.item + this.getExpressionFromTree(node.right);
    } else {
      return node.item;
    }
  }

  // print the tree to ensure it has the correct structure
  print() {
    this.printDFS(this.head);
  }

  printDFS(node: TreeNode) {
    if (node === null) {
      return;
    } else {
      console.log(node.item);
      this.printDFS(node.left);
      this.printDFS(node.right);
    }
  }

  /**
   * This function takes a symbol/char and determines if it is
   * an operator or not.
   * @param {String} symbol - takes in a symbol(char of the expression)
   * @returns {boolean} - returns a boolean which represents whether or not
   * the symbol is an operator. Returns true if it is an operator, otherwise return false
   */
   isOperator(symbol: string) {
    return symbol === '^' || symbol === '*' || symbol === '/' || symbol === '+'
    || symbol === '-' || symbol === '(' || symbol === ')';
  }

  /**
   * This function takes a symbol/char and determines if it is
   * a number or not.
   * @param {String} symbol - takes in a symbol(char of the expression)
   * @returns {boolean} - returns a boolean which represents whether or not
   * the symbol is a number. Returns true if it is a number, otherwise return false
   */
   isOperand(item: string) {
    const LOWERNUMASCIIBOUND = 48;
    const UPPERNUMASCIIBOUND = 57;
    return LOWERNUMASCIIBOUND <= item.charCodeAt(0)
    && item.charCodeAt(0) <= UPPERNUMASCIIBOUND
    || item === "x" || item === "X";
  }

}

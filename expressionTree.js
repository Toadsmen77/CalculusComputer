class ExpressionTree {

  #tree = new TreeNode();

  /**
   * code that runs when a new expression tree object is instantiated
   * @param {array} postFixExpression - array representing
   * the post fix expression
   */
  constructor(postFixExpression) {
    this.constructExpressionTree(postFixExpression.getFunctionAsArray());
  }

  /**
   * converts the post fix expression array
   * into an expression tree. We want the expression
   * to be in tree form because it makes differentiating
   * it easier
   * @param {array} expression - array representing
   * the post fix expression
   */
  constructExpressionTree(expression) {

    let stack = [];

    for (let i = 0; i < expression.length; i++) {
      let symbol = expression[i];
      let symbolNode = new TreeNode(symbol);
      if (this.isNum(symbol)) {
        stack.push(symbolNode);
      } else if (this.isOperator(symbol)) {
        try {
          let lastNode = stack.pop();
          let secondLastNode = stack.pop();
          symbolNode.left = secondLastNode;
          symbolNode.right = lastNode;
          stack.push(symbolNode);
        } catch(error) {
          alert("Expression is invalid");
          break;
        }
      }
    }

    /**
     * Once we've finished iterating through the expression array,
     * the only thing left in the stack should be the head of the
     * expression tree
     */
    try {
      this.#tree = stack.pop();
    } catch(error) {
      alert("Expression is invalid");
    }
  }

  /**
   * traverse through the tree and apply the differentiation rules
   * @returns {String} - return a String representing the
   * differentiated function
   */
  differentiateTree() {




  }

  /**
   * function that prints tree(for testing purposes)
   */
  printTree() {
    this.traverseTreeAndPrint(this.#tree);
  }

  /**
   * traverse tree dfs style and print nodes
   * @param {TreeNode} node - this is a recursive traversal method,
   * and "node" represents the current node in our traversal
   */
  traverseTreeAndPrint(node) {
    if (node === null) {
      return;
    } else {
      console.log(node.item);
      this.traverseTreeAndPrint(node.left);
      this.traverseTreeAndPrint(node.right);
    }
  }

  /**
   * This function takes a symbol/char and determines if it is
   * a number or not.
   * @param {char} symbol - takes in a symbol(char of the expression)
   * @returns {boolean} - returns a boolean which represents whether or not
   * the symbol is a number. Returns true if it is a number, otherwise return false
   */
  isNum(symbol) {
    return 48 <= symbol.charCodeAt() && symbol.charCodeAt() <= 57;
  }

  /**
   * This function takes a symbol/char and determines if it is
   * an operator or not.
   * @param {char} symbol - takes in a symbol(char of the expression)
   * @returns {boolean} - returns a boolean which represents whether or not
   * the symbol is an operator. Returns true if it is an operator, otherwise return false
   */
  isOperator(symbol) {
    return symbol === '*' || symbol === '/' || symbol === '+' || symbol === '-'
    || symbol === '(' || symbol === ')';
  }

}

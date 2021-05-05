/**
 * Class/blueprint for nodes of our expression tree
 * All nodes hold String data types
 */
class TreeNode {

  constructor(item) {
    this.item = item;
    this.left = null;
    this.right = null;
  }

  getItem() {
    return this.item;
  }

}

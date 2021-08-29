export { TreeNode }
/**
 * Class/blueprint for nodes of our expression tree
 * All nodes hold String data which represent operators
 * and operands of math expressions
 */
class TreeNode {
  item: string;
  left: TreeNode;
  right: TreeNode;
  constructor(item: string) {
    this.item = item;
    this.left = null;
    this.right = null;
  }
}

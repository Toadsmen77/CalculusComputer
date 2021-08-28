"use strict";
exports.__esModule = true;
exports.TreeNode = void 0;
/**
 * Class/blueprint for nodes of our expression tree
 * All nodes hold String data types
 */
var TreeNode = /** @class */ (function () {
    function TreeNode(item) {
        this.item = item;
        this.left = null;
        this.right = null;
    }
    return TreeNode;
}());
exports.TreeNode = TreeNode;

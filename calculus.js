
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
    let postFixExpression = new PostFixExpression(infixExpression);

    let expressionTree = new ExpressionTree(postFixExpression);
    let derivative = expressionTree.differentiateTree();





  }

  function id(elementID) {
    return document.getElementById(elementID);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

})();

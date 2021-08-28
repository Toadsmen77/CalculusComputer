
// tsc -p tsconfig.json <- transpile TS to JS
"use strict";

(function() {

  window.addEventListener("load", init); // listen for DOM to be loaded for js to start

  /**
   * This function checks if the button to initiate the
   * calculator is clicked. If so, it initiates the
   * actual computer functions
   */
  async function init() {
    let integrateButton = id("integrate-button");
    integrateButton.addEventListener("click", computeIntegral);
  }

  /**
   * compute/approximate the value of the definite integral
   * using numerical integration(Simpson's rule)
   */
  async function computeIntegral() {

    const N:number = 20;
    let mathFunction = id("expression").value;
    let leftBound: number = parseInt(id("left-bound").value);
    let rightBound: number = parseInt(id("right-bound").value);
    let negativeIntegral: boolean = false;

    // integral is going backwards, so reverse the
    if (rightBound < leftBound) {
      negativeIntegral = true;
    }

    let deltaX: number = (rightBound - leftBound) / N;
    let x: number = leftBound;

    let approximatedIntegral: number = 0;
    let outputValue: number = await computeFunction(mathFunction, x);
    approximatedIntegral += outputValue;
    x += deltaX;

    for (let i = 1; i < N; i++) {
      let indexIsOdd:boolean = i % 2 == 1;
      outputValue = await computeFunction(mathFunction, x);
      if (indexIsOdd) {
        approximatedIntegral += 4 * outputValue;
      } else {
        approximatedIntegral += 2 * outputValue;
      }
      x += deltaX;
    }

    outputValue = await computeFunction(mathFunction, x);
    approximatedIntegral += outputValue;
    approximatedIntegral *= deltaX / 3;

    if (negativeIntegral) {
      approximatedIntegral *= -1;
    }

    displayResult(mathFunction, approximatedIntegral.toString());

    console.log(approximatedIntegral);
  }

  /**
   * Display that bad boi
   * @param integral - string represenation of original integral input
   * @param integralValue - string representation of the answer
   */
  function displayResult(integral: string, integralValue: string) {
    let divWithResult: HTMLElement = document.createElement("div");
    let leftBound: string = id("left-bound").textContent;
    let rightBound: string = id("right-bound").textContent;
    divWithResult.textContent = integral + "; " + leftBound + " -> " + rightBound
    + " = " + integralValue;
    console.log(divWithResult.textContent);
    id("integrals").appendChild(divWithResult);
  }

  async function computeFunction(mathFunction: string, x: number): Promise<number> {

    const URL: string = "http://api.mathjs.org/v4/?expr=";
    // replace all instances of x in the function with the number,
    // then just compute the expression by calling the mathjs API
    let expressionPluggedIn: string = encodeURIComponent(plugInX(mathFunction, x));

    // form of API call: http://api.mathjs.org/v4/?expr=2*(7-3)
    let promiseOutput = await fetch(URL + expressionPluggedIn);
    let output = await promiseOutput.text();
    return parseInt(output);
  }

  /**
   * Replaces all instances of "x" in the math function with the input
   * we want to plug in
   */
  function plugInX(mathFunction: string, x: number): string {

    let finalExpression: string = "";

    for (let i = 0; i < mathFunction.length; i++) {
      let currChar: string = mathFunction.charAt(i);
      if (currChar === "x" || currChar == "X") {
        finalExpression = finalExpression.concat(x.toString());
      } else {
        finalExpression = finalExpression.concat(currChar);
      }
    }

    return finalExpression;
  }

  /**
   * @param {String} elementID - represents the
   * html element id that the function caller wants to get
   * @returns DOM/HTML element specified by "elementID"
   */
  function id(elementID: string): HTMLInputElement {
    return <HTMLInputElement>document.getElementById(elementID);
  }

  /**
   * Returns the DOM/HTML element which the caller of
   * this function wants
   * @param {String} selector - tag selector
   * @returns {Element} - DOM element that caller wants
   */
  function qs(selector: string): HTMLInputElement {
    return document.querySelector(selector);
  }

})();
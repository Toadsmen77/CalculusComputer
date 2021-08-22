"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function () {
    window.addEventListener("load", init); // listen for DOM to be loaded for js to start
    /**
     * This function checks if the button to initiate the
     * calculator is clicked. If so, it initiates the
     * actual computer functions
     */
    function init() {
        return __awaiter(this, void 0, void 0, function* () {
            let integrateButton = id("integrate-button");
            let outputValue = yield computeFunction("x^2+sin(x)", 2);
            console.log("ye: " + outputValue);
            //integrateButton.addEventListener("click", computeIntegral);
        });
    }
    /**
     * compute/approximate the value of the definite integral
     * using numerical integration(Simpson's rule)
     */
    function computeIntegral() {
        return __awaiter(this, void 0, void 0, function* () {
            const N = 5;
            let mathFunction = id("expression").value;
            let leftBound = parseInt(id("left-bound").value);
            let rightBound = parseInt(id("right-bound").value);
            let negativeIntegral = false;
            // integral is going backwards, so reverse the
            if (rightBound < leftBound) {
                negativeIntegral = true;
            }
            let deltaX = (rightBound - leftBound) / N;
            let x = leftBound;
            let approximatedIntegral = 0;
            let outputValue = yield computeFunction(mathFunction, x);
            for (let i = 1; i < N - 2; i++) {
                let indexIsOdd = i % 2 == 1;
                outputValue = yield computeFunction(mathFunction, x);
                if (indexIsOdd) {
                    approximatedIntegral += 4 * outputValue;
                }
                else {
                    approximatedIntegral += 2 * outputValue;
                }
                x += deltaX;
            }
            outputValue = yield computeFunction(mathFunction, x);
            approximatedIntegral += outputValue;
            approximatedIntegral *= deltaX / 3;
            if (negativeIntegral) {
                approximatedIntegral *= -1;
            }
            displayResult(approximatedIntegral.toString());
        });
    }
    /**
     * Display that bad boi
     * @param integralValue - string representation of the answer
     */
    function displayResult(integralValue) {
        let divWithResult = document.createElement("div");
        divWithResult.textContent = integralValue;
        id("log").prepend(divWithResult);
    }
    function computeFunction(mathFunction, x) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = "http://api.mathjs.org/v4/?expr=";
            // replace all instances of x in the function with the number,
            // then just compute the expression by calling the mathjs API
            let expressionPluggedIn = plugInX(mathFunction, x);
            // form of API call: http://api.mathjs.org/v4/?expr=2*(7-3)
            let promiseOutput = yield fetch(URL + expressionPluggedIn);
            let output = yield promiseOutput.text();
            return parseInt(output);
        });
    }
    /**
     * Replaces all instances of "x" in the math function with the input
     * we want to plug in
     */
    function plugInX(mathFunction, x) {
        let finalExpression = "";
        for (let i = 0; i < mathFunction.length; i++) {
            let currChar = mathFunction.charAt(i);
            if (currChar === "x" || currChar == "X") {
                finalExpression = finalExpression.concat(x.toString());
            }
            else if (currChar === " ") {
                finalExpression = finalExpression.concat("%20");
            }
            else {
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
    function id(elementID) {
        return document.getElementById(elementID);
    }
})();
//# sourceMappingURL=integral-calculator.js.map
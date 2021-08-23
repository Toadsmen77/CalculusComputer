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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function () {
    window.addEventListener("load", init); // listen for DOM to be loaded for js to start
    /**
     * This function checks if the button to initiate the
     * calculator is clicked. If so, it initiates the
     * actual computer functions
     */
    function init() {
        return __awaiter(this, void 0, void 0, function () {
            var integrateButton, outputValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        integrateButton = id("integrate-button");
                        return [4 /*yield*/, computeFunction("x+1", 2)];
                    case 1:
                        outputValue = _a.sent();
                        console.log("ye: " + outputValue);
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * compute/approximate the value of the definite integral
     * using numerical integration(Simpson's rule)
     */
    function computeIntegral() {
        return __awaiter(this, void 0, void 0, function () {
            var N, mathFunction, leftBound, rightBound, negativeIntegral, deltaX, x, approximatedIntegral, outputValue, i, indexIsOdd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        N = 10;
                        mathFunction = id("expression").value;
                        leftBound = parseInt(id("left-bound").value);
                        rightBound = parseInt(id("right-bound").value);
                        negativeIntegral = false;
                        // integral is going backwards, so reverse the
                        if (rightBound < leftBound) {
                            negativeIntegral = true;
                        }
                        deltaX = (rightBound - leftBound) / N;
                        x = leftBound;
                        approximatedIntegral = 0;
                        return [4 /*yield*/, computeFunction(mathFunction, x)];
                    case 1:
                        outputValue = _a.sent();
                        i = 1;
                        _a.label = 2;
                    case 2:
                        if (!(i < N - 2)) return [3 /*break*/, 5];
                        indexIsOdd = i % 2 == 1;
                        return [4 /*yield*/, computeFunction(mathFunction, x)];
                    case 3:
                        outputValue = _a.sent();
                        if (indexIsOdd) {
                            approximatedIntegral += 4 * outputValue;
                        }
                        else {
                            approximatedIntegral += 2 * outputValue;
                        }
                        x += deltaX;
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, computeFunction(mathFunction, x)];
                    case 6:
                        outputValue = _a.sent();
                        approximatedIntegral += outputValue;
                        approximatedIntegral *= deltaX / 3;
                        if (negativeIntegral) {
                            approximatedIntegral *= -1;
                        }
                        displayResult(approximatedIntegral.toString());
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Display that bad boi
     * @param integralValue - string representation of the answer
     */
    function displayResult(integralValue) {
        var divWithResult = document.createElement("div");
        divWithResult.textContent = integralValue;
        id("log").prepend(divWithResult);
    }
    function computeFunction(mathFunction, x) {
        return __awaiter(this, void 0, void 0, function () {
            var URL, expressionPluggedIn, promiseOutput, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        URL = "http://api.mathjs.org/v4/?expr=";
                        expressionPluggedIn = plugInX(mathFunction, x);
                        return [4 /*yield*/, fetch(URL + expressionPluggedIn)];
                    case 1:
                        promiseOutput = _a.sent();
                        return [4 /*yield*/, promiseOutput.text()];
                    case 2:
                        output = _a.sent();
                        return [2 /*return*/, parseInt(output)];
                }
            });
        });
    }
    /**
     * Replaces all instances of "x" in the math function with the input
     * we want to plug in
     */
    function plugInX(mathFunction, x) {
        var finalExpression = "";
        for (var i = 0; i < mathFunction.length; i++) {
            var currChar = mathFunction.charAt(i);
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

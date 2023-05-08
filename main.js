/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "M": () => (/* binding */ errorText)
});

;// CONCATENATED MODULE: ./src/js/checkCard.js
function Moon_Algorithm(setValue) {
  let ch = 0;
  const num = String(setValue).replace(/\D/g, "");
  const isOdd = num.length % 2 !== 0;
  if ("" === num) return false;
  for (let i = 0; i < num.length; i++) {
    let n = parseInt(num[i], 10);
    ch += (isOdd | 0) === i % 2 && 9 < (n *= 2) ? n - 9 : n;
  }
  return 0 === ch % 10;
}
;// CONCATENATED MODULE: ./src/js/CheckBanckSystem.js

class CheckBanckSystem {
  constructor() {
    this.american_express = /^3[47][0-9]{13}$/;
    this.diners_club = /^36[0-9]{12}$/;
    this.maestro = /^(5018|5020|5038|5893|6304|6759|6761|6762|6763)[0-9]{12,15}$/;
    this.JCB = /^(352[8-9]|35[3-8][0-9])[0-9]{12,15}$/;
    this.masterCard = /^(?:(?:22[2-9]|2[3-6]\d|27[0-1])\d{3}[0-9]{10}|5[1-5][0-9]{14})$/;
    this.discover = /^(6011[0-9]{12,15}|65[0-9]{14,17}|64[4-9][0-9]{13,16}|6229(2[5-9]|[3-8][0-9]|9[0-5])[0-9]{10,13})$/;
    this.mir = /^3[0-9]{16}$/;
  }
  checker(inputValue) {
    if (!Moon_Algorithm(inputValue)) {
      return "unknown";
    }
    if (this.mir.test(inputValue)) {
      return "mir";
    } else if (this.american_express.test(inputValue)) {
      return "american_express";
    } else if (this.diners_club.test(inputValue)) {
      return "dinersclub";
    } else if (this.discover.test(inputValue)) {
      return "discover";
    } else if (this.JCB.test(inputValue)) {
      return "jcb";
    } else if (this.maestro.test(inputValue)) {
      return "maestro";
    } else if (this.masterCard.test(inputValue)) {
      return "mastercard";
    } else if (inputValue.toString().startsWith("4")) {
      if (inputValue.length === 13 || inputValue.length === 16 || inputValue.length === 19) {
        return "visa";
      }
    }
    return "unknown";
  }
}
;// CONCATENATED MODULE: ./src/js/CardController.js

class CardController {
  constructor() {
    this.cards = [...document.querySelectorAll(".card")];
    this.button = document.querySelector("button");
  }
  highlightCard(card_name) {
    errorText.textContent = "";
    const card = this.cards.find(img => img.classList.contains(card_name));
    card.classList.add("active_card");
    this.button.disabled = false;
  }
  removeCardsClass() {
    const card = this.cards.find(img => img.classList.contains("active_card"));
    if (card) {
      card.classList.remove("active_card");
    }
  }
}
;// CONCATENATED MODULE: ./src/index.js



const inputElem = document.querySelector("input");
const checkBanckSystem = new CheckBanckSystem();
const cardController = new CardController();
const errorText = document.querySelector(".error_text");
inputElem.addEventListener("input", () => {
  cardController.removeCardsClass();
  cardController.button.disabled = true;
  const promise = new Promise(resolve => {
    resolve(checkBanckSystem.checker(inputElem.value));
  });
  promise.then(card_name => {
    if (card_name === "unknown") {
      errorText.textContent = "Invalid card number!";
      return;
    }
    cardController.highlightCard(card_name);
  });
});
/******/ })()
;
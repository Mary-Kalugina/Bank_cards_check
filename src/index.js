import CheckBanckSystem from "./js/CheckBanckSystem";
import CardController from "./js/CardController";
import "./css/style.css";

const inputElem = document.querySelector("input");
const checkBanckSystem = new CheckBanckSystem();
const cardController = new CardController();
export const errorText = document.querySelector(".error_text");

inputElem.addEventListener("input", () => {
  cardController.removeCardsClass();
  cardController.button.disabled = true;
  const promise = new Promise((resolve) => {
    resolve(checkBanckSystem.checker(inputElem.value));
  });

  promise.then((card_name) => {
    if (card_name === "unknown") {
      errorText.textContent = "Invalid card number!";
      return;
    }
    cardController.highlightCard(card_name);
  });
});

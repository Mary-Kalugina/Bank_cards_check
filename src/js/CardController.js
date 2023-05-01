import { errorText } from "../index";

export default class CardController {
  constructor() {
    this.cards = [...document.querySelectorAll(".card")];
    this.button = document.querySelector("button");
  }
  highlightCard(card_name) {
    errorText.textContent = "";
    const card = this.cards.find((img) => img.classList.contains(card_name));
    card.classList.add("active_card");
    this.button.disabled = false;
  }

  removeCardsClass() {
    const card = this.cards.find((img) =>
      img.classList.contains("active_card")
    );
    if (card) {
      card.classList.remove("active_card");
    }
  }
}

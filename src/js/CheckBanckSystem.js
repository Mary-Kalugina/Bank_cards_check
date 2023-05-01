import Moon_Algorithm from "./checkCard";

export default class CheckBanckSystem {
  constructor() {
    this.american_express = /^3[47][0-9]{13}$/;
    this.diners_club = /^36[0-9]{12}$/;
    this.maestro =
      /^(5018|5020|5038|5893|6304|6759|6761|6762|6763)[0-9]{12,15}$/;
    this.JCB = /^(352[8-9]|35[3-8][0-9])[0-9]{12,15}$/;
    this.masterCard =
      /^(?:(?:22[2-9]|2[3-6]\d|27[0-1])\d{3}[0-9]{10}|5[1-5][0-9]{14})$/;
    this.discover =
      /^(6011[0-9]{12,15}|65[0-9]{14,17}|64[4-9][0-9]{13,16}|6229(2[5-9]|[3-8][0-9]|9[0-5])[0-9]{10,13})$/;
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
      if (
        inputValue.length === 13 ||
        inputValue.length === 16 ||
        inputValue.length === 19
      ) {
        return "visa";
      }
    }
    return "unknown";
  }
}

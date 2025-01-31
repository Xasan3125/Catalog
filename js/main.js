import createAccodrion from "./components/accordion.js";
import createBurger from "./components/burger.js";
import citySelection from "./components/citySelection.js";
import addCards from "./components/Card.js";
import filterAndSortCard from "./components/filterAndSortCards.js";
import slider from "./components/slider.js";
import sendForm from "./components/sendForm.js";
import basket from "./components/basket.js";
import pagination from "./components/pagination.js";

window.addEventListener("DOMContentLoaded", () => {
  citySelection();
  createAccodrion();
  createBurger();
  filterAndSortCard();
  slider();
  sendForm();
  basket();
  pagination();
});

import fetchData from "../components/fetchData.js";
import pagination from "../components/pagination.js";

let originalData = [];
let filteredData = [];
const checkBoxEl = document.querySelectorAll("[name=type]");
const radioBtnEl = document.querySelectorAll("[name=status]");

function filterCard() {
  const resetBtn = document.querySelector(".catalog-form__reset");

  resetBtn.addEventListener("click", () => {
    filteredData = [...originalData];
    pagination(filteredData);
  });
  radioBtnEl.forEach((btn) => {
    btn.addEventListener("change", () => {
      filterItems();
    });
  });

  checkBoxEl.forEach((checkbox) => {
    const itemCountEl = checkbox
      .closest(".custom-checkbox")
      .querySelector(".custom-checkbox__count");

    originalData.forEach((card) => {
      if (card.type.includes(checkbox.value)) {
        itemCountEl.textContent = `${
          filteredData.filter((item) => item.type.includes(checkbox.value))
            .length
        }`;
      }
    });

    checkbox.addEventListener("change", () => {
      filterItems();
    });
  });
}

function filterItems() {
  const checkedCheckbox = Array.from(checkBoxEl)
    .filter((box) => box.checked)
    .map((box) => box.value);

  const radioBtnSelected = Array.from(radioBtnEl)
    .filter((radio) => radio.checked)
    .map((radio) => radio.value);

  filteredData = originalData.filter((card) => {
    const typeMatch = checkedCheckbox.length
      ? checkedCheckbox.some((type) => card.type.includes(type))
      : true;

    const statusMatch =
      radioBtnSelected.length === 0 || radioBtnSelected.includes("all-item")
        ? true
        : Object.values(card.availability).some(
            (availability) => availability > 0
          );

    return typeMatch && statusMatch;
  });

  pagination(filteredData);
}

function sortArr() {
  const listEl = document.querySelector(".catalog__sort-select");

  listEl.addEventListener("change", () => {
    switch (listEl.value) {
      case "price-min":
        filteredData.sort((a, b) => {
          return a.price.new - b.price.new;
        });
        break;
      case "price-max":
        filteredData.sort((a, b) => {
          return b.price.new - a.price.new;
        });
        break;
      case "rating-max":
        filteredData.sort((a, b) => {
          return a.rating - b.rating;
        });
        break;
    }
    pagination(filteredData);
  });
}
export default async function () {
  originalData = await fetchData();
  filteredData = [...originalData];
  filterCard();
  sortArr();
}

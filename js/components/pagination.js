import fetchData from "../components/fetchData.js";
import { renderCard } from "../components/Card.js";

let originalData = [];
let paginationData = [];

const itemsPerPage = 6;
let currentPage = 1;

function getPaginatedData(data, page, itemsPerPage) {
  if (data.length <= 6 && currentPage > 1) {
    page = 1;
  }
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  console.log(currentPage);
  return data.slice(startIndex, endIndex);
}

function getPaginationBtn(totalItems, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const catalogPaginationEl = document.querySelector(".catalog__pagination");
  catalogPaginationEl.innerHTML = "";
  for (let i = 1; i < totalPages + 1; i++) {
    const paginationEL = document.createElement("li");
    paginationEL.classList.add("catalog__pagination-item");

    const paginationBtn = document.createElement("button");
    paginationBtn.classList.add("catalog__pagination-link");
    paginationBtn.textContent = i;

    paginationBtn.addEventListener("click", () => {
      currentPage = i;
      update(originalData);
    });

    paginationEL.append(paginationBtn);
    catalogPaginationEl.append(paginationEL);
  }
}

async function update(data) {
  if (!data) {
    originalData = await fetchData();
    data = originalData;
  } else {
    originalData = [...data];
  }

  paginationData = getPaginatedData(data, currentPage, itemsPerPage);
  getPaginationBtn(data.length, itemsPerPage);
  renderCard(paginationData);
}

export default update;

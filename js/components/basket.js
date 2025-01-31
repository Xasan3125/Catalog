import fetchData from "../components/fetchData.js";

let products = [];
let count = 0;

function openBasket() {
  const basketOpenBtn = document.querySelector(".header__user-btn");
  const basketWrapper = document.querySelector(".basket");
  document.addEventListener("click", (e) => {
    if (
      !basketWrapper.contains(e.target) &&
      !basketOpenBtn.contains(e.target) &&
      !e.target.classList.contains("btn--icon")
    ) {
      basketWrapper.classList.remove("basket--active");
    }
  });

  basketOpenBtn.addEventListener("click", () => {
    basketWrapper.classList.toggle("basket--active");
  });
}
function basketCount(count) {
  document.querySelector(".header__user-count").textContent = count;
}

function addGoToBasketBtn() {
  const addBasketBtn = document.createElement("a");
  addBasketBtn.classList.add("basket__link", "btn");
  addBasketBtn.textContent = "Перейти к оформлению";
  addBasketBtn.href = "#";
  return addBasketBtn;
}

function addToBasket(product) {
  const basketUlEl = document.querySelector(".basket__list");

  const basketWrapper = document.querySelector(".basket");

  const basketLiEl = document.createElement("li");
  basketLiEl.classList.add("basket__item");
  basketLiEl.setAttribute("data-id", product.id);

  basketLiEl.innerHTML = `
                <div class="basket__img">
                  <img src="${product.image}" alt="Фотография товара" height="60" width="60">
                </div>
                <span class="basket__name">${product.name}</span>
                <span class="basket__price">${product.price.new} руб</span>
                <button class="basket__item-close" type="button">
                  <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-close"></use>
                  </svg>
                </button>
              `;
  basketWrapper.style.overflowY =
    basketUlEl.children.length > 6 ? "scroll" : "auto";

  basketUlEl.append(basketLiEl);
}

function removeFromBasket(btn, card) {
  const cardEl = btn.closest(".basket__item");
  const cardId = Number(cardEl.dataset.id);
  const indexToRemove = card.findIndex((item) => item.id === cardId);

  if (indexToRemove !== -1) {
    card.splice(indexToRemove, 1);
    count--;
    basketCount(count);
    cardEl.remove();
    if (card.length == 0) {
      document.querySelector(".basket__empty-block").style.display = "block";

      document.querySelector(".basket__link").remove();
    }
  }
}

function basket() {
  openBasket();

  let card = [];
  basketCount(count);

  const basketWrapper = document.querySelector(".basket");
  const addBasketBtn = addGoToBasketBtn();

  const emptyBasketEl = document.querySelector(".basket__empty-block");

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn--icon")) {
      const cardEl = event.target.closest(".product-card");
      const cardId = Number(cardEl.dataset.id);

      const product = products.find((item) => item.id === cardId);
      card.push(product);
      addToBasket(product);

      count++;
      basketCount(count);

      emptyBasketEl.style.display = "none";

      basketWrapper.append(addBasketBtn);
    }

    if (event.target.classList.contains("main-menu__icon")) {
      removeFromBasket(event.target, card);
    }
  });
}

export default async function () {
  products = await fetchData();
  basket();
}

import fetchData from "../components/fetchData.js";
import createTooltips from "../components/addTippy.js";

class Card {
  constructor(id, name, price, image, availability, type, rating, goodsOfDay) {
    this._id = id;
    this._name = name;
    this._oldPrice = price.old ?? 0;
    this._newPrice = price.new ?? 0;
    this._image = image;
    this._availability = availability;
    this._type = type;
    this._rating = rating;
    this._goodsOfDay = goodsOfDay;
  }

  renderCards() {
    const catalogItemEl = document.createElement("li");
    catalogItemEl.classList.add("catalog__item");

    catalogItemEl.innerHTML = `
              <div class="product-card" data-id=${this._id}>
                <div class="product-card__visual">
                  <img class="product-card__img" src="${this._image}" height="436" width="290"
                       alt="Изображение товара">
                  <div class="product-card__more">
                    <a href="#" class="product-card__link btn btn--icon">
                      <span class="btn__text">В корзину</span>
                      <svg width="24" height="24" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-basket"></use>
                      </svg>
                    </a>
                    <a href="#" class="product-card__link btn btn--secondary">
                      <span class="btn__text">Подробнее</span>
                    </a>
                  </div>
                </div>
                <div class="product-card__info">
                  <h2 class="product-card__title">${this._name}</h2>
                  <span class="product-card__old">
                  <span class="product-card__old-number">${this._oldPrice}</span>
                  <span class="product-card__old-add">₽</span>
                </span>
                  <span class="product-card__price">
                  <span class="product-card__price-number">${this._newPrice}</span>
                  <span class="product-card__price-add">₽</span>
                </span>
                  <div class="product-card__tooltip tooltip">
                    <button class="tooltip__btn" aria-label="Показать подсказку" type="button">
                      <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-i"></use>
                      </svg>
                    </button>
                    <div class="tooltip__content">
                      <span class="tooltip__text">Наличие товара по городам:</span>
                      <ul class="tooltip__list">
                        <li class="tooltip__item">
                          <span class="tooltip__text">Москва: <span class="tooltip__count">${this._availability.moscow}</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Оренбург: <span class="tooltip__count">${this._availability.orenburg}</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${this._availability.saintPetersburg}</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            `;

    return catalogItemEl;
  }
  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get oldPrice() {
    return this._oldPrice;
  }

  get newPrice() {
    return this._newPrice;
  }

  get image() {
    return this._image;
  }

  get availability() {
    return this._availability;
  }

  get type() {
    return this._type;
  }

  get rating() {
    return this._rating;
  }

  get goodsOfDay() {
    return this._goodsOfDay;
  }

  set id(value) {
    this._id = value;
  }

  set name(value) {
    this._name = value;
  }

  set oldPrice(value) {
    this._oldPrice = value;
  }

  set newPrice(value) {
    this._newPrice = value;
  }

  set image(value) {
    this._image = value;
  }

  set availability(value) {
    this._availability = value;
  }

  set type(value) {
    this._type = value;
  }

  set rating(value) {
    this._rating = value;
  }

  set goodsOfDay(value) {
    this._goodsOfDay = value;
  }
}

export const renderCard = (arr) => {
  const cardsListEl = document.querySelector(".catalog__list");
  cardsListEl.innerHTML = "";
  if (!cardsListEl) {
    console.error("Ошибка: Элемент .catalog__list не найден в DOM");
    return;
  }

  arr.forEach((card) => {
    const catalogItemEl = new Card(
      card.id,
      card.name,
      card.price,
      card.image,
      card.availability,
      card.type,
      card.rating,
      card.goodsOfDay
    );
    cardsListEl.append(catalogItemEl.renderCards());
  });
  createTooltips();
};

async function addCards() {
  const data = await fetchData();
  renderCard(data);
}

export default addCards;

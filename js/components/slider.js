import fetchData from "../components/fetchData.js";

const initialSwiper = () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
      nextEl: ".day-products__navigation-btn--next",
      prevEl: ".day-products__navigation-btn--prev",
    },
  });
  return swiper;
};

const renderSlider = (arr) => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const newArr = arr.filter((item) => {
    if (item.goodsOfDay === true) {
      return item;
    }
  });
  newArr.forEach((card) => {
    const listEl = document.createElement("li");
    listEl.classList.add("swiper-slide");
    listEl.innerHTML = `<div class="product-card product-card--small" data-id=${card.id}>
                <div class="product-card__visual">
                  <img class="product-card__img" src="${card.image}" height="344" width="290"
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
                  <h2 class="product-card__title">${card.name}</h2>
                  <span class="product-card__old">
                    <span class="product-card__old-number">${card.price.old}</span>
                    <span class="product-card__old-add">₽</span>
                  </span>
                  <span class="product-card__price">
                    <span class="product-card__price-number">${card.price.new}</span>
                    <span class="product-card__price-add">₽</span>
                  </span>
                  <div class="product-card__tooltip tooltip">
                    <button class="tooltip__btn" aria-label="Показать подсказку">
                      <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-i"></use>
                      </svg>
                    </button>
                    <div class="tooltip__content">
                      <span class="tooltip__text">Наличие товара по городам:</span>
                      <ul class="tooltip__list">
                        <li class="tooltip__item">
                          <span class="tooltip__text">Москва: <span class="tooltip__count">454</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Оренбург: <span class="tooltip__count">381</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">15</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>`;
    swiperWrapper.append(listEl);
  });
};

export default async function () {
  const data = await fetchData();
  initialSwiper();
  renderSlider(data);
}

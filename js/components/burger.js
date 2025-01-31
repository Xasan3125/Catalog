export default function createBurger() {
  const btnEl = document.querySelector(".header__catalog-btn");
  const mainMenuEl = document.querySelector(".main-menu");
  const closeMenuEl = document.querySelector(".main-menu__close");
  btnEl.addEventListener("click", () => {
    mainMenuEl.classList.toggle("main-menu--active");
  });
  closeMenuEl.addEventListener("click", () => {
    mainMenuEl.classList.remove("main-menu--active");
  });
}

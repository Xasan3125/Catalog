export default function createAccodrion() {
  const btnEl = document.querySelectorAll(".accordion__btn");
  btnEl.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("accordion__btn--active")) {
        btn.classList.remove("accordion__btn--active");
      } else {
        btnEl.forEach((button) => {
          button.classList.remove("accordion__btn--active");
        });
        btn.classList.toggle("accordion__btn--active");
      }
    });
  });
}

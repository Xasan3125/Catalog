export default function citySelection() {
  const city = localStorage.getItem("city");

  const btnCitySelectEl = document.querySelector(".location__city");

  const btnCityEl = document.querySelectorAll(".location__subitem");
  const btnCityNameEl = document.querySelector(".location__city-name");
  if (city) btnCityNameEl.textContent = city;

  localStorage.setItem("city", btnCitySelectEl.textContent);

  btnCityEl.forEach((btn) => {
    btn.addEventListener("click", () => {
      btnCityNameEl.textContent = btn.textContent;
      localStorage.setItem("city", btn.textContent);

      btnCitySelectEl.classList.remove("location__city--active");
    });
  });

  btnCitySelectEl.addEventListener("click", () => {
    btnCitySelectEl.classList.toggle("location__city--active");
  });
}

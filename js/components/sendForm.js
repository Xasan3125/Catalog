const address = "https://httpbin.org/post";

function createElement(tag, classCSS, text = "") {
  const tegEl = document.createElement(tag);
  tegEl.classList.add(classCSS);
  tegEl.textContent = text;
  return tegEl;
}

function renderModal(status = "", message = "") {
  const modalEl = createElement("div", "modal");
  modalEl.style.display = "flex";

  const modalWrapEl = createElement("div", "modal__block");

  const modalCloseBtnEl = createElement(
    "button",
    "modal__close-btn",
    "Закрыть"
  );

  modalCloseBtnEl.addEventListener("click", () => {
    modalEl.remove();
  });

  const modalTextContentEl = createElement("p", "modal__text", message);

  modalWrapEl.append(modalTextContentEl, modalCloseBtnEl);

  window.onclick = function (event) {
    if (event.target == modalEl) {
      modalEl.remove();
    }
  };

  modalEl.append(modalWrapEl);

  return document.body.append(modalEl);
}

export default function sendForm() {
  const formEl = document.querySelector(".questions__form");
  formEl.action = address;

  const validate = new JustValidate(formEl);
  validate
    .addField(document.querySelector("#name"), [
      {
        rule: "required",
        errorMessage: "Введите ваше имя",
      },
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Минимальная длина три символа",
      },
      {
        rule: "maxLength",
        value: 20,
        errorMessage: "Максимальная длина двадцать символа",
      },
    ])
    .addField(document.querySelector("#email"), [
      {
        rule: "required",
        errorMessage: "Введите вашу почту",
      },
      {
        rule: "email",
        errorMessage: "Почта введена неверно",
      },
    ])
    .addField(document.querySelector("#agree"), [
      {
        rule: "required",
        errorMessage: "Согласие обязательно",
      },
    ])
    .onSuccess((e) => {
      e.preventDefault();
      const formData = new FormData(formEl);

      let isSuccessful = false;

      const timeout = setTimeout(() => {
        if (!isSuccessful) {
          renderModal("", "Ошибка: Не удалось отправить данные");
        }
      }, 5000);

      fetch(address, {
        method: "POST",
        body: formData,
      })
        .then((data) => {
          clearTimeout(timeout);
          isSuccessful = true;
          renderModal(data.status, "Данные успешно отправлены!");
          formEl.reset();
        })
        .catch(() => {
          clearTimeout(timeout);
        });
    });
}

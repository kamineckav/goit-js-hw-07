import { galleryItems } from "./gallery-items.js";
// Change code below this line
const container = document.querySelector(".gallery");
container.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
container.addEventListener("click", onClick);

function onClick(evt) {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) {
    return;
  }
  const currentPhoto = evt.target;
  const originalPhoto = currentPhoto.dataset.source;
  const descriptionPhoto = currentPhoto.alt;

  const instance = basicLightbox.create(
    `<div>
      <img src="${originalPhoto}" alt="${descriptionPhoto}" />
    </div>`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onKeyPress);
      },

      onClose: (instance) => {
        window.removeEventListener("keydown", onKeyPress);
      },
    }
  );
  instance.show();

  function onKeyPress(evt) {
    if (evt.key === "Escape") {
      instance.close();
    }
  }
}

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
}

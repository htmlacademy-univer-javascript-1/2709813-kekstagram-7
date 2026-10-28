const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

/**
 * Создаёт отдельный DOM-элемент миниатюры
 * @param {Object} param0 — объект фотографии (url, description, likes, comments)
 * @returns {HTMLElement}
 */
const createThumbnail = ({ url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.src = url;
  pictureImg.alt = description;

  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

/**
 * Отрисовывает переданные фотографии в блок .pictures
 * @param {Array} pictures — массив с объектами фотографий
 */
const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnailElement = createThumbnail(picture);
    fragment.append(thumbnailElement);
  });

  picturesContainer.append(fragment);
};

export { renderThumbnails };

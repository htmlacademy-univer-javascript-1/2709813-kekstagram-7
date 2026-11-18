// big-picture.js

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

// Функция создания одного элемента комментария
const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

// Функция отрисовки списка комментариев
const renderComments = (comments) => {
  commentsListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentsListElement.append(fragment);
};

// Обработчик закрытия по клавише Esc
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Функция открытия полноразмерного изображения
const openBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  bigPictureElement.querySelector('.big-picture__img img').src = data.url;
  bigPictureElement.querySelector('.big-picture__img img').alt = data.description;
  bigPictureElement.querySelector('.likes-count').textContent = data.likes;
  bigPictureElement.querySelector('.comments-count').textContent = data.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = data.description;

  renderComments(data.comments);

  // Скрываем блоки по условию задачи
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция закрытия полноразмерного изображения
function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

// Обработчик закрытия по клику на крестик
closePictureButtonElement.addEventListener('click', () => {
  closeBigPicture();
});

export { openBigPicture };

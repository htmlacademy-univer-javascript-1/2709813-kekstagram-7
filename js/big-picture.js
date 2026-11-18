const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

let comments = [];
let commentsShown = 0;

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

// Функция отрисовки порции комментариев
const renderComments = () => {
  // Вычисляем, какие комментарии нужно показать в этой порции
  const currentComments = comments.slice(commentsShown, commentsShown + COMMENTS_PER_PORTION);
  commentsShown += currentComments.length;

  const fragment = document.createDocumentFragment();
  currentComments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentsListElement.append(fragment);

  // Обновляем текст счетчика
  commentCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;

  // Скрываем или показываем кнопку «Загрузить ещё»
  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

// Обработчик кнопки «Загрузить ещё»
const onCommentsLoaderClick = () => {
  renderComments();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  bigPictureElement.querySelector('.big-picture__img img').src = data.url;
  bigPictureElement.querySelector('.big-picture__img img').alt = data.description;
  bigPictureElement.querySelector('.likes-count').textContent = data.likes;
  bigPictureElement.querySelector('.social__caption').textContent = data.description;

  // Очищаем старые комментарии и сбрасываем счетчик перед открытием новой фото
  commentsListElement.innerHTML = '';
  comments = data.comments;
  commentsShown = 0;

  // Рендерим первую порцию
  renderComments();

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

closePictureButtonElement.addEventListener('click', () => {
  closeBigPicture();
});

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { openBigPicture };

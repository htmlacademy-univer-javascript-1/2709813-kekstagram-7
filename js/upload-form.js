import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const fileInputElement = uploadFormElement.querySelector('.img-upload__input');
const overlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

let hashtagErrorMessage = '';

const parseHashtags = (value) => value
  .trim()
  .split(/\s+/)
  .filter(Boolean);

const validateHashtags = (value) => {
  const tags = parseHashtags(value);

  if (tags.length === 0) {
    return true;
  }

  if (tags.length > MAX_HASHTAGS) {
    hashtagErrorMessage = `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`;
    return false;
  }

  const seenTags = new Set();

  for (const tag of tags) {
    if (!HASHTAG_REGEX.test(tag)) {
      hashtagErrorMessage = 'Неверный формат хэш-тега';
      return false;
    }

    const normalizedTag = tag.toLowerCase();
    if (seenTags.has(normalizedTag)) {
      hashtagErrorMessage = 'Хэш-теги не должны повторяться';
      return false;
    }

    seenTags.add(normalizedTag);
  }

  return true;
};

const getHashtagErrorMessage = () => hashtagErrorMessage;

const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagsInputElement,
  validateHashtags,
  getHashtagErrorMessage,
  2,
  false
);

pristine.addValidator(
  descriptionInputElement,
  validateDescription,
  `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`
);

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onTextFieldKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onFileInputChange = () => {
  openUploadForm();
};

const onCancelButtonClick = () => {
  closeUploadForm();
};

const onFormSubmit = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

function openUploadForm() {
  resetScale();
  resetEffects();
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadForm() {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadFormElement.reset();
  fileInputElement.value = '';
  resetScale();
  resetEffects();
  pristine.reset();
}

const initUploadForm = () => {
  initScale();
  initEffects();

  fileInputElement.addEventListener('change', onFileInputChange);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  hashtagsInputElement.addEventListener('keydown', onTextFieldKeydown);
  descriptionInputElement.addEventListener('keydown', onTextFieldKeydown);
  uploadFormElement.addEventListener('submit', onFormSubmit);
};

export { initUploadForm };

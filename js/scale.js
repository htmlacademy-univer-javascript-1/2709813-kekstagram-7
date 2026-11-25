const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const SCALE_DIVISOR = 100;

const uploadFormElement = document.querySelector('.img-upload__form');
const smallerButtonElement = uploadFormElement.querySelector('.scale__control--smaller');
const biggerButtonElement = uploadFormElement.querySelector('.scale__control--bigger');
const scaleInputElement = uploadFormElement.querySelector('.scale__control--value');
const previewImageElement = uploadFormElement.querySelector('.img-upload__preview img');

let currentScale = DEFAULT_SCALE;

const applyScale = (value) => {
  currentScale = value;
  scaleInputElement.value = `${value}%`;
  previewImageElement.style.transform = `scale(${value / SCALE_DIVISOR})`;
};

const onSmallerButtonClick = () => {
  const nextScale = Math.max(MIN_SCALE, currentScale - SCALE_STEP);
  applyScale(nextScale);
};

const onBiggerButtonClick = () => {
  const nextScale = Math.min(MAX_SCALE, currentScale + SCALE_STEP);
  applyScale(nextScale);
};

const resetScale = () => {
  applyScale(DEFAULT_SCALE);
};

const initScale = () => {
  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
  resetScale();
};

export { initScale, resetScale };

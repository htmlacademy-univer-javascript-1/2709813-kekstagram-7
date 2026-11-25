const EFFECTS = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    getFilter: (value) => `grayscale(${value})`,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    getFilter: (value) => `sepia(${value})`,
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    getFilter: (value) => `invert(${value}%)`,
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    getFilter: (value) => `blur(${value}px)`,
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    getFilter: (value) => `brightness(${value})`,
  },
};

const uploadFormElement = document.querySelector('.img-upload__form');
const previewImageElement = uploadFormElement.querySelector('.img-upload__preview img');
const effectLevelContainerElement = uploadFormElement.querySelector('.img-upload__effect-level');
const effectLevelValueElement = uploadFormElement.querySelector('.effect-level__value');
const sliderElement = uploadFormElement.querySelector('.effect-level__slider');
const effectsListElement = uploadFormElement.querySelector('.effects__list');
const defaultEffectRadioElement = uploadFormElement.querySelector('#effect-none');

let activeEffect = 'none';

const formatValue = (value) => Number.isInteger(value) ? String(value) : String(Number(value.toFixed(1)));

const hideSlider = () => {
  effectLevelContainerElement.classList.add('hidden');
  previewImageElement.style.filter = '';
  effectLevelValueElement.value = '';
};

const showSlider = () => {
  effectLevelContainerElement.classList.remove('hidden');
};

const updateEffectOutput = (rawValue) => {
  const numericValue = Number(rawValue);
  const formattedValue = formatValue(numericValue);
  effectLevelValueElement.value = formattedValue;

  const effectConfig = EFFECTS[activeEffect];
  if (effectConfig) {
    previewImageElement.style.filter = effectConfig.getFilter(formattedValue);
  }
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', (values) => {
    if (activeEffect === 'none') {
      return;
    }
    updateEffectOutput(values[0]);
  });
};

const applyEffect = (effectName) => {
  activeEffect = effectName;

  if (effectName === 'none') {
    hideSlider();
    return;
  }

  const effectConfig = EFFECTS[effectName];
  if (!effectConfig) {
    hideSlider();
    return;
  }

  showSlider();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effectConfig.min,
      max: effectConfig.max,
    },
    step: effectConfig.step,
    start: effectConfig.max,
  }, true);

  sliderElement.noUiSlider.set(effectConfig.max);
  updateEffectOutput(effectConfig.max);
};

const onEffectsChange = (evt) => {
  const targetRadio = evt.target.closest('.effects__radio');
  if (!targetRadio) {
    return;
  }
  applyEffect(targetRadio.value);
};

const resetEffects = () => {
  defaultEffectRadioElement.checked = true;
  applyEffect('none');
};

const initEffects = () => {
  createSlider();
  effectsListElement.addEventListener('change', onEffectsChange);
  resetEffects();
};

export { initEffects, resetEffects };

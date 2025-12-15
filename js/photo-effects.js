const photoUploadWrapperElement = document.querySelector('.img-upload__wrapper');
const photoSliderElement = photoUploadWrapperElement.querySelector('.effect-level__slider');
const photoEffectLevelElement = photoUploadWrapperElement.querySelector('.img-upload__effect-level');
const photoEffectLevelValueElement = photoEffectLevelElement.querySelector('.effect-level__value');
const photoElement = photoUploadWrapperElement.querySelector('.img-upload__preview img');
const effectsListElement = photoUploadWrapperElement.querySelector('.effects__list');

const EFFECTS = {
  none: { filter: '', min: 0, max: 100, step: 1, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

let currentEffect = 'none';

noUiSlider.create(photoSliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

photoEffectLevelElement.classList.add('hidden');

const applyEffect = (value) => {
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    photoElement.style.filter = '';
    return;
  }

  photoElement.style.filter = `${effect.filter}(${value}${effect.unit})`;
};

const updateSlider = () => {
  const effect = EFFECTS[currentEffect];

  photoSliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    step: effect.step,
    start: effect.max,
  });

  photoEffectLevelValueElement.value = effect.max;
  applyEffect(effect.max);
};

photoSliderElement.noUiSlider.on('update', () => {
  const value = photoSliderElement.noUiSlider.get();
  photoEffectLevelValueElement.value = value;
  applyEffect(value);
});

const onEffectChange = (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    photoEffectLevelElement.classList.add('hidden');
    photoElement.style.filter = '';
    return;
  }

  photoEffectLevelElement.classList.remove('hidden');
  updateSlider();
};

const resetEffects = () => {
  currentEffect = 'none';
  photoEffectLevelElement.classList.add('hidden');
  photoElement.style.filter = '';
  photoEffectLevelValueElement.value = '';
};

effectsListElement.addEventListener('change', onEffectChange);

export { resetEffects };

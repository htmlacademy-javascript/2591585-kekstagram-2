const SCALE_STEP = 0.25;
const MIN_SCALE = 0.25;
const MAX_SCALE = 1;

const photoUploadFormElement = document.querySelector('.img-upload__form');
const photoScaleControlElement = photoUploadFormElement.querySelector('.scale__control--value');
const photoElement = photoUploadFormElement.querySelector('.img-upload__preview img');

let initialScalePhoto = 1;

const changeScalePhoto = () => {
  photoElement.style.transform = `scale(${initialScalePhoto})`;
  photoScaleControlElement.value = `${initialScalePhoto * 100}%`;
};

const resetScalePhoto = () => {
  initialScalePhoto = 1;
  photoElement.style.transform = 'scale(1)';
  photoScaleControlElement.value = '100%';
};


const onZoomOutClick = () => {
  if (initialScalePhoto > MIN_SCALE) {
    initialScalePhoto -= SCALE_STEP;
    changeScalePhoto();
  }
};

const onZoomClick = () => {
  if (initialScalePhoto < MAX_SCALE) {
    initialScalePhoto += SCALE_STEP;
    changeScalePhoto();
  }
};

export { onZoomOutClick, onZoomClick, resetScalePhoto };

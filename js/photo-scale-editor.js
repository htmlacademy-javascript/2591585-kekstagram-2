const SCALE_STEP = 0.25;
const MIN_SCALE = 0.25;
const MAX_SCALE = 1;

const photoUploadFormElement = document.querySelector('.img-upload__form');
const photoScaleControlElement = photoUploadFormElement.querySelector('.scale__control--value');
const photoElement = photoUploadFormElement.querySelector('.img-upload__preview img');
const photoZoomOutElement = photoUploadFormElement.querySelector('.scale__control--smaller');
const photoZoomElement = photoUploadFormElement.querySelector('.scale__control--bigger');

let initialScalePhoto = 1;

const renderScalePhoto = () => {
  photoElement.style.transform = `scale(${initialScalePhoto})`;
  photoScaleControlElement.value = `${initialScalePhoto * 100}%`;
};

const resetScalePhoto = () => {
  initialScalePhoto = 1;
  renderScalePhoto();
};


const onZoomOutClick = () => {
  if (initialScalePhoto > MIN_SCALE) {
    initialScalePhoto -= SCALE_STEP;
    renderScalePhoto();
  }
};

const onZoomClick = () => {
  if (initialScalePhoto < MAX_SCALE) {
    initialScalePhoto += SCALE_STEP;
    renderScalePhoto();
  }
};

photoZoomOutElement.addEventListener('click', onZoomOutClick);
photoZoomElement.addEventListener('click', onZoomClick);

resetScalePhoto();

export { resetScalePhoto };

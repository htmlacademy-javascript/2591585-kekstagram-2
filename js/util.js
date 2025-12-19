const TIMEOUT_DELAY = 500;
const body = document.body;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showModal = (modal, isShown = true) => {
  if (isShown) {
    modal.classList.remove('hidden');
    body.classList.add('modal-open');
    return;
  }

  modal.classList.add('hidden');
  body.classList.remove('modal-open');
};

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showModal, debounce};

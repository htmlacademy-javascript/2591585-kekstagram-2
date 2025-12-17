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

export { isEscapeKey, showModal};

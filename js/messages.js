const dataErrorTemplate = document.querySelector('#data-error').content;
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const DATA_ERROR_TIMEOUT = 5000;

const showDataError = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);

  const dataErrorBlock = document.body.querySelector('.data-error');

  setTimeout(() => {
    dataErrorBlock.remove();
  }, DATA_ERROR_TIMEOUT);
};

const showMessage = (template, blockClass, buttonClass) => {
  const messageElement = template.cloneNode(true);
  const messageBlock = messageElement.querySelector(blockClass);

  document.body.append(messageBlock);

  const removeMessage = () => {
    messageBlock.remove();
    document.removeEventListener('keydown', onEscKeydown);
  };

  function onEscKeydown (evt) {
    if (evt.key === 'Escape') {
      removeMessage();
    }
  }

  messageBlock.querySelector(buttonClass).addEventListener('click', removeMessage);
  messageBlock.addEventListener('click', (evt) => {
    if (evt.target === messageBlock) {
      removeMessage();
    }
  });

  document.addEventListener('keydown', onEscKeydown);
};

const showSuccess = () => {
  showMessage(successTemplate, '.success', '.success__button');
};

const showError = () => {
  showMessage(errorTemplate, '.error', '.error__button');
};

export { showDataError, showSuccess, showError };


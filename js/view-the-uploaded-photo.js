const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

const effectPreviews = document.querySelectorAll('.effects__preview');

const initPhotoPreview = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (!matches) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    preview.src = imageUrl;

    effectPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${imageUrl})`;
    });
  });
};

export { initPhotoPreview };

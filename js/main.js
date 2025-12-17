import { renderGallery } from './gallery.js';
import { initPhotoUploadForm } from './photo-upload-form.js';
import { getData } from './api.js';
import { showDataError } from './messages.js';

getData()
  .then((photos) => {
    renderGallery(photos);
  })
  .catch(() => {
    showDataError();
  });

initPhotoUploadForm();

import { renderGallery } from './gallery.js';
import { initPhotoUploadForm } from './photo-upload-form.js';
import { getData } from './api.js';
import { initFilters } from './filters.js';
import { showDataError } from './messages.js';
import { initPhotoPreview } from './view-the-uploaded-photo.js';

getData()
  .then((photos) => {
    renderGallery(photos);
    initFilters(photos);
  })
  .catch(() => {
    showDataError();
  });

initPhotoUploadForm();
initPhotoPreview();


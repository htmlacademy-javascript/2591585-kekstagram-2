import { photosData } from './create-photo-descriptions.js';
import { renderGallery } from './gallery.js';
import { initPhotoUploadForm } from './photo-upload-form.js';

renderGallery(photosData);
initPhotoUploadForm();

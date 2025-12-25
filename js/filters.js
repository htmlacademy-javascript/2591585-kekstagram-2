import { renderGallery } from './gallery.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

let photos = [];

const clearGallery = () => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

const getDefaultPhotos = () => photos.slice();

const getRandomPhotos = () => {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = () =>
  photos
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);

const filterHandlers = {
  default: getDefaultPhotos,
  random: getRandomPhotos,
  discussed: getDiscussedPhotos,
};

const applyFilter = (filter) => {
  clearGallery();
  renderGallery((filterHandlers[filter] || filterHandlers.default)());
};

const debouncedApplyFilter = debounce(applyFilter);

const onFilterClick = (evt) => {
  if (!evt.target.matches('button')) {
    return;
  }

  const activeButton = filtersForm.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');

  const filter = evt.target.id.replace('filter-', '');
  debouncedApplyFilter(filter);
};

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos.slice();

  filtersContainer.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFilterClick);
};

export { initFilters };

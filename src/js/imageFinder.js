import imagesTpl from '../templates/images.hbs';
import imagesApiService from './api-service';
import loadMoreBtn from './loadMoreBtn';
import refs from './refs';

function onSearch(e) {
  e.preventDefault();
  imagesApiService.query = e.currentTarget.elements.query.value;
  if (imagesApiService.query !== '') {
    clearPage();
    loadMoreBtn.show();
    imagesApiService.resetPage();
    fetchImages();
  } else {
    loadMoreBtn.hide();
    clearPage();
  }
}

function fetchImages() {
  loadMoreBtn.disable();
  imagesApiService
    .getImages()
    .then(images => {
      renderImages(images);
      refs.galleryEl.lastElementChild.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      loadMoreBtn.enable();
    })
    .catch(onFetchError);
}

function renderImages(images) {
  refs.galleryEl.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearPage() {
  refs.galleryEl.innerHTML = '';
}

function onFetchError(error) {
  alert('Oooops, something went wrong, no results found!');
}

export default {
  onSearch,
  fetchImages,
};

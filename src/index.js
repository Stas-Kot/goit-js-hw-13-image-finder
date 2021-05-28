import debounce from 'lodash.debounce';
import './sass/main.scss';
import imagesTpl from './templates/images.hbs';
import imagesApiService from './js/api-service';
import LoadMoreBtn from './js/loadMoreBtn';

const galleryEl = document.querySelector('.gallery');
const searchFormEl = document.querySelector('#search-form');

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load',
  hidden: true,
});

searchFormEl.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

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
      galleryEl.lastElementChild.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      loadMoreBtn.enable();
    })
    .catch(onFetchError);
}

function renderImages(images) {
  galleryEl.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearPage() {
  galleryEl.innerHTML = '';
}

function onFetchError(error) {
  alert('Oooops, something went wrong, no results found!');
}

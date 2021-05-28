import './sass/main.scss';
import refs from './js/refs';
import heandlers from './js/imageFinder';
import loadMoreBtn from './js/loadMoreBtn';

refs.searchFormEl.addEventListener('submit', heandlers.onSearch);
loadMoreBtn.refs.button.addEventListener('click', heandlers.fetchImages);

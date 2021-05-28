const api_KEY = '21750958-271f4873848cc9d3a2fe2c382';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const per_page = 12;

class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getImages() {
    console.log(this);

    return fetch(
      `${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=${per_page}&key=${api_KEY}`,
    )
      .then(response => response.json())
      .then(({ hits }) => {
        if (hits.length === 0) {
          onFetchError();
        } else {
          this.incrementPage();
          return hits;
        }
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

const api = new ApiService();
export default api;

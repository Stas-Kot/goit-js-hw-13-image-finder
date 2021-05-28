import axios from 'axios';

const api_KEY = '21750958-271f4873848cc9d3a2fe2c382';
axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

class ApiService {
  constructor() {
    this.key = api_KEY;
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 12;
  }

  getImages() {
    return axios
      .get(`&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}&key=${this.key}`)
      .then(({ data }) => {
        if (data.hits.length === 0) {
          onFetchError();
        } else {
          this.incrementPage();
          return data.hits;
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

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_tPvmpZ1k61bT5uVk1eIrAWNxVJ6p5oAeoqUMIqgTLf7zspoah1Z7S0oUEl3GjjyJ';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}

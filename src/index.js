import process from 'process';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.getElementById('breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const catImage = document.getElementById('cat-image');
const catBreed = document.getElementById('cat-breed');
const catDescription = document.getElementById('cat-description');
const catTemperament = document.getElementById('cat-temperament');
const errorElement = document.querySelector('.error');

document.addEventListener('DOMContentLoaded', () => {
  loadBreeds();
  breedSelect.addEventListener('change', () => {
    const breedId = breedSelect.value;
    if (breedId) {
      loadCatByBreed(breedId);
    }
  });
});

function loadBreeds() {
  showLoader();
  breedSelect.classList.add('hidden');
  errorElement.classList.add('hidden');

  fetchBreeds()
    .then(breeds => {
      breedSelect.innerHTML = breeds
        .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
        .join('');
      breedSelect.classList.remove('hidden');
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      hideLoader();
    });
}

function loadCatByBreed(breedId) {
  showLoader();
  catInfo.classList.add('hidden');
  errorElement.classList.add('hidden');

  fetchCatByBreed(breedId)
    .then(catData => {
      catImage.src = catData.url;
      catBreed.textContent = catData.breeds[0].name;
      catDescription.textContent = catData.breeds[0].description;
      catTemperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;
      catInfo.classList.remove('hidden');
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      hideLoader();
    });
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showError() {
  errorElement.classList.remove('hidden');
}

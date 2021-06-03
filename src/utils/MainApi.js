import { MAIN_API_URL } from './consts';

export const getMovies = () => {
  return fetch(`${MAIN_API_URL}/`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((movies) => movies);
};

export const createMovie = (data) => {
  return fetch(`${MAIN_API_URL}/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: data.image.url,
      trailer: data.trailer,
      thumbnail: data.thumbnail,
      movieId: data.movieId,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then((res) => res.json());
};

export const deleteMovie = (_id) => {
  return fetch(`${MAIN_API_URL}/${_id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

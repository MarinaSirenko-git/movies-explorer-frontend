import { BASE_URL } from './consts';

const getMovies = () => {
  return fetch(`${BASE_URL}/beatfilm-movies`)
    .then((res) => res.json())
    .then((movies) => movies);
};

export default getMovies;

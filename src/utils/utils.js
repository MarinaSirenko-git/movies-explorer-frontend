import {
  MCL_4K,
  MCL_TABLET,
  SHORT_FILM_DURATION,
  MCL_4K_FILMS_NUMBER,
  MCL_TABLET_FILMS_NUMBER,
  MCL_MOBILE_FILMS_NUMBER,
  MCL_4K_FILMS_RETURN,
  MCL_TABLET_FILMS_RETURN,
} from './consts';

export function convertMinutes(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration) - hours * 60;
  const formated = `${hours.toString()}ч ${minutes.toString().padStart(2, '0')}м`;
  return formated;
}

export function filterMovies(arr, value, isChecked) {
  const regex = new RegExp(value, 'i');
  const lengthFilm = arr.filter((item) => {
    if (
      (regex.test(item.nameRU) && item.image.url !== null) ||
      (regex.test(item.director) && item.image.url !== null) ||
      (regex.test(item.year) && item.image.url !== null) ||
      (regex.test(item.country) && item.image.url !== null)
    ) {
      return item;
    }
    return null;
  });
  if (isChecked === true) {
    return lengthFilm.filter((item) => item.duration <= SHORT_FILM_DURATION);
  }
  return lengthFilm;
}

export function countUploadedMovies() {
  if (MCL_4K.matches) {
    return MCL_4K_FILMS_RETURN;
  }
  if (MCL_TABLET.matches) {
    return MCL_TABLET_FILMS_RETURN;
  }
  return MCL_TABLET_FILMS_RETURN;
}

export function getSliceMovies(movie, n) {
  if (MCL_4K.matches) {
    return movie.slice(0, MCL_4K_FILMS_NUMBER + n);
  }
  if (MCL_TABLET.matches) {
    return movie.slice(0, MCL_TABLET_FILMS_NUMBER + n);
  }
  return movie.slice(0, MCL_MOBILE_FILMS_NUMBER + n);
}

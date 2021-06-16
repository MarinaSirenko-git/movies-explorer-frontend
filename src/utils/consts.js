export const BASE_URL = 'https://api.nomoreparties.co';
export const MAIN_API_URL = 'http://localhost:3001';
// export const MAIN_API_URL = 'https://api.sirenko-movies.nomoredomains.club';
export const DEFAULT_TEXT =
  'Введите в поиск название фильма, год, режиссёра или любое ключевое слово и получите подборку :)';
export const SERVER_ERR_TEXT =
  'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const NORESULT_TEXT = 'Ничего не найдено :(';
export const NOSAVE_TEXT = 'В избранном пока ничего нет :(';
export const REQUIRED_TEXT = 'Нужно ввести ключевое слово';
export const NOEMPTY_TEXT = 'Поле не может быть пустым';
export const INVALID_EMAIL_TEXT = 'Неверно указан email';
export const INVALID_NAME_TEXT =
  'Имя может содержать латиницу, кириллицу, пробел и дефис, должно быть от 2-х и до 30 символов';
export const NOREGISTER_TEXT = 'Ошибка при регистрации. Повторите попытку позже';
export const NOAUTHORIZE_TEXT = 'Ошибка при авторизации. Повторите попытку позже';
export const SACCESS_PROFILE_TEXT = 'Данные успешно изменены!';
export const MCL_4K = window.matchMedia('all and (min-width: 837px)');
export const MCL_TABLET = window.matchMedia('(min-width: 581px) and (max-width: 836px)');
export const MCL_MOBILE = window.matchMedia('all and (max-width: 580px)');
export const NAME_REGEX = /^[a-zа-я/s-]{2,30}$/i;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const SHORT_FILM_DURATION = 40;
export const MCL_4K_FILMS_NUMBER = 12;
export const MCL_TABLET_FILMS_NUMBER = 8;
export const MCL_MOBILE_FILMS_NUMBER = 5;
export const MCL_4K_FILMS_RETURN = 3;
export const MCL_TABLET_FILMS_RETURN = 2;

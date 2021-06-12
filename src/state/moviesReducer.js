import { getSliceMovies } from '../utils/utils';

function moviesReducer(state, action) {
  switch (action.type) {
    case 'checkLocalStorage':
    case 'fetch': {
      const { isMessage, movies, count } = action;
      return {
        ...state,
        isMessage,
        movies,
        sliceMovies: getSliceMovies(movies, count),
        isButton: movies.length > getSliceMovies(movies, count).length,
      };
    }
    case 'beforeFetch': {
      const { isLoading, isButton, isMessage } = action;
      return {
        ...state,
        isLoading,
        isButton,
        isMessage,
      };
    }
    case 'noFaundResult':
    case 'serverError': {
      const { isMessage, sliceMovies } = action;
      return {
        ...state,
        isMessage,
        sliceMovies,
      };
    }
    case 'increment': {
      const { movies, count } = action;
      return {
        ...state,
        movies,
        sliceMovies: getSliceMovies(movies, count),
        isButton: movies.length > getSliceMovies(movies, count).length,
        count,
      };
    }
    case 'finally': {
      const { isLoading } = action;
      return {
        ...state,
        isLoading,
      };
    }
    default: {
      const { movies } = action;
      return {
        ...state,
        movies,
      };
    }
  }
}

export default moviesReducer;

import { getSliceMovies } from '../utils/utils';

function moviesReducer(state, action) {
  switch (action.type) {
    case 'fetch': {
      const { defaultMovies } = action;
      return {
        ...state,
        defaultMovies,
      };
    }
    case 'checkLocalStorage':
    case 'filter': {
      const { isMessage, movies, count, isLoading } = action;
      return {
        ...state,
        isMessage,
        isLoading,
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
      const { isMessage, isLoading, sliceMovies } = action;
      return {
        ...state,
        isLoading,
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

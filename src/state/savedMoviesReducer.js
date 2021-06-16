function savedMoviesReducer(state, action) {
  switch (action.type) {
    case 'fetch': {
      const { isMessage, movies } = action;
      return {
        ...state,
        isMessage,
        movies,
      };
    }
    case 'filter': {
      const { isMessage, filterMovies } = action;
      return {
        ...state,
        isMessage,
        filterMovies,
      };
    }
    case 'noFaundResult':
    case 'serverError': {
      const { isMessage, movies } = action;
      return {
        ...state,
        isMessage,
        movies,
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

export default savedMoviesReducer;

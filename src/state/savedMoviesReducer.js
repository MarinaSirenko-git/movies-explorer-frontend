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

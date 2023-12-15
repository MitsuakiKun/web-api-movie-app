import fetch from 'node-fetch';

export const getUpcomingMovies = async (language) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=${language}&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json(language).message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getGenres = async (language) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=${language}&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovies = async(language) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=${language}&include_adult=false&include_video=false&page=1`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
      throw error;
  }
};
    
  export const getMovie = async({ queryKey }) => {
    console.log(queryKey);
    const [, params] = queryKey;
    const { id ,language} = params;
    console.log(`MovieDetailPage:${language}`)
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=${language}`
        );
  
      if (!response.ok) {
          throw new Error(response.json().message);
      }
  
      return await response.json();
    } catch (error) {
        throw error;
    }
  };

  
  export const getMovieImages = async({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
      ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };

  export const getSimilarMovies = async({ queryKey }) => {
    console.log(queryKey);
    const [, params] = queryKey;
    const { id ,language} = params;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_KEY}&language=${language}&include_adult=false&include_video=false&page=1`
        );
  
      if (!response.ok) {
          throw new Error(response.json().message);
      }
  
      return await response.json();
    } catch (error) {
        throw error;
    }
  };

  export const getCredits =async({ queryKey }) => {
    console.log(queryKey);
    const [, params] = queryKey;
    const { id ,language} = params;
    console.log(`MovieDetailPage:${language}`)
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}&language=${language}`
        );
  
      if (!response.ok) {
          throw new Error(response.json().message);
      }
  
      return await response.json();
    } catch (error) {
        throw error;
    }
  };


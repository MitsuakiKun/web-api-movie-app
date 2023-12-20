export const getMovies = async (language) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/${language}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
    }
  )
  return response.json();
};
  
export const login = async (username, password) => {
const response = await fetch('http://localhost:8080/api/users', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password })
});
return response.json();
};

export const signup = async (username, password) => {
const response = await fetch('http://localhost:8080/api/users?action=register', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password })
});
return response.json();
};

export const addToFavorites = async (id) => {
  const response = await fetch(`http://localhost:8080/api/users/${id}/favorite`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ id: id })
  });
  return response.json();
  };

  export const removeFromFavorites = async (id) => {
    const response = await fetch(`http://localhost:8080/api/users/${id}/favorite`, {
        headers: {
          'Authorization': window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: 'delete'
    });
    return response.json();
  };

  export const getFavorites = async () => {
    const response = await fetch(`http://localhost:8080/api/users/favorite`, {
        headers: {
          'Authorization': window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: 'get'
    });
    const data = await response.json();
    return data;
  };

  export const addToMustWatches = async (id) => {
    const response = await fetch(`http://localhost:8080/api/users/${id}/mustWatch`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ id: id })
    });
    return response.json();
    };
  
    export const removeFromMustWatches = async (id) => {
      const response = await fetch(`http://localhost:8080/api/users/${id}/mustWatch`, {
          headers: {
            'Authorization': window.localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          method: 'delete'
      });
      return response.json();
    };
  
    export const getMustWatches = async () => {
      const response = await fetch(`http://localhost:8080/api/users/mustWatch`, {
          headers: {
            'Authorization': window.localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          method: 'get'
      });
      const data = await response.json();
      return data;
    };

    
  export const addToReviews = async (id, rating, review, author) => {
    console.log(JSON.stringify({ movieId: id, rating: rating, review: review, author: author }));
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/${id}`, {
          headers: {
              'Authorization': window.localStorage.getItem('token'),
              'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify({ movieId: id, rating: rating, review: review, author: author })
      });

      const responseData = await response.json();
      console.log('addReview:', responseData);
      return responseData;
  } catch (error) {
      console.error('Error adding review:', error.message);
      throw error; // You might want to handle this error in the calling code
  }
};
  
export const removeFromReviews = async (id) => {
  const response = await fetch(`http://localhost:8080/api/reviews/${id}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method: 'delete'
  });
  return response.json();
};

export const getReviews = async (movieId) => {
  const response = await fetch(`http://localhost:8080/api/reviews/${movieId}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method: 'get'
  });
  const data = await response.json();
  return data.reviews;
};

export const getMovie = ({ queryKey }) => {
  const [, params] = queryKey;
  const { id ,language} = params;
  if (language === 'en-US'||language === 'ja-JA') {
    console.log(`MovieDetailPage:${language}`)
    return fetch(
      `http://localhost:8080/api/movies/${id}/detail/${language}`,
      {
        headers: {
          'Authorization': window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: 'get'
    }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
  });
} else {
  return Promise.resolve(null);  
}
};

export const getGenres = (language) => {
  return fetch(
    `http://localhost:8080/api/movies/tmdb/genres/${language}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method: 'get'
  }
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

export const getMovieImages = ({ queryKey }) => {
  const [, params] = queryKey;
  const { id } = params;
  return fetch(
    `http://localhost:8080/api/movies/${id}/images`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method: 'get'
  }
    ).then( async(response) => {
      const jsonData = await response.json(); // Store the result in a variable
      console.log(jsonData); // Now you can log or use jsonData as needed
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return jsonData; 

  })
  .catch((error) => {
    throw error
  });
};

export const getMovieReviews = (id) => {
  return fetch(
    `http://localhost:8080/api/movies/${id}/review`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method: 'get'
  })      
  .then((res) => res.json())
  .then((json) => {
    // console.log(json.results);
    return json.results;
  });
};

export const getUpcomingMovies = (language) => {
  return fetch(
    `http://localhost:8080/api/movies/tmdb/upcoming/${language}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method: 'get'
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};
  
export const getSimilarMovies = (id, language) => {
  return fetch(
    `http://localhost:8080/api/movies/${id}/similar/${language}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method: 'get'
  } )
    .then((res) => res.json())
      .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getCredits =(id, language) =>{
  return fetch(
    `http://localhost:8080/api/movies/${id}/credits/${language}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method: 'get'
  })
    .then((res) => res.json())
      .then((json) => {
      console.log(json.results);
      return json.cast; 
    });
};


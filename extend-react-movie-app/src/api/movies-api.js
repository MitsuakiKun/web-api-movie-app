export const getMovies = async () => {
    const response = await fetch(
      'http://localhost:8080/api/movies', {
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
  
    export const getReviews = async () => {
      const response = await fetch(`http://localhost:8080/api/reviews`, {
          headers: {
            'Authorization': window.localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          method: 'get'
      });
      const data = await response.json();
      return data;
    };
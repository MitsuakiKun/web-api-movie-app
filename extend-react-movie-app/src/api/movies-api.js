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
    return response.json();
  };
import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [mustWatches, setMustWatches] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const addToMustWatches = (movie) => {
    let newMustWatches = [];
    if (!mustWatches.includes(movie.id)){
        newMustWatches = [...mustWatches, movie.id];
    }
    else{
        newMustWatches = [...mustWatches];
    }
    setMustWatches(newMustWatches)
  };
  console.log(mustWatches);
  
  
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  return (
     <MoviesContext.Provider
       value={{
         favorites,
         mustWatches,
         addToFavorites,
         removeFromFavorites,
         addReview,
         addToMustWatches,
       }}
     >
       {props.children}
     </MoviesContext.Provider>
   );
 
};

export default MoviesContextProvider;
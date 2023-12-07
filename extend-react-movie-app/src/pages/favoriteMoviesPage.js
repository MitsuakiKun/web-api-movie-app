import React, { useState, useContext, useEffect } from 'react';
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { LanguageContext } from '../contexts/languageContext';
import { getString }  from '../strings.js';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { Navigate } from "react-router-dom";

const FavoriteMoviesPage = () => {
  const [user, setUser] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const {favorites: movieIds } = useContext(MoviesContext);
  const { language } = useContext(LanguageContext);
  
  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId, language }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);
  
  useEffect(() => {
    favoriteMovieQueries.forEach((query) => {
      query.refetch();
    });
  }, [language, favoriteMovieQueries]);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    if (q.data) {
      q.data.genre_ids = q.data.genres.map((g) => g.id);
    }
    return q.data;
  });

  const toDo = () => true;

  return (
    <>
    {!loading && (
      <>
        {!user ? (
          <Navigate to={`/login/`} />
        ) : (
          <>
            <PageTemplate
            title={getString(language, "favoriteMovies")}
              movies={movies}
              action={(movie) => {
                return (
                  <>
                    <RemoveFromFavorites movie={movie} />
                    <WriteReview movie={movie} />
                  </>
                );
              }}
            />
          </>
        )}
          </>
        )}
    </>
  );
};

export default FavoriteMoviesPage;
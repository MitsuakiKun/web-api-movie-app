import React, { useRef, useContext, useEffect } from 'react';
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { LanguageContext } from '../contexts/languageContext';
import { getString }  from '../strings.js';
import { Navigate } from "react-router-dom";
import { getFavorites } from '../api/movies-api.js';

const FavoriteMoviesPage = () => {

  const { favorites: movieIds, addToFavorites, setFavorites } = useContext(MoviesContext);
  const { language } = useContext(LanguageContext);
  const isMounted = useRef(true);

  // Fetch favorite movies
  const favoritesQuery = useQueries([
    {
      queryKey: 'favorites',
      queryFn: getFavorites,
    },
  ]);

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
  const isLoading = favoriteMovieQueries.some((m) => m.isLoading);

  useEffect(() => {
    const fetchAndAddToFavorites = async () => {
      try {
        const favoritesData = favoritesQuery[0].data || [];

        const uniqueMovieIds = Array.from(new Set([...movieIds, ...favoritesData.map((data) => data.id)]));

        // Update the context with the new set of movie IDs
        setFavorites(uniqueMovieIds);
        const moviesData = await Promise.all(
          uniqueMovieIds.map((movieId) => ({
            queryKey: ['movie', { id: movieId, language }],
            queryFn: getMovie,
          }))
        );


        const newMovieIds = moviesData.map(movie => movie.id);
        const updatedMovieIds = Array.from(new Set([...movieIds, ...newMovieIds]));
        if (isMounted.current) {
          updatedMovieIds.forEach((movieId) => {
            const movie = moviesData.find((movie) => movie.id === movieId);
            if (movie) {
              addToFavorites(movie);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching and adding to favorites:', error);
      }
    };
    if (favoritesQuery[0].data && favoritesQuery[0].data.length > 0) {
      fetchAndAddToFavorites();
    }
    
    return () => {
      // Cleanup: set isMounted to false when the component unmounts
      isMounted.current = false;
    };
  }, [language, movieIds, setFavorites, addToFavorites, favoritesQuery]);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    if (q.data) {
      q.data.genre_ids = q.data.genres.map((g) => g.id);
    }
    return q.data;
  });


  return (
    <>
      <>
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
          </>
    </>
  );
};

export default FavoriteMoviesPage;
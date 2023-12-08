import React, { useState, useContext, useEffect } from 'react';
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { LanguageContext } from '../contexts/languageContext';
import { getString }  from '../strings.js';

const HomePage = (props) => {
  const { language } = useContext(LanguageContext);
  const { data, error, isLoading, isError, refetch }  = useQuery('discover', () => getMovies(language));

  useEffect(() => {
    refetch();
  }, [language, refetch]);


  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  const addToFavorites = (movieId) => true ;

  return (
    <>
        <>
            <>
              <PageTemplate
                title={getString(language, "discoverMovies")}
                movies={movies}
                action={(movie) => {
                  return <AddToFavoritesIcon movie={movie} />
                }}
              />
            </>
          </>
    </>
  );
};


export default HomePage;
import React, { useState, useContext, useEffect } from 'react';
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToMustWatchesIcon from '../components/cardIcons/addToMustWatches';
import { LanguageContext } from '../contexts/languageContext';
import { getString }  from '../strings.js';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { Navigate } from "react-router-dom";

const UpcomingMoviesPage = (props) => {
  const [user, setUser] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const { language } = useContext(LanguageContext);
 
  const { data, error, isLoading, isError, refetch } = useQuery('upcoming', () => getUpcomingMovies(language));

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
  const mustWatches = movies.filter(m => m.mustWatch)
  localStorage.setItem('mustWatches', JSON.stringify(mustWatches))
   
  const selectFavorite = () => true;

  return (
    <>
    {!loading && (
      <>
        {!user ? (
          <Navigate to={`/login/`} />
        ) : (
          <>
            <PageTemplate
            title={getString(language, "upcomingMovies")}

              movies={movies}
              action={(movie) => {
                return <AddToMustWatchesIcon movie={movie} />
              }}
            />
          </>
        )}
          </>
        )}
    </>
  );
};

  
export default UpcomingMoviesPage;
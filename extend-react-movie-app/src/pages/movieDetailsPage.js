import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { LanguageContext } from '../contexts/languageContext';
import { getString }  from '../strings.js';

// import useMovie from "../hooks/useMovie"; 

const MoviePage = (props) => {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);
  
  const { data: movie, error, isLoading, isError, refetch } = useQuery(
    ["movie", { id: id, language }],
    getMovie,  
  );

  useEffect(() => {
    refetch();
  }, [language, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} language={language} />
          </PageTemplate>
        </>
      ) : (
        <p>{getString(language, "waitingMovieDetails")}</p>
      )}
    </>
  );
};

export default MoviePage;
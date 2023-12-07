import React, { useContext, useEffect } from 'react';
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { LanguageContext } from '../contexts/languageContext';

const WriteReviewPage = (props) => {
  const location = useLocation();
  const movieId = location.state.movieId;

  const { language } = useContext(LanguageContext);

  const { data: movie, error, isLoading, isError, refetch } = useQuery(
    ["movie", { id: movieId, language }],
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
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
  );
};

export default WriteReviewPage;
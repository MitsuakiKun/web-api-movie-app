import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";


const MovieReviewPage = (props) => {
  let location = useLocation();
 
  const { movie, review, language } = location.state;
  console.log('Location :',movie);

  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} language={language} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
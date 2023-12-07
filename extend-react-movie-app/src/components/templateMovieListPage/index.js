import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  const [sortFilter, setSortFilter] = useState(""); 

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortFilter(value);
  };

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  if (sortFilter === "vote_average.desc") {
    displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortFilter === "vote_average.asc") {
    displayedMovies.sort((a, b) => a.vote_average - b.vote_average);
  } else if (sortFilter === "pub_date.desc") {
    displayedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  } else if (sortFilter === "pub_date.asc") {
    displayedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  }

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;

import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { getString }  from '../../strings.js';
import MovieCard from "../movieCard";
import Grid from "@mui/material/Grid";
import { getSimilarMovies, getCredits } from "../../api/tmdb-api.js";
import { useNavigate } from 'react-router-dom';

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie , language}) => {  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const navigate = useNavigate();

  const getGoogleSearchUrl = (query) => {
    const encodedQuery = encodeURIComponent(query);
    return `https://www.google.com/search?q=${encodedQuery}`;
  };

  useEffect(() => {
    getSimilarMovies(movie.id, language).then((movies) => {
      setSimilarMovies(movies);
    });
  }, [movie.id, language]);

  return (
    <>
      <Typography variant="h5" component="h3">
        {getString(language, "overview")}
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label={getString(language, "genre")} sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} ${getString(language, "min")}`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`${getString(language, "released")}: ${movie.release_date}`} />
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label={getString(language, "productionCountries")} sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label={getString(language, "productionCompanies")} sx={{ ...chip }}  color="primary" />
        </li>
        {movie.production_companies.map((company) => (
          <li key={company.id}>
           <a href={getGoogleSearchUrl(company.name)} style={{ textDecoration: 'none' }}>
              <Chip label={company.name} className="production-company-chip" sx={{ ...chip, cursor: 'pointer' }} />
            </a>
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{ ...root, marginTop: '16px' }}>
        <li>
          <Chip
            label={getString(language, "credits")}
            sx={{ ...chip }}
            color="primary"
            onClick={() => {
              navigate(`/movies/${movie.id}/credits`);
              console.log("Navigate to Credits Page");
            }}
          />
        </li>
      </Paper>

      {similarMovies.length > 0 && (
        <>
          <Typography variant="h5" component="h3" style={{ marginTop: '16px' }}>
            {getString(language, "similarMovies")}
          </Typography>
          <Grid container spacing={2}>
            {similarMovies.map((m) => (
              <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                {}
                <MovieCard key={m.id} movie={m} />
              </Grid>
            ))}
          </Grid>
        </>
        
      )}
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        {getString(language, "Reviews")}
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} language={language}/>
      </Drawer>
      </>
  );
};
export default MovieDetails ;
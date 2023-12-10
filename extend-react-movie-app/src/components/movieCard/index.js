import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import PlayListIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { MoviesContext } from "../../contexts/moviesContext";
import { LanguageContext } from '../../contexts/languageContext';
import { getString }  from '../../strings.js';
import { getFavorites } from "../../api/movies-api.js"; 


export default function MovieCard({ movie, action = () => null }) {
  const { mustWatches, addToMustWatches} = useContext(MoviesContext);
  const { language } = useContext(LanguageContext);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function checkFavoriteStatus() {
      try {
        const favorites_data = await getFavorites();
        const movieId = Number(movie.id);
        const isMovieFavorite = favorites_data.find((data) => data.id === movieId);
        setIsFavorite(!!isMovieFavorite);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }
    checkFavoriteStatus();
  }, [movie.id]);

  if (mustWatches.find((id) => id === movie.id)) {
    movie.mustWatches = true;
  } else {
    movie.mustWatches = false;
  }
 

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          isFavorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : movie.mustWatches ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <PlayListIcon />
            </Avatar>
          ) : null
        }

        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            {getString(language,"moreInfo")}
            
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
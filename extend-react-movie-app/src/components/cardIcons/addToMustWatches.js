import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";
import { addToMustWatches } from "../../api/movies-api";


const addToMustWatchesIcon = ({ movie }) => {

  const handleAddToMustWatches = (e) => {
    e.preventDefault();
    addToMustWatches(movie.id);
  };

  return (
    <IconButton aria-label="add to mustWatches" onClick={handleAddToMustWatches}>
      <PlaylistIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default addToMustWatchesIcon;
import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";

const addToMustWatchesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToMustWatches = (e) => {
    e.preventDefault();
    context.addToMustWatches(movie);
  };

  return (
    <IconButton aria-label="add to mustWatches" onClick={handleAddToMustWatches}>
      <PlaylistIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default addToMustWatchesIcon;
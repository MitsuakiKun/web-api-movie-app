import React from "react";
import Typography from "@mui/material/Typography";
import { getString }  from '../../strings.js';


const MovieReview =  ({ review , language}) => {
  return (
    <>
      <Typography variant="h5" component="h3">
        {getString(language, "reviewBy")} {review.author}
      </Typography>

      <Typography variant="h6" component="p">
        {review.content} 
      </Typography>
    </>
  );
};
export default MovieReview

import React, { useEffect, useState }  from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { getString }  from '../../strings.js';
import { getReviews } from "../../api/movies-api.js";


export default function MovieReviews({ movie, language}) {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    Promise.all([
      getMovieReviews(movie.id),
      getReviews(movie.id)
    ])
    .then(([movieReviews, reviewsFromApi]) => {
      const reviewsToAdd = reviewsFromApi ? reviewsFromApi : [];
      const uniqueReviews = new Set([...reviews, ...movieReviews,  ...reviewsToAdd]);
      setReviews([...uniqueReviews]);
    })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching reviews:', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 550}} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell >{getString(language, "author")}</TableCell>
            <TableCell align="center">{getString(language, "excerpt")}</TableCell>
            <TableCell align="right">{getString(language, "more")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {reviews && reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell >{((r?.content || r?.review) || '')}</TableCell>
              <TableCell >
              <Link
                  to={`/reviews/${r.id}`}
                  state={{
                      review: r,
                      movie: movie,
                  }}
                >
                  {getString(language, "Review")}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
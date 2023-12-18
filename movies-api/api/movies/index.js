import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies, getGenres, getMovies, getMovie, getMovieImages, getMovieReviews, getSimilarMovies, getCredits } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));



router.get('/tmdb/upcoming/:language', asyncHandler(async (req, res) => {
    console.log("upcoming:", req.params);
    const upcomingMovies = await getUpcomingMovies(req.params.language);
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres/:language', asyncHandler(async (req, res) => {
    console.log("genres:", req.params);
    const genres = await getGenres(req.params.language);
    res.status(200).json(genres);
}));

router.get('/:language', asyncHandler(async (req, res) => {
    console.log("movies:", req.params);
    const movies = await getMovies(req.params.language);
    res.status(200).json(movies);
}));

router.get('/:id/detail/:language', asyncHandler(async (req, res) => {
    console.log("movie:", req.params);
        const movie = await getMovie({
            queryKey: [null, { id: req.params.id, language: req.params.language }],
        });
        res.status(200).json(movie);
    } 
));

router.get('/:id/review', asyncHandler(async (req, res) => {
    console.log("review:",req.params);
    const reviews = await getMovieReviews(req.params.id);
    console.log(reviews);
    // Send the parsed JSON response as the API result
    res.json(reviews);
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    console.log("images:", req.params.id);
    const images = await getMovieImages({
        queryKey: [null, { id: req.params.id}],
    });
    res.status(200).json(images);
}));

router.get('/:id/similar/:language', asyncHandler(async (req, res) => {
    console.log("similar:", req.params);
    const similarMovies = await getSimilarMovies({
        queryKey: [null, { id: req.params.id, language: req.params.language }],
    });
    res.status(200).json(similarMovies);
}));

router.get('/:id/credits/:language', asyncHandler(async (req, res) => {
    console.log("credits:", req.params);
    const credits = await getCredits({
        queryKey: [null, { id: req.params.id, language: req.params.language }],
    });
    res.status(200).json(credits);
}));



export default router;
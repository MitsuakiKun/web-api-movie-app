import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies, getGenres } from '../tmdb-api';

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

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));


router.get('/review', async (req, res) => {
    const reviews = await Review.find();
    res.status(200).json(reviews);
});

router.post('/:movieId/review', async (req, res) => {
    try{
        await addReview(req.params.movieId);
        res.status(201).json({ success: true, msg: 'review successfully created.' });
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});

router.delete('/:movieId/review', async (req, res) => {
    try {
        // Ensure that the review being deleted belongs to the specified user
        const review = await Review.findOneAndDelete({ movieId: req.params.movieId });

        if (review) {
            res.status(200).json({ success: true, msg: 'review successfully deleted.' });
        } else {
            res.status(404).json({ success: false, msg: 'review not found or not associated with the user.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});

router.delete('/review', async (req, res) => {
    try {
        // Ensure that the review being deleted belongs to the specified user
        const review = await Review.deleteMany({});

        if (review) {
            res.status(200).json({ success: true, msg: 'review successfully deleted.' });
        } else {
            res.status(404).json({ success: false, msg: 'review not found or not associated with the user.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});

async function addReview(id) {
    try {
        console.log('Adding Review for user ID:', id);
        await Review.create({ movieId: id });
        console.log('Review created successfully.');
    } catch (error) {
        console.error('Error in addMustWatch function:', error);
        throw error; // rethrow the error to be caught by the route handler
    }
}

export default router;
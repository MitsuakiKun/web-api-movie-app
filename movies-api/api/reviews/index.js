import express from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Review from '../reviews/reviewModel';

const router = express.Router();


router.get('/', async (req, res) => {
    const reviews = await Review.find();
    res.status(200).json(reviews);
});

router.get('/:movieId', async (req, res) => {
    try {
        const movieId = req.params.movieId;

        // Find all reviews with the specified movieId
        const reviews = await Review.find({ movieId });

        if (reviews.length > 0) {
            // If reviews are found, send them as a response
            res.status(200).json({ success: true, reviews });
        } else {
            // If no reviews are found, send a 404 response
            res.status(404).json({ success: false, message: 'No reviews found for the specified movieId' });
        }
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


router.post('/:id', async (req, res) => {
    try{
        await addReview(req.body.movieId, req.body.rating, req.body.review, req.body.author);
        res.status(201).json({ success: true, msg: 'review successfully created.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: `Internal server error.` });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // Ensure that the review being deleted belongs to the specified user
        const review = await Review.findOneAndDelete({ id: req.params.id });

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

router.delete('/', async (req, res) => {
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

async function addReview(movieId, rating, review, author) {
    try {
        console.log('Adding Review for user ID:', movieId);
        await Review.create({ movieId: movieId, rating: rating, review: review, author: author });
        console.log('Review created successfully.');
    } catch (error) {
        console.error('Error in addReview function:', error);
        throw error; // rethrow the error to be caught by the route handler
    }
}

export default router;
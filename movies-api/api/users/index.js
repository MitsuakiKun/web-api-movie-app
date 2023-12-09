import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Favorite from '../favorites/favoriteModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

// add favorites
router.post('/:id/favorite', async (req, res) => {
    try{
        await addFavorite(req.params.id);
        res.status(201).json({ success: true, msg: 'Favorite successfully created.' });
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});

// get all favorites
router.get('/favorite', async (req, res) => {
    const favorites = await Favorite.find();
    res.status(200).json(favorites);
});

router.delete('/:id/favorite', async (req, res) => {
    try {
        // Ensure that the favorite being deleted belongs to the specified user
        const favorite = await Favorite.findOneAndDelete({ id: req.params.id });

        if (favorite) {
            res.status(200).json({ success: true, msg: 'Favorite successfully deleted.' });
        } else {
            res.status(404).json({ success: false, msg: 'Favorite not found or not associated with the user.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});

router.delete('/favorite', async (req, res) => {
    try {
        // Ensure that the favorite being deleted belongs to the specified user
        const favorite = await Favorite.deleteMany({});

        if (favorite) {
            res.status(200).json({ success: true, msg: 'Favorite successfully deleted.' });
        } else {
            res.status(404).json({ success: false, msg: 'Favorite not found or not associated with the user.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

async function addFavorite(id) {
    try {
        console.log('Adding favorite for user ID:', id);
        await Favorite.create({ id: id });
        console.log('Favorite created successfully.');
    } catch (error) {
        console.error('Error in addFavorite function:', error);
        throw error; // rethrow the error to be caught by the route handler
    }
}



export default router;
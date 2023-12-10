import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const   ReviewSchema = new Schema({
    movieId: { type: Number, required: true, unique: true },
    rating: { type: String, required: true, unique: true },
    review: { type: String, required: true, unique: true },
});

  

export default mongoose.model('Review', ReviewSchema);
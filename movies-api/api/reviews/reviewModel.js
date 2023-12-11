import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    movieId: { type: Number, required: true,},
    rating: { type: Number},
    review: { type: String, required: true},
    author: { type: String, required: true}
});
 

export default mongoose.model('Review', ReviewSchema);
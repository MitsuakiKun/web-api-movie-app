import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const  FavoriteSchema = new Schema({
    id: { type: Number, required: true},
});

  

export default mongoose.model('Favorite', FavoriteSchema);
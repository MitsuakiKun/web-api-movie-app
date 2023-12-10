import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const  MustWatchSchema = new Schema({
    id: { type: Number, required: true, unique: true },
});

  

export default mongoose.model('MustWatch', MustWatchSchema);
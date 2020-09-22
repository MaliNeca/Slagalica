import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Point = new Schema({

    bodovi: Number



});

export default mongoose.model('Point', Point);
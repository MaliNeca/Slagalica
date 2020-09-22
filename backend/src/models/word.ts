import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Word = new Schema({

    rec: String



});

export default mongoose.model('Word', Word);
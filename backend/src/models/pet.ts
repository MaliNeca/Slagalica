import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Pet = new Schema({
    "5x5":[{
        "1": { type: String},
        "2": { type: String},
        "3": { type: String},
        "4": { type: String},
        "5": { type: String}
    }]
   
});

export default mongoose.model('Pet', Pet);
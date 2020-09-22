import mongoose from 'mongoose';
import { ObjectId, ObjectID, Int32 } from 'bson';

const Schema = mongoose.Schema;

let Game = new Schema({
    datum: {type:Date},
    anagramID: {type: String},
    peharID: {type: String},
    users:[{
        username: { type: String},
        bodovi: { type: Number}
       
    }]
   
});

export default mongoose.model('Game', Game);
import mongoose from 'mongoose';
import { ObjectId } from 'bson';

const Schema = mongoose.Schema;

let Anagram = new Schema({
    Anagrami:[{
        
        zagonetka: { type: String},
        resenje: {type:String}
    }]
   
});

export default mongoose.model('Anagram', Anagram);
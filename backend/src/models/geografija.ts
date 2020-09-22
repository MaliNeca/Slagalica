import mongoose from 'mongoose';


const Schema = mongoose.Schema;

let Geografija = new Schema({
    Geografija:[{
        slovo: { type: String},
        odgovori:[{
            kategorija: { type: String},
            termin: {type:String}
        }]
        
    }]
   
});

export default mongoose.model('Geografija', Geografija);
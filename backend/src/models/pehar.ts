import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Pehar = new Schema({
   

    Pehar:[{
        "9G":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        
        },
        "8G":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        },
        "7G":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        },
        "6G":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        },
        "5G":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        },
        "4G":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        },
        "3":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        },
        "4D":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        },
        "5D":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        },
        "6D":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        },
        "7D":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        },
        "8D":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        },
        "9D":{
            Pitanje: {type: String},
            Odgovor: {type: String}
        }
        
    }]
   
});

export default mongoose.model('Pehar', Pehar);
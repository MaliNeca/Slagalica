import express from 'express';
import cors from 'cors';
import bodyParser, { json } from 'body-parser';
import mongoose from 'mongoose';



const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/users');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('mongo open');
})

const router = express.Router();

import User from './models/user';
import Anagram from './models/anagram';
import Pet from './models/pet';
import Pehar from './models/pehar';
import Game from './models/game';
import Geografija from './models/geografija';
import Word from './models/word';
import Point from './models/point';

router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    
    User.find({ 'username': username },
        (err, user) => {
            if (err) console.log(err);
            else {
                res.json(user);
            }
        })
});
router.route('/getWords').get((req, res) => {
    Word.find((err, word) => {
        if (err) console.log(err);
        else {

            res.json(word);
        }
    })
});
router.route('/getPoints').get((req, res) => {
    Point.find((err, point) => {
        if (err) console.log(err);
        else {

            res.json(point);
        }
    })
});
router.route('/insertPoints').post((req,res)=>{

    let point = new Point(req.body);
    
    point.save().
        then(point => {
            res.status(200).json({ 'point': 'ok' });
        }).catch(err => {
            res.status(400).json({ 'point': 'no' });
        })

});
router.route('/insertWords').post((req,res)=>{

    let word = new Word(req.body);
    
    word.save().
        then(word => {
            res.status(200).json({ 'word': 'ok' });
        }).catch(err => {
            res.status(400).json({ 'word': 'no' });
        })

});
router.route('/register').post((req, res) => {
    let user = new User(req.body);

    user.save().
        then(user => {
            res.status(200).json({ 'user': 'ok' });
        }).catch(err => {
            res.status(400).json({ 'user': 'no' });
        })
});

router.route('/checkUsername').post((req, res) => {
    let username = req.body.username;
    User.findOne({ 'username': username },
        (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
});

router.route('/checkJMBG').post((req, res) => {
    let username = req.body.username;
    let jmbg = req.body.jmbg;
    User.findOne({ 'username': username, 'jmbg': jmbg },
        (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
});

router.route('/checkQuestion').post((req, res) => {
    let username = req.body.username;
    let answer = req.body.answer;
    User.findOne({ 'username': username, 'answer': answer },
        (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
});

router.route('/changePassword').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.findOneAndUpdate({ 'username': username }, { 'password': password }, (err, user) => {
        if (err) console.log(err);
        else {

            res.json(user);
        }
    });

});

router.route('/getRequest').get((req, res) => {
    User.find({ 'approved': 'no' }, (err, user) => {
        if (err) console.log(err);
        else {
            res.json(user);
        }
    })
});

router.route('/allowRequest').post((req, res) => {
    let username = req.body.username;

    User.findOneAndUpdate({ 'username': username }, { 'approved': 'yes' }, (err, user) => {
        if (err) console.log(err);
        else {
            res.json(user);
        }
    });

});
router.route('/removeWord').post((req,res)=>{
   
    let word = req.body.word;
    Word.deleteOne({ 'rec': word }, (err: any) => {
        if (err) console.log(err);
        else {
            res.json(word);
        }
    });
})
router.route('/blockRequest').post((req, res) => {
    let username = req.body.username;

    User.deleteOne({ 'username': username }, (err: any) => {
        if (err) console.log(err);
        else {
            res.json(username);
        }
    });

});

router.route('/insertAnagram').post((req, res) => {

    let zagonetka = req.body.zagonetka;
    let resenje = req.body.resenje;


    let id = 1;
    Anagram.updateOne({ 'id': id }, { $push: { 'Anagrami': { 'zagonetka': zagonetka, 'resenje': resenje } } }, (err, anagram) => {
        if (err) {
            console.log(err);
        } else {

            res.json(anagram);
        }
    });
});

router.route('/insertPet').post((req, res) => {

    let prva = req.body.prva;
    let druga = req.body.druga;
    let treca = req.body.treca;
    let cetvrta = req.body.cetvrta;
    let peta = req.body.peta;

    let id = 1;
    Pet.updateOne({ 'id': id }, { $push: { '5x5': { '1': prva, '2': druga, '3': treca, '4': cetvrta, '5': peta } } }, (err, pet) => {
        if (err) {
            console.log(err);
        } else {

            res.json(pet);
        }
    });
});




router.route('/insertPehar').post((req, res) => {

    const data = {
        "9G": {
            Pitanje: req.body.pitanje1,
            Odgovor: req.body.odgovor1
        }
    }

    let id = 1;
    Pehar.updateOne({ 'id': id }, { $push: { 'Pehar': req.body } }, (err, pehar) => {
        if (err) {
            console.log(err);


        } else {

            res.json(pehar);
        }
    });
});

router.route('/getAnagrams').post((req, res) => {

    if (req.body.anagramID) {

        Anagram.aggregate([
            {
                "$match": {
                    "Anagrami": {
                        "$elemMatch": { "zagonetka": req.body.anagramID }
                    }
                }
            },


            { "$unwind": "$Anagrami" },


            { "$match": { "Anagrami.zagonetka": req.body.anagramID } },
            {
                "$group": {
                    "_id": "$_id",
                    "Anagrami": { "$push": "$Anagrami" }
                }
            }
        ]).exec(function (err, anagram) {
            if (err) {
                console.log(err);
            } else {

                res.json(anagram);
            }
        });

    } else {

        Anagram.find((err, anagram) => {
            if (err) console.log(err);
            else {

                res.json(anagram);
            }
        })
    }
});
router.route('/getPet').get((req, res) => {
    Pet.find((err, pet) => {
        if (err) console.log(err);
        else {

            res.json(pet);
        }
    })
});

router.route('/getPehars').post((req, res) => {
    if (req.body.peharID) {

        Pehar.aggregate([
            {
                "$match": {
                    "Pehar": {
                        "$elemMatch": { "9G.Pitanje": req.body.peharID }
                    }
                }
            },


            { "$unwind": "$Pehar" },


            { "$match": { "Pehar.9G.Pitanje": req.body.peharID } },
            {
                "$group": {
                    "_id": "$_id",
                    "Pehar": { "$push": "$Pehar" }
                }
            }
        ]).exec(function (err, pehar) {
            if (err) {
                console.log(err);
            } else {

                res.json(pehar);
            }
        });
    } else {


        Pehar.find((err, pehar) => {
            if (err) console.log(err);
            else {

                res.json(pehar);
            }
        })
    }
});

router.route('/insertSingleGame').post((req, res) => {
    let minDate = req.body.minDate;
    let maxDate = req.body.maxDate;

    Game.updateOne(
        { 'datum': { "$gte": minDate, "$lt": maxDate } },
        { $setOnInsert: { 'datum': req.body.datum, 'anagramID': req.body.anagramID, 'peharID': req.body.peharID, 'users': [] } },
        { upsert: true }
        , (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }


    )
});

router.route('/updateSingleGame').post((req, res) => {

    let minDate = req.body.minDate;
    let maxDate = req.body.maxDate;

    Game.updateOne(
        { 'datum': { "$gte": minDate, "$lt": maxDate }, 'users': [] },
        { 'datum': req.body.datum, 'anagramID': req.body.anagramID, 'peharID': req.body.peharID, 'users': [] }
        , (err, game) => {
            if (err) {
                console.log(err);
            } else {

                res.json(game);
            }
        }


    )
});
router.route('/insertSingleGameUser').post((req, res) => {

    let username = req.body.username;
    let bodovi = req.body.bodovi;
    let minDate = req.body.minDate;
    let maxDate = req.body.maxDate;

    Game.updateOne({ 'datum': { "$gte": minDate, "$lt": maxDate } }, { $push: { 'users': { 'username': username, 'bodovi': bodovi, } } }, (err, game) => {
        if (err) {
            console.log(err);
        } else {

            res.json(game);
        }
    });
});
router.route('/checkSingleGame').post((req, res) => {

    let username = req.body.username;
    let minDate = req.body.minDate;
    let maxDate = req.body.maxDate;

    Game.find(
        {
            'datum': { "$gte": minDate, "$lt": maxDate },
            'users': { $elemMatch: { 'username': username } }
        }
        , (err, game) => {
            if (err) console.log(err);
            else {

                res.json(game);
            }
        })
});

router.route('/getSingleGame').post((req, res) => {


    let minDate = req.body.minDate;
    let maxDate = req.body.maxDate;

    Game.find(
        { 'datum': { "$gte": minDate, "$lt": maxDate } }

        , (err, game) => {
            if (err) console.log(err);
            else {

                res.json(game);
            }
        })
});


router.route('/getTop').get((req, res) => {


    Game.aggregate([

        { "$unwind": "$users" },
        {
            $sort: {
                'users.bodovi': -1
            }
        }
    ]).exec(function (err, game) {
        if (err) {
            console.log(err);
        } else {

            res.json(game);
        }
    });


});
router.route('/getUserScore').get((req, res) => {
    var minDate = new Date();
    minDate.setHours(0);
    minDate.setMinutes(0);
    minDate.setSeconds(0);
    minDate.setDate(minDate.getDate());
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 1);
    maxDate.setHours(0);
    maxDate.setMinutes(0);
    maxDate.setSeconds(0);
    console.log(minDate);
    console.log(maxDate);
    Game.aggregate([
        {
            "$match": {
                "datum": { "$gte": minDate, "$lt": maxDate }
            }
        },
        { "$unwind": "$users" },
        {
            $sort: {
                'users.bodovi': -1
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "users": { "$push": "$users" }
            }
        }
    ]).exec(function (err, game) {
        if (err) {
            console.log(err);
        } else {

            res.json(game);
        }
    });

});

router.route('/getGeografija').post((req, res) => {



    Geografija.aggregate([
        {
            "$match": {
                "Geografija": {
                    "$elemMatch": { "slovo": req.body.slovo }
                }
            }
        },


        { "$unwind": "$Geografija" },


        { "$match": { "Geografija.slovo": req.body.slovo } },
        {
            "$group": {
                "_id": "$_id",
                "Geografija": { "$push": "$Geografija" }
            }
        }
    ]).exec(function (err, anagram) {
        if (err) {
            console.log(err);
        } else {

            res.json(anagram);
        }
    });


});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
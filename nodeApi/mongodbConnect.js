const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/AnimeApp', {useNewUrlParser: true})
    .then(client => {
        console.log('Connected to MongoDb server');

        const db = client.db('AnimeApp');

        db.collection('Animes').insertOne({
            title: 'AnimeTitle',
            episodes: '20 eps',
            genres: ['genre1', 'genre2'],
            release: 'Release Date',
            rating: 5.6,
            synopsis: "synopsis"

        }).then((res) => {
            console.log(res.ops);
        }).catch(err => {
            console.log("Insert error",err);
        });

        client.close().then(() => console.log('Connection closed'));
    })
    .catch(err => {
        console.log(err);
    });
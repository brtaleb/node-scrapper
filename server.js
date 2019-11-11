const {scraper, parser} = require('./lib');
const express = require('express');

let app = express();

const URL = "https://myanimelist.net/anime/season";

scraper(URL).then(resp => {
    const {data} = resp;
    const animes = parser(data);

    app.get('/animes', (req, res) => {
        res.send({
            animes
        })
    });

    app.get('/animes/:genre', (req, res) => {
        const genre = req.params.genre;
        let filteredAnimes = animes.filter(el => {
            return el.genres.includes(genre)
        });
        if (filteredAnimes.length < 1) {
            res.send({
                error: "Nothing to see here :("
            })
        } else {
            res.send({
                filteredAnimes
            })
        }
    });

    app.get('/animes/rating/:rating', (req, res) => {
        const rating = req.params.rating;
        let filteredAnimes = animes.filter(el => {
            return el.rating >= parseInt(rating);
        });
        if (filteredAnimes.length < 1) {
            res.send({
                error: "Nothing to see here :("
            })
        } else {
            res.send({
                filteredAnimes
            })
        }
    });
});

app.listen(1234, () => {
    console.log('Serve running on port:1234');
});

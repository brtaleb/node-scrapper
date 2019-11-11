const cheerio = require('cheerio');

module.exports = function parser(html, schema) {
    const $ = cheerio.load(html);
    const animes = [];

    $("div.seasonal-anime").each(function () {
        const title = $(this)
            .find('p.title-text a')
            .text();

        const episodes = $(this)
            .find('div.eps a span')
            .text();

        const genres = [];
        $(this).find('div.genres-inner span').each(function () {
            const genre = $(this)
                .find('a')
                .text();
            genres.push(genre.toLowerCase());
        });

        const release = $(this)
            .find('div.info span')
            .text().trim().slice(0,12);

        const rating = parseFloat($(this)
                .find('div.scormem span.score')
                .text().trim());

        const synopsis = $(this)
            .find('div.synopsis span.preline')
            .text();


        animes.push({
            title,
            episodes,
            genres,
            release,
            rating,
            synopsis
        });
    });

    return animes;
};
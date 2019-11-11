const axios = require('axios');

module.exports = function scrapper(url){
    return axios.get(url);
};
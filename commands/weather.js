var util = require('../util');
var http = require('http');

function getWeather(zip, cb) {

    http.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${process.env.OPEN_WEATHER_API_KEY}`, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            cb(parsedData);
        } catch (e) {
            console.error(e.message);
        }
    });
    }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    });

}

module.exports = function (param) {
	var	channel = param.channel;

    getWeather(param.args[0], (data) => {
	    util.postMessage(channel, JSON.stringify(data));
    });

};
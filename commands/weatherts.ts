import * as util from "../util";
import * as rp from "request-promise";

async function weatherts({ channel, args }) {
    const data = await rp(`http://api.openweathermap.org/data/2.5/weather?zip=${args[0]}&APPID=${process.env.OPEN_WEATHER_API_KEY}`);
    util.postMessage(channel, data);
}

module.exports = weatherts;
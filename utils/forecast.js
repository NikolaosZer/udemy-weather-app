const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=6e1325768bfae25e4077a91ae3b96052&query=${lat},${lon}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast
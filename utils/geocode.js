const request = require('request')

const geocode = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6e1325768bfae25e4077a91ae3b96052&query=${address}`;

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                lat: body.location.lat,
                lon: body.location.lon,
                location: body.location.name
            })
        }
    })
}

module.exports = geocode
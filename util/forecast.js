const request = require('request');

const forecast = (location, latitude, longitude, callback) => {

    const url = "https://api.darksky.net/forecast/7eb5b71562a99f16c7673658220e884c/" + latitude + "," + longitude;

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback({
                error: 'Forecast service could not be reached!'
            })
        } else if(body.error) {
            callback({
                error: body.error
            })
        }else{
            const reply = location + " is " + body.currently.summary + " at " + body.currently.temperature + " degrees with " + body.currently.precipProbability + "% of rain with wind speed " + body.currently.windSpeed;
            callback(undefined, {
                location: location,
                forecast: reply
            })
        }

    })
}

module.exports = forecast
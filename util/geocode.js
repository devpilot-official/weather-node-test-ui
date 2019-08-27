const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGV2LXBpbG90IiwiYSI6ImNqenMxOTN0eDE4NWgzY2xtajdub2dtdHAifQ.uRPM5qto8nHe6XUgpIAKYQ";

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback({
                error: 'Could not connect to geocoding api'
            });
        } else if(body.features.length === 0){
            callback({
                error: "Location could not be determined. Please check again."
            });
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
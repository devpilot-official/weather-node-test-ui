const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../util/geocode');
const forecast = require('../util/forecast');


const app = express();
const port = process.env.PORT || 4000;


//Define paths for express config
const publiDirectory = path.join(__dirname, '../assets');
const viewDirectory = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // To set up handlebars
app.set('views', viewDirectory) // Because the view directory is renamed to templates
hbs.registerPartials(partialPath);

// Set up static directory to serve
app.use(express.static(publiDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast',
        content: 'Know the state of your weather',
        name: 'Muhammed Salaudeen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather Forecast',
        content: 'Know more about this app.',
        name: 'Muhammed Salaudeen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather Forecast Help',
        content: 'What kinda help do you need?',
        name: 'Muhammed Salaudeen'
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.address;
    if (!location) {
        return res.send({
            error: 'Address is required'
        })
    }

    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send(error);
        }else{
            // res.send(data);
            forecast(location, latitude, longitude, (error, data) => {
                if (error) {
                    return res.send(error);
                } else {
                    res.send(data);
                }
            })
        }  
    })

    // res.send('This is a weather report');
})


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather Forecast Page Not Found (404)',
        content: 'Oops! Sorry we could not find the resource you are looking for.',
        name: 'Muhammed Salaudeen'
    })
})

app.listen(port, () => {
    console.log("Started server on port " + port);
})
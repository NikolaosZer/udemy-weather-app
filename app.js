const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');
const port = process.env.PORT || 3000
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nikolaos Zervas'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'A help page example',
        name: 'Nikolaos Zervas'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nikolaos Zervas'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Address must be provided'
        });
    } else {
        geocode(req.query.address, (error, { lat, lon, location } = {}) => {
            if (error) {
                console.log('Geocode error')
                return res.send({ error });
            }
            forecast(lat, lon, (error, forecastData) => {
                if (error) {
                    res.send({ error });
                }
                return res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            });
        });
    }
});

app.get('/products', (req, res) => {
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikolaos Zervas',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
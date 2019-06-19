"use strict";

/**
 * Definition
 */


import express from 'express';
import weather from '../helpers/weather';
import location from '../helpers/location';

const router = express.Router();

router.get('/', (req, res) => {  
  res.render('index', { title: 'Weather'});
});

/* GET weather. */
router.get('/getWeather', (req, res, next) => {
  if((req.query.city !== undefined && req.query.city !== '') 
  && (req.query.country !== undefined && req.query.country !== '')){
    let location = {
      city: req.query.city,
      country: req.query.country
    };

    /* Learning the weather according to the location given by Promise structure. */
    weather(location)
        .then((currentWeather) => {
          turnFrontEnd(currentWeather, res);
        })
        .catch(error => console.log(error)
        );
  }else{
    /* This is done with rope */
    /* Learning user location with IP */
    location()
      .then((location) => {
          return weather(location)
              .then((currentWeather) => {
                turnFrontEnd(currentWeather, res);
              }, error => console.log(error));
      }).catch(error => console.log(error));
  }
});

function turnFrontEnd(currentWeather, res){
  if((currentWeather.weather.search('clouds') != -1) && (currentWeather.weather.search('broken') != -1 || currentWeather.weather.search('few') != -1)){
    currentWeather.image = '/images/clouds.png'
    res.json(currentWeather);
  }else if(currentWeather.weather.search('clear') != -1 && currentWeather.weather.search('sky') != -1){
    currentWeather.image = '/images/clear-sky.png'
    res.json(currentWeather);
  }else if(currentWeather.weather.search('scattered') != -1 && currentWeather.weather.search('clouds') != -1){
    currentWeather.image = '/images/scattered-clouds.png'
    res.json(currentWeather);
  }else if(currentWeather.weather.search('rain') != -1){
    currentWeather.image = '/images/rainy.png'
    res.json(currentWeather);
  }else if(currentWeather.weather.search('snow') != -1){
    currentWeather.image = '/images/snowy.png'
    res.json(currentWeather);
  }else if(currentWeather.weather.search('thunderstorm') != -1){
    currentWeather.image = '/images/thunderstorm.png'
    res.json(currentWeather);
  }
}

module.exports = router;

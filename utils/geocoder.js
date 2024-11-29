const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'dE9UzUekfyfSDMifQs1HQcySchM56ebP',
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;

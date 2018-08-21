const newrelic = require('newrelic');
const siege = require('siege');

let sieger = siege().on(3003)
  for (let i = 9000000; i < 9050000; i++) {
    var enji = sieger.get(`/api/listings/${i}`).for(1).times;
  }
  enji.attack();

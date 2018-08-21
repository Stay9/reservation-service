const express = require('express');
const path = require('path');
const redis = require('redis');
const db = require('../db/cassandra-db.js');
const utils = require('./utils.js');

const client = redis.createClient();

client.on('error', (err) => {
  console.log('Error', err);
});

const PORT = process.env.PORT || 3003;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(path.join(__dirname, '../public')));


app.get('/api/listings/:listingId', (req, res) => {
  const listingID = req.params.listingId;
  client.get(listingID, (error, result) => {
    if (result) {
      res.send(utils.formatResults(result));
      // the result exists in our cache - return it to our user immediately
    } else {
      // query db for listing
      db.getListingById(listingID, (err, queryResult) => {
        if (err) {
          res.status(500).send({ err: `Server oopsie ${err}` });
        } else if (queryResult.length === 0) {
          res.status(404).send('No such listing');
        } else {
          client.setex(listingID, 60, queryResult);
          res.send(utils.formatResults(queryResult));
        }
      });
    }
  });
});

app.get('/api/dates/:listingId', (req, res) => {
  // TODO: refactor using router
  let method = db.getBookedDatesByListingId;
  let data = null;
  console.log('req:', req);
  if (req.query.targetDate) {
    method = db.getFirstBookedDateAfterTarget;
    let target = req.query.targetDate.split('-');
    data = [req.params.listingId, ...target];
  }

  if (req.query.month) {
    let month = req.query.month.split('-');
    data = [req.params.listingId, ...month];
  }

  method(data, (err, result) => {
    if (err) {
      res.status(500).send({ err: `Server oopsie ${err}` });
    } else res.send(result);
  });
});

app.post('/api/reservations/new', (req, res) => {
  // TODO: find more elegant implementation that ensures atomicity
  // make sure it is sending this info: listing_id, username, checkin, checkout,
  // adults_count, pups_count, total_charge
  const data = utils.parseBookedDates(req.body);
  console.log('REQ BODY', req.body);
  // const data = {
  //   listing_id: ,
  //   username: ,
  //   checkin:  ,
  //   checkout: ,
  //   adults_count: ,
  //   pups_count: ,
  //   total_charge
  // };
  db.postNewReservation(data, (error, reservation) => {
    if (error) {
      res.status(500).send({ error: 'Failed to post reservation' });
    } else res.status(201).send(reservation);
  });
});

app.put('/api/listings/:listingId', (req, res) => {
  const data = req.body;
  db.updateListingRateById(data, (err) => {
    if (err) {
      res.status(500).send({ err: 'Failed to update listing rate' });
    } else {
      res.send();
    }
  });
});

app.delete('/api/reservation/:reservationId', (req, res) => {
  const date = req.body;
  db.deleteReservationById(data, (err, result) => {
    if (err) {
      res.status(500).send({err: 'Failed to delete reservation'});
    } else {
      res.send();
    }
  });
});


app.listen(PORT, () => console.log('Listening at port: ' + PORT));

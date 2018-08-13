const express = require('express');
const path = require('path');
const db = require('../db/db.js');
const utils = require('./utils.js');
const PORT = process.env.PORT || 3003;

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log('Listening at port: ' + PORT));


app.get('/api/listings/:listingId', (req, res) => {

  db.getListingById(req.params, (err, result) => {
    if (err) {
      res.status(500).send({ err: `Server oopsie ${err}` });
    } else if (result.length === 0) {
      res.status(404).send('No such listing')
    } else {
      db.getReviewsByListingId(result[0].review_id, (err, reviews) => {
        if (err) {
          res.status(500).send({err: `Server oopsie ${err}`})
        } else {
          result[0].reviews = reviews[0];
          res.send(result[0]);
        }
      })
    }
  });

});

app.get('/api/dates/:listingId', (req, res) => {
  // TODO: refactor using router
  let method = db.getBookedDatesByListingId;
  let data = null;

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
  const data = utils.parseBookedDates(req.body);
  db.postNewBookedDates(data, (err, result) => {
    if (err) {
      res.status(500).send({ err: 'Failed to post dates' });
    } else {
      data.bookedDatesId = result.insertId;
      db.postNewReservation(data, (error, reservation) => {
        if (err) {
          db.deleteBookedDatesById(result.insertId, () => {
            res.status(500).send({ err: 'Failed to post reservation' });
          });
        } else res.status(201).send(reservation);
      });
    }
  });

});

app.put('/api/listings/:listingId', (req, res) => {
  db.updateListingRateById();
});

app.delete('/api/reservation/:reservationId', (req, res) => {
  db.deleteReservationById();
});

// // GET request to the server to retrieve listing's information by id
//
// //curl -H "Content-Type: application/json" -X GET -d '{"listingId":"12345678"}' http://localhost:3003/api/listings/:listingId
//
// // POST request to the server to add a new reservation
// ```sh
// curl -H "Content-Type: application/json" -X POST -d '{"user":"Sharon Stone", "check_in":"2018-09-04", "check_out":"2018-09-09", "total_adults":"2", "total_pups":"2", "fees":"100.45", "tax":"60.27", "rent":"423.13", "listingId":"1234567"}' http://localhost:3003/api/reservations/new
// ```
//
// ### PUT request to update a listing at a specific id with a new rate
// ```sh
// curl -H "Content-Type: application/json" -X PUT -d '{"listingId":"123456", "rate":"127.81"}' http://localhost:3003/api/listings/:listingId/rate/:rate
// ```
//
// ### DELETE request to remove a reservation by id
// ```sh
// curl -H "Content-Type: application/json" -X DELETE -d '{"reservationId":"45012"}' http://localhost:3003/api/reservation/:reservationId
// ```

const cassandra = require('cassandra-driver');
//
const client = new cassandra.Client({contactPoints: ['localhost'], keyspace: 'sdc' });


const getListingById = ({ listingId }, callback) => {
  console.log('on DB:', listingId);
  const queryStr = `SELECT * from listings WHERE id = ?;`;
  client.execute(queryStr, [listingId], { prepare: true }, callback);
};

const getReviewsByListingId = (listingId, callback) => {
  const queryStr = `SELECT review_count, rating from listings WHERE id = ?`;
  client.execute(queryStr, [listingId], { prepare: true }, callback);
};

const getBookedDatesByListingId = ([listingId, year, month], callback) => {
  let startDate = [year, month, 1].join('-');
  let endDate = month === 12? [Number(year)+1, 1, 1].join('-'): [year, Number(month)+1, 1].join('-');

  const queryStr = `SELECT checkin, checkout FROM reservations WHERE listing_id = ? AND checkin >= ? AND checkin < ? ORDER BY checkin`;
  client.execute(queryStr, [listingId, startDate, endDate], { prepare: true }, callback);
};

const getFirstBookedDateAfterTarget = ([listingId, year, month, date], callback) => {
  let startDate = [year, month, date].join('-');
  let endDate = month === 12? [Number(year)+1, 1, 1].join('-'): [year, Number(month)+1, 1].join('-');

  const queryStr = `SELECT checkin FROM reservations WHERE listing_id = ? AND checkin > ? AND checkin < ? ORDER BY checkin ASC LIMIT 1`;
  client.execute(queryStr, [listingId, startDate, endDate], { prepare: true }, callback)
}

// edit to send in col info for whole record in reservations table
const postNewBookedDates = (data, callback) => {
  const queryStr = `INSERT INTO reservations (id, listing_id, username, checkin, checkout, adults_count, pups_count, total_charge) VALUES (?)`;
  client.execute(queryStr, [uuid(), data.listingId, data.username, data.checkIn, data.checkOut, data.adults_count, data.pups_count, data.total_charge], { prepare: true }, callback);
}
// {guestId, bookedDatesId, guests, total}
const postNewReservation = ({listing_id, username, checkin, checkout, adults_count, pups_count, total_charge}, callback) => {
  const queryStr = `INSERT INTO reservations `
    + `(id, listing_id, username, checkin, checkout, adults_count, pups_count, total_charge) VALUES (?)`;
  const values = [uuid(), listing_id, username, checkin, checkout, adults_count, pups_count, total_charge];
  client.execute(queryStr, [values], { prepare: true }, callback);
};

const deleteBookedDatesById = ({listingId}, callback) => {
  const queryStr = `DELETE FROM booked_dates WHERE id = ?`;
  client.execute(queryStr, listingId, { prepare: true }, callback);
};

// PUT method to update a listing at a specific id with a new rate
const updateListingRateById = ({rate, listingId}, callback) => {
  const queryStr = `UPDATE listings SET rate = ? WHERE id = ?`;
  client.execute(queryStr, [rate, listingId], { prepare: true }, callback);
};

// DELETE method to remove reservation by reservationID
const deleteReservationById = ({resId}, callback) => {
  const queryStr = `DELETE FROM reservations WHERE id = ?`;
  client.execute(queryStr, resId, { prepare: true }, callback);
};



module.exports = {
  getListingById,
  getReviewsByListingId,
  getBookedDatesByListingId,
  getFirstBookedDateAfterTarget,
  postNewBookedDates,
  postNewReservation,
  deleteBookedDatesById,
  updateListingRateById,
  deleteReservationById,
};

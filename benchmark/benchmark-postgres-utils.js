const faker = require('faker');
const generateListingSelectQuery = function (n) {
  let query = '';
  for (let i = 0; i < n; i++) {
    query += `SELECT * FROM listings where id=${Math.floor(Math.random() * 1000000) + 9000000};\n`;
  }
  return query;
};

// const generateReviewsSelectQuery = function (n) {
//   let query = '';
//   for (let i = 0; i < n; i++) {
//     query += `SELECT review_count, rating FROM listings WHERE id=\n`;
//   }
//   return query;
// };

const formatFakerDate = function(fakerdate) {
  return JSON.stringify(fakerdate).slice(1, 11)
};

const generateRandomDate = function (month) {

  return formatFakerDate(faker.date.between('2018-01-01', '2018-05-31'));
};

const generateDatesSelectQuery = function (n) {
  let query = '';
  for (let i = 0; i < n; i++) {
    let randomDate = generateRandomDate(0);
    let month = Number(randomDate.slice(5, 7));
    query += `SELECT checkin, checkout FROM reservations WHERE listing_id=${Math.floor(Math.random() * 1000000) + 9000000} AND checkin >= '${randomDate}'::date AND checkin < '${generateRandomDate(month)}'::date ORDER BY checkin;\n`;
  }
  console.log(query);
};

generateDatesSelectQuery(100);

//
// const generateMonthDatesSelectQuery = function (n) {
//   let query = '';
//   for (let i = 0; i < n; i++) {
//     let randomDate = generateRandomDate(0);
//     let month = Number(randomDate.slice(5, 7));
//     query += `SELECT checkin FROM reservations WHERE listing_id = ${(Math.random() * 1000000) + 9000000} AND checkin > ${randomDate} AND checkin < ${generateRandomDate(month)} ORDER BY checkin ASC LIMIT 1;\n`;
//   }
//   return query;
// };



// const generateDatesInsertQuery = function (n) {
//   let query = '';
//   for (let i = 0; i < n; i++) {
//     let valueArr = [];
//     valueArr.push((Math.random() * 10000000) + 1); // reservationID
//     valueArr.push((Math.random() * 10000000) + 1); // listingID
//     valueArr.push('name'); // username
//     valueArr.push('2018-01-08'); // checkin
//     valueArr.push('2018-03-18'); // checkout
//     valueArr.push(Math.floor(Math.random() * 5)); // adults count
//     valueArr.push(Math.floor(Math.random() * 8)); // pups count
//     valueArr.push(getRandomFloat(50.00, 3000.00)); // total charge
//     let valueStr = valueArr.join(', ');
//     query += `INSERT INTO reservations (id, listing_id, username, checkin, checkout, adults_count, pups_count, total_charge) VALUES (${valueStr});\n`;
//   }
//   return query;
// };

const getRandomFloat = (min, max) => Math.random() * (max - min + 1) + min;

const generateReservationInsertQuery = function (n) {
  let query = '';
  for (let i = 0; i < n; i++) {
    let valueArr = [];
    valueArr.push(Math.floor(Math.random() * 10000000) + 1); // reservationID
    valueArr.push(Math.floor(Math.random() * 10000000) + 1); // listingID
    valueArr.push(`'name'`); // username
    valueArr.push(`'2018-01-08'`); // checkin
    valueArr.push(`'2018-03-18'`); // checkout
    valueArr.push(Math.floor(Math.random() * 5)); // adults count
    valueArr.push(Math.floor(Math.random() * 8)); // pups count
    valueArr.push(getRandomFloat(50.00, 3000.00)); // total charge
    let valueStr = valueArr.join(', ');
    query += `INSERT INTO reservations (id, listing_id, username, checkin, checkout, adults_count, pups_count, total_charge) VALUES (${valueStr});\n`;
  }
  return query;
};

// const generateDatesDeleteQuery = function (n) {
//   let query = '';
//   for (let i = 0; i < n; i++) {
//     query += `DELETE FROM reservations WHERE id = ${(Math.random() * 1000000) + 9000000};\n`;
//   }
//   return query;
//  };

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateRateUpdateQuery = function (n) {
  let query = '';
  for (let i = 0; i < n; i++) {
    query += `UPDATE listings SET rate=${getRandomInt(40, 700)} WHERE id=${Math.floor(Math.random() * 1000000) + 9000000};\n`;
  }
  return query;
};

const generateReservationDeleteQuery = function (n) {
  let query = '';
  for (let i = 0; i < n; i++) {
    query += `DELETE FROM reservations WHERE id = ${Math.floor(Math.random() * 1000000) + 9000000};\n`;
  }
  return query;
};

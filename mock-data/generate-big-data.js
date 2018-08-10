const faker = require('faker');
const fs = require('fs');

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomFloat = (min, max) => Math.random() * (max - min + 1) + min;
const formatFakerDate = (fakerdate) => JSON.stringify(fakerdate).slice(1, 11);

const generateListings = () => {
  let recordCount = 0;
  // write column headings
  // const columns = `id\tname\treview_count\trating\tmin_stay\tmax_guests\tfees\trate\tweekly_views\n`;
  // fs.writeFileSync('./sampleListings.tsv', columns);

  // enter records 100K at a time
  while (recordCount < 10000000) {
    let record = '';
    let chunk = 0;
    while (chunk < 1000000) {
      // id
      record += `${recordCount + 1}\t`;
      // listing name
      record += `Listing ${recordCount + 1}\t`;
      // total review count
      record += `${getRandomInt(0, 700)}\t`;
      // average rating
      record += `${getRandomFloat(1, 5)}\t`;
      // minimum stay
      record += `${getRandomInt(1, 3)}\t`;
      // maximum guests
      record += `${getRandomInt(2, 10)}\t`;
      // fees
      record += `${getRandomInt(10, 40)}\t`;
      // rate
      record += `${getRandomInt(40, 700)}\t`;
      // weekly_views
      record += `${getRandomInt(0, 600)}`;
      record += '\n';
      recordCount += 1;
      chunk += 1;
    }
    console.log(recordCount);
    fs.appendFileSync('./sampleListings.tsv', record);
  }
  console.log('number inserted:', recordCount);
};

const generateReservations = () => {
  let recordCount = 0;
  // column headings
  // const columns = `res_id\tlisting_id\tusername\tcheckin\tcheckout\tadults_count\tpups_count\ttotal_charge\n`;
  // fs.writeFileSync('./sampleReservations.tsv', columns);

  // fill records
  while (recordCount < 10000000) {
    let record = '';
    let chunk = 0;
    while (chunk < 1000000) {
      // reservation id
      record += `${recordCount + 1}\t`;
      // listing id
      record += `${getRandomInt(1, 10000000)}\t`;
      // user
      record += `${faker.name.findName()}\t`;
      // check in
      let checkin = formatFakerDate(faker.date.between('2018-01-01', '2018-05-31'));
      record += `${checkin}\t`;

      // check out
      let year = parseInt(checkin.slice(0, 4));
      let month = parseInt(checkin.slice(5, 7));
      let day = parseInt(checkin.slice(8, 10));
      if (day > 28) {
        day = 10;
        month += 1;
      }
      year = year.toString();
      month = ('0').concat(month.toString());
      day = day.toString();

      if (day.length === 1) {
        day = ('0').concat(day.toString());
      }
      const maxCheckout = `${year}-${month}-${day}`;
      const checkout = formatFakerDate(faker.date.between(checkin, maxCheckout));
      record += `${checkout}\t`;
      // adults count
      record += `${getRandomInt(1, 10)}\t`;
      // pups count
      record += `${getRandomInt(0, 10)}\t`;
      // total charge
      record += `${getRandomFloat(50.00, 3000.00)}`;
      record += '\n';
      recordCount += 1;
      chunk += 1;
    }
    console.log(recordCount);
    fs.appendFileSync('./sampleReservations.tsv', record);
  }
  console.log('number inserted:', recordCount);
};


// generateListings();
generateReservations();

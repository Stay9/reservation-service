const parseBookedDates = (data) => {
  const result = {
    checkIn: new Date(...data.checkIn),
    checkOut: new Date(...data.checkOut),
  };
  return result;
};


const formatResults = (result) => {
  return {
    id: result.rows[0].id,
    name: result.rows[0].name,
    rate: Math.round(result.rows[0].rate),
    reviews: {
      total_reviews: result.rows[0].review_count,
      avg_rating: result.rows[0].rating
    },
    minStay: result.rows[0].min_stay,
    maxGuests: result.rows[0].max_guests,
    fees: Math.round(result.rows[0].fees),
    taxRate: Math.floor(Math.random(20)) + 1,
    weeklyViews: result.rows[0].weekly_views
  };
}

module.exports = {
  parseBookedDates, formatResults
};

-- 95% read : 5% write

-- getListingById (~20x/visit)
SELECT * from listings WHERE id=1;

-- getReviewsByListingId* (~20x/visit)
-- SELECT review_count, rating FROM listings WHERE id=1;

-- getBookedDatesByListingId (~20x/visit)
SELECT checkin, checkout FROM reservations WHERE listing_id = 1 AND checkin >= '2018-01-03' AND checkin < '2018-02-04' ORDER BY checkin;

-- getFirstBookedDateAfterTarget* (~10x/visit)
-- SELECT checkin FROM reservations WHERE listing_id = ? AND checkin > ? AND checkin < ? ORDER BY check_in ASC LIMIT 1;

-- postNewBookedDates* (~1x/visit)
-- INSERT INTO reservations (listing_id, checkin, checkout) VALUES (?);

-- postNewReservation (~1x/visit)
INSERT INTO reservations (id, listing_id, username, checkin, checkout, adults_count, pups_count, total_charge) VALUES (1, 1, 'name', '2018-01-08', '2018-03-18', 4, 5, 72.43);

-- deleteBookedDatesById (~1x/visit)
-- DELETE FROM booked_dates WHERE id = ?;

-- updateListingRateById (~1x/visit)
UPDATE listings SET rate = 100 WHERE id = 1;

-- deleteReservationById (~1x/visit)
DELETE FROM reservations WHERE id = 1;

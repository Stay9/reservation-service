DROP KEYSPACE IF EXISTS sdc;

CREATE KEYSPACE sdc
WITH replication =
{
'class' : 'SimpleStrategy',
'replication_factor' : 1
};

USE sdc;

CREATE TABLE listings (
ID int PRIMARY KEY,
NAME varchar,
REVIEW_COUNT int,
RATING float,
MIN_STAY int,
MAX_GUESTS int,
FEES int,
RATE int,
WEEKLY_VIEWS int
);

CREATE TABLE reservations (
ID uuid PRIMARY KEY,
LISTING_ID int,
USERNAME varchar,
CHECKIN date,
CHECKOUT date,
ADULTS_COUNT int,
PUPS_COUNT int,
TOTAL_CHARGE float
);

CREATE TABLE reservation_checkin (
ID uuid,
LISTING_ID int,
USERNAME varchar,
CHECKIN date,
CHECKOUT date,
ADULTS_COUNT int,
PUPS_COUNT int,
TOTAL_CHARGE float,
PRIMARY KEY(LISTING_ID, CHECKIN)
);

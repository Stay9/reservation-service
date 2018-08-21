# Reservation Service for Stay9

> Booking module allows user to see general listing details, vacancies in a month, and make a reservation by choosing check-in/check-out dates on a calendar, and specify number of guests and pets.

## Related Projects

  - https://github.com/Stay9/Review-Service-1
  - https://github.com/Stay9/about-service
  - https://github.com/Stay9/hero-photo-service
  - https://github.com/Stay9/enji_proxy

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [API](#API)

## Usage

> Some usage instructions

## Requirements
- Node 8.11.3
- Mysql 8.0.11

## Development

### Setting Up

To create database of mock data
From within root directory:

```sh
mysql -h localhost -u root
source db/schema.sql
use reservation
source mock-data/mock_data.sql
```


To install dependencies
From within the root directory:

```sh
npm install -g webpack
npm install
npm run build
npm start
```
## API

### GET request to the server to retrieve listing's information by id
```sh
curl -H "Content-Type: application/json" -X GET -d '{"listingId":"1234567"}' http://localhost:3003/api/listings/:listingId
```

### POST request to the server to add a new reservation
```sh
curl -H "Content-Type: application/json" -X POST -d '{"listingId": "1234567", "checkIn":"2018-09-04", "checkOut":"2018-09-09", "adults":"2", "pups":"2", "total_charge":"423.13"}' http://localhost:3003/api/reservations/new
```

### PUT request to update a listing at a specific id with a new rate
```sh
curl -H "Content-Type: application/json" -X PUT -d '{"listingId":"123456", "rate":"127.81"}' http://localhost:3003/api/listings/:listingId
```

### DELETE request to remove a reservation by id
```sh
curl -H "Content-Type: application/json" -X DELETE -d '{"reservationId":"45012"}' http://localhost:3003/api/reservation/:reservationId
```

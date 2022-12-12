# Ride hailing app

## App execution

Create an environment file named .env in the root project folder and replace with your data PAYMENT_PRIVATE_KEY

```
DATABASE_HOST=ride-hailing-db
DATABASE_PORT=5432
DATABASE_USER=admin
DATABASE_PASSWORD=r1d3h@1l1ng
DATABASE_NAME=ride-hailing
DATABASE_SCHEMA=public
DATABASE_SYNCHRONIZE=true
PAYMENT_HOST=https://sandbox.wompi.co
PAYMENT_SOURCE_PATH=/v1/payment_sources
PAYMENT_PATH=/v1/transactions
PAYMENT_PRIVATE_KEY=<PAYMENT_PRIVATE_KEY>
```

To execute the application run
```
docker-compose up -d
```

### Seed database

Modify .env file, DATABASE_HOST must be pointing to database in your local environment, not from docker container
```
DATABASE_HOST=localhost
```

Execute the command
```
npm run seed
```

### Requests

- POST /payment-source - Create payment source
```
{
    "type": "CARD",
    "token": "<YOUR_CARD_TOKEN>",
    "acceptance_token": "<YOUR_ACCEPTANCE_TOKEN>",
    "userId": <USER_ID>
}
```

- POST /ride - Create ride
```
{
    "riderId": <RIDER_ID>,
    "lat": 1.213481,
    "lng": -77.300606
}
```
- POST /ride/<RIDE_ID>/finish - Finish ride
```
{
    "lat": 1.228228,
    "lng": -77.284287
}
```
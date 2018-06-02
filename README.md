#Netuguru's NodeJS Recruitment Task

# Info

I have decided to make it as simple as possible, without overusing all the fancy things like webpack, etc. I've decided to go with mongoose for database handling as it's the one i am very comfortable working with + it allows to store nested objects quite easily.

Application has uses two databases, one for production, one for tests. Tests database is seeded with sample data so it's easy to make tests.

## Stack

* Express - For running all the things
* MongoDb - For storing all the things.
* Axios - Easy Api request.
* Mocha - Testing

## How to run

To run: clone it it, type `npm install && npm run server`

## How to test

For testing run `npm run server-test` and then in separate terminal `npm run test`

## Postman

Here is a link to a Postman simple postman collection for testing [Postman Collection](https://www.getpostman.com/collections/8f81cc238d0ba25ddf37)

## Heroku

[Heroku Link](https://gentle-taiga-48407.herokuapp.com/movies)

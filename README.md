# purrfect-creations-serve

## _A simple server for Purrfect Creations using Node.js_

purrfect-creations-web uses Typescript, Node.js and GraphQL

## Features

- Total Orders
- Orders in Progress
- Total Revenue
- Total Orders for a selected month
- Total revenue per month
- List of recent Orders

## Installation
The application needs AIRTABLE_API_KEY and AIRTABLE_BASE_ID to access Airtable.
So create a `.env` in the root directory with appropriate values

It requires Docker to be installed locally.

Install the dependencies and devDependencies and run the app by simple running the following command

To build the docker image:

```sh
docker-compose build
```

To run the container:

```sh
docker-compose up -d
```

Browse the Apollo explorer: https://studio.apollographql.com/sandbox/explorer

For production environments...

```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

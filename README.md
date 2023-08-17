# KID2 Spot Frontend

This application is a web-based natural language interface querying OSM data. It allows users to submit natural language prompts for locations then query and displays the results on a map.

## Environment Variables

The application requires the following environment variables to be set:

- `APP_USER`: the username for authenticating with the application
- `APP_PASSWORD`: the password for authenticating with the application
- `ENVIRONMENT`: the environment in which the application is running (e.g. development, production)
- `NEXT_PUBLIC_MAPTILER_KEY`: the API key for accessing Maptiler
- `NEXT_PUBLIC_OSM_API`: the API key for querying OSM

## Installation

To install the application, clone the repository from GitHub and run the following command:

`yarn install`

To build the project run:

`yarn build`

## Usage

To start the application, install all dependencies (`yarn install`) and run the command:

`yarn dev`

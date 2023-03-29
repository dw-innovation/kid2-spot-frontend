# Overpass Turbo++ Frontend

This application is a web-based natural language interfacefor Overpass Turbo queries. It allows users to submit natural language queries for locations and receives the generated Overpass Turbo query and displays the results on a map.

## Environment Variables

The application requires the following environment variables to be set:

- `APP_USER`: the username for authenticating with the application
- `APP_PASSWORD`: the password for authenticating with the application
- `NEXT_PUBLIC_OVERPASS_API_URLS`: a comma-separated list of URLs for the Overpass API(s) to use
- `ENVIRONMENT`: the environment in which the application is running (e.g. development, production)
- `NEXT_PUBLIC_MAPTILER_KEY`: the API key for accessing Maptiler

## Installation

To install the application, clone the repository from GitHub and run the following command:

`yarn install`

To build the project run:

`yarn build`

## Usage

To start the application, install all dependencies (`yarn install`) and run the command:

`yarn dev`

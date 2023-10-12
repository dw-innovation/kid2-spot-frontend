# KID2 Spot Frontend

This application is a web-based natural language interface querying OSM data. It allows users to submit natural language prompts for locations then query and displays the results on a map.

## Environment Variables

The application requires the following environment variables to be set:

- `APP_USER`: The username for authenticating with the application.
- `APP_PASSWORD`: The password corresponding to the APP_USER for authenticating with the application. 
- `ENVIRONMENT`: Specifies the environment in which the application is running. It could be set to development, staging, or production, for example.
- `NEXT_PUBLIC_MAPTILER_KEY`: The API key needed for accessing Maptiler services. Required for rendering satellite layer.
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: The API key for integrating Google Maps into the application. This key allows you to use Google Maps' functionalities.
- `NEXT_PUBLIC_OSM_API`: The API key for querying OpenStreetMap (OSM).
- `NEXT_PUBLIC_NLP_API`: The API key for accessing any Natural Language Processing service that the application uses, for prompt to IMR translation.
- `MONGODB_URI`: The URI for connecting to the MongoDB database for saving and loading sessions.
- `MONGODB_DBNAME`: The name of the MongoDB database that the application will connect to. 
- `NEXT_PUBLIC_API_BASE_URL`: The base URL for making API calls within the application.
- `NEXT_PUBLIC_NOMINATIM_API`: The API endpoint for using the Nominatim geocoding service.

## Installation

To install the application, clone the repository from GitHub and run the following command:

`yarn install`

To build the project run:

`yarn build`

## Usage

To start the application, install all dependencies (`yarn install`) and run the command:

`yarn dev`

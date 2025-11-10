<img width="1280" height="200" alt="Github-Banner_spot" src="https://github.com/user-attachments/assets/bec5a984-2f1f-44e7-b50d-cc6354d823cd" />

# 🖥️ SPOT Frontend

This repository contains the **interactive map UI** for the SPOT system.  
It allows users to enter natural language queries, see results visualized on a Leaflet map, and explore location matches with external map integrations.

---

## 🚀 Quickstart

### Installation

To install the application, clone the repository from GitHub and run the following command:

```bash
yarn install
```

To build the project run:

```bash
yarn build
```

### Usage

To start the application, install all dependencies (yarn install) and run the command:

```bash
yarn dev
```

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `CREDENTIALS` | A list of credentials in the format `"user1:pass1;user2:pass2"` |
| `ENVIRONMENT` | Runtime environment (e.g. `development`, `production`). |
| `NEXT_PUBLIC_MAPBOX_KEY` | Mapbox API key — required for satellite layer rendering. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key for map and Street View integration. |
| `NEXT_PUBLIC_OSM_API` | Endpoint for querying the OSM Query API. |
| `NEXT_PUBLIC_NLP_API` | Endpoint for the Central NLP API (query transformation). |
| `MONGODB_URI` | MongoDB URI for session persistence. |
| `MONGODB_DBNAME` | Name of the MongoDB database to use. |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for making internal API calls. |
| `NEXT_PUBLIC_NOMINATIM_API` | Endpoint for the Nominatim geocoding service. |

Also see `.env.example` for the full list.

---

## 🔑 Features

- Leaflet-based map viewer with OSM, satellite, and vector tile layers
- Natural language query input
- Session saving & restoring (via MongoDB)
- Integrations with:
  - Google Maps & Street View
  - OpenStreetMap
  - Export to GeoJSON / KML

---

## 🧩 Part of the SPOT System

The frontend communicates with:
- [`central-nlp-api`](https://github.com/dw-innovation/kid2-spot-central-nlp-api) — to convert NL to structured query
- [`osm-query-api`](https://github.com/dw-innovation/kid2-spot-osm-query-api) — to visualize results on the map

This is the main user-facing module.

---

## 🔗 Related Docs

- [Main SPOT Repo](https://github.com/dw-innovation/kid2-spot)
- [Central NLP API](https://github.com/dw-innovation/kid2-spot-central-nlp-api)
- [OSM Query API](https://github.com/dw-innovation/kid2-spot-osm-query-api)

---

## 🙌 Contributing

We welcome contributions of all kinds — from developers, journalists, mappers, and more!  
See [CONTRIBUTING.md](https://github.com/dw-innovation/kid2-spot/blob/main/CONTRIBUTING.md) for how to get started.
Also see our [Code of Conduct](https://github.com/dw-innovation/kid2-spot/blob/main/CODE_OF_CONDUCT.md).

---

## 📜 License

Licensed under [AGPLv3](../LICENSE).

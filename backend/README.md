# HarvestFlow AI Backend

A small FastAPI MVP that turns harvest and logistics inputs into an explainable,
rule-based operational directive. Current temperature and humidity are fetched
from Open-Meteo using the origin city. The dashboard can additionally fetch
live regional weather from OpenWeather when an API key is configured.

## Run locally

From the `backend` directory:

```bash
python -m venv .venv
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API is available at `http://127.0.0.1:8000`. Interactive Swagger
documentation is available at `http://127.0.0.1:8000/docs`.

## Live dashboard weather

Copy `.env.example` to `.env` and set `OPENWEATHER_API_KEY` to an OpenWeather
API key. The dashboard fetches Nashik, Pune, Bengaluru, and Hyderabad weather
and caches each reading in memory for five minutes. If the key is not set or
the provider is unavailable, the API automatically returns deterministic MVP
weather values instead.

## Endpoints

- `GET /` — service status
- `GET /health` — health check
- `POST /api/v1/decision` — generate a placeholder harvest directive

Example request:

```json
{
  "crop": "Tomato",
  "quantity": 10,
  "unit": "tons",
  "origin": "Nashik",
  "target_market": "Singapore Fresh Produce Hub",
  "harvest_date": "2026-07-30",
  "storage_available": false,
  "truck_delay_hours": 4,
  "market_demand": "High"
}
```

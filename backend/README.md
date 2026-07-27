# HarvestFlow AI Backend

A small FastAPI MVP that turns harvest and logistics inputs into an explainable,
rule-based operational directive. Current temperature and humidity are fetched
from Open-Meteo using the origin city; no weather API key is needed.

## Run locally

From the `backend` directory:

```bash
python -m venv .venv
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API is available at `http://127.0.0.1:8000`. Interactive Swagger
documentation is available at `http://127.0.0.1:8000/docs`.

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

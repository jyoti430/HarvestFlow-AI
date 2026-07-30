"""India and Singapore focused mock data for the dashboard overview."""

DASHBOARD_OVERVIEW_DATA = {
    "kpis": [
        {"key": "risk", "label": "Produce at Risk", "value": "1,284 t", "delta": "-8.2%", "trend": "down", "tone": "warning"},
        {"key": "directives", "label": "Active AI Directives", "value": "37", "delta": "+4", "trend": "up", "tone": "ai"},
        {"key": "storage", "label": "Cold Storage Capacity", "value": "72%", "delta": "+3.1%", "trend": "up", "tone": "primary"},
        {"key": "revenue", "label": "Export Revenue Protected", "value": "$412K", "delta": "+12.4%", "trend": "up", "tone": "primary"},
    ],
    "weather": [
        {"region": "Nashik", "temp": 31, "humidity": 58, "rain": 10, "risk": "moderate"},
        {"region": "Pune", "temp": 29, "humidity": 62, "rain": 20, "risk": "moderate"},
        {"region": "Bengaluru", "temp": 25, "humidity": 74, "rain": 45, "risk": "high"},
        {"region": "Chennai", "temp": 33, "humidity": 76, "rain": 25, "risk": "high"},
    ],
    "storage": [
        {"facility": "Nashik Cold Storage Hub", "capacity": 1200, "used": 864, "temp": 4},
        {"facility": "JNPT Reefer Terminal", "capacity": 800, "used": 512, "temp": 2},
        {"facility": "Pune Cold Storage Hub", "capacity": 600, "used": 438, "temp": 5},
        {"facility": "Chennai Export Packhouse", "capacity": 400, "used": 210, "temp": 5},
    ],
    "transport": [
        {"id": "RF-118", "route": "Nashik to JNPT Port", "status": "in-transit", "eta": "2h 10m", "load": "Tomatoes 12t"},
        {"id": "RF-119", "route": "Pune to Mumbai Air Cargo", "status": "loading", "eta": "1h 40m", "load": "Grapes 18t"},
        {"id": "RF-120", "route": "Bengaluru to Chennai Port", "status": "delayed", "eta": "3h 55m", "load": "French Beans 6t"},
        {"id": "RF-121", "route": "Chennai Port to Singapore", "status": "in-transit", "eta": "18h 20m", "load": "Mangoes 9t"},
    ],
    "markets": [
        {"market": "Singapore Fresh Produce Hub", "demand": 92, "price": "$1.68/kg", "trend": "up"},
        {"market": "Jurong Food Hub", "demand": 85, "price": "$1.74/kg", "trend": "up"},
        {"market": "Changi Cold Logistics", "demand": 78, "price": "$1.55/kg", "trend": "flat"},
        {"market": "Mumbai APMC", "demand": 71, "price": "$1.24/kg", "trend": "down"},
    ],
    "directives": [
        {"id": "D-2841", "crop": "Tomatoes", "action": "Prioritize JNPT dispatch for Singapore export", "region": "Nashik", "confidence": 94, "impact": "$18,400 protected", "status": "active", "time": "12 min ago"},
        {"id": "D-2840", "crop": "Mangoes", "action": "Hold at packhouse until the optimal export window", "region": "Ratnagiri", "confidence": 88, "impact": "$9,200 protected", "status": "active", "time": "42 min ago"},
        {"id": "D-2839", "crop": "Grapes", "action": "Assign refrigerated transport to Jurong Food Hub", "region": "Pune", "confidence": 91, "impact": "$34,700 protected", "status": "pending", "time": "1 h ago"},
        {"id": "D-2838", "crop": "Pomegranates", "action": "Consolidate reefer loads for Singapore shipment", "region": "Solapur", "confidence": 82, "impact": "$6,100 protected", "status": "completed", "time": "3 h ago"},
        {"id": "D-2837", "crop": "Bananas", "action": "Redirect shipment to Mumbai APMC after export delay", "region": "Jalgaon", "confidence": 76, "impact": "$4,900 protected", "status": "completed", "time": "5 h ago"},
    ],
    "supplyHealth": [
        {"name": "Mon", "health": 78},
        {"name": "Tue", "health": 82},
        {"name": "Wed", "health": 74},
        {"name": "Thu", "health": 88},
        {"name": "Fri", "health": 91},
        {"name": "Sat", "health": 86},
        {"name": "Sun", "health": 89},
    ],
}

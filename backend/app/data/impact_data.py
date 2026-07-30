"""India-to-Singapore export impact data for the HarvestFlow MVP."""

IMPACT_OVERVIEW_DATA = {
    "metrics": [
        {"key": "food", "icon": "food", "label": "Produce Saved", "value": "2,840 t", "sub": "Year to date", "tone": "primary"},
        {"key": "revenue", "icon": "revenue", "label": "Export Revenue Protected", "value": "$4.12M", "sub": "+38% vs baseline", "tone": "primary"},
        {"key": "carbon", "icon": "carbon", "label": "Carbon Prevented", "value": "1,286 t", "sub": "CO2 equivalent", "tone": "primary"},
        {"key": "efficiency", "icon": "efficiency", "label": "Supply Chain Efficiency", "value": "92%", "sub": "India-Singapore composite index", "tone": "ai"},
        {"key": "export", "icon": "export", "label": "Export Readiness", "value": "87%", "sub": "Singapore route readiness score", "tone": "ai"},
    ],
    "spoilage": [
        {"month": "Jan", "before": 22, "after": 14},
        {"month": "Feb", "before": 24, "after": 13},
        {"month": "Mar", "before": 21, "after": 11},
        {"month": "Apr", "before": 25, "after": 12},
        {"month": "May", "before": 23, "after": 10},
        {"month": "Jun", "before": 26, "after": 9},
    ],
    "revenue": [
        {"month": "Jan", "value": 210},
        {"month": "Feb", "value": 244},
        {"month": "Mar", "value": 268},
        {"month": "Apr", "value": 302},
        {"month": "May", "value": 355},
        {"month": "Jun", "value": 412},
    ],
    "storage": [
        {"month": "Jan", "util": 58},
        {"month": "Feb", "util": 62},
        {"month": "Mar", "util": 65},
        {"month": "Apr", "util": 68},
        {"month": "May", "util": 71},
        {"month": "Jun", "util": 72},
    ],
    "carbon": [
        {"month": "Jan", "tons": 42},
        {"month": "Feb", "tons": 51},
        {"month": "Mar", "tons": 58},
        {"month": "Apr", "tons": 66},
        {"month": "May", "tons": 74},
        {"month": "Jun", "tons": 82},
    ],
}

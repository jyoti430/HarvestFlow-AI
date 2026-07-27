"""FastAPI application entry point."""

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.api.routes import router

app = FastAPI(
    title="HarvestFlow AI Backend",
    version="0.1.0",
    description="MVP API for operational harvest directives.",
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    """Return a consistent and readable validation error response."""
    return JSONResponse(
        status_code=422,
        content={"detail": "Invalid request data", "errors": exc.errors()},
    )


app.include_router(router)

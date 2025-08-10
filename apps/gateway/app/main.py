from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import httpx
import logging
import os

CONTENT_URL = os.getenv("CONTENT_SVC_URL", "http://content-svc:8000")
CONTACT_URL = os.getenv("CONTACT_SVC_URL", "http://contact-svc:8000")
TELEMETRY_URL = os.getenv("TELEMETRY_SVC_URL", "http://telemetry-svc:8000")

logger = logging.getLogger(__name__)

app = FastAPI()

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

async def forward(method: str, url: str, request: Request | None = None):
    async with httpx.AsyncClient() as client:
        try:
            if method == "GET":
                resp = await client.get(url)
            else:
                data = await request.json()
                resp = await client.post(url, json=data)
        except httpx.RequestError as exc:
            logger.exception("Request failed for %s %s: %s", method, url, exc)
            return JSONResponse(status_code=500, content=str(exc))

    if resp.status_code < 200 or resp.status_code >= 300:
        logger.error("Non-2xx response %s from %s: %s", resp.status_code, url, resp.text)
        return JSONResponse(status_code=resp.status_code, content=resp.text)

    try:
        return resp.json()
    except ValueError:
        logger.error("Non-JSON response from %s: %s", url, resp.text)
        return JSONResponse(status_code=resp.status_code, content=resp.text)

@app.get("/api/projects")
async def projects():
    return await forward("GET", f"{CONTENT_URL}/projects", None)

@app.get("/api/skills")
async def skills():
    return await forward("GET", f"{CONTENT_URL}/skills", None)

@app.get("/api/experience")
async def experience():
    return await forward("GET", f"{CONTENT_URL}/experience", None)

@app.get("/api/achievements")
async def achievements():
    return await forward("GET", f"{CONTENT_URL}/achievements", None)

@app.get("/api/education")
async def education():
    return await forward("GET", f"{CONTENT_URL}/education", None)

@app.post("/api/contact")
async def contact(request: Request):
    return await forward("POST", f"{CONTACT_URL}/contact", request)

@app.post("/api/telemetry/pageview")
async def pageview(request: Request):
    return await forward("POST", f"{TELEMETRY_URL}/pageview", request)

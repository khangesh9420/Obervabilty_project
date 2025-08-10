from fastapi import FastAPI, Request
import httpx
import os

CONTENT_URL = os.getenv("CONTENT_SVC_URL", "http://content-svc:8000")
CONTACT_URL = os.getenv("CONTACT_SVC_URL", "http://contact-svc:8000")
TELEMETRY_URL = os.getenv("TELEMETRY_SVC_URL", "http://telemetry-svc:8000")

app = FastAPI()

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

async def forward(method: str, url: str, request: Request | None = None):
    async with httpx.AsyncClient() as client:
        if method == "GET":
            resp = await client.get(url)
        else:
            data = await request.json()
            resp = await client.post(url, json=data)
    return resp.json()

@app.get("/api/projects")
async def projects():
    return await forward("GET", f"{CONTENT_URL}/projects", None)

@app.get("/api/skills")
async def skills():
    return await forward("GET", f"{CONTENT_URL}/skills", None)

@app.get("/api/experience")
async def experience():
    return await forward("GET", f"{CONTENT_URL}/experience", None)

@app.post("/api/contact")
async def contact(request: Request):
    return await forward("POST", f"{CONTACT_URL}/contact", request)

@app.post("/api/telemetry/pageview")
async def pageview(request: Request):
    return await forward("POST", f"{TELEMETRY_URL}/pageview", request)

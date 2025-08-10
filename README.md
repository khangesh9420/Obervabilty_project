# Khangesh Matte Portfolio

A local-first microservices portfolio for **Khangesh Matte — DevOps Engineer**. The application runs entirely with Docker Compose and features a Next.js frontend and multiple FastAPI services backed by Postgres.

## Services
- **web-frontend**: Next.js + Tailwind + Framer Motion + shadcn/ui
- **gateway**: FastAPI reverse proxy to backend services
- **content-svc**: FastAPI service serving projects, skills and experience
- **contact-svc**: FastAPI service storing contact form submissions
- **telemetry-svc**: FastAPI service collecting page views
- **postgres**: shared database seeded with portfolio data

## Getting Started
```bash
cp .env.example .env
docker compose up --build
```
Visit [http://localhost:3000](http://localhost:3000) to view the portfolio.

## API Routes via Gateway
- `GET /api/projects`
- `GET /api/skills`
- `GET /api/experience`
- `POST /api/contact`
- `POST /api/telemetry/pageview`

## Development
Each app/service contains a `Dockerfile` and `.dockerignore` to support independent builds. The database is seeded from `db/seed.sql`.

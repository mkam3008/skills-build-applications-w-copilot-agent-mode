# Copilot Agent Instructions — OctoFit Tracker

## Repository purpose

This is a **GitHub Skills exercise** that guides learners through building the **OctoFit Tracker**, a fitness tracking web application for Mergington High School. The exercise is structured as a series of numbered steps (issues) that learners complete in a GitHub Codespace using Copilot agent mode.

The goal is to build a modern **multi-tier application** with:

- User authentication and profiles
- Activity logging and tracking
- Team creation and management
- Competitive leaderboard
- Personalized workout suggestions

---

## Project layout

```text
octofit-tracker/          ← application root (created during the exercise)
├── backend/              ← logic + data tier (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts   ← Mongoose connection to octofit_db
│   │   ├── models/           ← Mongoose models (users, teams, activities, leaderboard, workouts)
│   │   ├── routes/           ← Express route handlers (/api/*)
│   │   └── scripts/
│   │       └── seed.ts       ← seed script: "Seed the octofit_db database with test data"
│   ├── package.json
│   └── tsconfig.json
└── frontend/             ← presentation tier (React 19 + Vite)
    ├── src/
    │   ├── main.jsx          ← Bootstrap CSS imported here
    │   ├── App.jsx
    │   └── components/
    │       ├── Activities.jsx
    │       ├── Leaderboard.jsx
    │       ├── Teams.jsx
    │       ├── Users.jsx
    │       └── Workouts.jsx
    └── package.json
```

`.github/instructions/`, `.github/prompts/`, `.github/steps/`, `.github/workflows/` — exercise scaffolding files. Do **not** modify these unless the task explicitly requires it.

---

## Technology stack

| Tier | Technology |
|---|---|
| Presentation | React 19 + Vite, react-router-dom, Bootstrap |
| Logic / API | Node.js LTS, Express, TypeScript |
| Data | MongoDB 6 (`mongodb-org`), Mongoose |
| Dev environment | GitHub Codespaces (Ubuntu Jammy) |

---

## Ports

| Port | Visibility | Service |
|---|---|---|
| 5173 | **public** | Vite dev server (frontend) |
| 8000 | **public** | Express API (backend) |
| 27017 | **private** | MongoDB |

Do **not** propose or expose any other ports.

---

## Critical command rules

- **Never `cd` into a directory.** Always use path-qualified commands, e.g.:
  ```bash
  npm install --prefix octofit-tracker/frontend
  npm run dev --prefix octofit-tracker/frontend
  ```
- **Always check MongoDB status** with `ps aux | grep mongod` before issuing any database command.
- Use `mongosh` as the MongoDB client tool (not `mongo`).
- Use Mongoose models for all schema and data work — never ad-hoc raw scripts.

---

## Development environment setup

The Codespace is pre-configured via `.devcontainer/`:

- **MongoDB 6** is installed by `post_create.sh` (apt package `mongodb-org`).
- `post_start.sh` starts `mongod` on every Codespace start (data dir: `/data/db`, log: `/tmp/mongod.log`) and sets port visibility. If MongoDB fails to start, check `/tmp/mongod.log`.
- MongoDB retries up to 3 times with 15 ready-check retries per attempt.

### Initialising the frontend

```bash
npm create vite@latest octofit-tracker/frontend -- --template react
npm install --prefix octofit-tracker/frontend
npm install bootstrap react-router-dom --prefix octofit-tracker/frontend
```

Add `import 'bootstrap/dist/css/bootstrap.min.css'` at the top of `octofit-tracker/frontend/src/main.jsx`.

### Initialising the backend

```bash
npm init -y --prefix octofit-tracker/backend   # or scaffold with tsc --init
npm install express mongoose --prefix octofit-tracker/backend
npm install --save-dev typescript @types/express ts-node --prefix octofit-tracker/backend
```

---

## Backend API (Express)

- Server must listen on port **8000**.
- All routes are prefixed `/api/`.
- Required routes: `/api/users/`, `/api/teams/`, `/api/activities/`, `/api/leaderboard/`, `/api/workouts/`.
- Mongoose connects to `mongodb://localhost:27017/octofit_db`.
- Use Codespaces-aware base URL:

```typescript
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
```

Validate endpoints with `curl http://localhost:8000/api/<route>/` after wiring routes.

---

## Frontend (React 19 / Vite)

- Use Vite environment variables via `import.meta.env.VITE_CODESPACE_NAME` (must be defined in `.env.local`).
- API base URL pattern: `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
- Always add a **safe fallback** when `VITE_CODESPACE_NAME` is unset to avoid broken URLs like `https://undefined-8000.app.github.dev/...`. Example:

```javascript
const base = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
```

- A shared config/helper for the base URL is acceptable, provided each component still references its own `/api/<component>/` route.
- Handle both paginated and plain array API responses.
- Use `react-router-dom` for navigation between views.
- App logo: `docs/octofitapp-small.png`.

---

## Available prompt files

Use these in Copilot Chat with the `/` prefix:

| Prompt file | Purpose |
|---|---|
| `/create-express-logic-tier` | Scaffold the Node.js + Express + TypeScript logic tier |
| `/init-populate-octofit_db` | Configure MongoDB connection and seed `octofit_db` with test data |

---

## Exercise workflow (for reference)

Steps correspond to GitHub Issues on this repository:

1. **Preparing** — set up Codespace
2. **Application initial setup** — create frontend/backend scaffold, initialise React 19 + Vite, Node.js + Express
3. **Logic + data tier** — MongoDB connection, Express routes, seed script
4. **Django REST Framework** *(legacy step name; this repo uses Node.js/Express)*
5. **Frontend React** — complete React components, connect to API
6. **Copilot on GitHub** — open PR `build-octofit-app → main` titled `Modernize OctoFit multi-tier application stack`, use Copilot Summary and code review, then merge

---

## Known issues and workarounds

| Issue | Workaround |
|---|---|
| `CODESPACE_NAME` not set in shell | `post_start.sh` aborts if `CODESPACE_NAME` is unset; set it manually or run inside a Codespace |
| MongoDB not running on container restart | Run `post_start.sh` manually or check `/tmp/mongod.log` for errors |
| `https://undefined-8000.app.github.dev` URLs in frontend | Always guard `VITE_CODESPACE_NAME` with a fallback to `http://localhost:8000` |
| `npm ci` fails in CI (no `package-lock.json`) | The root `copilot-setup-steps.yml` runs `npm ci`; ensure a `package-lock.json` is present or switch to `npm install` if scaffold hasn't run yet |

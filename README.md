# Full Stack Music Application

A full stack web app for managing a music library of artists, albums and songs. I built it for CS230 (Web Information Processing), part of my Computer Science & Software Engineering degree at Maynooth University.

The frontend is plain HTML, CSS and JavaScript. It talks to a REST API built with Node.js and Express, which stores everything in a SQLite database.

## What it does

- Browse the artists, albums and songs in the library
- Add, edit and delete records from the web interface
- Link albums to artists and songs to albums
- Deleting an artist also deletes their albums and songs
- Loads sample data (The Weeknd and Taylor Swift) on first run

## Built with

| Layer    | Tools                                       |
|----------|---------------------------------------------|
| Frontend | HTML, CSS, JavaScript, Fetch API            |
| Backend  | Node.js, Express.js, CORS                   |
| Database | SQLite, SQL (foreign keys, cascade deletes) |

## How it fits together

```
Browser (HTML/JS)  --fetch-->  Express REST API  --SQL-->  SQLite database
```

Each page in the frontend sends asynchronous requests to the Express server. The server has its own routes and controller for each resource, and each controller runs SQL against the database.

## API endpoints

The same CRUD routes are available for `/artists`, `/albums` and `/songs`:

| Method | Route             | Action          |
|--------|-------------------|-----------------|
| GET    | `/<resource>`     | Get all records |
| GET    | `/<resource>/:id` | Get one record  |
| POST   | `/<resource>`     | Create a record |
| PUT    | `/<resource>/:id` | Update a record |
| DELETE | `/<resource>/:id` | Delete a record |

## Running it locally

```bash
npm install
node backend/server.js
```

The API runs at `http://localhost:3000`. To use the app, open `frontend/index.html` in your browser.

## Project structure

```
backend/
  controllers/   Request handlers for artists, albums and songs
  routes/        Express routers
  data/app.db    SQLite database
  db.js          Database connection and setup
  model.sql      Schema and sample data
  server.js      Entry point
frontend/        HTML pages, scripts and styles
images/          Background images and video
```

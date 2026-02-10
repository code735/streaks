# streaks
something to maintain streaks and productivity

## setup

### api

requirements: go 1.22+

```bash
cd api
go run .
```

optional env vars:

- `PORT` (default `8080`)
- `API_VERSION` (reported at `/`)

### ui

requirements: node.js (lts)

```bash
cd ui/my-app
npm install
npm run dev
```

open `http://localhost:3000`

## features

1. connected with google calendar by => chrome extension => extract to db => save the progress of each day
2. social media like features like snapchat
3. everyday progress will add up for bigger goal

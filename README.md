# Visit Chicago

A simple React site showcasing Chicago for visitors. The app includes pages for restaurants, tourist sites, nightlife, and interesting facts. Navigation is handled without external routing libraries.

## Available Scripts

- `npm start` – start the development server
- `npm test` – run tests (none are provided)
- `npm run build` – build for production

To persist admin data, a small Express server is included. Start it with:

- `npm run server`

It stores credentials in `db.json`, which you can host online if desired.
The server uses CORS so you may set `CLIENT_ORIGIN` to the URL of the React
app (default `http://localhost:3000`).

## Admin Access

Visit `/admin` in the browser. The app queries a small API server to determine
whether an admin account already exists. If none is found you will be prompted
to create one by providing a username, email, and password. The API persists
this data in a simple database. When an account exists, the `/admin` page shows
a login form. Forgotten passwords can be reset via the "Forgot Password?" link,
which verifies the registered email and returns a newly generated password.

By default the client expects the API at `http://localhost:4000/api`. You can
change this by setting `REACT_APP_API_URL` in an `.env` file.

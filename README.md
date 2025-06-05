# Visit Chicago

A simple React site showcasing Chicago for visitors. The app includes pages for restaurants, tourist sites, nightlife, and interesting facts. Navigation is handled without external routing libraries.

## Available Scripts

- `npm start` – start the development server
- `npm test` – run tests (none are provided)
- `npm run build` – build for production

## Admin Access

Visit `/admin` in the browser. If no admin account exists, you will be prompted
to create one by providing a username, email, and password. Credentials are
stored in `localStorage`.

If an account already exists, the `/admin` page presents a login form. Forgotten
passwords can be reset via the "Forgot Password?" link, which requires the
registered email and generates a new random password.

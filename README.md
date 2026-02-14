# Aparna Portfolio - Full Stack (MERN-style)

This project keeps the original portfolio template and upgrades it with a production-style backend:

- Contact form submits to an Express API
- Contact form sends email notifications
- Contact form includes anti-spam protections (honeypot + rate limiting)
- Resume/certificate clicks are tracked in MongoDB
- Single localhost server serves both frontend and backend

## Stack

- Frontend: HTML, CSS, JavaScript (existing template preserved)
- Backend: Node.js, Express
- Email: Nodemailer (SMTP)
- Database: MongoDB with Mongoose

## Project Structure

```text
.
|-- assets/
|-- index.html
|-- server/
|   |-- server.js
|   `-- src/
|       |-- config/db.js
|       |-- controllers/
|       |-- models/
|       |-- routes/
|       `-- utils/validators.js
|-- package.json
`-- .env.example
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
copy .env.example .env
```

3. Configure `.env` for Atlas + Gmail SMTP:

```env
MONGODB_URI=your_atlas_uri
CONTACT_RECEIVER=aparnakl2006@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=aparnakl2006@gmail.com
SMTP_PASS=your_16_char_gmail_app_password
SMTP_FROM="Portfolio Contact <aparnakl2006@gmail.com>"
```

4. For Gmail, enable 2-Step Verification and create an App Password.

5. Start app:

```bash
npm run dev
```

6. Open:

```text
http://localhost:5000
```

## API Endpoints

- `GET /api/health` - health check
- `GET /api/contact?limit=20` - list contact requests
- `POST /api/contact` - sends email and saves contact form request
- `GET /api/downloads?limit=20` - list tracked downloads
- `POST /api/downloads` - track resume/certificate downloads

## Deploy on Render

1. Push this project to GitHub.
2. In Render, choose `New +` -> `Blueprint`.
3. Select your GitHub repo (Render reads `render.yaml` automatically).
4. In Render service environment variables, set:
   - `MONGODB_URI` = your MongoDB Atlas URI
   - `SMTP_USER` = your Gmail address used for SMTP
   - `SMTP_PASS` = your Gmail 16-character App Password
5. Deploy and wait for build to finish.
6. Verify:
   - `https://<your-render-url>/api/health`
   - Submit the contact form from your deployed site and confirm:
     - receiver mail gets message
     - sender gets auto-reply

## Optional: Vercel + Render Split

- Frontend on Vercel, backend on Render.
- If you do this split, frontend fetch URLs must point to your Render API base URL.

## Notes

- The UI design and section layout were intentionally preserved.
- Form and tracking requests are wired in `assets/js/script.js`.
- Static assets are served from `assets/` via Express.

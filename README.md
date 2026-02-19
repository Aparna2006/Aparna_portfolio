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



**LIVE DEMO ON** : https://aparna-portfolio-phi.vercel.app/

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
SMTP_PORT=465
SMTP_USER=your-smtp-account@gmail.com
SMTP_PASS=your_16_char_gmail_app_password
SMTP_FROM_NAME=Portfolio Contact
```


4. For Gmail, enable 2-Step Verification and create an App Password.

5. Start app:

```bash
npm run dev
```

## Deploy on Render

1. Push this project to GitHub.
2. In Render, choose `New +` -> `Blueprint`.
3. Select your GitHub repo (Render reads `render.yaml` automatically).
4. In Render service environment variables, set:
   - `MONGODB_URI` = your MongoDB Atlas URI
   - `SMTP_USER` = your Gmail address used for SMTP
   - `SMTP_PASS` = your Gmail 16-character App Password
   - `SMTP_FROM_NAME` = `Portfolio Contact`
5. Deploy and wait for build to finish.
6. Verify:
   - `https://<your-render-url>/api/health`
   - Submit the contact form from your deployed site and confirm:
     - receiver mail gets message
     - sender gets auto-reply
   - if mail does not arrive, check Render logs using the returned `requestId`
    
---

## 🤝 Connect With Me

If you found this project helpful or inspiring, feel free to connect with me and collaborate.

If you like this project, please consider giving it a ⭐ on GitHub — it really supports my work!

**Author:** Aparna Kondiparthy ❤️


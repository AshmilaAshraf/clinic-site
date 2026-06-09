# Connect Speech & Rehabilitation Centre

Marketing and appointment-booking website for Connect Speech & Rehabilitation Centre — a speech, language and communication therapy clinic for children and adults.

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** components
- **React Router** for client-side routing
- **Framer Motion** for animations
- **Zod** + **React Hook Form** for form validation
- **Vercel Serverless Functions** (`/api`) + **Nodemailer** for booking and contact emails

## Local development

```bash
npm install
npm run dev
```

The app runs on http://localhost:8080.

### Environment variables

The booking and contact forms send emails through Gmail. Copy `.env.example` to `.env` and fill in your values:

```bash
GMAIL_USER=your-clinic-email@gmail.com
GMAIL_PASS=your-gmail-app-password
```

> `GMAIL_PASS` must be a Gmail **App Password**, created at https://myaccount.google.com/apppasswords (regular passwords will not work).

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server                 |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |
| `npm test`        | Run the test suite (Vitest)          |

## Deployment (Vercel)

This project is configured for [Vercel](https://vercel.com):

- The static site is built from Vite (`dist/`).
- `api/booking.ts` and `api/feedback.ts` are deployed as serverless functions.
- `vercel.json` rewrites all non-API routes to `index.html` for client-side routing.

Add `GMAIL_USER` and `GMAIL_PASS` under **Project Settings → Environment Variables** before deploying.

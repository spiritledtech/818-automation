# 818 Automation — Deployment Guide

This guide walks you through getting your website live on **Render** (free).
No prior DevOps experience needed — just follow each step in order.

---

## What you'll end up with

- Your **frontend** (the website people visit) hosted on Render as a Static Site
- Your **backend** (the Express server) hosted on Render as a Web Service
- A **free PostgreSQL database** on Render

Both will be on free Render URLs like:
- `https://818-automation-frontend.onrender.com`
- `https://818-automation-api.onrender.com`

---

## Before you start — install these tools

You need these on your computer. If you already have them, skip ahead.

1. **Git** — https://git-scm.com/downloads
2. **Node.js (v18+)** — https://nodejs.org
3. **pnpm** — after Node.js is installed, open a terminal and run:
   ```
   npm install -g pnpm
   ```
4. A free **GitHub account** — https://github.com
5. A free **Render account** — https://render.com (sign up with GitHub for easiest setup)

---

## Step 1 — Put your code on GitHub

Open a terminal, navigate to this project folder, and run these commands one by one:

```bash
git init
git add .
git commit -m "Initial commit — ready for deployment"
```

Then:
1. Go to https://github.com/new
2. Create a new **private** repository called `818-automation`
3. Don't initialize with README or .gitignore (you already have one)
4. Copy the commands GitHub shows you under "push an existing repository" — they look like:

```bash
git remote add origin https://github.com/YOUR_USERNAME/818-automation.git
git branch -M main
git push -u origin main
```

Run those in your terminal. Your code is now on GitHub.

---

## Step 2 — Deploy on Render using the blueprint

Render can read the `render.yaml` file in this project and set everything up automatically.

1. Go to https://dashboard.render.com
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub account if prompted
4. Select your `818-automation` repository
5. Render will detect the `render.yaml` file and show you 3 things to create:
   - A PostgreSQL database (`818-automation-db`)
   - A web service (`818-automation-api`)
   - A static site (`818-automation-frontend`)
6. Click **"Apply"** and wait — first deploy takes about 5–10 minutes

---

## Step 3 — Run your database migrations

After the first deploy finishes, you need to set up your database tables.

1. In your terminal (in the project folder), create a `.env` file:
   ```
   DATABASE_URL=<paste your Render database connection string here>
   ```
   Find the connection string in Render → your database → "Connect" tab → "External Database URL"

2. Run:
   ```bash
   pnpm --filter @workspace/db run push
   ```

This creates all the tables your app needs.

---

## Step 4 — Visit your live site

Once everything is deployed:

- Your site: go to Render dashboard → `818-automation-frontend` → click the URL at the top
- Your API: go to Render dashboard → `818-automation-api` → click the URL

Test that the frontend loads correctly. The contact form uses `mailto:` so it will open your email client when submitted — no backend needed for that.

---

## Troubleshooting

**Build fails on Render:**
- Check the build logs in Render dashboard → your service → "Logs" tab
- Most common cause: pnpm version mismatch. The build command installs pnpm fresh so this should be handled automatically.

**Site loads but logo is missing:**
- The logo is in `public/logo.png` — it should load automatically. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R).

**Database connection errors:**
- Make sure you ran the migration step (Step 3) after the first deploy
- Double-check the `DATABASE_URL` in Render → your API service → "Environment" tab

**Free tier goes to sleep:**
- Render's free tier spins down services after 15 minutes of inactivity. The first request after sleep takes ~30 seconds. This is normal on the free plan. Upgrade to a paid plan ($7/month) if you need it always-on.

---

## Making future changes

After you edit your code locally:

```bash
git add .
git commit -m "describe what you changed"
git push
```

Render will automatically detect the push and redeploy. Takes about 3–5 minutes.

---

## Questions?

If something isn't working, the most useful things to share are:
- The error message from Render's "Logs" tab
- Which step you're stuck on

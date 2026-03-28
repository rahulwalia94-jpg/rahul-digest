# Rahul's Intelligence Digest

> AI-powered daily briefing · GitHub Actions · GitHub Pages · Claude Haiku · **~$0.25/month total**

---

## 🏗 Architecture

```
GitHub Actions (cron 7am IST)
    └── scripts/build-digest.js
            ├── Fetches 15 RSS feeds
            ├── Summarises each story with Claude Haiku
            ├── Writes digests/YYYY-MM-DD.json
            ├── Updates digests/index.json
            └── Commits + pushes back to repo

GitHub Pages (docs/index.html)
    └── Reads digests/*.json directly
    └── Today · Archive · Search — all client-side
```

---

## 🚀 Deploy in 5 Steps

### Step 1 — Create the GitHub repo

1. Go to github.com → **New repository**
2. Name it `rahul-digest`
3. Set to **Public** (required for free GitHub Pages)
4. Push this code:

```bash
cd rahul-digest-gh
git init
git add .
git commit -m "init"
git remote add origin https://github.com/rahulwalia94-jpg/rahul-digest.git
git push -u origin main
```

---

### Step 2 — Add your Anthropic API key as a secret

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `ANTHROPIC_API_KEY`
4. Value: your key from `console.anthropic.com`

---

### Step 3 — Enable GitHub Pages

1. Go to repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` · Folder: `/docs`
4. Click **Save**

Your URL will be: `https://rahulwalia94-jpg.github.io/rahul-digest`

---

### Step 4 — Run the Action manually (first time)

1. Go to repo → **Actions** → **Daily Digest**
2. Click **Run workflow** → **Run workflow**
3. Wait ~3 minutes
4. Visit your GitHub Pages URL — digest is live ✅

After this, it runs automatically every day at 7:00 AM IST.

---

### Step 5 — Done

| What | Where |
|------|-------|
| Your live URL | `https://rahulwalia94-jpg.github.io/rahul-digest` |
| Trigger manually | GitHub → Actions → Daily Digest → Run workflow |
| Add/remove feeds | Edit `scripts/sources.js` |
| View archive JSON | `digests/` folder in repo |

---

## 💰 Cost

| Service | Cost |
|---------|------|
| GitHub Actions | **$0** — free tier (2,000 min/month, you use ~5/day) |
| GitHub Pages | **$0** |
| Claude Haiku | **~$0.25/month** — only spend |

---

## 📁 Structure

```
rahul-digest-gh/
├── .github/
│   └── workflows/
│       └── digest.yml          # Cron: runs daily at 7am IST
├── scripts/
│   ├── build-digest.js         # Fetches RSS + calls Haiku + writes JSON
│   ├── sources.js              # All 15 RSS feed sources
│   └── package.json
├── digests/
│   ├── index.json              # List of all dates (auto-updated)
│   └── YYYY-MM-DD.json         # One file per day (permanent archive)
└── docs/
    └── index.html              # Full SPA: Today · Archive · Search
```

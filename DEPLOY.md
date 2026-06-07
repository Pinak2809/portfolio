# Deployment Guide

## One-time setup (15 minutes)

### 1. Push to GitHub

Open a terminal in the `portfolio` folder:

```bash
cd portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Pinak2809/portfolio.git
git push -u origin main
```

> Create the repo on GitHub first: github.com/new → name it `portfolio` → leave it empty (no README).

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account (free).
2. Click **"Add New Project"**.
3. Import your `Pinak2809/portfolio` repository.
4. Framework: **Next.js** (auto-detected).
5. Leave all settings default.
6. Click **Deploy**.

That's it. Your site will be live at `portfolio-pinak2809.vercel.app` (or similar). You can add a custom domain later in Project Settings → Domains.

### 3. Analytics

Once deployed, go to your Vercel dashboard → your project → **Analytics** tab → Enable it. It tracks automatically from that point — no code changes needed.

---

## Daily workflow: deploy updates from VS Code

After the one-time setup, deploying changes is just:

```bash
git add .
git commit -m "description of what changed"
git push
```

Vercel watches your `main` branch. Every push triggers an automatic build and deploy. You'll see the deployment status in:
- Vercel dashboard
- GitHub commit status checks
- VS Code (if you have the GitHub extension)

### Preview deployments

If you push to a branch other than `main`, Vercel creates a **preview deployment** with its own URL. Useful for testing changes before going live:

```bash
git checkout -b feature/new-project
# make changes
git add .
git commit -m "Add new project card"
git push -u origin feature/new-project
```

Vercel gives you a preview URL. When happy, merge to `main`:

```bash
git checkout main
git merge feature/new-project
git push
```

### VS Code extensions (optional but nice)

- **Vercel** extension — see deployment status in VS Code
- **GitLens** — visual git history and blame

---

## Custom domain

1. Vercel dashboard → Project Settings → Domains
2. Add your domain (e.g., `pinakganatra.com`)
3. Update DNS records as Vercel instructs (usually an A record or CNAME)
4. SSL is automatic

---

## Updating content

| What to change | File to edit |
|---|---|
| About me text | `src/lib/i18n.tsx` → keys starting with `about.` |
| Work experience | `src/lib/i18n.tsx` → keys starting with `exp1.` through `exp5.` |
| Projects | `src/lib/i18n.tsx` → keys starting with `proj1.` through `proj4.` |
| Project tags/links | `src/data/projects.ts` |
| Tech stack tags | `src/data/technologies.ts` |
| Social links | `src/components/layout/Footer.tsx` and `AboutSection.tsx` |
| Profile photo | Replace `public/profile.png` |
| Mountain images | Replace files in `public/mountains/` |

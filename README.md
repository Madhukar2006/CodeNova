# CodeNova — Website

Static website for the **CodeNova** Android coding and project-management application.
Built with plain HTML, CSS, and vanilla JavaScript. Hosted free on GitHub Pages.

---

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Contact | `contact.html` |
| Privacy Policy | `privacy-policy.html` |
| Terms & Conditions | `terms.html` |
| 404 | `404.html` |

---

## Quick Configuration

**Open `assets/js/script.js`** and edit the `CONFIG` object at the top:

```js
const CONFIG = {
  SITE_NAME:           "CodeNova",
  CONTACT_EMAIL:       "",        // ← Your real email, e.g. "hello@example.com"
  APP_DOWNLOAD_URL:    "",        // ← Play Store URL when the app is live
  PRIVACY_POLICY_PATH: "privacy-policy.html",
  TERMS_PATH:          "terms.html",
  ABOUT_PATH:          "about.html",
  CONTACT_PATH:        "contact.html",
  HOME_PATH:           "index.html",
};
```

- **`CONTACT_EMAIL`** — Set your email to enable the contact button. Leave empty to hide it.
- **`APP_DOWNLOAD_URL`** — Set your Play Store URL to show the download button. Leave empty to hide it.
- All paths are **relative** and work correctly under a GitHub Pages project URL (e.g. `https://USERNAME.github.io/CodeNova-Web/`).

---

## Deploy to GitHub Pages (Free Hosting)

> **GitHub Pages gives you a free public HTTPS website — no credit card required.**

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (create a free account if needed).
2. Click **+** → **New repository**.
3. Name it **`CodeNova-Web`** (public repository).
4. Click **Create repository**.

### Step 2 — Upload your files

**Option A — Browser upload (easiest for beginners)**

1. On your new repository page, click **Add file** → **Upload files**.
2. Drag and drop all files and folders from this project into the upload area:
   - `index.html`
   - `about.html`
   - `contact.html`
   - `privacy-policy.html`
   - `terms.html`
   - `404.html`
   - `README.md`
   - `assets/` (the entire folder)
3. Click **Commit changes**.

**Option B — Git command line**

```bash
git init
git add .
git commit -m "Initial CodeNova website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/CodeNova-Web.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, click **Settings** (top tab).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment**, set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Click **Save**.
5. Wait 1–2 minutes. Refresh the Pages settings page.
6. Your website URL will appear:
   ```
   https://YOUR_USERNAME.github.io/CodeNova-Web/
   ```

### Step 4 — Find your public page URLs

After deployment, your legal page URLs will be:

| Page | URL |
|------|-----|
| Privacy Policy | `https://YOUR_USERNAME.github.io/CodeNova-Web/privacy-policy.html` |
| Terms & Conditions | `https://YOUR_USERNAME.github.io/CodeNova-Web/terms.html` |

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Google Play Console Preparation

Before publishing CodeNova on Google Play, complete this checklist:

### Website checklist
- [ ] Set `CONTACT_EMAIL` in `assets/js/script.js`.
- [ ] Review and complete all `[DEVELOPER: …]` placeholders in `privacy-policy.html`.
- [ ] Review and complete all `[DEVELOPER: …]` placeholders in `terms.html`.
- [ ] Update the "Last updated" dates in both legal pages.
- [ ] Deploy the website and verify all pages load over HTTPS.
- [ ] Confirm the Privacy Policy URL works: `https://YOUR_USERNAME.github.io/CodeNova-Web/privacy-policy.html`

### App & Play Console checklist
- [ ] Audit all permissions declared in your `AndroidManifest.xml` — document each one in the Privacy Policy.
- [ ] List and disclose every third-party SDK you use (advertising, analytics, crash reporting).
- [ ] Configure the Privacy Policy URL inside the Android app (if required by your implementation).
- [ ] In Google Play Console → **App content** → **Privacy policy**, enter the Privacy Policy URL.
- [ ] Complete the **Data Safety** section in Play Console accurately (this is separate from the Privacy Policy).
- [ ] If the app targets children, review [Google Play's Families Policy](https://support.google.com/googleplay/android-developer/answer/9893335).
- [ ] Set `APP_DOWNLOAD_URL` in `assets/js/script.js` once the app is published.

> **⚠ Important:** Creating these pages does not by itself guarantee Play Store approval.
> Your app must comply with [Google Play's Developer Policies](https://play.google.com/about/developer-content-policy/).
> The Privacy Policy must accurately describe what your app actually does.

---

## File Structure

```
CodeNova-Web/
├── index.html               Homepage
├── about.html               About page
├── contact.html             Contact page
├── privacy-policy.html      Privacy Policy (complete placeholders before publishing)
├── terms.html               Terms & Conditions (complete placeholders before publishing)
├── 404.html                 404 error page
├── README.md                This file
└── assets/
    ├── css/
    │   └── style.css        All styles
    └── js/
        └── script.js        Configuration + utilities
```

---

## Making Changes

- **Content** — Edit the `.html` files directly. Each page is self-contained and well-commented.
- **Styles** — Edit `assets/css/style.css`. Design tokens (colors, spacing) are in the `:root` block at the top.
- **Configuration** — Edit the `CONFIG` object in `assets/js/script.js`.
- After any changes, commit and push to `main`. GitHub Pages will re-deploy automatically within 1–2 minutes.

---

## Technical Notes

- No build tools, Node.js, npm, or compilers required.
- All internal links use **relative paths** — the site works in any subdirectory.
- JavaScript is non-critical — all pages are fully readable with JavaScript disabled.
- Respects `prefers-reduced-motion` for users who prefer minimal animation.
- Accessible focus states on all interactive elements.
- Favicon is an inline SVG data URI — no extra file needed.

---

*CodeNova website — built with plain HTML, CSS, and vanilla JavaScript.*

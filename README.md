# Damye website (GitHub Pages version)

Plain HTML/CSS/JS — no build step. Upload the whole folder to a GitHub repository and turn on GitHub Pages.

## Files

| File | What it is |
|---|---|
| `index.html` | Home |
| `about.html` | About Us |
| `restaurants.html` | Restaurant list with search and filters (`?filter=date`, `?animal=pig`, `?q=noodles`) |
| `restaurant.html` | One restaurant (`restaurant.html?id=pushoo`) with map and similar restaurants |
| `quiz.html` | Food Animal Type Quiz + Korea Food Balance Game |
| `contact.html` | Contact form (FormSubmit) |
| `login.html`, `signup.html`, `profile.html`, `favorites.html` | Accounts (Firebase) |
| `assets/js/config.js` | **Your settings** — Firebase, Google Maps key, contact email, Instagram, logo |
| `assets/js/restaurants.js` | **Restaurant list** |
| `assets/css/style.css` | All styles (colors at the top) |
| `assets/img/` | Your images (see below) |

## 1. Put it on GitHub Pages

1. Create a new repository on GitHub (e.g. `damye`).
2. **Add file → Upload files**, drag in everything inside this folder, and commit.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/damye/`.
5. Custom domain (optional): **Settings → Pages → Custom domain**, then add the DNS records GitHub shows.

To test on your computer, run `python3 tools/serve.py` in this folder and open http://localhost:8000. It understands the same clean addresses as GitHub Pages (`/about`, `/restaurants`, `/restaurant?id=mokro`).

## 2. Turn on accounts (Firebase, free)

1. Go to https://console.firebase.google.com → **Add project**.
2. **Build → Authentication → Get started → Email/Password → Enable**.
3. **Authentication → Settings → Authorized domains → Add domain**: your GitHub Pages domain (e.g. `your-username.github.io`) and your custom domain if you have one.
4. **Build → Firestore Database → Create database** (production mode, region `asia-northeast3` Seoul).
5. Firestore → **Rules**, replace everything with this and **Publish**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```

6. **Project settings (⚙) → Your apps → Web (`</>`)** → register the app → copy the `firebaseConfig` values into `assets/js/config.js`.

Each user gets one document at `users/{their id}` with name, email, gender, age, nationality, photo and favorites. Profile photos are shrunk to 256×256 and saved in that document, so you don't need Firebase Storage (which now requires a paid plan).

Old Bubble accounts can't be moved over (Bubble doesn't export passwords). Existing users simply sign up again.

## 3. Contact form (FormSubmit)

Put your email in `formsubmitEmail` in `assets/js/config.js`. Send one test message from the live site — FormSubmit emails you an activation link; click it once and every later message arrives normally.

## 4. Google Maps

The key is in `config.js`. Because the site's code is public on GitHub, lock the key to your domain:
Google Cloud Console → **APIs & Services → Credentials** → the key → **Application restrictions: Websites** → add `https://your-username.github.io/*` (and your custom domain) → API restrictions: *Maps JavaScript API*.

## 5. Images in `assets/img/`

Already included: `hero.webp` (home background), `bibimbap.webp` and `street.webp` (About page), `avatar.webp` (default profile picture).

Still to add:

| File | Used for |
|---|---|
| `favicon.png` | Browser tab icon |
| `logo.png` (optional) | Set `logoImage: "assets/img/logo.png"` in `config.js` to use your logo instead of the text logo |
| `restaurants/` | Restaurant photos — filled in by `tools/download-images.py` (see section 6) |

## 6. Restaurants

`assets/js/restaurants.js` holds all 259 restaurants from the Bubble export (2026-10-13). Field explanations are at the top of that file. Adding a restaurant = copy one `{ … }` line, change the values, keep the comma between lines.

- `tags` decide which filters a restaurant appears under, and which quiz animals it's recommended for. They come from Bubble's `category` column (Korea → korean, Home → warm, Visit → mustVisit, Night → late, Hottest → hot, Instagram → insta; the others keep their name).
- `lat` / `lng` show the map on the restaurant page.
- `popular: true` puts a restaurant in "Most Popular" on the home page (Bubble's `featured? = yes`; the first 3 are shown).

### Restaurant photos

Each restaurant's photo is read from `assets/img/restaurants/` using its id as the file name (e.g. `mokro.webp`; Guunmong is `guunmong.jpg`). These are exactly the files `tools/download-images.py` saves. To add or replace a photo, put the file in that folder with the restaurant's id as its name, or change the restaurant's `image` in `restaurants.js`.

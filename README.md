# 🎬 MovieHub

> A professional, cinematic movie discovery platform — search, rate, and save your favourite films.

---

## ✨ Features

### 🔐 Authentication
- **Register** a new account with name, email, and password
- **Login** with your existing credentials
- **Logout** from the navbar at any time
- All auth data is stored securely in your browser''s `localStorage` — no backend required
- Protected routes — unauthenticated users are redirected to the login page

### 🔍 Smart Search
- **Live suggestions** dropdown appears as you type (debounced — 300ms)
- Each suggestion shows the movie poster thumbnail, title, release year, and TMDB rating
- **Full search** by pressing the Search button or hitting Enter
- "Back to Popular" button to reset to the trending list

### 🎬 Movie Detail Modal
Click any movie card to open a full-detail modal with:
- **Backdrop image** with gradient overlay and title
- **Runtime**, release year, and TMDB community rating
- **Genre tags** (Action, Drama, Sci-Fi, etc.)
- **Overview / plot summary**
- **Cast preview** — top 6 actors with photos
- **▶ Watch Trailer** button — opens YouTube trailer in a new tab
- **Your star rating** (1–5 stars)
- **Add to Favourites** / Remove button
- **"You Might Also Like"** recommendation grid using TMDB similar movies

### ⭐ Movie Ratings
- Rate any movie **1–5 stars** from the card or from the detail modal
- Hover to preview the rating before committing
- Ratings persist across sessions (stored in `localStorage`)

### ❤️ Favourites
- Toggle any movie as a favourite using the heart button on the card
- Favourites page shows all saved movies in a responsive grid
- **Count badge** showing total saved movies
- Empty state illustration when no favourites yet

### 🎨 Cinematic UI
- **Dark theme** (`#141414` background inspired by Netflix)
- Glassmorphism sticky navbar with active route highlighting
- **Hover effects** — cards scale up with a red ring on hover
- TMDB rating **badge** on every poster
- **Loading skeletons** while movies are being fetched
- **Toast notifications** — auto-dismiss in 3s
- Fully **responsive** — 2→3→4→5 column grid across all screen sizes

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 6** | Lightning-fast dev server & bundler |
| **React Router v7** | Client-side routing |
| **Tailwind CSS v4** | Utility-first styling |
| **TMDB API** | Movie data (popular, search, details, similar, trailers) |
| **localStorage** | Persisting auth, favourites, and ratings — no backend needed |

---

## 🚀 Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) **v18 or higher**
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/MovieHub.git
cd MovieHub/moives_hub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `moives_hub/` directory:

```env
VITE_API_KEY=your_tmdb_api_key_here
VITE_BASE_URL=https://api.themoviedb.org/3
```

> **How to get a TMDB API key:**
> 1. Go to [themoviedb.org](https://www.themoviedb.org/) and create a free account
> 2. Navigate to **Settings → API**
> 3. Request an API key (select "Developer")
> 4. Copy the **API Key (v3 auth)** value

### 4. Start the development server

```bash
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 5. Build for production

```bash
npm run build
```

The optimised output will be in the `dist/` folder.

---

## 📖 How to Use

### First Time
1. Open the app → you will be taken to the **Login** page
2. Click **Register** tab → fill in your name, email, and password → click **Create Account**
3. You will be automatically logged in and taken to the **Home** page

### Browsing & Searching
1. The Home page loads **popular movies** by default
2. **Type in the search bar** → live suggestions appear as you type
3. Click a suggestion to instantly open that movie details
4. Or press **Search** to see the full results grid

### Rating a Movie
- **From the card:** click any star below the movie poster
- **From the modal:** click any star in the "Your Rating" section
- Your rating appears as `X/5` next to the stars and is saved automatically

### Saving Favourites
- Click the **heart icon** on any movie card (top-right corner)
- The heart turns red to confirm it is saved
- Click **Favourites** in the navbar to see all your saved movies
- Click the heart again to remove a movie from favourites

### Opening Movie Details
1. Click **anywhere on a movie card** to open the detail modal
2. In the modal you can:
   - Watch the trailer on YouTube
   - See cast and genres
   - Add/remove from favourites
   - Rate the movie
   - Browse similar movies

### Logging Out
- Click the **Logout** button in the top-right of the navbar

---

## 📁 Project Structure

```
moives_hub/
├── src/
│   ├── components/
│   │   ├── LoadingSkeleton.jsx   # Animated skeleton cards
│   │   ├── MovieCard.jsx         # Movie card with rating & favourites
│   │   ├── MovieModal.jsx        # Full detail modal
│   │   ├── NavBar.jsx            # Sticky navbar
│   │   ├── ProtectedRoute.jsx    # Auth guard
│   │   ├── SearchSuggestions.jsx # Live search dropdown
│   │   └── StarRating.jsx        # 1-5 star rating
│   ├── contexts/
│   │   ├── AuthContext.jsx       # Login, register, logout
│   │   ├── MovieContext.jsx      # Favourites + ratings
│   │   └── ToastContext.jsx      # Toast notifications
│   ├── pages/
│   │   ├── Home.jsx              # Search + movie grid
│   │   ├── Favt.jsx              # Favourites page
│   │   └── Login.jsx             # Login / Register page
│   ├── services/
│   │   └── api.js                # TMDB API calls
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env                          # API keys (not committed to git)
├── index.html
└── package.json
```

---

## 🔒 Notes on Data Storage

All user data is stored in **your own browser** — nothing is sent to any external server:

| Key | What it stores |
|---|---|
| `mh_users` | Registered user accounts |
| `mh_user` | Currently logged-in session |
| `mh_favt` | Your favourite movies |
| `mh_ratings` | Your star ratings |

> Clearing browser storage will reset your account and saved data.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ using React + TMDB API

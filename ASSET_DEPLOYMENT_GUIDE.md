# Asset Deployment Guide for Netlify

## Summary of Fixes

Your Vite project now correctly handles assets for Netlify deployment. All images and audio files are:
1. ✅ Properly imported in `src/config.js`
2. ✅ Configured in Vite to emit to `dist/assets/`
3. ✅ Hashed with content-based filenames for cache busting
4. ✅ Automatically resolved to correct production URLs

---

## How It Works

### Development (Local)
- Assets in `src/assets/` are served directly by Vite dev server
- URLs like `/src/assets/cute-bear.gif` work locally

### Production (Netlify)
- All assets are bundled into `dist/assets/` with hashed filenames
- Example: `cute-bear.gif` → `cute-bear-bunfzafJ.gif`
- URLs are automatically updated to `/assets/cute-bear-bunfzafJ.gif`
- **No manual path changes needed!** Vite handles it automatically.

---

## How the Solution Works

### 1️⃣ **Asset Imports** (`src/config.js`)

All assets are imported at the top of the file:

```javascript
import cuteBear from "./assets/cute-bear.gif";
import musicBear from "./assets/music-bear.gif";
// ... more imports
```

**Why this matters:**
- Tells Vite "these assets are dependencies"
- Vite processes them and generates hashed filenames
- Creates proper URLs for production

### 2️⃣ **Asset Mapping** (`src/config.js`)

The `assetMap` converts config.json paths → imported modules:

```javascript
const assetMap = {
  "/src/assets/cute-bear.gif": cuteBear,
  "/src/assets/music-bear.gif": musicBear,
  // ... more mappings
};
```

**Why this matters:**
- `config.json` can use simple paths like `/src/assets/cute-bear.gif`
- The `resolveAssets()` function replaces these with actual imported URLs
- In production, these become `/assets/cute-bear-bunfzafJ.gif` automatically

### 3️⃣ **Vite Configuration** (`vite.config.js`)

```javascript
build: {
  assetsDir: 'assets',        // Put assets in dist/assets/
  assetsInlineLimit: 4096,    // Small assets inlined, larger ones in dist/assets/
  // ... other build options
}
```

**Why this matters:**
- Ensures all non-inlined assets go to `dist/assets/`
- Netlify serves everything from the `dist/` folder
- Asset filenames include content hashes for cache busting

### 4️⃣ **Correct Netlify Config** (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

**Why this matters:**
- Tells Netlify to run `npm run build`
- Tells Netlify to serve the `dist/` folder (where all assets are)
- Assets at `dist/assets/*.gif` are served from `/assets/` URL

---

## Usage in Components

### ✅ **Correct Image Usage**

```jsx
// Images from config are already resolved to correct URLs
<img 
  src={config.media.cuteBearGif}
  alt="cute bear"
  loading="lazy"
/>
```

### ✅ **Correct Audio Usage**

```jsx
// Audio from config is already resolved
<audio
  ref={audioRef}
  src={currentSong.audio}
  onTimeUpdate={handleTimeUpdate}
/>
```

### ✅ **Direct Asset Import** (if needed)

For components that need direct imports:

```javascript
import bearGif from "./assets/cute-bear.gif";

function MyComponent() {
  return <img src={bearGif} alt="bear" />;
}
```

### ❌ **Wrong - Don't Do This**

```jsx
// ❌ DON'T use string paths directly
<img src="/src/assets/cute-bear.gif" alt="bear" />

// ❌ DON'T use relative paths without import
<img src="./assets/cute-bear.gif" alt="bear" />

// ❌ DON'T use require()
<img src={require("./assets/cute-bear.gif")} alt="bear" />
```

---

## Build Process

### Local Build
```bash
npm run build
```

Output:
```
dist/
├── index.html
├── assets/
│   ├── cute-bear-bunfzafJ.gif
│   ├── music-bear-uCbqMjRg.gif
│   ├── Amaran-BTtjFrvL.mp3
│   └── ... (all other assets with hashed names)
└── assets/
    ├── vendor-react-DUsfwcQF.js
    ├── vendor-animations-CD1NI-Fb.js
    └── index-BmaRINAw.js
```

### Netlify Deployment
```
Netlify receives dist/ folder
├── Serves index.html as root
├── Assets available at /assets/*
└── All URLs automatically resolve correctly
```

---

## File Structure Reference

```
bemyvalentine/
├── config.json              ← Asset paths defined here
├── src/
│   ├── config.js            ← Imports assets + maps paths
│   ├── App.jsx              ← Uses config.media/config.gifts
│   └── assets/
│       ├── cute-bear.gif
│       ├── gift/
│       ├── album-covers/
│       ├── couple_photo/
│       └── songs/
├── vite.config.js           ← Asset build configuration
├── netlify.toml             ← Netlify deployment config
└── dist/                    ← Generated build output
    ├── index.html
    └── assets/              ← All processed assets go here
```

---

## Troubleshooting

### Images Not Loading in Production?

**Check:**
1. ✅ Run `npm run build` locally and verify `dist/assets/` contains all images
2. ✅ Verify the hash filenames are in the built JavaScript
3. ✅ Check netlify.toml has `publish = "dist"`
4. ✅ Open DevTools → Network tab on Netlify site to see actual URLs

### Audio Not Playing?

**Check the same steps above, plus:**
1. ✅ Audio files are included in dist/assets/
2. ✅ Audio src uses `currentSong.audio` from config (not hardcoded path)
3. ✅ Check browser console for errors (right-click → DevTools)

### Git Commit

All fixes are ready. Commit and deploy:

```bash
git add .
git commit -m "fix: resolve asset paths for Netlify production deployment"
git push origin main
```

Then Netlify will automatically redeploy with correct asset URLs.

---

## Why This Approach?

| Aspect | Why |
|--------|-----|
| **Imports in config.js** | Vite discovers assets and creates hashed filenames |
| **Asset mapping** | Keeps config.json simple, maps to real imports |
| **Hashed filenames** | Browser caches old versions, new versions get new names |
| **assetsDir in vite.config** | Ensures consistent asset location |
| **netlify.toml** | Tells Netlify where the built files are |

---

## References

- [Vite Asset Handling](https://vitejs.dev/guide/assets.html)
- [Netlify Deployment](https://docs.netlify.com/)
- [Rolldown (your Vite fork)](https://rolldown.rs/)

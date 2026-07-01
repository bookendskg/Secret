# Pizza Capiche — Menu Site

A single-page website showing the Pizza Capiche menu plus an optional video message.

## Files
- `index.html` — the page (menu + video section)
- `styles.css` — styling
- `script.js` — loads the video message
- `videos/` — put your local video here

## Adding your video message
Edit the `#video` section in `index.html`. It supports a local file, a YouTube
video, or both (each optional):

```html
<section id="video"
         data-show-local="true"                 <!-- true to show videos/message.mp4 -->
         data-local-src="videos/message.mp4"     <!-- path to your local file -->
         data-youtube-id="dQw4w9WgXcQ">          <!-- YouTube video ID, or "" to hide -->
```

- **Local file:** set `data-show-local="true"` and place your file at `videos/message.mp4`.
- **YouTube:** set `data-youtube-id` to the ID from the video URL
  (`https://youtu.be/**dQw4w9WgXcQ**` or `watch?v=**dQw4w9WgXcQ**`).

## Run locally
Open `index.html` in a browser, or serve it:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## Deploy to GitHub Pages
1. Create an empty repo on GitHub (e.g. `pizza-capiche`).
2. Push this folder (see commands in the setup notes).
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch**, pick `main` / `root`, save.
4. Your site goes live at `https://<username>.github.io/pizza-capiche/`.

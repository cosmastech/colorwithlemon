# Color With Lemon

Static website for free printable coloring pages from Lemonfiddlesticks.

## How The Site Works

- `index.html` is the homepage.
- `assets/css/styles.css` controls the design.
- `assets/js/coloring-pages.js` is the editable list of coloring pages.
- `images/` contains thumbnail images shown in the gallery.
- `pdfs/` contains the printable PDF files that visitors open and print.

There is no build step. GitHub Pages can serve this directly from the repo root.

## Add A New Coloring Page

1. Save the printable PDF in `pdfs/`.

   Example:

   ```text
   pdfs/cozy-dragon.pdf
   ```

2. Save a thumbnail image in `images/`.

   Recommended:

   ```text
   images/cozy-dragon.png
   ```

   A PNG or JPG works well. Use the first page of the PDF as the thumbnail if possible.

3. Open `assets/js/coloring-pages.js`.

4. Copy one existing entry and **paste it at the top of the list** (newest pages show left-most).

   Example:

   ```js
   {
     title: "Cozy Dragon",
     description: "A friendly dragon curled up with a book.",
     thumbnail: "images/cozy-dragon.png",
     pdf: "pdfs/cozy-dragon.pdf",
     tags: ["dragon", "cozy"]
   },
   ```

5. Make sure every entry except the last one has a trailing comma.

6. Commit and push the change. GitHub Pages will redeploy automatically.

## Make A Thumbnail From A PDF

If ImageMagick is installed, this command turns the first page of a PDF into a PNG thumbnail:

```bash
magick -density 180 "pdfs/cozy-dragon.pdf[0]" -quality 90 "images/cozy-dragon.png"
```

If that is annoying, a screenshot of the PDF preview is fine for now.

## Publish On GitHub Pages

After the files are pushed to GitHub:

1. Open the repo on GitHub.
2. Go to **Settings**.
3. Go to **Pages**.
4. Set **Source** to **Deploy from a branch**.
5. Set **Branch** to `main` and folder to `/ (root)`.
6. Save.

The temporary GitHub Pages URL should be:

```text
https://cosmastech.github.io/colorwithlemon/
```

Once that works, add the custom domain in the same Pages settings.

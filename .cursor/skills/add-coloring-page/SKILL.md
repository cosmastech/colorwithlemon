---
name: add-coloring-page
description: >-
  Adds a Color With Lemon printable coloring page by generating a PNG thumbnail
  from a PDF with ImageMagick and registering it in the gallery. Use when the
  user adds or drops a PDF into pdfs/, asks to create a thumbnail, or wants to
  add a new coloring page to the site.
---

# Add Coloring Page

## Layout

| Path | Role |
|------|------|
| `pdfs/` | Printable PDF files |
| `images/` | Gallery thumbnails (PNG) |
| `assets/js/coloring-pages.js` | Gallery entries (`window.COLORING_PAGES`) |

Basename should match across PDF and thumbnail, e.g. `sunflower-with-background`.

## Workflow

Copy this checklist and track progress:

```
- [ ] Confirm PDF exists in pdfs/
- [ ] Generate thumbnail with ImageMagick
- [ ] Add entry to coloring-pages.js
- [ ] Stop (do not commit unless asked)
```

### 1. Confirm the PDF

Expect the file at:

```text
pdfs/<slug>.pdf
```

If the user dropped it elsewhere, move it into `pdfs/` and use a kebab-case slug.

### 2. Generate the thumbnail

Requires ImageMagick (`magick`). Convert the **first page** only:

```bash
magick -density 180 "pdfs/<slug>.pdf[0]" -background white -alpha remove -alpha off -resize 900x1200 "images/<slug>.png"
```

Verify with:

```bash
magick identify "images/<slug>.png"
```

### 3. Register in the gallery

Edit `assets/js/coloring-pages.js`. **Prepend** the new object at the **start** of `window.COLORING_PAGES` so it appears left-most in the gallery (newest first).

```js
{
  title: "Human Title",
  description: "One short sentence about the page.",
  thumbnail: "images/<slug>.png",
  pdf: "pdfs/<slug>.pdf",
  tags: ["tag1", "tag2"]
},
```

- Put the new entry before the existing first item; keep a trailing comma after it.
- Derive `title` from the slug unless the user provides one.
- Keep `description` short and family-friendly (still stored; not rendered in the gallery UI).
- Prefer 1–2 simple tags (e.g. `["sunflower", "nature"]`).
- Bump the `?v=` query string on both gallery script tags in `index.html` so clients fetch the updated list.


### 4. Commit behavior

Do **not** commit or push unless the user explicitly asks. Leave these files pending:

- `pdfs/<slug>.pdf`
- `images/<slug>.png`
- `assets/js/coloring-pages.js`

## Batch

For multiple PDFs:

```bash
for pdf in pdfs/*.pdf; do
  name=$(basename "$pdf" .pdf)
  if [ ! -f "images/${name}.png" ]; then
    magick -density 180 "${pdf}[0]" -background white -alpha remove -alpha off -resize 900x1200 "images/${name}.png"
  fi
done
```

Still add each missing gallery entry by hand in `coloring-pages.js` (**prepend**, newest first).

After changing gallery JS, bump the `?v=` query string on the script tags in `index.html` so browsers skip the cached file.

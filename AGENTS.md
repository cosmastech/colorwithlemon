# Agent notes

Color With Lemon is a static site of free printable coloring pages. `index.html` is the site GitHub Pages serves. There is no build step and no framework.

`preview/` is an old mock. Do not treat it as the site or reuse its wording.

## The art is the point

The coloring pages are hand-drawn by the artist, @Lemonfiddlesticks. The art is the focal point of the site.

Layout should show the line art and stay out of its way. The first entry in the gallery data is the newest page and is featured large. Keep the other drawings big enough to read, at varied sizes, and do not crop them.

## Design

Keep the lemon palette and use it flat. Headings use Young Serif at its only weight, 400. Everything else uses Source Sans 3 at 400 and 600. Load only the weights the CSS uses. Young Serif is a letterpress-style display serif; Source Sans 3 is a plain text face, so the drawings stay louder than the type.

Avoid generic template patterns:

- Uppercase letter-spaced eyebrow pills
- Pill-shaped links, tags, and badges
- Soft shadows and cards that lift on hover
- Radial-gradient blob backgrounds
- Frosted, blurred sticky headers
- Rounded font pairs such as Fredoka and Nunito
- CSS for sections that are not in the HTML

Keep the Google Analytics and Cloudflare Web Analytics snippets in `index.html`.

## Copy

Do not invent marketing copy, taglines, or a biography, and do not write in the artist's voice. Keep the wording already in `index.html` and `assets/js/coloring-pages.js`. Descriptions in the page data are stored for reference and are not shown in the gallery.

## Add a coloring page

1. Save the PDF in `pdfs/`.
2. Save a PNG of the first page in `images/`.
3. Prepend an entry to `window.COLORING_PAGES` in `assets/js/coloring-pages.js` (newest first, so it becomes the featured page).
4. Bump the `?v=` query on the script tags in `index.html`.

Thumbnail command and entry shape: `.cursor/skills/add-coloring-page/SKILL.md`.

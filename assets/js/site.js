(function () {
  const gallery = document.querySelector("#gallery");

  if (!gallery) {
    return;
  }

  const pages = Array.isArray(window.COLORING_PAGES) ? window.COLORING_PAGES : [];

  if (pages.length === 0) {
    gallery.innerHTML = `
      <p class="empty-gallery">
        New coloring pages are coming soon. Follow @Lemonfiddlesticks for updates.
      </p>
    `;
    return;
  }

  const feature = renderPage(pages[0], true, 0);
  const rest = pages.slice(1).map(function (page, index) {
    return renderPage(page, false, index);
  }).join("");

  gallery.innerHTML = rest
    ? feature + '<div class="sheets">' + rest + "</div>"
    : feature;

  function renderPage(page, feature, index) {
    const title = escapeHtml(page.title || "Untitled coloring page");
    const thumbnail = escapeAttribute(page.thumbnail || "");
    const pdf = escapeAttribute(page.pdf || "#");
    const tags = Array.isArray(page.tags) ? page.tags : [];
    const sizes = ["l", "m", "s", "s", "s"];
    const sheetClass = feature
      ? "sheet sheet-feature"
      : "sheet sheet-" + sizes[index % sizes.length];
    const loading = feature ? "eager" : "lazy";
    const priority = feature ? ' fetchpriority="high"' : "";
    const tagList = tags.length
      ? '<ul class="sheet-tags" aria-label="Tags">' +
        tags.map(function (tag) {
          return "<li>" + escapeHtml(tag) + "</li>";
        }).join("") +
        "</ul>"
      : "";

    return (
      '<a class="' + sheetClass + '" href="' + pdf + '" target="_blank" rel="noopener noreferrer" aria-label="Open ' + title + ' PDF">' +
        '<span class="sheet-art">' +
          '<img src="' + thumbnail + '" alt="' + title + ' coloring page preview" loading="' + loading + '"' + priority + ">" +
        "</span>" +
        '<span class="sheet-caption">' +
          '<h2 class="sheet-title">' + title + "</h2>" +
          tagList +
          '<span class="sheet-file">PDF</span>' +
        "</span>" +
      "</a>"
    );
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }
})();

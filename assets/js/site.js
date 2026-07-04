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

  gallery.innerHTML = pages.map((page) => {
    const title = escapeHtml(page.title || "Untitled coloring page");
    const description = escapeHtml(page.description || "Printable coloring page");
    const thumbnail = escapeAttribute(page.thumbnail || "");
    const pdf = escapeAttribute(page.pdf || "#");
    const tags = Array.isArray(page.tags) ? page.tags : [];

    return `
      <a class="gallery-card" href="${pdf}" target="_blank" rel="noopener noreferrer" aria-label="Open ${title} PDF">
        <div class="gallery-thumb">
          <img src="${thumbnail}" alt="${title} coloring page preview" loading="lazy">
          <span class="pdf-badge">PDF</span>
        </div>
        <div class="gallery-info">
          <h3>${title}</h3>
          <p>${description}</p>
          <div class="gallery-meta" aria-label="Tags">
            ${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
        </div>
      </a>
    `;
  }).join("");

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

# Components

This folder contains small client-side components used to share common UI across the static HTML pages.

- `header.js` — injects the shared navigation and search input into any page with `<div id="shared-header"></div>`.
- `search.js` — lightweight client-side search helper. It shows inline results while typing and will navigate to `search.html?q=...` when Enter is pressed.
- `footer.js` — injects the shared footer into any page with `<div id="shared-footer"></div>`.

Usage

1. Add a placeholder where you want the component to appear:

```html
<div id="shared-header"></div>
<!-- page content -->
<div id="shared-footer"></div>
<script src="components/header.js"></script>
<script src="components/search.js"></script>
<script src="components/footer.js"></script>
```

2. Search indexing

- `search.html` uses `search_index.json` (root) to perform page-wide search. The index currently contains `title`, `path`, and `content` fields. To update the index, either generate a new `search_index.json` by extracting text from pages or edit the file manually.
- For better full-text search, consider creating a build-step that produces a tokenized index (e.g., using `lunr` or `fuse.js`) and publishing it as `search_index.json`.

Notes

- These are simple client-side injectors — no build system required. For larger projects, consider moving to an SSG or React-based approach and using components/partials there.

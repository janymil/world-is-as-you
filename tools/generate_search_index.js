// Node script: generate_search_index.js
// Scans HTML files in the repo root and extracts title and visible text to build search_index.json

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const root = path.resolve(__dirname, '..');
const outFile = path.join(root, 'search_index.json');

function listHtmlFiles(dir) {
  return fs.readdirSync(dir).filter(f => f.endsWith('.html'));
}

function extractText(html) {
  const dom = new JSDOM(html);
  // remove script and style
  const doc = dom.window.document;
  doc.querySelectorAll('script, style, noscript, link').forEach(n => n.remove());
  // get textContent from body
  const body = doc.body;
  if (!body) return '';
  const text = body.textContent.replace(/\s+/g, ' ').trim();
  return text;
}

function extractTitle(html, file) {
  const dom = new JSDOM(html);
  const t = dom.window.document.querySelector('title');
  if (t && t.textContent.trim()) return t.textContent.trim();
  // fallback to filename
  return file;
}

function buildIndex() {
  const files = listHtmlFiles(root);
  const index = [];
  files.forEach(file => {
    const p = path.join(root, file);
    try {
      const html = fs.readFileSync(p, 'utf8');
      const title = extractTitle(html, file);
      const content = extractText(html);
      index.push({ title, path: file, content: content.substr(0, 20000) });
    } catch (err) {
      console.error('skip', file, err.message);
    }
  });
  fs.writeFileSync(outFile, JSON.stringify(index, null, 2), 'utf8');
  console.log('Wrote', outFile, 'entries:', index.length);
}

buildIndex();

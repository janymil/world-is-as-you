---
description: Process for adding explanatory side notes to abstract text sections
---

# Adding Side Notes to HTML Chapters

This workflow describes how to "elevate" the text by adding interactive side notes (toggleable tooltips) next to abstract or poetic paragraphs. This helps users understand deeper concepts without breaking the flow of the main text.

## 1. Identify Candidate Paragraphs
Scan the text for paragraphs that are:
- Abstract or metaphysical (e.g., discussions about consciousness, "the void", quantum mechanics).
- Metaphorical (e.g., ignoring physical senses, "the mirror").
- Potentially confusing for a beginner.

## 2. Wrap the Paragraph
You must wrap the existing `<p>...</p>` tag with a container div `paragraph-wrapper`.

**Structure:**
```html
<div class="paragraph-wrapper">
    <!-- The Original Text -->
    <p>...original paragraph content...</p>

    <!-- The Side Note Anchor -->
    <div class="note-anchor">
        <button class="note-toggle-btn small" onclick="toggleSideNote(this)">
            <i class="fas fa-info"></i> <!-- Or other relevant icon like fa-brain, fa-lightbulb -->
        </button>
        <div class="note-content side-popup">
            <h5 style="color: var(--accent-gold);">[Title of Explanation]</h5>
            <p style="font-size: 0.9rem;">[Clear, simple explanation of the concept in Slovak]</p>
        </div>
    </div>
</div>
```

## 3. Ensure JavaScript is Present
Make sure the file contains the `toggleSideNote` function at the bottom (inside `<script>` tags).

```javascript
// Toggle Side Notes
function toggleSideNote(btn) {
    // Find the sibling note-content
    const content = btn.nextElementSibling;
    if(content.style.display === 'block') {
        content.style.display = 'none';
        btn.style.background = 'transparent';
        btn.style.color = '#22d3ee';
    } else {
        content.style.display = 'block';
        content.style.animation = 'fadeIn 0.3s ease';
        btn.style.background = '#22d3ee';
        btn.style.color = '#000';
    }
}
```

## 4. CSS Requirements
Ensure `style.css` contains the rules for `.paragraph-wrapper`, `.note-anchor`, `.note-toggle-btn`, and `.note-content.side-popup`. (These are already standard in the project's `style.css`).

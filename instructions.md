# Formatting Instructions for "World is as you are"

## General Rules
1.  **NO Text Removal**: Never remove any original text, word, or paragraph. The content must remain verbatim.
2.  **NO Replacement Summaries**: Do not summarize a paragraph and replace the original text with the summary. Summaries must be *additive*.
3.  **Additions Allowed**: You may add extra text, summaries, metaphors, or explanations if they complement the chapter and enhance understanding.

## Creativity & Visuals (New Priority)
1.  **Be Creative**: Do not just format text. **Invent visual metaphors** and **creative elements** to represent abstract concepts.
    *   *Example:* If the text mentions a "Permission Slip", create a visual ticket/coupon element.
    *   *Example:* If the text mentions a "Mirror", create a split-screen reflection card.
    *   *Example:* If the text mentions "False Gods", create a visual contrast between external idols and internal power.
2.  **Visual Props**: Use CSS and HTML to create "props" that make the concept tangible (e.g., tickets, receipts, contracts, switches).
3.  **Analogy Boxes**: Feel free to add "Analogy Cards" (e.g., The Lighthouse, The Placebo Effect) that are not in the original text but clarify the message perfectly.

## Formatting Variety
1.  **Highlight Boxes**: Gradient backgrounds with distinct borders for key takeaways.
2.  **Duality Cards**: Side-by-side comparisons (e.g., "Struggler vs Creator") with icons.
3.  **Timelines**: Vertical steps to show processes (e.g., Belief -> Logic -> Reality).
4.  **Interactive Toggles**: Switches to change text content based on perspective (e.g., "Human Logic" vs "Mirror Law").
5.  **Power Statements**: Large, centered, styled boxes for concluding thoughts.
6.  **Icons**: FontAwesome icons to add visual cues to lists.

## Chapter Consistency & Layout Rules
1.  **Color Themes**:
    *   Chapter-specific colors (e.g., Cyan for Time, Purple for Reality) must **ONLY** be used in the **Hero Section** (Title, Subtitle) and specific interactive tools that require distinct branding.
    *   The **Main Content Area** (`.book-content`) must strictly follow the **Standard Color Palette** (typically Gold/Standard text colors). Do not override global text or highlight colors in the main text area with the chapter theme.
2.  **Recapitulation Section**:
    *   **Placement**: MUST be outside and after the main `.book-content` area. It is a separate section.
    *   **Structure**:
        *   Must be **wider** than the main text area (e.g., `max-width: 1000px`).
        *   Must include a **Chapter Summary** box.
        *   Must include a **Key Words** section (visual tags).
        *   Must include interactive supportive material (Quotes, FAQs, Exercises).
    *   **Styling**: Use a distinct background (e.g., dark gradient) to separate it from the book text. Do **not** use a top border line unless requested.

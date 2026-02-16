// Script to parse all ANALYSIS_*.md files and generate consolidated concepts
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const mdFiles = fs.readdirSync(baseDir).filter(f => f.match(/ANALYSIS_.*Keywords\.md$/));

console.log(`Found ${mdFiles.length} MD files\n`);

const concepts = {};
let totalConcepts = 0;

// Parse each MD file
mdFiles.forEach(file => {
    const content = fs.readFileSync(path.join(baseDir, file), 'utf8');
    const lines = content.split('\n');
    
    let currentConcept = null;
    let chapterMatch = file.match(/Kapitola(\d+)|SelfTalk(\d+)/);
    let chapter = chapterMatch ? (chapterMatch[1] ? `Kapitola ${chapterMatch[1]}` : `SelfTalk ${chapterMatch[2]}`) : null;
    
    lines.forEach((line, idx) => {
        // Match numbered concepts like "### 1. **Title**"
        let conceptMatch = line.match(/^###\s+\d+[.)]?\s+\*\*([^*]+)\*\*/);
        if (conceptMatch) {
            const title = conceptMatch[1];
            const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
            
            // Extract description from following lines
            let desc = '';
            for (let i = idx + 1; i < Math.min(idx + 10, lines.length); i++) {
                const descLine = lines[i].trim();
                if (descLine.startsWith('**Description:') || descLine.startsWith('- **Opis')) {
                    desc = descLine.replace(/^\*\*Description:\s*|^\- \*\*Opis[^:]*:\s*/, '').replace(/\*\*$/, '');
                    break;
                }
                if (descLine && !descLine.startsWith('**') && !descLine.startsWith('-')) {
                    if (desc) desc += ' ';
                    desc += descLine;
                    if (desc.length > 200) break;
                }
            }
            
            if (title && chapter) {
                const key = `${chapter}::${title}`;
                if (!concepts[key]) {
                    concepts[key] = {
                        title,
                        id,
                        description: desc.substring(0, 200).trim() || title,
                        chapter
                    };
                    totalConcepts++;
                }
            }
        }
    });
});

console.log(`\nParsed ${totalConcepts} unique concepts`);
console.log(`\nChapter breakdown:`);

const chapterCounts = {};
Object.values(concepts).forEach(concept => {
    chapterCounts[concept.chapter] = (chapterCounts[concept.chapter] || 0) + 1;
});

Object.keys(chapterCounts).sort().forEach(ch => {
    console.log(`  ${ch}: ${chapterCounts[ch]} concepts`);
});

// Output JSON for manual insertion
console.log('\n\n// === NEW CONCEPTS TO ADD TO Register.html ===');
console.log('// Add these to the AFTER line ~1786 (after last existing concept)\n');

Object.values(concepts).forEach((concept, idx) => {
    const cleanDesc = concept.description.replace(/'/g, "\\'").replace(/"/g, '\\"');
    console.log(`{
                id: '${concept.id}',
                title: '${concept.title}',
                desc: '${cleanDesc}',
                category: 'universe', // TODO: adjust based on concept
                icon: 'fas fa-lightbulb',
                links: [
                    { ch: '${concept.chapter}', url: '${concept.chapter}.html', label: '${concept.title}' }
                ]
            }${idx < Object.values(concepts).length - 1 ? ',' : ''}`);
});


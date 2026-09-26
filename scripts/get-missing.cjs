const fs = require('fs');
const path = require('path');
const contentDir = path.join(__dirname, '..', 'src', 'content');
const langs = ['fr']; // they all have the same missing strings

const missing = new Set();
const code = fs.readFileSync(path.join(contentDir, 'fr.ts'), 'utf8');
const matches = [...code.matchAll(/\[FR TRANSLATED\] (.*?)\"/g)];
matches.forEach(m => missing.add(m[1]));
console.log(JSON.stringify(Array.from(missing), null, 2));

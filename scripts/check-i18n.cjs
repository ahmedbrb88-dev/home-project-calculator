const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      walk(path.join(dir, file), fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = walk(path.join(__dirname, 'src'));
const suspectRegex = /(?:>|'|")([A-Z][a-z0-9 ]+)(?:<|'|")/g;
const ignoreList = ['className', 'import', 'from', 'var', 'style', 'path', 'id', 'key'];

files.forEach(file => {
  if (file.includes('i18n')) return; // skip dictionaries
  const content = fs.readFileSync(file, 'utf8');
  let lines = content.split('\n');
  
  lines.forEach((line, i) => {
    // Basic heuristic: looking for raw strings in JSX children or attributes that look like english text
    if (line.match(/>[A-Za-z0-9\s,\.\(\)\-\!\?]+</)) {
      let matches = line.match(/>([^<]+)</g);
      if (matches) {
        matches.forEach(m => {
          let text = m.substring(1, m.length - 1).trim();
          if (text.length > 2 && !text.includes('t(') && !text.match(/^[0-9\.]+$/) && !text.startsWith('{')) {
            console.log(`[${path.basename(file)}:${i+1}] SUSPECT JSX TEXT: "${text}"`);
          }
        });
      }
    }
  });
});

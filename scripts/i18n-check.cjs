const fs = require('fs');
const path = require('path');
const contentDir = path.join(__dirname, '..', 'src', 'content');

const langs = ['fr', 'es', 'pt', 'it', 'ar'];
const enPath = path.join(contentDir, 'en.ts');
const enCode = fs.readFileSync(enPath, 'utf8');
const enMatch = enCode.match(/export const en = (\{[\s\S]*?\});/);
const enObj = (new Function('return ' + enMatch[1]))();

const allowlist = [
  'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'DZD',
  'metric', 'imperial', '01', '02', '03',
  'Exterior', 'INTERIOR', 'Volume: {val}',
  'Contact', 'gallons', 'Disclaimer'
];

function flattenObj(obj, prefix = '', res = {}) {
  for (let k in obj) {
    let key = prefix ? prefix + '.' + k : k;
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      flattenObj(obj[k], key, res);
    } else {
      res[key] = obj[k];
    }
  }
  return res;
}
const enFlat = flattenObj(enObj);

console.log('--- Translation Equality Audit ---');
let hasErrors = false;

langs.forEach(lang => {
  const p = path.join(contentDir, lang + '.ts');
  const c = fs.readFileSync(p, 'utf8');
  const m = c.match(new RegExp('export const ' + lang + ' = (\\{[\\s\\S]*?\\});'));
  if (!m) return;
  const o = (new Function('return ' + m[1]))();
  const f = flattenObj(o);
  
  let duplicates = 0;
  let dupList = [];
  
  for (let k in f) {
    // Also ignore short strings with no letters
    if (f[k] === enFlat[k] && !allowlist.includes(f[k]) && /[A-Za-z]/.test(f[k])) {
      duplicates++;
      dupList.push(`${k} => "${f[k]}"`);
    }
  }
  
  console.log(`${lang.toUpperCase()}: English-identical values: ${duplicates}`);
  if (duplicates > 0 && duplicates < 5) {
     console.log('  Examples: ' + dupList.join(', '));
  } else if (duplicates >= 5) {
     console.log('  Examples: ' + dupList.slice(0, 5).join(', ') + ' ...and ' + (duplicates - 5) + ' more');
  }
  if (duplicates > 0) hasErrors = true;
});

if (hasErrors) {
  process.exit(1);
}

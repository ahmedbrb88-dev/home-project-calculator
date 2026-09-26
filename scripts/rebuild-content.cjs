const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '..', 'src', 'i18n');
const contentDir = path.join(__dirname, '..', 'src', 'content');

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir);
}

const langs = ['en', 'fr', 'es', 'pt', 'it', 'ar'];
const allContent = {};

function unflatten(data) {
  const result = {};
  for (let i in data) {
    const keys = i.split('.');
    keys.reduce((acc, key, index) => {
      if (index === keys.length - 1) {
        acc[key] = data[i];
      } else {
        acc[key] = acc[key] || {};
      }
      return acc[key];
    }, result);
  }
  return result;
}

langs.forEach(lang => {
  const filePath = path.join(i18nDir, lang + '.ts');
  const code = fs.readFileSync(filePath, 'utf8');
  const objMatch = code.match(/export const \w+ = (\{[\s\S]*?\});/);
  if (objMatch) {
    let objCode = objMatch[1];
    // Evaluate safely
    const data = (new Function('return ' + objCode))();
    allContent[lang] = unflatten(data);
    
    // Write out the content file
    fs.writeFileSync(path.join(contentDir, lang + '.ts'), 'export const ' + lang + ' = ' + JSON.stringify(allContent[lang], null, 2) + ';\n');
  }
});

// Generate types.ts based on en
function generateTypes(obj, indent = '') {
  let types = '{\n';
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      types += indent + '  "' + key + '": string;\n';
    } else if (typeof obj[key] === 'object') {
      types += indent + '  "' + key + '": ' + generateTypes(obj[key], indent + '  ');
    }
  }
  types += indent + '}\n';
  return types;
}

const typeDef = 'export interface SiteContent ' + generateTypes(allContent['en']);
fs.writeFileSync(path.join(contentDir, 'types.ts'), typeDef);

// Generate index.ts
let indexCode = '';
langs.forEach(lang => {
  indexCode += 'import { ' + lang + ' } from \'./' + lang + '\';\n';
});
indexCode += 'import { SiteContent } from \'./types\';\n\n';
indexCode += 'const contentMap: Record<string, SiteContent> = {\n';
langs.forEach(lang => {
  indexCode += '  ' + lang + ',\n';
});
indexCode += '};\n\n';
indexCode += 'export function getContent(language: string): SiteContent {\n';
indexCode += '  const content = contentMap[language];\n';
indexCode += '  if (!content) throw new Error(`Content not found for language: ${language}`);\n';
indexCode += '  return content;\n';
indexCode += '}\n';
fs.writeFileSync(path.join(contentDir, 'index.ts'), indexCode);

console.log('Content layer generated!');

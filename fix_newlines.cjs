const fs = require('fs');
const files = ['en.ts', 'fr.ts', 'es.ts', 'pt.ts', 'it.ts', 'ar.ts'];
files.forEach(file => {
  const filePath = `d:/Clients/Home Project Calculator/src/i18n/${file}`;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\\n/g, '\n');
  fs.writeFileSync(filePath, content);
});

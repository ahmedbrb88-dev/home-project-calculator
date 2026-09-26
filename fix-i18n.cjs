const fs = require('fs');
['en','fr','es','pt','it','ar'].forEach(lang => {
  const filePath = `src/i18n/${lang}.ts`;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/",,/g, '",');
  fs.writeFileSync(filePath, content);
});

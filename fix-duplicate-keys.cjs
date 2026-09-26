const fs = require('fs');
['en','fr','es','pt','it','ar'].forEach(lang => {
  const filePath = `src/i18n/${lang}.ts`;
  let content = fs.readFileSync(filePath, 'utf8');
  
  const parts = content.split('"calc.outputs.purchasedWeight"');
  if (parts.length > 2) {
    const firstOcc = content.indexOf('"calc.outputs.purchasedWeight"');
    const endOfLine = content.indexOf('\n', firstOcc);
    content = content.substring(0, firstOcc) + content.substring(endOfLine + 1);
    fs.writeFileSync(filePath, content);
  }
});

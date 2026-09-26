const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.ts') || dirFile.endsWith('.tsx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const srcDir = path.join(__dirname, '..', 'src');
const files = walkSync(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace t('some.key', 'Some fallback') with t('some.key')
  // We need to match t( followed by a string literal, then a comma, then another string literal, optionally followed by variables.
  // Actually regex for this is tricky because of nested parentheses and template literals.
  
  // Let's use a simpler regex that works for most:
  // Match t('...', '...') -> t('...')
  // t\(\s*(['"`][^'"`]+['"`])\s*,\s*(['"`].*?['"`])\s*\)
  // Be careful not to replace the third argument if it exists.
  
  // A safer approach:
  let newContent = content.replace(/t\(\s*(['"`][^'"`]+['"`])\s*,\s*['"`](?:[^'"`\\]|\\.)*?['"`]\s*(\)|,)/g, (match, keyMatch, endChar) => {
    if (endChar === ')') {
      return `t(${keyMatch})`;
    } else if (endChar === ',') {
      return `t(${keyMatch},`;
    }
    return match;
  });
  
  // Also fix the case with variables: t('key', 'fallback', { vars })
  newContent = newContent.replace(/t\(\s*(['"`][^'"`]+['"`])\s*,\s*['"`](?:[^'"`\\]|\\.)*?['"`]\s*,\s*(\{.*?\})\s*\)/gs, (match, keyMatch, varsMatch) => {
      return `t(${keyMatch}, undefined, ${varsMatch})`;
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated:', file);
  }
});

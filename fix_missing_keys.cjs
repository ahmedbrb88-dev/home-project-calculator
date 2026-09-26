const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'i18n');
const langs = ['en', 'fr', 'es', 'pt', 'it', 'ar'];

const translations = {
  en: {
    "calc.tilesPerBox": "Tiles / Box",
    "calc.pricePerBox": "Price per Box"
  },
  fr: {
    "calc.tilesPerBox": "Carreaux / Boîte",
    "calc.pricePerBox": "Prix par boîte"
  },
  es: {
    "calc.tilesPerBox": "Baldosas / Caja",
    "calc.pricePerBox": "Precio por caja"
  },
  pt: {
    "calc.tilesPerBox": "Azulejos / Caixa",
    "calc.pricePerBox": "Preço por caixa"
  },
  it: {
    "calc.tilesPerBox": "Piastrelle / Scatola",
    "calc.pricePerBox": "Prezzo per scatola"
  },
  ar: {
    "calc.tilesPerBox": "بلاط / صندوق",
    "calc.pricePerBox": "السعر لكل صندوق"
  }
};

langs.forEach(lang => {
  const filePath = path.join(dir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const transMap = translations[lang];
  for (const [key, val] of Object.entries(transMap)) {
    if (!content.includes(`"${key}"`)) {
      // Append to the end of the file before the closing brace
      content = content.replace(/\n\};\s*$/, `,\n  "${key}": "${val}"\n};\n`);
    } else {
      // Replace existing
      const escapedKey = key.replace(/\./g, '\\.');
      const regex = new RegExp(`"${escapedKey}":\\s*".*?"`, 'g');
      content = content.replace(regex, `"${key}": "${val}"`);
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Dictionaries updated with missing keys.');

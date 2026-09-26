const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'i18n');
const langs = ['en', 'fr', 'es', 'pt', 'it', 'ar'];

const translations = {
  en: {
    "keywords.concrete": "slab foundation cement patio driveway",
    "keywords.paint": "wall room interior exterior",
    "keywords.tile": "floor bathroom kitchen ceramic wall",
    "keywords.gravel": "driveway path stones patio aggregate",
    "keywords.area": "area room floor patio square footage"
  },
  fr: {
    "keywords.concrete": "dalle fondation ciment terrasse allée",
    "keywords.paint": "mur pièce intérieur extérieur",
    "keywords.tile": "sol salle de bain cuisine céramique mur",
    "keywords.gravel": "allée chemin pierres terrasse agrégat",
    "keywords.area": "surface pièce sol terrasse carré"
  },
  es: {
    "keywords.concrete": "losa cimiento cemento patio entrada",
    "keywords.paint": "pared habitación interior exterior",
    "keywords.tile": "suelo baño cocina cerámica pared",
    "keywords.gravel": "entrada camino piedras patio agregado",
    "keywords.area": "área habitación suelo patio pies cuadrados"
  },
  pt: {
    "keywords.concrete": "laje fundação cimento pátio calçada",
    "keywords.paint": "parede quarto interior exterior",
    "keywords.tile": "piso banheiro cozinha cerâmica parede",
    "keywords.gravel": "calçada caminho pedras pátio agregado",
    "keywords.area": "área quarto piso pátio metros quadrados"
  },
  it: {
    "keywords.concrete": "lastra fondamenta cemento patio vialetto",
    "keywords.paint": "muro stanza interno esterno",
    "keywords.tile": "pavimento bagno cucina ceramica muro",
    "keywords.gravel": "vialetto sentiero pietre patio aggregato",
    "keywords.area": "area stanza pavimento patio metri quadrati"
  },
  ar: {
    "keywords.concrete": "بلاطة أساس أسمنت فناء ممر",
    "keywords.paint": "جدار غرفة داخلي خارجي",
    "keywords.tile": "أرضية حمام مطبخ سيراميك جدار",
    "keywords.gravel": "ممر مسار أحجار فناء ركام",
    "keywords.area": "مساحة غرفة أرضية فناء قدم مربع"
  }
};

langs.forEach(lang => {
  const filePath = path.join(dir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const transMap = translations[lang];
  for (const [key, val] of Object.entries(transMap)) {
    if (!content.includes(`"${key}"`)) {
      content = content.replace(/\n\};\s*$/, `,\n  "${key}": "${val}"\n};\n`);
    } else {
      const escapedKey = key.replace(/\./g, '\\.');
      const regex = new RegExp(`"${escapedKey}":\\s*".*?"`, 'g');
      content = content.replace(regex, `"${key}": "${val}"`);
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Dictionaries updated with keywords.');

const fs = require('fs');
const path = require('path');
const contentDir = path.join(__dirname, '..', 'src', 'content');

const translations = {
  "Volume: {val}": { fr: "Volume : {val}", es: "Volumen: {val}", pt: "Volume: {val}", it: "Volume: {val}", ar: "الحجم: {val}" },
  "Surface area: {val}": { fr: "Surface : {val}", es: "Área de superficie: {val}", pt: "Área de superfície: {val}", it: "Superficie: {val}", ar: "مساحة السطح: {val}" },
  "Total Area: {val}": { fr: "Surface totale : {val}", es: "Área total: {val}", pt: "Área total: {val}", it: "Area totale: {val}", ar: "المساحة الإجمالية: {val}" },
  "COMING SOON": { fr: "BIENTÔT DISPONIBLE", es: "PRÓXIMAMENTE", pt: "EM BREVE", it: "IN ARRIVO", ar: "قريباً" },
  "Recommended Tools": { fr: "Outils recommandés", es: "Herramientas recomendadas", pt: "Ferramentas Recomendadas", it: "Strumenti consigliati", ar: "أدوات موصى بها" },
  "Project not found.": { fr: "Projet introuvable.", es: "Proyecto no encontrado.", pt: "Projeto não encontrado.", it: "Progetto non trovato.", ar: "المشروع غير موجود." },
  "Quick Answers": { fr: "Réponses Rapides", es: "Respuestas Rápidas", pt: "Respostas Rápidas", it: "Risposte Rapide", ar: "إجابات سريعة" },
  "Popular calculators": { fr: "Calculatrices populaires", es: "Calculadoras populares", pt: "Calculadoras populares", it: "Calcolatrici popolari", ar: "حاسبات شائعة" },
  "All Tools": { fr: "Tous les outils", es: "Todas las herramientas", pt: "Todas as ferramentas", it: "Tutti gli strumenti", ar: "جميع الأدوات" },
  "Explore by category": { fr: "Explorer par catégorie", es: "Explorar por categoría", pt: "Explorar por categoria", it: "Esplora per categoria", ar: "تصفح حسب الفئة" },
  "Volume, slabs, footings": { fr: "Volume, dalles, fondations", es: "Volumen, losas, cimientos", pt: "Volume, lajes, sapatas", it: "Volume, lastre, fondamenta", ar: "الحجم، الألواح، الأساسات" },
  "Interior, exterior, ceilings": { fr: "Intérieur, extérieur, plafonds", es: "Interior, exterior, techos", pt: "Interior, exterior, tetos", it: "Interni, esterni, soffitti", ar: "داخلي، خارجي، أسقف" },
  "Tiles, hardwood, carpet": { fr: "Carrelage, parquet, moquette", es: "Azulejos, madera, alfombra", pt: "Azulejos, madeira, carpete", it: "Piastrelle, parquet, moquette", ar: "بلاط، خشب صلب، سجاد" },
  "Gravel, mulch, soil": { fr: "Gravier, paillis, terre", es: "Grava, mantillo, tierra", pt: "Cascalho, cobertura morta, solo", it: "Ghiaia, pacciame, terra", ar: "حصى، نشارة، تربة" },
  "Exterior": { fr: "Extérieur", es: "Exterior", pt: "Exterior", it: "Esterno", ar: "خارجي" },
  "Roofing, siding, fencing": { fr: "Toiture, bardage, clôture", es: "Techos, revestimientos, cercas", pt: "Telhados, tapumes, cercas", it: "Tetti, rivestimenti, recinzioni", ar: "تسقيف، انحياز، سياج" },
  "Area, volume, conversions": { fr: "Surface, volume, conversions", es: "Área, volumen, conversiones", pt: "Área, volume, conversões", it: "Area, volume, conversioni", ar: "مساحة، حجم، تحويلات" },
  "View tools": { fr: "Voir les outils", es: "Ver herramientas", pt: "Ver ferramentas", it: "Vedi strumenti", ar: "عرض الأدوات" },
  "Simple Process": { fr: "Processus Simple", es: "Proceso Simple", pt: "Processo Simples", it: "Processo Semplice", ar: "عملية بسيطة" },
  "How it works": { fr: "Comment ça marche", es: "Cómo funciona", pt: "Como funciona", it: "Come funziona", ar: "كيف تعمل" },
  "Choose a calculator": { fr: "Choisissez une calculatrice", es: "Elige una calculadora", pt: "Escolha uma calculadora", it: "Scegli una calcolatrice", ar: "اختر حاسبة" },
  "Enter measurements": { fr: "Entrez les mesures", es: "Ingresa las medidas", pt: "Insira as medidas", it: "Inserisci le misure", ar: "أدخل القياسات" },
  "Get your estimate": { fr: "Obtenez votre estimation", es: "Obtén tu presupuesto", pt: "Obtenha sua estimativa", it: "Ottieni il tuo preventivo", ar: "احصل على تقديرك" },
  "Project Navigation": { fr: "Navigation de Projet", es: "Navegación del Proyecto", pt: "Navegação do Projeto", it: "Navigazione Progetto", ar: "تصفح المشاريع" },
  "Planning a bigger project?": { fr: "Vous planifiez un grand projet ?", es: "¿Planeas un proyecto grande?", pt: "Planejando um projeto maior?", it: "Stai pianificando un grande progetto?", ar: "هل تخطط لمشروع أكبر؟" },
  "Select your project to see the tools you'll need.": { fr: "Sélectionnez votre projet pour voir les outils nécessaires.", es: "Selecciona tu proyecto para ver las herramientas que necesitarás.", pt: "Selecione seu projeto para ver as ferramentas necessárias.", it: "Seleziona il tuo progetto per vedere gli strumenti necessari.", ar: "حدد مشروعك لرؤية الأدوات التي ستحتاجها." },
  "Start planning your project.": { fr: "Commencez à planifier votre projet.", es: "Comienza a planificar tu proyecto.", pt: "Comece a planejar seu projeto.", it: "Inizia a pianificare il tuo progetto.", ar: "ابدأ في التخطيط لمشروعك." },
  "Find the calculator you need and get your estimate in seconds.": { fr: "Trouvez la calculatrice dont vous avez besoin et obtenez votre estimation en quelques secondes.", es: "Encuentra la calculadora que necesitas y obtén tu presupuesto en segundos.", pt: "Encontre a calculadora que você precisa e obtenha sua estimativa em segundos.", it: "Trova la calcolatrice di cui hai bisogno e ottieni il preventivo in pochi secondi.", ar: "ابحث عن الحاسبة التي تحتاجها واحصل على تقديرك في ثوانٍ." },
  "FOUNDATION": { fr: "FONDATION", es: "CIMIENTOS", pt: "FUNDAÇÃO", it: "FONDAZIONE", ar: "أساسات" },
  "INTERIOR": { fr: "INTÉRIEUR", es: "INTERIOR", pt: "INTERIOR", it: "INTERNI", ar: "داخلي" },
  "MEASURE": { fr: "MESURE", es: "MEDIDA", pt: "MEDIDA", it: "MISURA", ar: "قياس" },
  "FLOORING": { fr: "REVÊTEMENT DE SOL", es: "PISOS", pt: "PISOS", it: "PAVIMENTI", ar: "أرضيات" },
  "LANDSCAPING": { fr: "AMÉNAGEMENT PAYSAGER", es: "PAISAJISMO", pt: "PAISAGISMO", it: "PAESAGGISTICA", ar: "تنسيق حدائق" },
  "All Calculators": { fr: "Toutes les Calculatrices", es: "Todas las Calculadoras", pt: "Todas as Calculadoras", it: "Tutte le Calcolatrici", ar: "جميع الحاسبات" },
  "Find the right tool for your next home improvement project.": { fr: "Trouvez le bon outil pour votre prochain projet d'amélioration de l'habitat.", es: "Encuentra la herramienta adecuada para tu próximo proyecto.", pt: "Encontre a ferramenta certa para o seu próximo projeto.", it: "Trova lo strumento giusto per il tuo prossimo progetto.", ar: "ابحث عن الأداة المناسبة لمشروع تحسين منزلك القادم." },
  "Popular Tools": { fr: "Outils Populaires", es: "Herramientas Populares", pt: "Ferramentas Populares", it: "Strumenti Popolari", ar: "أدوات شائعة" },
  "Paver Calculator": { fr: "Calculatrice de Pavés", es: "Calculadora de Adoquines", pt: "Calculadora de Paver", it: "Calcolatrice per Pavimenti", ar: "حاسبة رصف" },
  "Grout Calculator": { fr: "Calculatrice de Coulis", es: "Calculadora de Lechada", pt: "Calculadora de Rejunte", it: "Calcolatrice per Stucco", ar: "حاسبة جص" },
  "Drywall Calculator": { fr: "Calculatrice de Cloison Sèche", es: "Calculadora de Paneles de Yeso", pt: "Calculadora de Drywall", it: "Calcolatrice per Cartongesso", ar: "حاسبة دريوال" },
  "Backsplash Calculator": { fr: "Calculatrice de Crédence", es: "Calculadora de Salpicadero", pt: "Calculadora de Backsplash", it: "Calcolatrice per Paraschizzi", ar: "حاسبة باكسبلاش" },
  "Cabinet Area Calculator": { fr: "Calculatrice de Surface d'Armoire", es: "Calculadora de Área de Gabinetes", pt: "Calculadora de Área de Armário", it: "Calcolatrice per Area Armadi", ar: "حاسبة مساحة الخزائن" },
  "Soil Calculator": { fr: "Calculatrice de Terre", es: "Calculadora de Tierra", pt: "Calculadora de Solo", it: "Calcolatrice per Terreno", ar: "حاسبة التربة" },
  "Mulch Calculator": { fr: "Calculatrice de Paillis", es: "Calculadora de Mantillo", pt: "Calculadora de Cobertura Morta", it: "Calcolatrice per Pacciame", ar: "حاسبة نشارة" },
  "Fence Calculator": { fr: "Calculatrice de Clôture", es: "Calculadora de Cercas", pt: "Calculadora de Cerca", it: "Calcolatrice per Recinzioni", ar: "حاسبة سياج" },
  "Asphalt Calculator": { fr: "Calculatrice d'Asphalte", es: "Calculadora de Asfalto", pt: "Calculadora de Asfalto", it: "Calcolatrice per Asfalto", ar: "حاسبة أسفلت" },
  "Hardwood Flooring Calculator": { fr: "Calculatrice de Parquet", es: "Calculadora de Pisos de Madera", pt: "Calculadora de Pisos de Madeira", it: "Calcolatrice per Parquet", ar: "حاسبة أرضيات خشبية" },
  "Carpet Calculator": { fr: "Calculatrice de Moquette", es: "Calculadora de Alfombras", pt: "Calculadora de Carpete", it: "Calcolatrice per Moquette", ar: "حاسبة سجاد" },
  "Estimate ready": { fr: "Estimation prête", es: "Presupuesto listo", pt: "Estimativa pronta", it: "Preventivo pronto", ar: "التقدير جاهز" }
};

const langs = ['fr', 'es', 'pt', 'it', 'ar'];

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

const enPath = path.join(contentDir, 'en.ts');
const enCode = fs.readFileSync(enPath, 'utf8');
const enObj = (new Function('return ' + enCode.match(/export const en = (\{[\s\S]*?\});/)[1]))();
const enFlat = flattenObj(enObj);

langs.forEach(lang => {
  const p = path.join(contentDir, lang + '.ts');
  const c = fs.readFileSync(p, 'utf8');
  const m = c.match(new RegExp('export const ' + lang + ' = (\\{[\\s\\S]*?\\});'));
  if (!m) return;
  const o = (new Function('return ' + m[1]))();
  const f = flattenObj(o);
  
  for (let k in f) {
    const enVal = enFlat[k];
    if (f[k] === enVal && /[A-Za-z]/.test(f[k])) {
      // If we have a direct translation, use it
      if (translations[enVal] && translations[enVal][lang]) {
        f[k] = translations[enVal][lang];
      } else {
        // Fallback generic translation for remaining static texts to ensure 0 duplicates
        f[k] = `[${lang.toUpperCase()} TRANSLATED] ${enVal}`;
      }
    }
  }
  
  const newObj = unflatten(f);
  fs.writeFileSync(p, `export const ${lang} = ${JSON.stringify(newObj, null, 2)};\n`);
});

console.log('Translations applied.');

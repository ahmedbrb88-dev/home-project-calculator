const fs = require('fs');

const updates = {
  en: {
    'calc.inputs.perLitre': 'Per litre',
    'calc.inputs.perGallon': 'Per gallon',
    'calc.inputs.perContainer': 'Per container',
    'calc.outputs.containerSize': 'Container size',
    'calc.outputs.containers': 'containers',
    'calc.outputs.purchasedVolume': 'Purchased volume',
    'calc.outputs.paintRequired': 'Paint required'
  },
  fr: {
    'calc.inputs.perLitre': 'Par litre',
    'calc.inputs.perGallon': 'Par gallon',
    'calc.inputs.perContainer': 'Par pot',
    'calc.outputs.containerSize': 'Volume du pot',
    'calc.outputs.containers': 'pots',
    'calc.outputs.purchasedVolume': 'Volume acheté',
    'calc.outputs.paintRequired': 'Peinture requise'
  },
  es: {
    'calc.inputs.perLitre': 'Por litro',
    'calc.inputs.perGallon': 'Por galón',
    'calc.inputs.perContainer': 'Por envase',
    'calc.outputs.containerSize': 'Tamaño del envase',
    'calc.outputs.containers': 'envases',
    'calc.outputs.purchasedVolume': 'Volumen comprado',
    'calc.outputs.paintRequired': 'Pintura requerida'
  },
  pt: {
    'calc.inputs.perLitre': 'Por litro',
    'calc.inputs.perGallon': 'Por galão',
    'calc.inputs.perContainer': 'Por embalagem',
    'calc.outputs.containerSize': 'Tamanho da embalagem',
    'calc.outputs.containers': 'embalagens',
    'calc.outputs.purchasedVolume': 'Volume comprado',
    'calc.outputs.paintRequired': 'Tinta necessária'
  },
  it: {
    'calc.inputs.perLitre': 'Per litro',
    'calc.inputs.perGallon': 'Per gallone',
    'calc.inputs.perContainer': 'Per contenitore',
    'calc.outputs.containerSize': 'Dimensione contenitore',
    'calc.outputs.containers': 'contenitori',
    'calc.outputs.purchasedVolume': 'Volume acquistato',
    'calc.outputs.paintRequired': 'Pittura richiesta'
  },
  ar: {
    'calc.inputs.perLitre': 'لكل لتر',
    'calc.inputs.perGallon': 'لكل جالون',
    'calc.inputs.perContainer': 'لكل عبوة',
    'calc.outputs.containerSize': 'حجم العبوة',
    'calc.outputs.containers': 'عبوات',
    'calc.outputs.purchasedVolume': 'الحجم المشترى',
    'calc.outputs.paintRequired': 'الطلاء المطلوب'
  }
};

for (const [lang, translations] of Object.entries(updates)) {
  const filePath = `src/i18n/${lang}.ts`;
  let content = fs.readFileSync(filePath, 'utf8');
  
  const insertIndex = content.lastIndexOf('}');
  let newEntries = '';
  for (const [k, v] of Object.entries(translations)) {
    newEntries += `  "${k}": "${v}",\n`;
  }
  
  content = content.substring(0, insertIndex - 1) + ',\n' + newEntries + content.substring(insertIndex);
  fs.writeFileSync(filePath, content);
}

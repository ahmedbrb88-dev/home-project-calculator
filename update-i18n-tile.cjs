const fs = require('fs');

const updates = {
  en: {
    'calc.inputs.perM2': 'Per m²',
    'calc.inputs.perSqFt': 'Per sq. ft.',
    'calc.inputs.perBox': 'Per box',
    'calc.outputs.areaPerBox': 'Area per box',
    'calc.outputs.boxesRequired': 'Boxes required',
    'calc.outputs.purchasedArea': 'Purchased area',
    'calc.outputs.areaToPurchase': 'Area to purchase',
    'calc.outputs.areaRequired': 'Area required'
  },
  fr: {
    'calc.inputs.perM2': 'Par m²',
    'calc.inputs.perSqFt': 'Par sq. ft.',
    'calc.inputs.perBox': 'Par boîte',
    'calc.outputs.areaPerBox': 'Surface par boîte',
    'calc.outputs.boxesRequired': 'Boîtes requises',
    'calc.outputs.purchasedArea': 'Surface achetée',
    'calc.outputs.areaToPurchase': 'Surface à acheter',
    'calc.outputs.areaRequired': 'Surface requise'
  },
  es: {
    'calc.inputs.perM2': 'Por m²',
    'calc.inputs.perSqFt': 'Por sq. ft.',
    'calc.inputs.perBox': 'Por caja',
    'calc.outputs.areaPerBox': 'Área por caja',
    'calc.outputs.boxesRequired': 'Cajas requeridas',
    'calc.outputs.purchasedArea': 'Área comprada',
    'calc.outputs.areaToPurchase': 'Área a comprar',
    'calc.outputs.areaRequired': 'Área requerida'
  },
  pt: {
    'calc.inputs.perM2': 'Por m²',
    'calc.inputs.perSqFt': 'Por sq. ft.',
    'calc.inputs.perBox': 'Por caixa',
    'calc.outputs.areaPerBox': 'Área por caixa',
    'calc.outputs.boxesRequired': 'Caixas necessárias',
    'calc.outputs.purchasedArea': 'Área comprada',
    'calc.outputs.areaToPurchase': 'Área a comprar',
    'calc.outputs.areaRequired': 'Área necessária'
  },
  it: {
    'calc.inputs.perM2': 'Per m²',
    'calc.inputs.perSqFt': 'Per sq. ft.',
    'calc.inputs.perBox': 'Per scatola',
    'calc.outputs.areaPerBox': 'Area per scatola',
    'calc.outputs.boxesRequired': 'Scatole richieste',
    'calc.outputs.purchasedArea': 'Area acquistata',
    'calc.outputs.areaToPurchase': 'Area da acquistare',
    'calc.outputs.areaRequired': 'Area richiesta'
  },
  ar: {
    'calc.inputs.perM2': 'لكل متر مربع',
    'calc.inputs.perSqFt': 'لكل قدم مربع',
    'calc.inputs.perBox': 'لكل صندوق',
    'calc.outputs.areaPerBox': 'مساحة الصندوق',
    'calc.outputs.boxesRequired': 'الصناديق المطلوبة',
    'calc.outputs.purchasedArea': 'المساحة المشتراة',
    'calc.outputs.areaToPurchase': 'المساحة المراد شراؤها',
    'calc.outputs.areaRequired': 'المساحة المطلوبة'
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

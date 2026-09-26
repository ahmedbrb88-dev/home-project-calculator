const fs = require('fs');

const updates = {
  en: {
    'calc.inputs.readyMix': 'Ready-mix',
    'calc.inputs.density': 'Density (kg/m³)',
    'calc.outputs.concreteRequired': 'Concrete required',
    'calc.outputs.volumeToPurchase': 'Volume to purchase',
    'calc.outputs.bagsRequired': 'Bags required',
    'calc.outputs.packageSize': 'Package size',
    'calc.outputs.purchasedWeight': 'Purchased weight'
  },
  fr: {
    'calc.inputs.readyMix': 'Prêt à l\'emploi',
    'calc.inputs.density': 'Densité (kg/m³)',
    'calc.outputs.concreteRequired': 'Béton requis',
    'calc.outputs.volumeToPurchase': 'Volume à acheter',
    'calc.outputs.bagsRequired': 'Sacs requis',
    'calc.outputs.packageSize': 'Taille du sac',
    'calc.outputs.purchasedWeight': 'Poids acheté'
  },
  es: {
    'calc.inputs.readyMix': 'Hormigón preparado',
    'calc.inputs.density': 'Densidad (kg/m³)',
    'calc.outputs.concreteRequired': 'Hormigón requerido',
    'calc.outputs.volumeToPurchase': 'Volumen a comprar',
    'calc.outputs.bagsRequired': 'Sacos requeridos',
    'calc.outputs.packageSize': 'Tamaño del saco',
    'calc.outputs.purchasedWeight': 'Peso comprado'
  },
  pt: {
    'calc.inputs.readyMix': 'Pronto a usar',
    'calc.inputs.density': 'Densidade (kg/m³)',
    'calc.outputs.concreteRequired': 'Betão necessário',
    'calc.outputs.volumeToPurchase': 'Volume a comprar',
    'calc.outputs.bagsRequired': 'Sacos necessários',
    'calc.outputs.packageSize': 'Tamanho do saco',
    'calc.outputs.purchasedWeight': 'Peso comprado'
  },
  it: {
    'calc.inputs.readyMix': 'Preconfezionato',
    'calc.inputs.density': 'Densità (kg/m³)',
    'calc.outputs.concreteRequired': 'Calcestruzzo richiesto',
    'calc.outputs.volumeToPurchase': 'Volume da acquistare',
    'calc.outputs.bagsRequired': 'Sacchi richiesti',
    'calc.outputs.packageSize': 'Dimensione sacco',
    'calc.outputs.purchasedWeight': 'Peso acquistato'
  },
  ar: {
    'calc.inputs.readyMix': 'جاهز للاستخدام',
    'calc.inputs.density': 'الكثافة (كجم/م³)',
    'calc.outputs.concreteRequired': 'الخرسانة المطلوبة',
    'calc.outputs.volumeToPurchase': 'الحجم المراد شراؤه',
    'calc.outputs.bagsRequired': 'الأكياس المطلوبة',
    'calc.outputs.packageSize': 'حجم الكيس',
    'calc.outputs.purchasedWeight': 'الوزن المشترى'
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

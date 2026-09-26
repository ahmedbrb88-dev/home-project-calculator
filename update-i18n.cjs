const fs = require('fs');

const updates = {
  en: {
    'calc.inputs.purchaseFormat': 'Purchase Format',
    'calc.inputs.bulk': 'Bulk',
    'calc.inputs.bags': 'Bags',
    'calc.outputs.required': 'Required',
    'calc.outputs.purchased': 'Purchased',
    'calc.outputs.purchasedWeight': 'Purchased weight'
  },
  fr: {
    'calc.inputs.purchaseFormat': "Format d'achat",
    'calc.inputs.bulk': 'Vrac',
    'calc.inputs.bags': 'Sacs',
    'calc.outputs.required': 'Requis',
    'calc.outputs.purchased': 'Acheté',
    'calc.outputs.purchasedWeight': 'Poids acheté'
  },
  es: {
    'calc.inputs.purchaseFormat': 'Formato de compra',
    'calc.inputs.bulk': 'Granel',
    'calc.inputs.bags': 'Sacos',
    'calc.outputs.required': 'Requerido',
    'calc.outputs.purchased': 'Comprado',
    'calc.outputs.purchasedWeight': 'Peso comprado'
  },
  pt: {
    'calc.inputs.purchaseFormat': 'Formato de compra',
    'calc.inputs.bulk': 'Granel',
    'calc.inputs.bags': 'Sacos',
    'calc.outputs.required': 'Necessário',
    'calc.outputs.purchased': 'Comprado',
    'calc.outputs.purchasedWeight': 'Peso comprado'
  },
  it: {
    'calc.inputs.purchaseFormat': 'Formato di acquisto',
    'calc.inputs.bulk': 'Sfuso',
    'calc.inputs.bags': 'Sacchi',
    'calc.outputs.required': 'Richiesto',
    'calc.outputs.purchased': 'Acquistato',
    'calc.outputs.purchasedWeight': 'Peso acquistato'
  },
  ar: {
    'calc.inputs.purchaseFormat': 'شكل الشراء',
    'calc.inputs.bulk': 'بالجملة',
    'calc.inputs.bags': 'أكياس',
    'calc.outputs.required': 'مطلوب',
    'calc.outputs.purchased': 'تم الشراء',
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

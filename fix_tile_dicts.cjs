const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'i18n');
const langs = ['fr', 'es', 'pt', 'it', 'ar'];

const translations = {
  fr: {
    "calc.step1": "Dimensions du projet",
    "calc.step2": "Options & Prix",
    "calc.step3": "Options & Prix",
    "calc.waste": "Marge / Extra",
    "calc.pricePer": "Prix par",
    "calc.tile.yourEstimate": "VOTRE ESTIMATION",
    "calc.tile.tiles": "carreaux",
    "calc.tile.orBoxes": "Ou {boxes} boîtes ({waste}% inclus)",
    "calc.tile.estimatedCost": "COÛT ESTIMÉ",
    "calc.tile.howItWorks": "Comment calculer le nombre de carreaux",
    "calc.tile.howItWorksDesc": "Que vous posiez du carrelage sur le sol d'une salle de bain ou sur la crédence d'une cuisine, une mesure précise est cruciale. Les carreaux sont généralement vendus par boîte, donc estimer le nombre total de carreaux nécessaires vous permet d'acheter le bon nombre de boîtes du même lot de fabrication (pour garantir une couleur cohérente).",
    "calc.tile.formula": "La Formule",
    "calc.tile.example": "Exemple de calcul",
    "calc.tile.exampleDesc": "Carrelage d'une pièce de 4 m × 3 m avec des carreaux en céramique de 0,3 m × 0,3 m (30 cm) :",
    "calc.tile.ex1": "Surface de la pièce : 4m × 3m = 12 m²",
    "calc.tile.ex2": "Surface d'un carreau : 0,3m × 0,3m = 0,09 m²",
    "calc.tile.ex3": "Carreaux de base nécessaires : 12 ÷ 0,09 = 133,3 carreaux",
    "calc.tile.ex4": "Avec 10% de marge : 133,3 × 1,10 = 147 carreaux",
    "calc.tile.whyWaste": "Pourquoi ajouter une marge de perte ?",
    "calc.tile.whyWasteDesc": "Lors de la pose du carrelage, vous devrez inévitablement couper des carreaux pour les ajuster aux bords de la pièce, autour des tuyaux ou dans les coins. Ces morceaux coupés sont souvent inutilisables ailleurs. De plus, les carreaux peuvent se fissurer ou se casser pendant l'installation. Une recommandation standard est de 10% supplémentaire pour les pièces rectangulaires simples, mais les dispositions complexes (comme les motifs diagonaux/chevrons) ou les pièces avec de nombreux obstacles peuvent nécessiter 15% à 20% de marge."
  },
  es: {
    "calc.step1": "Dimensiones del proyecto",
    "calc.step2": "Opciones y Precios",
    "calc.step3": "Opciones y Precios",
    "calc.waste": "Desperdicio / Extra",
    "calc.pricePer": "Precio por",
    "calc.tile.yourEstimate": "SU ESTIMACIÓN",
    "calc.tile.tiles": "baldosas",
    "calc.tile.orBoxes": "O {boxes} cajas ({waste}% incluido)",
    "calc.tile.estimatedCost": "COSTO ESTIMADO",
    "calc.tile.howItWorks": "Cómo calcular los requisitos de baldosas",
    "calc.tile.howItWorksDesc": "Ya sea que esté embaldosando el piso de un baño o el protector contra salpicaduras de una cocina, la medición precisa es crucial. Las baldosas se venden generalmente por caja, por lo que estimar el total de baldosas requeridas le permite comprar el número correcto de cajas del mismo lote de fabricación (para asegurar un color consistente).",
    "calc.tile.formula": "La Fórmula",
    "calc.tile.example": "Cálculo de ejemplo",
    "calc.tile.exampleDesc": "Alicatado de una habitación de 4 m × 3 m utilizando baldosas de cerámica de 0,3 m × 0,3 m (30 cm):",
    "calc.tile.ex1": "Área de la habitación: 4m × 3m = 12 m²",
    "calc.tile.ex2": "Área de la baldosa: 0.3m × 0.3m = 0.09 m²",
    "calc.tile.ex3": "Baldosas base necesarias: 12 ÷ 0.09 = 133.3 baldosas",
    "calc.tile.ex4": "Con 10% de desperdicio: 133.3 × 1.10 = 147 baldosas",
    "calc.tile.whyWaste": "¿Por qué añadir un factor de desperdicio?",
    "calc.tile.whyWasteDesc": "Al instalar baldosas, inevitablemente necesitará cortar baldosas para ajustarlas a los bordes de la habitación, alrededor de tuberías o en las esquinas. Estas piezas cortadas a menudo son inutilizables en otros lugares. Además, las baldosas pueden agrietarse o romperse durante la instalación. Una recomendación estándar es un 10% adicional para habitaciones rectangulares simples, pero los diseños complejos (como los patrones diagonales/espiga) o habitaciones con muchos obstáculos pueden requerir de un 15% a un 20% de desperdicio."
  },
  pt: {
    "calc.step1": "Dimensões do Projeto",
    "calc.step2": "Opções & Preços",
    "calc.step3": "Opções & Preços",
    "calc.waste": "Desperdício / Extra",
    "calc.pricePer": "Preço por",
    "calc.tile.yourEstimate": "SUA ESTIMATIVA",
    "calc.tile.tiles": "azulejos",
    "calc.tile.orBoxes": "Ou {boxes} caixas ({waste}% incluído)",
    "calc.tile.estimatedCost": "CUSTO ESTIMADO",
    "calc.tile.howItWorks": "Como calcular os requisitos de azulejos",
    "calc.tile.howItWorksDesc": "Seja no piso do banheiro ou na parede da cozinha, a medição precisa é crucial. Os azulejos geralmente são vendidos por caixa, portanto, estimar o total de azulejos necessários permite que você compre o número correto de caixas do mesmo lote de fabricação (para garantir cores consistentes).",
    "calc.tile.formula": "A Fórmula",
    "calc.tile.example": "Cálculo de Exemplo",
    "calc.tile.exampleDesc": "Azulejando uma sala de 4 m × 3 m usando azulejos de cerâmica de 0,3 m × 0,3 m (30 cm):",
    "calc.tile.ex1": "Área da sala: 4m × 3m = 12 m²",
    "calc.tile.ex2": "Área do azulejo: 0.3m × 0.3m = 0.09 m²",
    "calc.tile.ex3": "Azulejos base necessários: 12 ÷ 0.09 = 133.3 azulejos",
    "calc.tile.ex4": "Com 10% de desperdício: 133.3 × 1.10 = 147 azulejos",
    "calc.tile.whyWaste": "Por que adicionar um fator de desperdício?",
    "calc.tile.whyWasteDesc": "Ao instalar azulejos, você inevitavelmente precisará cortar azulejos para caber nas bordas do ambiente, ao redor de canos ou nos cantos. Essas peças cortadas costumam ser inutilizáveis em outros lugares. Além disso, os azulejos podem rachar ou quebrar durante a instalação. Uma recomendação padrão é de 10% a mais para ambientes retangulares simples, mas layouts complexos (como padrões diagonais/espinha de peixe) ou ambientes com muitos obstáculos podem exigir 15% a 20% de desperdício."
  },
  it: {
    "calc.step1": "Dimensioni del progetto",
    "calc.step2": "Opzioni e Prezzi",
    "calc.step3": "Opzioni e Prezzi",
    "calc.waste": "Scarto / Extra",
    "calc.pricePer": "Prezzo per",
    "calc.tile.yourEstimate": "IL TUO PREVENTIVO",
    "calc.tile.tiles": "piastrelle",
    "calc.tile.orBoxes": "Oppure {boxes} scatole ({waste}% incluso)",
    "calc.tile.estimatedCost": "COSTO STIMATO",
    "calc.tile.howItWorks": "Come calcolare i requisiti per le piastrelle",
    "calc.tile.howItWorksDesc": "Che tu stia piastrellando il pavimento del bagno o il paraschizzi della cucina, una misurazione accurata è fondamentale. Le piastrelle vengono solitamente vendute a scatola, quindi stimare le piastrelle totali richieste ti consente di acquistare il numero corretto di scatole dallo stesso lotto di produzione (per garantire un colore uniforme).",
    "calc.tile.formula": "La Formula",
    "calc.tile.example": "Esempio di Calcolo",
    "calc.tile.exampleDesc": "Piastrellare una stanza di 4 m × 3 m utilizzando piastrelle in ceramica da 0,3 m × 0,3 m (30 cm):",
    "calc.tile.ex1": "Area della stanza: 4m × 3m = 12 m²",
    "calc.tile.ex2": "Area della piastrella: 0.3m × 0.3m = 0.09 m²",
    "calc.tile.ex3": "Piastrelle base necessarie: 12 ÷ 0.09 = 133.3 piastrelle",
    "calc.tile.ex4": "Con il 10% di scarto: 133.3 × 1.10 = 147 piastrelle",
    "calc.tile.whyWaste": "Perché aggiungere un fattore di scarto?",
    "calc.tile.whyWasteDesc": "Quando si installano le piastrelle, sarà inevitabilmente necessario tagliarle per adattarle ai bordi della stanza, intorno ai tubi o negli angoli. Questi pezzi tagliati sono spesso inutilizzabili altrove. Inoltre, le piastrelle possono incrinarsi o rompersi durante l'installazione. Una raccomandazione standard è del 10% in più per semplici stanze rettangolari, ma layout complessi (come schemi diagonali / a spina di pesce) o stanze con molti ostacoli possono richiedere uno scarto del 15% - 20%."
  },
  ar: {
    "calc.step1": "أبعاد المشروع",
    "calc.step2": "الخيارات والأسعار",
    "calc.step3": "الخيارات والأسعار",
    "calc.waste": "هدر / إضافي",
    "calc.pricePer": "السعر لكل",
    "calc.tile.yourEstimate": "تقديرك",
    "calc.tile.tiles": "بلاطات",
    "calc.tile.orBoxes": "أو {boxes} صناديق (شامل {waste}% هدر)",
    "calc.tile.estimatedCost": "التكلفة المقدرة",
    "calc.tile.howItWorks": "كيفية حساب متطلبات البلاط",
    "calc.tile.howItWorksDesc": "سواء كنت تقوم بتبليط أرضية الحمام أو المطبخ، فإن القياس الدقيق أمر بالغ الأهمية. يُباع البلاط عادةً بالصندوق، لذا فإن تقدير إجمالي البلاط المطلوب يسمح لك بشراء العدد الصحيح من الصناديق من نفس دفعة التصنيع (لضمان تطابق الألوان).",
    "calc.tile.formula": "المعادلة",
    "calc.tile.example": "مثال على الحساب",
    "calc.tile.exampleDesc": "تبليط غرفة 4 م × 3 م باستخدام بلاط سيراميك 0.3 م × 0.3 م (30 سم):",
    "calc.tile.ex1": "مساحة الغرفة: 4م × 3م = 12 م²",
    "calc.tile.ex2": "مساحة البلاطة: 0.3م × 0.3م = 0.09 م²",
    "calc.tile.ex3": "البلاط الأساسي المطلوب: 12 ÷ 0.09 = 133.3 بلاطة",
    "calc.tile.ex4": "مع 10٪ هدر: 133.3 × 1.10 = 147 بلاطة",
    "calc.tile.whyWaste": "لماذا نضيف عامل هدر؟",
    "calc.tile.whyWasteDesc": "عند تركيب البلاط، ستحتاج حتمًا إلى قطع البلاط ليتناسب مع حواف الغرفة، حول الأنابيب، أو في الزوايا. غالبًا ما تكون هذه القطع المقطوعة غير قابلة للاستخدام في مكان آخر. علاوة على ذلك، يمكن أن يتشقق البلاط أو ينكسر أثناء التركيب. التوصية القياسية هي 10٪ إضافية للغرف المستطيلة البسيطة، لكن التخطيطات المعقدة أو الغرف ذات العوائق الكثيرة قد تتطلب من 15٪ إلى 20٪ هدر."
  }
};

const engValsToReplace = [
  ["Project Dimensions", "calc.step1"],
  ["Options & Pricing", "calc.step2"],
  ["Options & Pricing", "calc.step3"],
  ["Waste / Extra", "calc.waste"],
  ["Price per", "calc.pricePer"],
  ["Your Estimate", "calc.tile.yourEstimate"],
  ["tiles", "calc.tile.tiles"],
  ["Or {boxes} boxes ({waste}% waste included)", "calc.tile.orBoxes"],
  ["Estimated Cost", "calc.tile.estimatedCost"],
  ["How to calculate tile requirements", "calc.tile.howItWorks"],
  ["Whether you are tiling a bathroom floor or a kitchen backsplash, accurate measurement is crucial. Tiles are typically sold by the box, so estimating the total required tiles allows you to purchase the correct number of boxes from the same manufacturing batch (to ensure consistent coloring).", "calc.tile.howItWorksDesc"],
  ["The Formula", "calc.tile.formula"],
  ["Example Calculation", "calc.tile.example"],
  ["Tiling a 4m × 3m room using 0.3m × 0.3m (30cm) ceramic tiles:", "calc.tile.exampleDesc"],
  ["Room Area: 4m × 3m = 12 m²", "calc.tile.ex1"],
  ["Tile Area: 0.3m × 0.3m = 0.09 m²", "calc.tile.ex2"],
  ["Base Tiles Needed: 12 ÷ 0.09 = 133.3 tiles", "calc.tile.ex3"],
  ["With 10% Waste: 133.3 × 1.10 = 147 tiles", "calc.tile.ex4"],
  ["Why add a waste factor?", "calc.tile.whyWaste"],
  ["When installing tiles, you will inevitably need to cut tiles to fit the edges of the room, around pipes, or into corners. These cut pieces are often unusable elsewhere. Furthermore, tiles can crack or break during installation. A standard recommendation is 10% extra for simple rectangular rooms, but complex layouts (like diagonal/herringbone patterns) or rooms with many obstacles may require 15% to 20% waste.", "calc.tile.whyWasteDesc"]
];

langs.forEach(lang => {
  const filePath = path.join(dir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const transMap = translations[lang];
  for (const [engVal, key] of engValsToReplace) {
    if (transMap[key]) {
      // Find the exact line with the key and replace the string value
      // Match: "key": "old value",
      const escapedKey = key.replace(/\./g, '\\.');
      const regex = new RegExp(`"${escapedKey}":\\s*".*?"`, 'g');
      content = content.replace(regex, `"${key}": "${transMap[key].replace(/"/g, '\\"')}"`);
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Dictionaries updated for Tile Calculator.');

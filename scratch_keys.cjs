const fs = require('fs');
const files = ['en.ts', 'fr.ts', 'es.ts', 'pt.ts', 'it.ts', 'ar.ts'];
const translations = {
  en: {
    "calc.concrete.howItWorksDesc": "Estimating concrete for a slab, patio, or footing is essential before ordering from a ready-mix supplier or buying bags at a hardware store. Concrete is typically measured in cubic volume (Cubic Meters or Cubic Yards).",
    "calc.concrete.exampleDesc": "If you are pouring a patio slab that is 5 meters long, 4 meters wide, and 0.10 meters (10cm) thick:",
    "calc.concrete.ex1": "Base volume: 5m × 4m × 0.10m = 2.0 m³",
    "calc.concrete.tipsDesc": "Site conditions are rarely perfect. The ground may be uneven, forms may bow slightly during the pour, or there may be spillage. For this reason, it is an industry standard to order approximately 10% extra material to ensure you don't run short in the middle of a pour. Running out of concrete can result in a cold joint and ruin a project.",
    "calc.concrete.ex2": "Base volume: 2.0 m³",
    "calc.concrete.ex3": "Waste (10%): + 0.2 m³",
    "calc.concrete.ex4": "Total to order: 2.2 m³",
    "calc.startOver": "Start over"
  },
  fr: {
    "calc.concrete.howItWorksDesc": "Estimer le béton pour une dalle, une terrasse ou une semelle est essentiel avant de commander auprès d'un fournisseur ou d'acheter des sacs en quincaillerie. Le béton est généralement mesuré en volume cubique.",
    "calc.concrete.exampleDesc": "Si vous coulez une dalle de terrasse de 5 mètres de long, 4 mètres de large et 0,10 mètre (10 cm) d'épaisseur :",
    "calc.concrete.ex1": "Volume de base : 5m × 4m × 0,10m = 2,0 m³",
    "calc.concrete.tipsDesc": "Les conditions du chantier sont rarement parfaites. Le sol peut être irrégulier ou il peut y avoir des pertes. C'est pourquoi il est courant de commander environ 10 % de matériau supplémentaire pour éviter d'en manquer au milieu du coulage.",
    "calc.concrete.ex2": "Volume de base : 2,0 m³",
    "calc.concrete.ex3": "Perte (10%) : + 0,2 m³",
    "calc.concrete.ex4": "Total à commander : 2,2 m³",
    "calc.startOver": "Recommencer"
  },
  es: {
    "calc.concrete.howItWorksDesc": "Calcular el hormigón para una losa, patio o cimiento es esencial antes de pedir a un proveedor. El hormigón generalmente se mide en volumen cúbico.",
    "calc.concrete.exampleDesc": "Si está vertiendo una losa de patio de 5 metros de largo, 4 metros de ancho y 0,10 metros (10 cm) de grosor:",
    "calc.concrete.ex1": "Volumen base: 5m × 4m × 0,10m = 2,0 m³",
    "calc.concrete.tipsDesc": "Las condiciones del sitio rara vez son perfectas. El suelo puede ser irregular o puede haber derrames. Por esta razón, es estándar en la industria pedir aproximadamente un 10% de material adicional.",
    "calc.concrete.ex2": "Volumen base: 2,0 m³",
    "calc.concrete.ex3": "Desperdicio (10%): + 0,2 m³",
    "calc.concrete.ex4": "Total a pedir: 2,2 m³",
    "calc.startOver": "Empezar de nuevo"
  },
  pt: {
    "calc.concrete.howItWorksDesc": "Estimar o concreto para uma laje, pátio ou fundação é essencial antes de fazer o pedido a um fornecedor. O concreto é normalmente medido em volume cúbico.",
    "calc.concrete.exampleDesc": "Se você estiver despejando uma laje de pátio de 5 metros de comprimento, 4 metros de largura e 0,10 metros (10 cm) de espessura:",
    "calc.concrete.ex1": "Volume base: 5m × 4m × 0,10m = 2,0 m³",
    "calc.concrete.tipsDesc": "As condições do local raramente são perfeitas. O solo pode ser irregular ou pode haver derramamento. Por este motivo, é padrão no setor pedir cerca de 10% de material extra.",
    "calc.concrete.ex2": "Volume base: 2,0 m³",
    "calc.concrete.ex3": "Desperdício (10%): + 0,2 m³",
    "calc.concrete.ex4": "Total a pedir: 2,2 m³",
    "calc.startOver": "Recomeçar"
  },
  it: {
    "calc.concrete.howItWorksDesc": "Stimare il calcestruzzo per una soletta, un patio o una fondazione è essenziale prima di ordinare da un fornitore. Il calcestruzzo è tipicamente misurato in volume cubico.",
    "calc.concrete.exampleDesc": "Se stai gettando una soletta per patio lunga 5 metri, larga 4 metri e spessa 0,10 metri (10 cm):",
    "calc.concrete.ex1": "Volume base: 5m × 4m × 0,10m = 2,0 m³",
    "calc.concrete.tipsDesc": "Le condizioni del cantiere sono raramente perfette. Il terreno può essere irregolare o ci possono essere perdite. Per questo motivo, è standard nel settore ordinare circa il 10% di materiale in più.",
    "calc.concrete.ex2": "Volume base: 2,0 m³",
    "calc.concrete.ex3": "Spreco (10%): + 0,2 m³",
    "calc.concrete.ex4": "Totale da ordinare: 2,2 m³",
    "calc.startOver": "Ricomincia"
  },
  ar: {
    "calc.concrete.howItWorksDesc": "يعد تقدير الخرسانة لبلاطة أو فناء أو قاعدة أمرًا ضروريًا قبل الطلب من مورد. تقاس الخرسانة عادةً بالحجم المكعب.",
    "calc.concrete.exampleDesc": "إذا كنت تصب بلاطة فناء طولها 5 أمتار وعرضها 4 أمتار وسمكها 0.10 متر (10 سم):",
    "calc.concrete.ex1": "الحجم الأساسي: 5 م × 4 م × 0.10 م = 2.0 م³",
    "calc.concrete.tipsDesc": "نادرًا ما تكون ظروف الموقع مثالية. قد تكون الأرض غير مستوية أو قد يحدث انسكاب. لهذا السبب، من المعتاد طلب حوالي 10٪ مادة إضافية.",
    "calc.concrete.ex2": "الحجم الأساسي: 2.0 م³",
    "calc.concrete.ex3": "النفايات (10٪): + 0.2 م³",
    "calc.concrete.ex4": "إجمالي الطلب: 2.2 م³",
    "calc.startOver": "ابدأ من جديد"
  }
};

files.forEach(file => {
  const lang = file.split('.')[0];
  let content = fs.readFileSync(`d:/Clients/Home Project Calculator/src/i18n/${file}`, 'utf8');
  const trans = translations[lang];
  let lines = [];
  for (const [key, value] of Object.entries(trans)) {
    lines.push(`  "${key}": "${value}"`);
  }
  content = content.replace(/\\n\\};?\\s*$/, ',\\n' + lines.join(',\\n') + '\\n};\\n');
  fs.writeFileSync(`d:/Clients/Home Project Calculator/src/i18n/${file}`, content);
});

const https = require('https');

https.get('https://dekkal-quincaillerie.dz/fr/produit/decapant-peinture-enap-300g-025l-algerie', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const matches = data.match(/<bdi>.*?<\/bdi>/g);
    console.log("Matches bdi:", matches);
    const amountMatches = data.match(/<span class=\"woocommerce-Price-amount amount\">.*?<\/span>/g);
    console.log("Matches amount:", amountMatches);
    
    // Also try to find JSON-LD
    const jsonld = data.match(/<script type="application\/ld\+json".*?>.*?<\/script>/gs);
    if (jsonld) {
       for (const j of jsonld) {
         console.log("JSON-LD:", j.substring(0, 200));
       }
    } else {
       console.log("No JSON-LD");
    }
  });
}).on('error', console.error);

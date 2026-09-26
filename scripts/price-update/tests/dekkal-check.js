const https = require('https');

https.get('https://dekkal-quincaillerie.dz/fr/produit/decapant-peinture-enap-300g-025l-algerie', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const matches = data.match(/<bdi>.*?<\/bdi>/g);
    console.log("Matches:", matches);
    
    // Also try to find JSON-LD
    const jsonld = data.match(/<script type="application\/ld\+json">.*?<\/script>/gs);
    console.log("JSON-LD:", jsonld ? jsonld[0].substring(0, 200) : null);
  });
}).on('error', console.error);

let webManifest = {
    "name": "Moja Aplikacja",
    "short_name": "App",
    "theme_color": "#101317",
    "background_color": "#101317",
    "display": "standalone",
    "icons": [
    {
      "src": "https://i.imgur.com/hpmyNb2.png", 
      "sizes": "64x64",   
      "type": "image/png"
    },
    {
      "src": "https://i.imgur.com/hpmyNb2.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "https://i.imgur.com/hpmyNb2.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "https://i.imgur.com/hpmyNb2.png",  
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
    ]
};
let manifestElem = document.createElement('link');
manifestElem.setAttribute('rel', 'manifest');
manifestElem.setAttribute('href', 'data:application/manifest+json;base64,' + btoa(JSON.stringify(webManifest)));
document.head.prepend(manifestElem);
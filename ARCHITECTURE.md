# Architecture TCHAK FREE V0

## Structure actuelle (prototype)
```
tchak-prototype/
└── index.html          # Application complète (front + logique + style)
```

## Flux utilisateur validé
1. Saisie nom artiste + titre œuvre
2. Dessin signature canvas
3. Génération ID SHA256
4. Aperçu certificat (live)
5. Export PDF (via impression)
6. Persistance dans localStorage

## Stack technique
- **Front** : HTML5, CSS3, JavaScript (ES6)
- **Crypto** : Web Crypto API (SHA256)
- **Canvas** : Dessin et export PNG
- **Print** : `window.print()` avec CSS `@media print`

## Évolution prévue
- Étape 6 : Encapsulation Electron
- Étape 7 : Sauvegarde automatique des PDF
- Étape 8 : QR code intégré

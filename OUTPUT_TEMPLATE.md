# OUTPUT_TEMPLATE: Rapport TCHAK FREE

## 0. Métadonnées (JSON Obligatoire)
```json
{
  "project": "TCHAK FREE",
  "version": "V0",
  "build_type": "Electron-Hybrid",
  "trust_model": "SHA256-Local-Chain",
  "quota_limit": 10,
  "timestamp": "YYYY-MM-DDTHH:mm:ssZ"
}
```

## 1. Checklist de Validation (Audit Forge)
- [ ] L'application Electron démarre-t-elle sans accès internet ?
- [ ] Le compteur de certificats bloque-t-il bien à partir du 11ème certificat du mois ?
- [ ] La chaîne SHA256 est-elle mise à jour dans `chain.json` ?
- [ ] La signature Canvas du profil est-elle bien insérée en PNG dans le PDF ?
- [ ] Le ZIP généré contient-il bien la `seed_hash` individuelle ?

## 2. Tests Préconisés
1. **Test Offline** : Couper le WiFi, lancer l'app, générer un certificat. Vérifier le PDF.
2. **Test Quota** : Modifier manuellement la date système (ou le JSON) pour simuler 10 certificats et vérifier le blocage de l'UI.
3. **Test Signature** : Vérifier que la signature PNG extraite du ZIP est identique à celle affichée sur le PDF généré.

## 3. Points de Vigilance
- Conservation du dossier `data/` lors de la mise à jour pour ne pas perdre la chaîne SHA256.
- Précision du timestamp pour garantir la non-collision des IDs de certificats.

## 4. Next Steps
- Implémentation du `PDFService` dans le Main Process.
- Design de l'interface "Zen" pour les artistes dans le Renderer.

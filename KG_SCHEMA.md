# KG_SCHEMA: TCHAK FREE Knowledge Graph

## 1. Nœuds (Entités)

| Nœud | Nature | Importance |
|------|--------|------------|
| **Project** | Racine du projet | TCHAK FREE V0 |
| **Stack_Cloud** | Infrastructure Onboarding | Netlify, Supabase |
| **Stack_Local** | Infrastructure Offline | Electron, React |
| **Trust_Chain** | Système SHA256 | Local-only integrity |
| **Onboarding_Flow** | Processus acquisition | Form -> ZIP Generation |
| **Monthly_Quota** | Limitation FREE | Max 10 certs/month |
| **Artist_Signature** | Identité visuelle | Canvas PNG embedding |

## 2. Relations (Liens)

- `(Project) -[DEPLOYS]-> (Stack_Cloud)` : Héberge la landing page.
- `(Project) -[DISTRIBUTES]-> (Stack_Local)` : Fournisseur de l'outil offline.
- `(Onboarding_Flow) -[TRIGGERS]-> (Netlify_Function)` : Génère le ZIP.
- `(Stack_Local) -[ENFORCES]-> (Monthly_Quota)` : Vérification locale des timestamps.
- `(Trust_Chain) -[VALIDATES]-> (Certificate)` : Lien de hashage permanent.
- `(Certificate) -[EMBEDS]-> (Artist_Signature)` : Inclusion dans le PDF final.

## 3. Logique de Graphe
La sécurité du système repose sur la validité de la relation `(Trust_Chain)` qui ne peut être altérée sans briser la séquence de `lastId` stockée historiquement.

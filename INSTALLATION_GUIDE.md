# 🎓 TCHAK - Guide d'Installation et d'Utilisation

Bienvenue sur TCHAK ! Ce guide vous accompagne dans l'installation de votre Studio de certification offline.

---

## 💻 1. Installation

### Windows
1. Extrayez le fichier ZIP fourni.
2. Ouvrez le dossier extrait.
3. Double-cliquez sur le script `install.ps1`.
   *(Si Windows vous demande une confirmation de sécurité, acceptez)*
4. Le script mettra en place vos dossiers et lancera automatiquement le Studio.

### macOS / Linux
1. Extrayez le fichier ZIP fourni.
2. Ouvrez votre Terminal dans le dossier extrait.
3. Rendez le script exécutable : `chmod +x install.sh`
4. Lancez l'installation : `./install.sh`

> **Note :** Le Studio fonctionne **100% hors-ligne**. Vous n'avez pas besoin d'internet pour certifier vos œuvres.

---

## ✨ 2. Votre Premier Certificat

1. Ouvrez le Studio (`http://localhost:3000` si lancé manuellement via `npx serve`).
2. Remplissez les informations de l'œuvre (Titre, Type, Année).
3. Signez numériquement dans le cadre prévu (à la souris ou au doigt sur écran tactile).
4. Cliquez sur **Générer le certificat**.
5. Imprimez le certificat immédiatement en cliquant sur "Imprimer le certificat".

*(Chaque certificat est cryptographiquement lié au précédent pour assurer d'une chaîne inaltérable de vos créations.)*

---

## 🛠️ 3. Dépannage

**Le Studio ne se lance pas (Ligne de commande) :**
- Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre ordinateur.
- Sur Windows, si Node.js n'est pas détecté, TCHAK essaiera d'utiliser `python` (déjà présent d'office).

**Adresse déjà utilisée (`EADDRINUSE`) :**
Si `npx serve` vous indique que le port 3000 est déjà pris, vous pouvez forcer un autre port :
`npx serve app -p 5000`

**Je ne retrouve pas mes certificats :**
Vos historiques et quotas sont sauvegardés dans votre navigateur de manière sécurisée et persistante (IndexedDB). Si vous changez d'ordinateur, veillez à exporter vos profils.

---

## ❓ 4. Foire Aux Questions (FAQ)

**Pourquoi suis-je limité à 10 certificats par mois ?**
Le plan gratuit TCHAK Gratuit est conçu pour couvrir les besoins mensuels de la majorité des artistes émergents tout en maintenant un standard de qualité élevé. 

**Comment passer à la version Pro ?**
Le plan TCHAK PRO (certificats illimités, templates exclusifs, signatures multiples) sera disponible très prochainement. Un bouton de mise à niveau apparaîtra directement dans votre Studio.

**Que se passe-t-il sans internet ?**
TCHAK est construit *Offline-First*. Une fois l'application chargée, vous pouvez désactiver votre Wi-Fi, vous rendre en forêt ou dans un atelier isolé — la génération de certificats, les signatures et le hachage sécurisé fonctionneront parfaitement.

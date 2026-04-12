# 🎨 Studio TCHAK - Guide d'Installation

Félicitations ! Vous venez de télécharger votre Studio TCHAK personnalisé. Ce guide vous explique comment le lancer en quelques secondes pour commencer à certifier vos œuvres.

## 🚀 Lancement Rapide

### Sur Windows
1. Faites un clic-droit sur le fichier `install.ps1`.
2. Choisissez **"Exécuter avec PowerShell"**.
3. Votre navigateur s'ouvrira automatiquement sur votre Studio.

### Sur macOS ou Linux
1. Ouvrez un terminal dans ce dossier.
2. Tapez la commande suivante :
   ```bash
   chmod +x install.sh && ./install.sh
   ```
3. Votre navigateur s'ouvrira sur `http://localhost:3000`.

---

## 🛠️ En cas de problème

Si les scripts ci-dessus ne fonctionnent pas, vérifiez que vous avez l'un des outils suivants installé :
- **Node.js** (Recommandé) : [https://nodejs.org](https://nodejs.org)
- **Python 3** : [https://www.python.org](https://www.python.org)

### Lancement Manuel
Si vous avez déjà un serveur HTTP, pointez-le simplement sur le dossier `app/` et ouvrez le fichier `index.html`.

---

## 📂 Où sont mes données ?
TCHAK est **100% hors-ligne**. Vos certificats et vos PDF sont stockés uniquement sur votre ordinateur, dans le dossier :
- **Windows** : `C:\Users\[VotreNom]\TCHAK`
- **macOS/Linux** : `/Users/[VotreNom]/TCHAK`

**Conseil** : Pensez à sauvegarder ce dossier TCHAK régulièrement sur un disque externe ou un cloud personnel.

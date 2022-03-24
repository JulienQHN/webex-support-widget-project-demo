## Webex React Meeting Widget Starter

Project React de Widgets Webex pour de l'intégration dans Jalios

## Pré requis

 - Avoir Nodejs et NPM d'installé
 - Avoir un compte Webex et créer une Apps "intégration" : https://developer.webex.com/my-apps/new
 - Remplir le champ Redirect URI(s) suivant ses préférences : https://developer.webex.com/my-apps/new/integration
 - Remplir le scope suivant ses préférences : https://developer.webex.com/my-apps/new/integration
 
 ... A compléter pour la mise en production
 
### Utilisation du `.env`

- REACT_APP_WEBEX_BASE_URL=https://webexapis.com/v1/authorize
- REACT_APP_WEBEX_CLIENT_ID={Ecrire ici l'ID d'intégration de votre Webex APP} (disponible sur la page Webex de votre APP)

... A compléter pour la mise en production

### `npm install`

- Permet d'installer les packages nodes du projet à sa racine

### Correction des problèmes de package

- Modifier le nom du package "Icon" par "momentum-ui-icons" (A vérifier) 

### Correction des Warnings

- Lancer à la racine du projet "npm i sass@^1.32.11" et ajoutez dans package.json :

"devDependencies": {
    "sass": "^1.32.11"
  }

### `npm start`

- Permet de lancer le projet dans une console à sa racine

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Pour démarer le projet:

il faut build avec :
```sh
npm run build
```
pour lancer seulement fe front :
```sh
npm run start
```
les variables d'environnement sont les suivantes:

```js
USER_DB // pour le user de la data base
PASSWORD_DB //pour le mdp de la data base
PORT_DB // pour le port de la data base

// pour se connecter à l'api google avec nodemailer pour le cron
CLIENT_ID // id de l'api google
CLIENT_SECRET // secret api
TOKEN_REF // refresh token
MAIL_TO // adresse mail de réception
```

ensuite executer la commande suivante avec les variables d'environement :
```sh
node index
```

l'api est dans `server/route`

## pour le get :
```js
// client
'/client/getAllClient' // rien a spécifier
'/client/getName/:id' // passer l'id pour avoir le nom du client

// site
'/site/getAllSite' // rien a spécifier
'/site/getSite/:id' // passer l'idpour avoir le client et son hébergement et relance les plus récentes

// relance
'/relance/getAllRelance' // rien a spécifier
'/relance/getRelance/:id' // passer l'id pour avair la relance
```

## pour le post : 
```js
// client
'/client/addClient' 
/* envoyer le body avec : 
client : {
    name_client: 'string'
} */

// site
'/site/addSite' 
/* envoyer le body avec: 
site : {
    id_client: 'number',
    name_sitet: 'string',
    url_site: 'string'
    cp_site: 'string',
    debut_hebergement: 'YYYY-MM-DD',
    fin_hebergement: 'YYYY-MM-DD',
    date_relance: 'YYYY-MM-DD'/ optionel
} */

// relance
'/relance/addRelance' 
/* envoyer le body avec : 
relance : {
    id_site: 'number',
    date_relance: 'YYYY-MM-DD'
} */
```

## pour le update : 
```js
// client
'/client/updateClient' 
/* envoyer le body avec : 
client : {
    id_client: 'number',
    name_client: 'string'
} */

// site
'/site/updateSite' 
/* envoyer le body avec: 
site : {
    id_site: 'number',
    id_client: 'number',
    name_sitet: 'string',
    url_site: 'string'
    cp_site: 'string',
    debut_hebergement: 'YYYY-MM-DD',
    fin_hebergement: 'YYYY-MM-DD',
    date_relance: 'YYYY-MM-DD'/ optionel
} */

// relance
'/relance/updateRelance' 
/* envoyer le body avec : 
relance : {
    id_relance: 'number',
    id_site: 'number',
    date_relance: 'YYYY-MM-DD'
} */
```
## pour le delete :
```js
// client
'/client/deleteClient/:id' // passer l'id pour supprimer le client et tout ce qui lui est rattaché

// site
'/site/deleteSite/:id' // passer l'id pour supprimer le site et tout ce qui lui est rattaché

// relance
'/relance/deleteRelance/:id' // passer l'id pour supprimer la relance et tout ce qui lui est rattaché
```
## Autre
pour avoir tous les hébergements d'un client :

```js
'/client/getHebergement/:id' // passer l'id client
```

pour avoir tous les relances d'un client :

```js
'/client/getRelance/:id' // passer l'id client
```


## Pour la BDD :

j'ai 4 tables:
- client
- site (liée a client)
- hebergement (liée à site)
- relance (liée à site)


## CRON
le cron est dans server/cron.js
# Collect'Or
**Ce projet est le 3ème et dernier de la Formation "Développeur - Integrateur Web Full-Stack" pourvue par l'IFOCOP à Paris 11ème, en 2018.**  
**Il vise à prouver mes compétences en développement Client / Serveur (Front, Back, BDD), dans l'univers JavaScript, ainsi que ma faculté à gérer l'intégralité d'un projet en toute autonomie.**  
**"Collect'Or" est ma réponse au cahier des charges rédigé par "VirtuoWorks"**  

**Le sujet imposé était de créer un réseau social dont la thématique était laissée libre.**
**Le thème que j'ai choisi est le monde des collectionneurs de sujets d'Histoire Militaires :**  
* **Livres**  
* **Films**
* **Figurines**
* **Maquettes**
* **...**  
<br>

![screen_title](public/images/LandingPage.png)
<br>
<br>

## Fonctionnalités principales
Ce réseau social possède les fonctions suivantes :
*	MAJ en temps réel sur les postes des membres concernés et connectés des informations telles que :
    *	Modification des informations de la fiche de renseignement (y compris de l’avatar)
    *	Statut de connexion des amis
    *	Statut des amis et ex-amis
    *	Statut des invitations en cours.
    *	Statut des Posts, commentaires et réponses aux commentaires

*	Nombre de membres connectés et du nombre de messages publics affichés en temps réel sur tous les postes connectés

*	Page « A propos » de présentation du site

*	Accès à la documentation
    *	Cahier des charges « Atelier final » établi par « VirtuoWorks »
    *	Dossier technique (ce document)

*	Gestion de l’inscription et de la connexion des utilisateurs :
    *	Création de compte
    *	Connexion
    *	Gestion de MDP oublié
    *	Cryptage des mots de passe de bout en bout, jusqu’à la BDD (Transfert du MDP entre client et serveur crypté)

*	Fiche de renseignements détaillée :
    *	Pseudo / Mail
    *	Avatar
    *	Données civiques
    *	Adresse
    *	Préférences
    *	Texte de présentation
    *	Possibilité de changer de MDP

*	Système de recherche des membres (utilisateurs enregistrés).
    *	Fenêtre d’affichage de tous les membres
    *	Filtre de recherche « Pseudo » et/ou « Prénom » et/ou « Nom »
    *	Micro-fiche d’un membre (Informations de base et liste de ses amis) affichée en temps réel

*	Gestion des liens entre les membres : 
    *	Fenêtre de lancement d’invitation des amis
    *	Filtre de recherche « Pseudo » et/ou « Prénom » et/ou « Nom »
    *	Micro-fiche d’un membre (Informations de base et liste de ses amis) affichée en temps réel
 
*	Fenêtre des amis
    *	Possibilité de filtrage par noms de pseudo
    *	Ajout ou retrait d’un membre de sa liste de connaissances
    *	Retrait d’un membre de sa liste de connaissances
    *	Recommandation d’un membre à une connaissance

*	Menu Popup pour accéder aux fonctions liées à un ami
    *	Voir le profil d’un ami
    *	Micro-fiche d’un ami (Informations de base et liste de ses amis)
    *	Retrait d’un membre de sa liste de connaissances
    *	Recommandation d’un membre à une connaissance.
    *	Invitation à TChatter

*	Gestion  des invitations lancées : 
    *	Fenêtre des invitations
    *	Possibilité de filtrage par noms de pseudo
    *	Retrait d’une invitation

*	Profil d’un ami
    *	Affichage  de la fiche présentation
    *	Des amis
    *	Des invitations lancées
    *	Des Posts, commentaires et réponses
    *	Tous les statuts d’activité, d’amis, d’invitations, des Posts sont MAJ en temps réel à l’écran sur la fiche Profil, dès qu’un évènement sur un des éléments affichés se      produit et fait évoluer sa situation (Modification des informations de la fiche de renseignement (y compris de l’avatar), connexion, déconnexion, nouvel ami,                suppression d’ami, nouvelle invitation, suppression d’invitation, nouveau Post, nouveau commentaire, nouvelle réponse aux commentaires…)

*	Espace particulier pour chaque membre dans lequel peuvent être publiés des messages et qui est consultable par d’autres membres (Mur) :
    *	Posts (Nombre infinis)
    *	Commentaires (Nombre infinis)
    *	Réponses aux commentaires (Nombre infinis)

*	Espace de dialogue en temps réel entre les membres (TChat Multi-membres et Multi-Rooms).

*	Notification par mail lors des diverses actions
<br>
<br>

## Collect’Or en quelques chiffres :
**« Collect’Or »**, c’est :


### Nombre de sources :
*	1 fichier HTML  
*	1 fichier CSS (hors Bootstrap.css, font-awesome.css, et cover.css)  
*	21 modules personnels coté client  
*	4 modules personnels coté serveur
<br>
<br>

### Nombre de lignes :
|Coté client               |Coté serveur              |
|:------------------------:|:------------------------:|
|10903 lignes|2924 lignes|
*	Soit	13827 lignes pour l’ensemble du projet
<br>
<br>

### Nombre de messages entre le client et le serveur :
*	Coté client 	: 	40 types de messages émis par les clients
*	Coté serveur 	: 	58 types de messages émis par le serveur
*	Soit 	98 types de messages gérés pour l’ensemble du projet
<br>
<br>

## Environnement technique
**« Collect’Or »** est une Single Page Application » (SPA). 
<br>


**Dépôt github :**  https://github.com/bugsdomi/collector
<br>
<br>

### Stack utilisé
|Coté client               |Coté serveur              |
|:------------------------:|:------------------------:|
|HTML|Node.js|
|CSS|Socket.io|
|Javascript|MongoDB|
|Bootstrap 4|Express.js / Pug|
<br>

## Topologie
* **1 La Base données :**  
La BDD MongoDB est hébergée chez **« mLab » :** https://mlab.com/databases/collect-or  

* **2 L'application :**  
Accès au DashBoard **« Heroku » :** https://dashboard.heroku.com/apps/collectoronheroku  
<br>

![topologie](public/images/topologie.png)
<br>
<br>


## Arborescence des répertoires
```
Collect'Or                      Répertoire applicatif (coté serveur)
│  ├─ collector.js              Application principale coté serveur
│  ├─ dbmgr.js                  Connectivité avec la BDD MongoDB "Collect-or"
│  ├─ index.html                Interface Front-end
│  ├─ memberServerSide.js       Module de Gestion des membres coté serveur
│  └─ PostsServerSide.js        Module de gestion des Posts
|
├─ Font-awesome.4.6.1           Police d'Icones Bootstrap 4
|
├─ Node_modules                 Librairies JS
|
├─ public                       Répertoire des Assets pour le coté client
|   ├─ css                      Fichiers CSS
|   ├─ docs                     Documentation   1) Cahier des charges
|   |                                           2) Document technique
|   ├─ fonts                    Polices de caractères
|   ├─ images                   Images diverses
|   ├─    └─ members            Avatars des membres                     
|   └─ js                       Sources Javascript
|
└─ views                        Vue PUG
    └─ index.pug                Interface front-end minimisée
```
<br>

## Déploiement

Voici un exemple de déploiement d'une application sur heroku(https://heroku.com)  
(voir https://devcenter.heroku.com/articles/heroku-command-line):  
<br>

```
Dans un terminal (type vsc, git-bash,...) :
# Créez un nouveau répertoire local git
git init

# Créez une nouvelle application heroku
heroku apps:create my-new-app

# Ajoutez une référence distante de heroku sur le répertoire local
heroku git:remote --app my-new-app

# Création des variables d'environnement sur l'application heroku
heroku config:set MONGOLAB_URI=mongodb://Collect-OrAdmin:fakeUserAdmin@ds123753.mlab.com:23753/collect-or
heroku config:set SENDGRID_API_KEY:XX.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx       (clé secrète)

# commit and push des fichiers
git add -A
git commit -m "Initial commit"
git push heroku master

# Lancement de l'application dans le navigateur
heroku open
```

**Lors des déploiements suivants, vous devrez juste effectuer les opérations suivantes :**

```bash
git add -A
git commit -m "Update code"
git push heroku master
```  
<br>

## Lancement de l’application "Collect'Or"
https://collectoronheroku.herokuapp.com/  
<br>


## Remerciements

Je remercie toutes les personnes qui m'ont supportées durant ce projet, qui m'ont conseillées et aidées au testing :
- T. Rudrauf
- B. Grandclaude
- P. Vanneste  
Je remercie également tout le corps professoral de l'IFOCOP qui a été très performant et très pédagogique, en particulier les gens de "VirtuoWorks"
<br>
<br>

## Contact
```
Dominique Hourdequin - 2018 / 2019                              
Projet N°3 - Type "Front + Back"                                
                                                            
Formation "Développeur Full-Stack Javascript"                   
Classe : "DIWJS08" - année 2018                                 
IFOCOP - Paris XI                                               
                                                              
Contact à l`IFOCOP qui transmettra mes coordonnées sur demande  
Responsable de formation                                        
Madame Fabienne Thiry                                           
mail : fthiry@ifocop.fr                                         
Tel : 01-40-21-83-78     
```
Mon compte **LinkedIn** : https://www.linkedin.com/in/dominique-hourdequin-247997107/  
Dépôt github **Collect'Or** : https://github.com/bugsdomi/collector

# Collect'Or
> **"Collect'Or" est la réponse au cahier des charges rédigé par "VirtuoWorks"

« Collect’Or » est un réseau social dédié aux collectionneurs d’Histoire Militaire.**

![screen_title](images/screenshots/LandingPage.png)

## Fonctionnalités principales
Ce projet est le 3ème et dernier de la Formation "Développeur et Integrateur Web Full-Stack" pourvue par l'IFOCOP à Paris 11ème
Le sujet imposé était de créer un réseau social

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


## Gameplay

![screen_game](images/screenshots/screen_game.png)

### Startup
First step to launch the game is to click on the start button located at the bottom right corner of the TV set. This will lead you to the game title screen. From then you have the ability to either use your keyboard or a standard gamepad to control the game.

### Commands
Gamepad support is provided using the **[HTML5 Gamepad API](https://www.w3.org/TR/gamepad/)**, for now only standard gamepads are supported in this game. Among popular supported gamepads we can safely use **PS3, PS4, XBox 360 and XBox One** controllers. However when you plug a gamepad to your computer it might be detected as a mouse device by your operating system. This is quite annoying because while playing the game you'll see the mouse pointer moving across the screen and this can interfer with the game display. To prevent that there are dedicated options to toggle in Windows:
* On Windows: there are dedicated options to toggle off inside the XInput driver configuration of the gamepad
* On Linux: I've provided a small script allowing to deactivate the gamepad mouse events. Just replace NAME according to your gamepad ID and execute this script before playing => [disable_ps3_gamepad_mouse.sh](shell/disable_ps3_gamepad_mouse.sh)

If a compliant gamepad is connected and detected by your browser, the gamepad picture located below the TV set will light up. On the other hand, if you unplug your gamepad, the picture will change back to normal.

Available commands for the gamepad are the **directional pad** and the **left analog stick**, allowing the user to move the character in **8 directions** (up, up-right, right, down-right, down, down-left, left, up-left). The **"X"** (for PlayStation) or **"A"** (for XBox) action button is dedicated for firing at enemies. And finally the **"START"** button whose purpose is to pause the game or to proceed to next screen.

In case you decide to stick with the default keyboard gameplay, here is the controls list displayed by key:
* **1**: move down-left
* **2** or **down arrow**: move down
* **3**: move down-right
* **4** or **left arrow**: move left
* **6** or **right arrow**: move right
* **7**: move up-left
* **8** or **up arrow**: move up
* **9**: move up-right
* **Spacebar**: fire
* **Enter**: pause or skip screen

### Goal
The goal of the game is to shoot enemies in order to collect the content of chests dropped onto the field without being killed by enemies attacks. This will allow you to unlock parts of my CV hidden in the chests. The more you kill enemies, the more you'll be rewarded by bonus chests and game points. In the event you run out of health points and are about to lose, you'll hear a warning buzz and if you're eventually killed, you'll have to start all over again.

Enemies and background items are populated randomly on the map at startup. If the character wanders to close to enemies, they start chasing him, otherwise they just move randomly on the field. When the enemy count reaches a minimum threshold, a new batch of fresh enemies is generated, so the game is virtually endless!

You'll find below the main specs of the character and enemies.

### Character specs
* **health points**: 100
* **motion speed**: 1 (in pixel/frame)
* **fireball damage points**: 5
* **fireball delay**: 0.8 (in seconds)
* **fireball limit**: 5


### Enemy specs
* **health points**: 10
* **point scoring**: 5
* **motion direction**: can move in the same 8 directions as the character
* **motion speed**: between 0.2 and 0.5 (in pixel/frame)
* **motion duration**: between 3 and 7 (in seconds)
* **chase move radius**: 140 (distance in pixel where enemies start chasing the character)
* **chase speed**: 0.7 (the speed in pixel/frame of enemies when chasing the character)
* **attack move radius**: 60 (distance in pixel where enemies adopt an agressive stance while chasing the character)
* **attack damage points**: 10 (the number of health points withdrawn from the character at each attack)
* **attack delay**: 1 (the delay in seconds between two attacks)

## Reference

### Graphic resources and tools
* Pixelized pictures generator: https://www.pixel-stitch.net/ 
* CSS spritesheet positions generator from image:  http://www.spritecow.com/
* Spritesheet for the main character: https://www.spriters-resource.com/snes/thefiremen/
* Spritesheet for enemies and other games assets: https://www.spriters-resource.com/snes/secretofmanaseikendensetsu2/

### Audio resources
* Sound effects: https://www.sounds-resource.com/snes/legendofzeldaalinktothepast/sound/7573/
* Soundtrack: https://downloads.khinsider.com/game-soundtracks/album/secret-of-mana-original-soundtrack

### JavaScript design patterns
* https://gist.github.com/lucastan/5421897
* https://toddmotto.com/mastering-the-module-pattern/

### Game loop and frame refresh
* http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/index.html
* https://stackoverflow.com/questions/1955687/best-way-for-simple-game-loop-in-javascript
* https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

### CSS animations
* https://www.sitepoint.com/frame-by-frame-animation-css-javascript/

### Collision detection
* https://developer.mozilla.org/fr/docs/Games/Techniques/2D_collision_detection
* http://happycoding.io/tutorials/processing/collision-detection#rectangle-rectangle-collision-detection

### Keyboard support
* https://stackoverflow.com/questions/12273451/how-to-fix-delay-in-javascript-keydown
* https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key
* http://keycode.info/

### Gamepad support
* https://www.w3.org/TR/gamepad/
* https://developer.mozilla.org/fr/docs/Web/Guide/API/Gamepad
* http://html5gamepad.com/
* https://notes.georgboe.com/post/connect-an-8bitdo-gamepad-on-linux/
* https://ubuntuforums.org/showthread.php?t=1879616

## Acknowledgements

I'd like to thank all the staff from IFOCOP and my colleagues from the DIWJS08 promotion for their advices and support.

## Contact

Romain Joly – [@Rom1_Joly](https://twitter.com/rom1_joly) – [contact@romain-joly.com](mailto:contact@romain-joly.com)

## Contributing

1. Fork it (<https://gitlab.com/elazul51/cv_game/forks/new>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
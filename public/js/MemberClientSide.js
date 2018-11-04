// -------------------------------------------------------------------------
// stockage des informations techniques des joueurs et des  coordonnées de leurs 
// pilules qui vont être générées pour le player
// 4 joueurs maximum - 50 pilules pour chacun 
// -------------------------------------------------------------------------

function MemberClient(pDBMgr){   // Fonction constructeur exportée
    this.member =                          // Structure du membre
    {   
        email           : '',
        pseudo          : '',
        password        : '',
        newPassworld    : '',
        role            : 0,                     // Membre, Admin ou SuperAdmin
        dateCreation    : -1,                    // Timestamp de la création du record
    }
}

// ===================================================== Fonctions ===========================================================
// -----------------------------------------------------------------------------
//  Cette fonction donne le focus au champs pIdField  de la fenêtre modale pIdModal
//  passée en paramètre car le composant "Modal" court-circuite l'attibut "Auto-focus"
// -----------------------------------------------------------------------------
MemberClient.prototype.giveFocusToModalFirstField = function(pIdModal, pIdField){
    $('#'+pIdModal).on('shown.bs.modal', function() {
        $('#'+pIdField).focus();
    })

    // $('#'+pIdModal).on('shown.bs.modal', function() {
    //     $(this).find('[autofocus]').focus();
    //   });

}
// -----------------------------------------------------------------------------
// Cette fonction vérifie que le MDP et sa confirmation sont bien identiques
// -----------------------------------------------------------------------------
MemberClient.prototype.validatePassword = function(pSignInPassword, pSignInConfirmPassword){
    if (pSignInPassword.value != pSignInConfirmPassword.value){
        pSignInConfirmPassword.setCustomValidity("Les mots de passe ne correspondent pas");
    } else {
        pSignInConfirmPassword.setCustomValidity('');
    }
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre générique modale en mode "A propos"
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalTextAboutMode = function(pModalTitle, pModalBodyText){
    pModalTitle.innerText = 'A propos...'
    pModalBodyText.innerHTML = '<h5>Bienvenue dans Collect\'Or</h5>';
    pModalBodyText.innerHTML += '<p>Collector est un réseau social destiné aux collectionneurs de figurines, véhicules, avions, bateaux, et autres sujets historiques, principalement militaires, mais les autres types de collections sont également les bienvenus.</p>';
    pModalBodyText.innerHTML += '<p>Vous pourrez notamment discuter en public ou en privé avec d\'autres collectionneurs, déposer / lire des annonces de vente, d\'échange, de recherche, de manifestations...</p>';
    pModalBodyText.innerHTML += '<p>De plus, vous pourrez laisser vos avis sur des sujets particuliers, accéder à la galerie pour admirer les collections ou y déposer vos propres photos, accéder aux trucs et astuces de modéliste, y déposer vos expériences, et enfin poser vos questions.</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Félicitations et Bienvenue"
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalWelcomeText = function(pModalTitle, pModalBodyText){
    pModalTitle.innerText = 'Bienvenue dans Collect\'Or'
    pModalBodyText.innerHTML = '<h5>Félicitations !</h5>';
    pModalBodyText.innerHTML += '<br /><p>Votre compte a été créé avec succès.</p>';
    pModalBodyText.innerHTML += '<br /><p>Un mail de confirmation vous été envoyé, si vous ne le voyez pas, veuillez regarder dans le dosssier des SPAMs.</p>';
    pModalBodyText.innerHTML += '<br /><p>Bonne navigation...</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Félicitations et Bienvenue"
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalNewPWDText = function(pModalTitle, pModalBodyText){
    pModalTitle.innerText = 'Mot de passe perdu'
    pModalBodyText.innerHTML = '<h5>Votre nouveau mot de passe ...</h5>';
    pModalBodyText.innerHTML += '<br /><p>Suite à votre demande, votre nouveau mot de passe a été généré.</p>';
    pModalBodyText.innerHTML += '<br /><p>Un mail contenant vos identifiants vous été envoyé, si vous ne le voyez pas, veuillez regarder dans le dosssier des SPAMs.</p>';
    pModalBodyText.innerHTML += '<br /><p>Vous pouvez le modifier dans la fiche de votre profil.</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction désactive les options de menu inutiles lorsque le visiteur s'est 
// connecté ou après la création réussie de son compte, car il se trouve de fait, 
// déjà connecté
// -----------------------------------------------------------------------------
MemberClient.prototype.unactiveLoginAndCreateBtn = function(pConnexion, pCreation, pDeconnexion){
    pConnexion.style.display = 'none';         //      Désactivation du bouton 'Connexion'
    pCreation.style.display = 'none';          //      Désactivation du bouton 'Creation de compte'

    pDeconnexion.classList.remove('disabled');
    pDeconnexion.style.color = '#212529';           //      Activation du bouton 'Déconnexion'
}
// -----------------------------------------------------------------------------
// Cette fonction réactive les options de menu Login et Création de compte lorsque
//  le Membre se déconnecte, et désactive le bouton "Déconnexion"
// -----------------------------------------------------------------------------
MemberClient.prototype.activeLoginAndCreateBtn = function(pConnexion, pCreation, pDeconnexion){
    // pConnexion.style.display = 'block';         //      Désactivation du bouton 'Connexion'
    // pCreation.style.display = 'block';          //      Désactivation du bouton 'Creation de compte'

    // pDeconnexion.classList.add('disabled');

// XXXXXXXXXX Voir si on peut faire une vraie deconnexion
// webSocketConnection.emit('disconnect',this.member);   // Transmission au serveur des infos saisies
// webSocketConnection.emit('disconnect');   // Transmission au serveur des infos saisies
vToolBox.refreshScreen();
}
// -------------------------- Fin du module ----------------------------------------


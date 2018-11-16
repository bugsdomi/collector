// -------------------------------------------------------------------------
// stockage des informations techniques des joueurs et des  coordonnées de leurs 
// pilules qui vont être générées pour le player
// 4 joueurs maximum - 50 pilules pour chacun 
// -------------------------------------------------------------------------

function MemberClient(){   // Fonction constructeur exportée
    this.member =                  // Structure du membre
    {   
        email           : '',
        pseudo          : '',
        password        : '',
        oldPassword     : '',
        role            : 0,        // 4 --> Membre, 2 --> Admin ou 1 --> SuperAdmin
        presentation    : '',       // Texte de présentation du membre

        etatCivil : 
        {
            photo          : '',    // Emplacement de la photo de profil
            firstName      : '',    // Prénom
            name           : '',    // Nom
            birthDate      : '',    // Date de naissance
            sex            : 0,     // 0 = Non divulgué, 1 --> Masculin, 2 --> Féminin
            address : 
            {
                street     : '',    // N° et voie
                city       : '',    // Ville
                zipCode    : '',    // Code Postal
                department : '',    // Département
            },
        },
        preferences : [
            prefGravures        = false,
            prefLivres          = false,
            prefFilms           = false,
            prefJeux            = false,
            prefMaquettes       = false,
            prefFigurines       = false,
            prefBlindes         = false,
            prefAvions          = false,
            prefBateaux         = false,
            prefDioramas        = false,
            prefPrehistoire     = false,
            prefAntiquite       = false,
            prefMoyenAge        = false,
            prefRenaissance     = false,
            prefDentelles       = false,
            prefAncienRegime    = false,
            prefRevolution      = false,
            pref1erEmpire       = false,
            pref2ndEmpire       = false,
            prefSecession       = false,
            prefFarWest         = false,
            prefWW1             = false,
            prefWW2             = false,
            prefContemporain    = false,    
            prefFuturiste       = false,
            prefFantastique     = false,
            prefHFrancaise      = false,
            prefHAméricaine     = false,
            prefHInternationale = false,
            prefAutre           = false,
        ],
        dateCreation    : -1,       // Timestamp de la création du record
    }
}

// ===================================================== Fonctions ===========================================================
// -----------------------------------------------------------------------------
//  Cette fonction donne le focus au champs pIdField  de la fenêtre modale pIdModal
//  passée en paramètre car le composant "Modal" court-circuite l'attibut "Auto-focus"
// -----------------------------------------------------------------------------
MemberClient.prototype.giveFocusToModalFirstField = function(pIdModal, pIdField){
    $('#'+pIdModal).on('shown.bs.modal', function(){
        $('#'+pIdField).focus();
    })

    // $('#'+pIdModal).on('shown.bs.modal', function({
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
MemberClient.prototype.initModalWelcomeText = function(pModalTitle, pModalBodyText, pMemberPseudo){
    pModalTitle.innerText = 'Bienvenue dans Collect\'Or'
    pModalBodyText.innerHTML = '<h5>Félicitations '+ pMemberPseudo +' !</h5>';
    pModalBodyText.innerHTML += '<br /><p>Votre compte a été créé avec succès.</p>';
    pModalBodyText.innerHTML += '<br /><p>Un mail de confirmation vous été envoyé, si vous ne le voyez pas, veuillez regarder dans le dosssier des SPAMs.</p>';
    pModalBodyText.innerHTML += '<br /><p>Bonne navigation...</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Mot de passe oublié"
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalNewPWDText = function(pModalTitle, pModalBodyText){
    pModalTitle.innerText = 'Mot de passe perdu'
    pModalBodyText.innerHTML = '<h5>Votre nouveau mot de passe ...</h5>';
    pModalBodyText.innerHTML += '<br /><p>Suite à votre demande, un nouveau mot de passe a été généré.</p>';
    pModalBodyText.innerHTML += '<br /><p>Un mail contenant vos identifiants vous a été envoyé, si vous ne le voyez pas, veuillez regarder dans le dosssier des SPAMs.</p>';
    pModalBodyText.innerHTML += '<br /><p>Vous pouvez le modifier dans la fiche de votre profil.</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Félicitations et Bienvenue"
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalAlreadyConnectedText = function(pModalTitle, pModalBodyText){
    pModalTitle.innerText = 'Collect\'Or';
    pModalBodyText.innerHTML = '<h5>Connexion impossible</h5>';
    pModalBodyText.innerHTML += '<br /><p>Vous ne pouvez pas vous connecter à \'Collect\'Or\', car vous vous êtes déjà connecté dans une autre session.</p>';
    // pModalBodyText.innerHTML += '<br /><p></p>';
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Félicitations et Bienvenue"
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalHelloText = function(pModalTitle, pModalBodyText, pMemberPseudo){
    pModalTitle.innerText = 'Connexion à Collect\'Or';
    pModalBodyText.innerHTML = '<h5>Bonjour '+pMemberPseudo+'</h5>';
    pModalBodyText.innerHTML += '<br /><p>Vous êtes bien connecté à \'Collect\'Or\', bonne navigation...</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction désactive les options de menu inutiles lorsque le visiteur s'est 
// connecté ou après la création réussie de son compte, car il se trouve de fait, 
// déjà connecté
// -----------------------------------------------------------------------------
MemberClient.prototype.disableLoginAndCreateBtn = function(pConnexion, pCreation, pDropDownProfilMenu, pMemberName, pPseudo, pDeconnexion){
    pConnexion.style.display = 'none';         //      Désactivation du bouton 'Connexion'
    pCreation.style.display = 'none';          //      Désactivation du bouton 'Creation de compte'

    pDropDownProfilMenu.style.display = 'block';
    pDropDownProfilMenu.innerHTML += ' '+pPseudo;

    pDeconnexion.classList.remove('disabled');
}
// -----------------------------------------------------------------------------
// Cette fonction réactive les options de menu Login et Création de compte lorsque
//  le Membre se déconnecte, et désactive le bouton "Déconnexion"
// -----------------------------------------------------------------------------
MemberClient.prototype.restartLandingPage = function(){
    vToolBox.simpleRefreshScreen();
}
// -----------------------------------------------------------------------------
// Cette fonction réactive les options de menu Login et Création de compte lorsque
//  le Membre se déconnecte, et désactive le bouton "Déconnexion"
// -----------------------------------------------------------------------------
MemberClient.prototype.InitHeaderColor = function(pACtiveColor, pHeader){
    if (pACtiveColor === "bg-warning"){
        pHeader.classList.remove('bg-danger');
        pHeader.classList.remove('bg-success');
        pHeader.classList.remove('txt-yellow-stroke');                       
        pHeader.classList.add('bg-warning');    // Jaune Or     
        return
    }

    if (pACtiveColor === 'bg-danger'){
        pHeader.classList.remove('bg-success');
        pHeader.classList.remove('bg-warning');    // Jaune Or               
        pHeader.classList.add('bg-danger');
        pHeader.classList.add('txt-yellow-stroke');
        return
    }
    
    if (pACtiveColor === 'bg-success'){
        pHeader.classList.remove('bg-danger');
        pHeader.classList.remove('bg-warning');    // Jaune Or               
        pHeader.classList.add('bg-success');
        pHeader.classList.add('txt-yellow-stroke');
        return
    }
    // -------------------------- Fin du module ----------------------------------------------------------------------------

}
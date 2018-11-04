// *************************************************************************
// *** MemberServer : Objet représentant les visiteurs et membres       ***
// ***                                                                   ***
// *** Objet : MemberServer                                             ***
// ***                                                                   ***
// *** Cet objet sert à gérer :                                          ***
// ***   - Le filtrage des candidats qui aspirent à jouer                ***
// ***   - La structure principale des données d'échange avec les clients***
// ***                                                                   ***
// ***  Nécessite :                                                      ***
// ***      Le module "dbMgr"                                            ***
// ***      Une variable pour son instanciation                          ***
// ***                                                                   ***
// *************************************************************************
// -------------------------------------------------------------------------

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const cstSuperAdmin = 1;  // Statut définissant le Super-Admin - Il n'y a qu'un seul SuperAdmin. il est créé lors de l'enregistrement du 1er membre - lui seul peut créer les autres Admin
const cstAdmin = 2;       // Statut définissant les Admin standards (Qui peuvent accéder à la console d'administration (avec le SuperAdmin))
const cstMembre = 4;      // Membre standard qui ne peut qu'utiliser la partie publique de l'application 
const cstMailFrom = 'collector@vcp.com';    // Adresse "From" du mail
const constFirstCharString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'    // Caractères autorisés pour le 1er caractère du PWD
const constNextCharString = constFirstCharString+'&#$*_-'                                         // Caractères autorisés pour les 11 autres caractères du PWD


module.exports = function MemberServer(pDBMgr){   // Fonction constructeur exportée
    this.DBMgr = pDBMgr;
    this.objectFound;                               // Objet d'acceuil utilisé lors de la recherche d'un objet dans la table des membres

    this.objectPopulation = 
    {
        members             : [],                   // Tableau de toutes les connexions ( Visiteurs dont [Membres + Admin])
        nbrConnections      : 0,                    // Nbre de connexions actives sans préjuger de leur rôle
        nbrMembersInSession : 0,                    // ?bre de membres connectés (Membres + Admin)
        nbrAdminsInSessions : 0,                    // Nombre d'Admins connectés
    }

    this.member =                                   // Structure de stockage proviisoire du membre
    {   
            email           : '',
            pseudo          : '',
            password        : '',
            newPassworld    : '',
            role            : 0,                     // Membre, Admin ou SuperAdmin
            dateCreation    : -1,                    // Timestamp de la création du record
    }

    // --------------------------------------------------------------
    // Fonction retournant un entien aléatoire entre une valeur 
    // inférieure (pas nécessairement zéro), et une valeur supérieure
    // --------------------------------------------------------------
    MemberServer.prototype.random = function(pValInf, pValSup){
        return Math.round(((pValSup - pValInf) * Math.random()) + pValInf);
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Cette fonction recherche dans la table des membres, celui qui a la propriété "idMember" correspondant à l'id du socket
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.searchIndexInMembers = (pWebSocketConnection) => {
        let myIndex = this.objectPopulation.members.map((propertyFilter) => {
            return propertyFilter.idMember;
        })
        .indexOf(pWebSocketConnection.id);
    
        this.objectFound = this.objectPopulation.members[myIndex];
        return myIndex;
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Vérification des données du visiteur (Pseudo + MDP) :
    // On cherche la combinaison Pseudo et MDP
    // - Si la combinaison n'existe pas --> Rejet de la demande Login ('retryLoginForm')
    // - Par contre, si elle existe, on demande au client de désactiver l'icône de Login et d'activer l'icône de déconnexion ('disableConnectBtn')
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.visitorTryToLoginPromise = (pVisiteurLoginData, pWebSocketConnection) => {
        return new Promise((resolve, reject) => {
            this.DBMgr.memberCollection.find(
                { 
                    "pseudo": pVisiteurLoginData.pseudo, 
                    "password": pVisiteurLoginData.password, 
                })
                .limit(1)
                .toArray((error, documents) => {
                    if (error) {
                        reject(error);
                        console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
                        throw error;
                    }

                    if (!documents.length){                                 // Le login n'a pas été trouvé dans la BDD et est donc erroné --> la tentative de connexion est refusée
                        pWebSocketConnection.emit('retryLoginForm');   
                        return resolve('Login Erroné');
                    } 

                    this.member = documents[0];                                     // Récupération des infos du membre dans l'objet de stockage provisoire
                    let myIndex = this.searchIndexInMembers(pWebSocketConnection);  // Recherche du membre dans le tableau des membres
                    
                    this.objectPopulation.members[myIndex].memberData.email        = this.member.email;
                    this.objectPopulation.members[myIndex].memberData.pseudo       = this.member.pseudo;
                    this.objectPopulation.members[myIndex].memberData.password     = this.member.password;
                    this.objectPopulation.members[myIndex].memberData.oldPassword  = this.member.oldPassword;
                    this.objectPopulation.members[myIndex].memberData.role         = this.member.role;                            // Membre, Admin ou SuperAdmin
                    this.objectPopulation.members[myIndex].memberData.dateCreation = this.member.dateCreation;                    // Timestamp de la création du record

                    this.addMemberToActiveMembers(myIndex);                         // Le visiteur est bien un membre, on l'ajoute à la liste des membres
                    pWebSocketConnection.emit('disableConnectBtn',this.member);     
                    resolve('Membre loggé');
                });
        });
    };
    // ---------------------------------------------------------------------------------------------------------------------------
    // Point d'appel pour la fonction de Login en mode 'async / await'
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.visitorTryToLogin = async (pVisiteurLoginData, pWebSocketConnection) => {
        var result = await (this.visitorTryToLoginPromise(pVisiteurLoginData, pWebSocketConnection));
        return result;
    };
    // ---------------------------------------------------------------------------------------------------------------------------
    // Création d'un PWD de 12 caractères, respectant le masque de saisie du PWD
    // - envoi de celui par mail
    // - Par contre, s'il existe, on génère un PWD aléatoire et on le transmet par mail ('sendNewPWD')
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.buildAndSendNewPWD = function(){
        this.member.newPassword = constFirstCharString[this.random(0, 61)];
        for (let i=1; i<=11; i++){
            this.member.newPassword += constNextCharString[this.random(0, 67)];
        }

        this.sendEMail(
            this.member.email, 
            'Votre demande de renouvellement de mot de passe', 
            '<h1 style="color: black;">Votre nouveau mot de passe ...</h1><p><h2>Voici vos nouveaux identifiants :</h2><br />' +
            'Vos identifiants sont : <p><Strong>Pseudonyme : </strong>'+this.member.pseudo+'<p><strong>Mot de passe : </strong>'+this.member.newPassword +
            '</p><br /><br /><br /><i>Vil-Coyote Products</i>'
        );
    console.log('buildAndSendNewPWD - this.member.email : ',this.member.email,'--- newPassword : ',this.member.newPassword)
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Sauvegarde du nouveau PWD après avoir au préalable sauvegarrdé l'ancien dans "olddPassword"
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.updatePasswordInBDD = function(){
        this.DBMgr.memberCollection.updateOne(
        { 
            "email": this.member.email, 
        },
        {$set:  
            {   oldPassword : this.member.password,
                password    : this.member.newPassword,
            }
        }, (error) => {
            if (error) {
                console.log('Erreur de MAJ dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
                throw error;
            };
        });
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Vérification que l'email fourni pour la récupération du PWD existe :
    // - Si le mail n'existe pas --> Rejet de la demande de récupération du PWD ('retryLostPWDForm')
    // - Par contre, s'il existe, on génère un PWD aléatoire et on le transmet par mail ('sendNewPWD')
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.checkLostPWDMailIsValid = function(pLostPWDEmail, pWebSocketConnection){
        this.DBMgr.memberCollection.find(
        { 
            "email": pLostPWDEmail, 
        }).toArray((error, documents) => {
            if (error) {
                console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
                throw error
            } 
            
            if (!documents.length){                                                         // Si mail non trouvé dans la BDD, on resoumet le formulaire
                return pWebSocketConnection.emit('retryLostPWDForm'); 
            } 

            // La mail est valide, récupération des infos nécessaires et suffisantes pour renvoyer le nouveau MDP
            this.member.email = documents[0].email;                                     // Récupération des infos nécessaires et suffisantes pour renvoyer le nouveau MDP
            this.member.pseudo = documents[0].pseudo;                                        
            this.member.password = documents[0].password;
            this.member.oldPassword = documents[0].oldPassword;

            this.buildAndSendNewPWD();
            this.updatePasswordInBDD();
            pWebSocketConnection.emit('notifyNewPWDSent'); 
        });
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Ajoute le membre nouvellement créé ou Loggé avec succès à la liste des membres connectés
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.addMemberToActiveMembers = function(pIndex){
        this.objectPopulation.members[pIndex].isMember  = true;
        this.objectPopulation.nbrMembersInSession++;  // On ajoute +1 aux nombre de membres connectésle membre qu'on vient de lire pour cette connexion dans un objet qui les recense

        if (this.objectPopulation.members[pIndex].memberData.role < cstMembre){    // Il s'agit obligatoiremennt d'un Admin ou Super-Admin
            this.objectPopulation.nbrAdminsInSessions++;  // On ajoute +1 aux nombre de membres connectésle membre qu'on vient de lire pour cette connexion dans un objet qui les recense
        }
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Envoi de mail générique en format HTML
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.sendEMail = function(pEMail, pSubject, pHTML){
        let messageToSend = {
            to       : pEMail,
            from     : cstMailFrom,
            subject  : pSubject,
            // text  : 'Félicitations\n\nVous êtes dorénavant membre de la Communauté \'Collect\'Or\'',
            html     : pHTML,
        }
        sgMail.send(messageToSend);
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Ajout des données du visiteur (futur membre) (Email, Pseudo, MDP, timestamp (au format brut), et statut dans la BDD)
    // ATTENTION !!!!
    // S'il n'y aucun membre dans la BDD, le Premier membre qui est créé est le Super-Administrateur
    // 
    // Codification des privilèges
    // 1 --> SuperAdmin
    // 2 --> Admin
    // 4 --> Membre
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.addMemberInDatabase = function(pMember, pWebSocketConnection){
        var myRole;

        this.DBMgr.memberCollection.countDocuments((error, count) => {        // On compte le nombre de membres dans la base pour savoir si le nouveau membre sera le SuperAdmin
            if (error){
                console.log('Erreur de comptage dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
                throw error;
            } 
            
            count === 0 ? myRole = cstSuperAdmin : myRole = cstMembre;      // Si c'est le 1er membre qui s'enregistre, c'est forcément le SuperAdmin

            let memberLocal = {
                email           : pMember.email,                                       
                pseudo          : pMember.pseudo,
                password        : pMember.password,
                oldPassword     : '',
                role            : myRole,                        
                dateCreation    : new Date(),         // Timestamp de la création du record
            }

            this.DBMgr.memberCollection.insertOne(memberLocal, (error, result) => {
                if (error){
                    console.log('Erreur d\'insertion dans la collection \'membres\' : ',memberLocal);   // Si erreur technique... Message et Plantage
                    throw error;
                } 

                // L'ajout d'enregistrement a reussi
                this.member = memberLocal;
                console.log("addMemberInDatabase - 1 membre inséré : ",this.member);  
                
                let myIndex = this.searchIndexInMembers(pWebSocketConnection);  // On ajoute le membre nouvellement créé dans la table des memnbres actifs
                this.addMemberToActiveMembers(myIndex)
                
                this.sendEMail(
                    pMember.email, 
                    'Votre inscription à Collect\'Or', 
                    '<h1 style="color: black;">Félicitations</h1><p><h2>Vous êtes dorénavant membre de la Communauté \'Collect\'Or\'.</h2><br />' +
                    'Vos identifiants sont : <p><Strong>Pseudonyme : </strong>'+pMember.pseudo+'<p><strong>Mot de passe : </strong>'+pMember.password +
                    '</p><br /><br /><br /><i>Vil-Coyote Products</i>'
                    );
            
                pWebSocketConnection.emit('congratNewMember',this.member); 
            });
        });
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Vérification des données de Sign-in du visiteur  :
    // 1) Vérification de la non-préexistence de l'Email
    // 2) Vérification de la non-préexistence du Pseudo
    // Si ces 2 conditions sont vérifiées, on ajoute le visiteur à 
    // la BDD et il devient membre
    // - Sinon, on le rejette 
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.checkVisitorSignInISValid = function(pVisiteurSignInData, pWebSocketConnection){
        this.DBMgr.memberCollection.find(                                                   // Vérification de non-pré-existence du mail
        { 
            "email": pVisiteurSignInData.email, 
        })
        .limit(1)
        .toArray((error, documents) => {
            if (error){
                console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
                throw error;
            } 

            // Si mail trouvé --> KO pour la création de nouveau membre
            if (documents.length){                            
                return pWebSocketConnection.emit('retrySignInForm'); 
            }

            // Le mail n a pas été trouvé, on vérifie maintenant la non-existence du Pseudo
            this.DBMgr.memberCollection.find(                  
            { 
                "pseudo": pVisiteurSignInData.pseudo, 
            })
            .limit(1)
            .toArray((error, documents) => {
                if (error){
                    console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
                    throw error;                                                          
                } 

                if (documents.length){                     
                    return pWebSocketConnection.emit('retrySignInForm');                        // Si pseudo trouvé --> KO pour la création de nouveau membre
                } 

                // Si mail + pseudo non trouvé --> On valide l'inscription en créant le membre
                this.addMemberInDatabase(pVisiteurSignInData, pWebSocketConnection);         
            });
        });
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Deconnexion d'un visiteur et eventuellement d'un membre  :
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.disconnectMember = function(pWebSocketConnection){
        let myIndex = this.searchIndexInMembers(pWebSocketConnection);
        if (this.objectPopulation.members[myIndex].isMember){                    // Le visiteur qui se deconnecte était un membre
            this.objectPopulation.nbrMembersInSession--;                         // Nombre de visiteurs incluant les [membres + Admins]

            if (this.objectPopulation.members[myIndex].memberData.role < cstMembre){    // Il s'agit obligatoiremennt d'un Admin ou Super-Admin
                this.objectPopulation.nbrAdminsInSessions--;  // Si le memnbre est un Admin, on retire 1 aux nombre d'Admin connectés
            }
        }    
        this.objectPopulation.members.splice(myIndex, 1);
        this.objectPopulation.nbrConnections--;
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Initialisation d'un visiteur :
    // 1) Stockage de sson socket
    // 2) Mise a zero de tous les champs
    // 3) Ajout du visiteur dans le tableau global des personnes connextées
    // ---------------------------------------------------------------------------------------------------------------------------
    MemberServer.prototype.initVisiteur = function(pWebSocketConnection){

        let memberLocal = {
            idMember        : pWebSocketConnection.id,
            isMember        : false,

            memberData : {
                email           : '',
                pseudo          : '',
                password        : '',
                oldPassword     : '',
                role            : 0,                        // Membre, Admin ou SuperAdmin
                dateCreation    : -1,                       // Timestamp de la création du record
            }
        }

        this.objectPopulation.members.push(memberLocal);
        this.objectPopulation.nbrConnections++;             // Nombre de visiteurs incluant les [membres + Admins]

        console.log('--------------------------------------------------------------------------------------------------------------------')
        console.log('initVisiteur - 000 - : this.objectPopulation.members.length : ',this.objectPopulation.members.length,
                    '--- Nbre de visiteurs : ', this.objectPopulation.nbrConnections,
                    '--- Nbre de membres : ',this.objectPopulation.nbrMembersInSession,
                    '--- Nbre d\'Admin : ',this.objectPopulation.nbrAdminsInSessions,
                    '--- pWebSocketConnection.id : ',pWebSocketConnection.id);
        console.log('--------------------------------------------------------------------------------------------------------------------')
    }
    // ------------------------------------------- Fin du module -------------------------------------------------------------------------
}
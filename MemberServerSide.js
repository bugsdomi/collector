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

const cstText = 1;        // Spécifie que le corps du mail sera purement textuel
const cstHTML = 2;        // Spécifie que le coprs du mail sera en HTML

module.exports = function MemberServer(pDBMgr){   // Fonction constructeur exportée
    this.DBMgr = pDBMgr;

    this.objectMember =                          // Structure du membre
    {   
        id              : -1,                    // Id du membre connecté
        email           : '',
        pseudo          : '',
        password        : '',
        role            : 0,                     // Membre, Admin ou SuperAdmin
        dateCreation    : -1,                    // Timestamp de la création du record
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
            } else {
                count === 0 ? myRole = cstSuperAdmin : myRole = cstMembre;      // Si c'est le 1er membre qui s'enregistre, c'est forcément le SuperAdmin

                this.objectMember.email = pMember.email,
                this.objectMember.pseudo = pMember.pseudo,
                this.objectMember.password = pMember.password,
                this.objectMember.role = myRole,
                this.objectMember.dateCreation = new Date(),                                  // Timestamp de la création du record

                this.DBMgr.memberCollection.insertOne(this.objectMember, (error, result) => {
                    if (error){
                        console.log('Erreur d\'insertion dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
                        throw error;
                    } else {
                        console.log("addMemberInDatabase - 1 document inserted : ",memberRecord);    
                    
                        let messageToSend = {
                            to       : pMember.email,
                            from     : 'collector@vcp.com',
                            subject  : 'Votre inscription à Collect\'Or',
                            // text  : 'Félicitations\n\nVous êtes dorénavant membre de la Communauté \'Collect\'Or\'',
                            html     : '<h1 style="color: black;">Félicitations</h1><p><h2>Vous êtes dorénavant membre de la Communauté \'Collect\'Or\'.</h2><br />' +
                                        'Vos identifiants sont : <p><Strong>Pseudonyme : </strong>'+pMember.pseudo+'<p><strong>Mot de passe : </strong>'+pMember.password +
                                        '</p><br /><br /><br /><i>Vil-Coyote Products</i>',
                        }
                        sgMail.send(messageToSend);
                        pWebSocketConnection.emit('congratNewMember'); 
                    }
                });
            }
        });
    }

    // ---------------------------------------------------------------------------------------------------------------------------
    // Procédure raccourcie de recherche d'infos dans la BDD
    // On lui passe un objet avec la Query à rechercher, et les CallBacks a appeler en cas de succès ou d'échec
    // ---------------------------------------------------------------------------------------------------------------------------
//     MemberServer.prototype.findDataInDB = function(pQuery, pResolveProc, pRejectProc, pWebSocketConnection){
// console.log('findDataInDB - pQuery : ',pQuery)
//         this.DBMgr.memberCollection.find(pQuery).toArray((error, documents) => {
//             if (error) {
//                 console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
//                 throw error
//             } else {
//                 if (!documents.length){
//                     pWebSocketConnection.emit(pRejectProc); 
//                 } else {                          
//                     pWebSocketConnection.emit(pResolveProc); 
//                 }
//             }
//         });
//     }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Vérification des données du visiteur (Pseudo + MDP) :
    // On cherche la combinaison Pseudo et MDP
    // - Si la combinaison n'existe pas --> Rejet de la demande Login ('retryLoginForm')
    // - Par contre, si elle existe, on demande au client de désactiver l'icône de Login et d'activer l'icône de déconnexion ('disableConnectBtn')
    // ---------------------------------------------------------------------------------------------------------------------------

    MemberServer.prototype.checkVisitorIsMemberPromise = (pVisiteurLoginData, pObjectPopulation, pWebSocketConnection) => {
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

                    if (!documents.length){
                        resolve('toto');
                        pWebSocketConnection.emit('retryLoginForm');              //  Le login est erroné et n a pas ete trouvé dans la BDD, et la tentative de connexion est refusée
                        return false
                    } 

                    pWebSocketConnection.emit('disableConnectBtn');               // Le visiteur est bien un membre, on l'ajoute à la liste des membres

                    let objectMemberLocal = {
                        email : documents[0].email,                                        
                        pseudo : documents[0].pseudo,                                        
                        password : documents[0].password,
                        role :  documents[0].role,                                
                        dateCreation : documents[0].dateCreation,                                      
                        id : Math.round(Math.random() * 10000) + (new Date()).getTime() + '-Membre',
                    };

                    pObjectPopulation.vMembers[objectMemberLocal.id] = objectMemberLocal;     // On ajoute le membre qu'on vient de lire pour cette connexion dans un objet qui les recense
                    pObjectPopulation.vNbrMembersInSession++;

console.log('====================================================================================================================')
console.log('myPromise 000 - this.objectMember : ',this.objectMember)
console.log('--------------------------------------------------------------------------------------------------------------------')
                    // this.objectMember = ObjectMemberLocal;

                    this.objectMember.email = objectMemberLocal.email;                                        
                    this.objectMember.pseudo = objectMemberLocal.pseudo;                                        
                    this.objectMember.password = objectMemberLocal.password;
                    this.objectMember.role = objectMemberLocal.role;                                
                    this.objectMember.dateCreation = objectMemberLocal.dateCreation;                                      
                    this.objectMember.id = objectMemberLocal.id;
 
console.log('myPromise 001 - this.objectMember : ',this.objectMember)
console.log('====================================================================================================================')
                    // resolve(pObjectPopulation);
                    resolve(this.objectMember);
                });
        });
    };

    MemberServer.prototype.checkVisitorIsMember = async (pVisiteurLoginData, pObjectPopulation, pWebSocketConnection) => {
        var result = await (this.checkVisitorIsMemberPromise(pVisiteurLoginData, pObjectPopulation, pWebSocketConnection));
        // return pObjectPopulation;
console.log('--------------------------------------------------------------------------------------------------------------------')
console.log('checkVisitorIsMember - result : ',result);
console.log('--------------------------------------------------------------------------------------------------------------------')
        return result;
    };






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
            } else {
                if (!documents.length){                                                     // Si mail non trouvé, on rejette
                    pWebSocketConnection.emit('retryLostPWDForm'); 
                } else {        
                    this.objectMember.email = documents[0].email;                                        
                    this.objectMember.pseudo = documents[0].pseudo;                                        
                    this.objectMember.password = documents[0].password;
                    // this.objectMember.role =  documents[0].role;                                       
                    // this.objectMember.dateCreation = documents[0].dateCreation;                                      

                    buildAndSendNewPWD()
                    // sendNewPWD();                  
                    // pWebSocketConnection.emit(pResolveProc); 
                }
            }
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
        this.DBMgr.memberCollection.find(
        { 
            "email": pVisiteurSignInData.email, 
        }).toArray((error, documents) => {
            if (error){
                console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
                throw error;
            } else {
                if (!documents.length){                            // Si email non trouvé --> Ok pour l'instant, donc on vérifie que le Pseudo n'existe pas
                    this.DBMgr.memberCollection.find(
                    { 
                        "pseudo": pVisiteurSignInData.pseudo, 
                    }).toArray((error, documents) => {
                        if (error){
                            console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
                            throw error;
                        } else {
                            if (!documents.length){                     // Si pseudo non trouvé --> On valide l'inscription en créant le membre
                                this.addMemberInDatabase(pVisiteurSignInData, pWebSocketConnection);
                            } else {
                                pWebSocketConnection.emit('retrySignInForm'); 
                            }
                        }
                    });
                } else {
                    pWebSocketConnection.emit('retrySignInForm'); 
                }
            }
        });
    }
    // ---------------------------------------------------------------------------------------------------------------------------
}
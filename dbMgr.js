// *************************************************************************
// ***      DBMgr : Objet gérant la BDD "Collect'Or"                     ***
// ***                                                                   ***
// *** Objet : DBMgr                                                     ***
// ***                                                                   ***
// *** Cet objet sert à gérer :                                          ***
// ***   - L'ouverture et le contrôle du bon fonctionnement de la BDD    ***
// ***   - Les accès CRUD aux différentes collections                    ***
// ***                                                                   ***
// ***  Nécessite :                                                      *** 
// ***      Le module "MongoDB"                                          ***
// ***      Une variable pour son instanciation                          ***
// ***                                                                   ***
// *************************************************************************
// -------------------------------------------------------------------------
// stockage des informations techniques des joueurs et des  coordonnées de leurs 
// pilules qui vont être générées pour le player
// 4 joueurs maximum - 50 pilules pour chacun 
// -------------------------------------------------------------------------
const mongoDB = require('mongodb');

module.exports = function DBMgr(){
    this.myDB;                           // Instance de la base de données
    this.collectionMembers;               // Sélectionne la collection des données des membres
    this.collectionTechnical;                // Sélectionne la collection des données techniques
    
    // -------------------------------------------------------------------------
    // On se connecte à mongoDB, on vérifie qu elle est lancée et que la BDD 
    // "TourDeFrance" est accessible (avec stockage de sa référence), sinon, 
    // message d'avertissement pour l'Admin  système et fin directe du programme
    // -------------------------------------------------------------------------
    DBMgr.prototype.checkDBConnectPromise = function(){
        return new Promise((resolve, reject) => {
            // mongoDB.MongoClient.connect("mongodb://localhost:27017/collect-or", { useNewUrlParser: true }, (error,db) => {
            mongoDB.MongoClient.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true }, (error,db) => {
                if (error) {
                    reject(false);
                    console.log('Base de données inaccessible, l\'application "Collector" ne peut pas se lancer');
                    console.log('Description de l\'erreur : ',error);
                    throw 'Base de données inaccessible, l\'application "Collector" ne peut pas se lancer, contacter l\'Administrateur système';
                } 
                
                resolve(true);
                this.myDB = db;                                                                         // Conservation de l'instance de BDD
                this.collectionMembers = this.myDB.db('collect-or').collection('members');              // On sélectionne la collection des joueurs
                this.collectionTechnical = this.myDB.db('collect-or').collection('technical');          // On sélectionne la collection des données techniques
                console.log('La BDD "collect-or" est bien lancée et tourne');    // Message de notification BDD OK à destination de l'Admin 
            });
        });
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // Point d'appel pour la fonction d'ouvertureb de la BDD en mode 'async / await'
    // ---------------------------------------------------------------------------------------------------------------------------
    DBMgr.prototype.checkDBConnect = async () => {
        var result = await (this.checkDBConnectPromise());
        return result;
    };
    // ------------------------------------------- Fin du module -------------------------------------------------------------------------
}



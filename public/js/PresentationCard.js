// ------------------------------------------------------------------------
// ---      PresentationCard  : Affichage de la "Carte de présentation" ---
// ---                                                                  ---
// --- Objet : PresentationCard                                         ---
// ---                                                                  ---
// --- Cet objet sert la carte de présentation des données résumées     ---
// ---                                                                  ---
// ---  Nécessite :                                                     ---
// ---      Rien                                                        ---
// ---                                                                  ---
// ------------------------------------------------------------------------

function PresentationCard (pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						

// -----------------------------------------------------------------------------
//                      Création de la Carte "Présentation"                             
// -----------------------------------------------------------------------------
PresentationCard.prototype.displayPresentationCard = function(){
	var vlineHTML = {};						

	// Détermination du point de montage, selon que l'on est sur la fiche du membre principal ou celle d'un de ses amis
	if (vActiveProfile === cstMainProfileActive){
		var vDivMountPointProfile = document.getElementById('idDivMountPointMainProfile');
	} else {
		var vDivMountPointProfile = document.getElementById('idDivMountPointFriendProfile');
	}

	// ------------------------------------------------------------------------------ 
	//                               Carte "Présentation"                             
	// ------------------------------------------------------------------------------ 

	//* <div class="card border-warning mb-4">
	vlineHTML.vDivCardBorder = window.document.createElement('div');
	vDivMountPointProfile.appendChild(vlineHTML.vDivCardBorder);
	vlineHTML.vDivCardBorder.setAttribute('class', 'card border-warning mb-4');

	// ------------------------------------------------------------------------------ 
	//                       Entête de la carte "Présentation"                         
	// ------------------------------------------------------------------------------ 
	// 	<div class="card-header bg-warning border-bottom border-warning">
	vlineHTML.vDivCardHeader = window.document.createElement('div');
	vlineHTML.vDivCardBorder.appendChild(vlineHTML.vDivCardHeader);
	vlineHTML.vDivCardHeader.setAttribute('class', 'card-header bg-warning border-bottom border-warning py-0 pb-1');

	// 			<img id="idAvatarToken" class="avatarToken tokenSize50 ml-0" alt="Avatar" src="">
	vlineHTML.vImgAvatToken = window.document.createElement('img');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vImgAvatToken);
	vlineHTML.vImgAvatToken.setAttribute('id', 'idAvatarToken'+vActiveProfile);
	vlineHTML.vImgAvatToken.setAttribute('class', 'avatarToken tokenSize50 ml-0');
	vlineHTML.vImgAvatToken.setAttribute('alt', 'Avatar');
	vlineHTML.vImgAvatToken.setAttribute('src', '');

// 		<h5 class="card-title">Présentation</h5>
	vlineHTML.vH5 = window.document.createElement('h5');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vH5);
	vlineHTML.vH5.setAttribute('class', 'card-title');
	vlineHTML.vH5.innerHTML='Présentation';

	// ------------------------------------------------------------------------------ 
	//                       Corps de la carte "Présentation"                          
	// ------------------------------------------------------------------------------ 

	// ------------------------------------------------------------------------------ 
	//                       Champs données personnelles                         
	// ------------------------------------------------------------------------------ 

	// 	<div class="card-body" style="border: 1px black solid;">
	vlineHTML.vDivCardBody = window.document.createElement('div');
	vlineHTML.vDivCardBorder.appendChild(vlineHTML.vDivCardBody);
	vlineHTML.vDivCardBody.setAttribute('class', 'card-body');
	vlineHTML.vDivCardBody.setAttribute('style', 'border: 1px black solid;');
	
// 		<ul class="list-group list-unstyled">
	vlineHTML.vULListGroup = window.document.createElement('ul');
	vlineHTML.vDivCardBody.appendChild(vlineHTML.vULListGroup);
	vlineHTML.vULListGroup.setAttribute('class', 'list-group list-unstyled');
	
// 			<li>
	vlineHTML.vLi1 = window.document.createElement('li');
	vlineHTML.vULListGroup.appendChild(vlineHTML.vLi1);

// 				<div class="row">
	vlineHTML.vDivRow1 = window.document.createElement('div');
	vlineHTML.vLi1.appendChild(vlineHTML.vDivRow1);
	vlineHTML.vDivRow1.setAttribute('class', 'row');
	
// 					<div class="col-sm-4 text-dark">Prénom</div>
	vlineHTML.vDivCol1 = window.document.createElement('div');
	vlineHTML.vDivRow1.appendChild(vlineHTML.vDivCol1);
	vlineHTML.vDivCol1.setAttribute('class', 'col-sm-4 text-dark');
	vlineHTML.vDivCol1.innerHTML='Prénom';

// 					<div class="col-sm-8 font-weight-bold" id="idAboutPrenom"></div>
	vlineHTML.vDivCol2 = window.document.createElement('div');
	vlineHTML.vDivRow1.appendChild(vlineHTML.vDivCol2);
	vlineHTML.vDivCol2.setAttribute('id', 'idAboutPrenom'+vActiveProfile);
	vlineHTML.vDivCol2.setAttribute('class', 'col-sm-8 font-weight-bold');

// 			<li>
	vlineHTML.vLi2 = window.document.createElement('li');
	vlineHTML.vULListGroup.appendChild(vlineHTML.vLi2);

// 				<div class="row">
	vlineHTML.vDivRow2 = window.document.createElement('div');
	vlineHTML.vLi2.appendChild(vlineHTML.vDivRow2);
	vlineHTML.vDivRow2.setAttribute('class', 'row');

// 					<div class="col-sm-4 text-dark">Nom</div>
	vlineHTML.vDivCol3 = window.document.createElement('div');
	vlineHTML.vDivRow2.appendChild(vlineHTML.vDivCol3);
	vlineHTML.vDivCol3.setAttribute('class', 'col-sm-4 text-dark');
	vlineHTML.vDivCol3.innerHTML='Nom';

// 					<div class="col-sm-8 font-weight-bold" id="idAboutNom"></div>
	vlineHTML.vDivCol4 = window.document.createElement('div');
	vlineHTML.vDivRow2.appendChild(vlineHTML.vDivCol4);
	vlineHTML.vDivCol4.setAttribute('id', 'idAboutNom'+vActiveProfile);
	vlineHTML.vDivCol4.setAttribute('class', 'col-sm-8 font-weight-bold');

// 			<li>
	vlineHTML.vLi3 = window.document.createElement('li');
	vlineHTML.vULListGroup.appendChild(vlineHTML.vLi3);

// 				<div class="row">
	vlineHTML.vDivRow3 = window.document.createElement('div');
	vlineHTML.vLi3.appendChild(vlineHTML.vDivRow3);
	vlineHTML.vDivRow3.setAttribute('class', 'row');

// 					<div class="col-sm-4 text-dark">Âge</div>
	vlineHTML.vDivCol5 = window.document.createElement('div');
	vlineHTML.vDivRow3.appendChild(vlineHTML.vDivCol5);
	vlineHTML.vDivCol5.setAttribute('class', 'col-sm-4 text-dark');
	vlineHTML.vDivCol5.innerHTML='Âge';

// 						<div class="col-sm-8 font-weight-bold" id="idAboutAge"></div>
	vlineHTML.vDivCol6 = window.document.createElement('div');
	vlineHTML.vDivRow3.appendChild(vlineHTML.vDivCol6);
	vlineHTML.vDivCol6.setAttribute('id', 'idAboutAge'+vActiveProfile);
	vlineHTML.vDivCol6.setAttribute('class', 'col-sm-8 font-weight-bold');

// 			<li>
	vlineHTML.vLi4 = window.document.createElement('li');
	vlineHTML.vULListGroup.appendChild(vlineHTML.vLi4);

// 				<div class="row">
	vlineHTML.vDivRow4 = window.document.createElement('div');
	vlineHTML.vLi4.appendChild(vlineHTML.vDivRow4);
	vlineHTML.vDivRow4.setAttribute('class', 'row');

// 					<div class="col-sm-4 text-dark">Ville</div>
	vlineHTML.vDivCol7 = window.document.createElement('div');
	vlineHTML.vDivRow4.appendChild(vlineHTML.vDivCol7);
	vlineHTML.vDivCol7.setAttribute('class', 'col-sm-4 text-dark');
	vlineHTML.vDivCol7.innerHTML='Ville';

// 						<div class="col-sm-8 font-weight-bold" id="idAboutVille"></div>
	vlineHTML.vDivCol8 = window.document.createElement('div');
	vlineHTML.vDivRow4.appendChild(vlineHTML.vDivCol8);
	vlineHTML.vDivCol8.setAttribute('id', 'idAboutVille'+vActiveProfile);
	vlineHTML.vDivCol8.setAttribute('class', 'col-sm-8 font-weight-bold');

// 			<li>
	vlineHTML.vLi5 = window.document.createElement('li');
	vlineHTML.vULListGroup.appendChild(vlineHTML.vLi5);

// 				<div class="row">
	vlineHTML.vDivRow5 = window.document.createElement('div');
	vlineHTML.vLi5.appendChild(vlineHTML.vDivRow5);
	vlineHTML.vDivRow5.setAttribute('class', 'row');

// 					<div class="col-sm-4 text-dark">Département</div>
	vlineHTML.vDivCol9 = window.document.createElement('div');
	vlineHTML.vDivRow5.appendChild(vlineHTML.vDivCol9);
	vlineHTML.vDivCol9.setAttribute('class', 'col-sm-4 text-dark');
	vlineHTML.vDivCol9.innerHTML='Département';

// 						<div class="col-sm-8 font-weight-bold" id="idAboutDepartmentName"></div>
	vlineHTML.vDivCol10 = window.document.createElement('div');
	vlineHTML.vDivRow5.appendChild(vlineHTML.vDivCol10);
	vlineHTML.vDivCol10.setAttribute('id', 'idAboutDepartmentName'+vActiveProfile);
	vlineHTML.vDivCol10.setAttribute('class', 'col-sm-8 font-weight-bold');
	

	// ------------------------------------------------------------------------------ 
	//                       champ "Présentation"                          
	// ------------------------------------------------------------------------------ 
// 			<li>
	vlineHTML.vLi6 = window.document.createElement('li');
	vlineHTML.vULListGroup.appendChild(vlineHTML.vLi6);

// 				<div class="row">
	vlineHTML.vDivRow6 = window.document.createElement('div');
	vlineHTML.vLi6.appendChild(vlineHTML.vDivRow6);
	vlineHTML.vDivRow6.setAttribute('class', 'row');

// 					<div class="col-sm-12 text-dark mb-2">Présentation</div>
	vlineHTML.vDivCol11 = window.document.createElement('div');
	vlineHTML.vDivRow6.appendChild(vlineHTML.vDivCol11);
	vlineHTML.vDivCol11.setAttribute('class', 'col-sm-12 text-dark mb-2');
	vlineHTML.vDivCol11.innerHTML='Présentation';

// 					<textarea class="col-sm-12 presentationCard font-weight-bold" rows="2"  id="idAboutPresentation" disabled></textarea>
	vlineHTML.vDivCol12 = window.document.createElement('textarea');
	vlineHTML.vDivRow6.appendChild(vlineHTML.vDivCol12);
	vlineHTML.vDivCol12.setAttribute('id', 'idAboutPresentation'+vActiveProfile);
	vlineHTML.vDivCol12.setAttribute('class', 'col-sm-12 presentationCard font-weight-bold');
	vlineHTML.vDivCol12.setAttribute('rows', '2');
	vlineHTML.vDivCol12.setAttribute('disabled', '');
	vlineHTML.vDivCol12.setAttribute('style', 'border-color: darkGray;');


	// ------------------------------------------------------------------------------ 
	//                       Champs "Préférences"                    
	// ------------------------------------------------------------------------------ 
// 			<li>
	vlineHTML.vLi7 = window.document.createElement('li');
	vlineHTML.vULListGroup.appendChild(vlineHTML.vLi7);

// 				<div class="row">
	vlineHTML.vDivRow7 = window.document.createElement('div');
	vlineHTML.vLi7.appendChild(vlineHTML.vDivRow7);
	vlineHTML.vDivRow7.setAttribute('class', 'row');

// 					<div class="col-sm-12 text-dark my-2">Mes préférences...</div>
	vlineHTML.vDivCol13 = window.document.createElement('div');
	vlineHTML.vDivRow7.appendChild(vlineHTML.vDivCol13);
	vlineHTML.vDivCol13.setAttribute('class', 'col-sm-12 text-dark my-2');
	vlineHTML.vDivCol13.innerHTML='Mes préférences...';

// 					<div class="col-sm-12 presentationCard btn-group-toggle text-center">
	vlineHTML.vDivCol14 = window.document.createElement('div');
	vlineHTML.vDivRow7.appendChild(vlineHTML.vDivCol14);
	vlineHTML.vDivCol14.setAttribute('class', 'col-sm-12 presentationCard btn-group-toggle text-center');
	vlineHTML.vDivCol14.setAttribute('style', 'border-color: darkGray;');
	

	// ------------------------------------------------------------------------------ 
	//                       Pils du Champs "Préférences"                    
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-success badge badge-pill mr-1 neutralPointer" id="idAboutPrefGravuresLabel">
	vlineHTML.vLabel1 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel1);
	vlineHTML.vLabel1.setAttribute('id', 'idAboutPrefGravuresLabel'+vActiveProfile);
	vlineHTML.vLabel1.setAttribute('class', 'btn btn-outline-success badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Gravures
	vlineHTML.vInput1 = window.document.createElement('input');
	vlineHTML.vLabel1.appendChild(vlineHTML.vInput1);
	vlineHTML.vInput1.setAttribute('type', 'checkbox');
	vlineHTML.vLabel1.innerHTML += 'Gravures';

	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-danger badge badge-pill mr-1 neutralPointer" id="idAboutPrefLivresLabel">
	vlineHTML.vLabel2 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel2);
	vlineHTML.vLabel2.setAttribute('id', 'idAboutPrefLivresLabel'+vActiveProfile);
	vlineHTML.vLabel2.setAttribute('class', 'btn btn-outline-danger badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Livres
	vlineHTML.vInput2 = window.document.createElement('input');
	vlineHTML.vLabel2.appendChild(vlineHTML.vInput2);
	vlineHTML.vInput2.setAttribute('type', 'checkbox');
	vlineHTML.vLabel2.innerHTML += 'Livres';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-warning badge badge-pill mr-1 neutralPointer" id="idAboutPrefFilmsLabel">
	vlineHTML.vLabel3 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel3);
	vlineHTML.vLabel3.setAttribute('id', 'idAboutPrefFilmsLabel'+vActiveProfile);
	vlineHTML.vLabel3.setAttribute('class', 'btn btn-outline-warning badge badge-pill mr-1 neutralPointer');
// 							<input type="checkbox">Films
	vlineHTML.vInput3 = window.document.createElement('input');
	vlineHTML.vLabel3.appendChild(vlineHTML.vInput3);
	vlineHTML.vInput3.setAttribute('type', 'checkbox');
	vlineHTML.vLabel3.innerHTML += 'Films';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-info badge badge-pill mr-1 neutralPointer" id="idAboutPrefJeuxLabel">
	vlineHTML.vLabel4 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel4);
	vlineHTML.vLabel4.setAttribute('id', 'idAboutPrefJeuxLabel'+vActiveProfile);
	vlineHTML.vLabel4.setAttribute('class', 'btn btn-outline-info badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Jeux
	vlineHTML.vInput4 = window.document.createElement('input');
	vlineHTML.vLabel4.appendChild(vlineHTML.vInput4);
	vlineHTML.vInput4.setAttribute('type', 'checkbox');
	vlineHTML.vLabel4.innerHTML += 'Jeux';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-primary badge badge-pill mr-1 neutralPointer" id="idAboutPrefMaquettesLabel">
	vlineHTML.vLabel5 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel5);
	vlineHTML.vLabel5.setAttribute('id', 'idAboutPrefMaquettesLabel'+vActiveProfile);
	vlineHTML.vLabel5.setAttribute('class', 'btn btn-outline-primary badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Maquettes
	vlineHTML.vInput5 = window.document.createElement('input');
	vlineHTML.vLabel5.appendChild(vlineHTML.vInput5);
	vlineHTML.vInput5.setAttribute('type', 'checkbox');
	vlineHTML.vLabel5.innerHTML += 'Maquettes';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-secondary badge badge-pill mr-1 neutralPointer" id="idAboutPrefFigurinesLabel">
	vlineHTML.vLabel6 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel6);
	vlineHTML.vLabel6.setAttribute('id', 'idAboutPrefFigurinesLabel'+vActiveProfile);
	vlineHTML.vLabel6.setAttribute('class', 'btn btn-outline-secondary badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Figurines
	vlineHTML.vInput6 = window.document.createElement('input');
	vlineHTML.vLabel6.appendChild(vlineHTML.vInput6);
	vlineHTML.vInput6.setAttribute('type', 'checkbox');
	vlineHTML.vLabel6.innerHTML += 'Figurines';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-dark badge badge-pill mr-1 neutralPointer" id="idAboutPrefBlindesLabel">
	vlineHTML.vLabel7 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel7);
	vlineHTML.vLabel7.setAttribute('id', 'idAboutPrefBlindesLabel'+vActiveProfile);
	vlineHTML.vLabel7.setAttribute('class', 'btn btn-outline-dark badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Blindés
	vlineHTML.vInput7 = window.document.createElement('input');
	vlineHTML.vLabel7.appendChild(vlineHTML.vInput7);
	vlineHTML.vInput7.setAttribute('type', 'checkbox');
	vlineHTML.vLabel7.innerHTML += 'Blindés';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-success badge badge-pill mr-1 neutralPointer" id="idAboutPrefAvionsLabel">
	vlineHTML.vLabel8 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel8);
	vlineHTML.vLabel8.setAttribute('id', 'idAboutPrefAvionsLabel'+vActiveProfile);
	vlineHTML.vLabel8.setAttribute('class', 'btn btn-outline-success badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Avions
	vlineHTML.vInput8 = window.document.createElement('input');
	vlineHTML.vLabel8.appendChild(vlineHTML.vInput8);
	vlineHTML.vInput8.setAttribute('type', 'checkbox');
	vlineHTML.vLabel8.innerHTML += 'Avions';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-danger badge badge-pill mr-1 neutralPointer" id="idAboutPrefBateauxLabel">
	vlineHTML.vLabel9 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel9);
	vlineHTML.vLabel9.setAttribute('id', 'idAboutPrefBateauxLabel'+vActiveProfile);
	vlineHTML.vLabel9.setAttribute('class', 'btn btn-outline-danger badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Bateaux
	vlineHTML.vInput9 = window.document.createElement('input');
	vlineHTML.vLabel9.appendChild(vlineHTML.vInput9);
	vlineHTML.vInput9.setAttribute('type', 'checkbox');
	vlineHTML.vLabel9.innerHTML += 'Bateaux';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-warning badge badge-pill mr-1 neutralPointer" id="idAboutPrefDioramasLabel">
	vlineHTML.vLabel10 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel10);
	vlineHTML.vLabel10.setAttribute('id', 'idAboutPrefDioramasLabel'+vActiveProfile);
	vlineHTML.vLabel10.setAttribute('class', 'btn btn-outline-warning badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Dioramas
	vlineHTML.vInput10 = window.document.createElement('input');
	vlineHTML.vLabel10.appendChild(vlineHTML.vInput10);
	vlineHTML.vInput10.setAttribute('type', 'checkbox');
	vlineHTML.vLabel10.innerHTML += 'Dioramas';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-info badge badge-pill mr-1 neutralPointer" id="idAboutPrefPrehistoireLabel">
	vlineHTML.vLabel11 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel11);
	vlineHTML.vLabel11.setAttribute('id', 'idAboutPrefPrehistoireLabel'+vActiveProfile);
	vlineHTML.vLabel11.setAttribute('class', 'btn btn-outline-info badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Préhistoire
	vlineHTML.vInput11 = window.document.createElement('input');
	vlineHTML.vLabel11.appendChild(vlineHTML.vInput11);
	vlineHTML.vInput11.setAttribute('type', 'checkbox');
	vlineHTML.vLabel11.innerHTML += 'Préhistoire';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-primary badge badge-pill mr-1 neutralPointer" id="idAboutPrefAntiquiteLabel">
	vlineHTML.vLabel12 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel12);
	vlineHTML.vLabel12.setAttribute('id', 'idAboutPrefAntiquiteLabel'+vActiveProfile);
	vlineHTML.vLabel12.setAttribute('class', 'btn btn-outline-primary badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Antiquité
	vlineHTML.vInput12 = window.document.createElement('input');
	vlineHTML.vLabel12.appendChild(vlineHTML.vInput12);
	vlineHTML.vInput12.setAttribute('type', 'checkbox');
	vlineHTML.vLabel12.innerHTML += 'Antiquité';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-secondary badge badge-pill mr-1 neutralPointer" id="idAboutPrefMoyenAgeLabel">
	vlineHTML.vLabel13 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel13);
	vlineHTML.vLabel13.setAttribute('id', 'idAboutPrefMoyenAgeLabel'+vActiveProfile);
	vlineHTML.vLabel13.setAttribute('class', 'btn btn-outline-secondary badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Moyen-âge
	vlineHTML.vInput13 = window.document.createElement('input');
	vlineHTML.vLabel13.appendChild(vlineHTML.vInput13);
	vlineHTML.vInput13.setAttribute('type', 'checkbox');
	vlineHTML.vLabel13.innerHTML += 'Moyen-âge';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-dark badge badge-pill mr-1 neutralPointer" id="idAboutPrefRenaissanceLabel">
	vlineHTML.vLabel14 = window.document.createElement('label');
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel14);
	vlineHTML.vLabel14.setAttribute('id', 'idAboutPrefRenaissanceLabel'+vActiveProfile);
	vlineHTML.vLabel14.setAttribute('class', 'btn btn-outline-dark badge badge-pill mr-1 neutralPointer');

// 							<input type="checkbox">Renaissance
	vlineHTML.vInput14 = window.document.createElement('input');
	vlineHTML.vLabel14.appendChild(vlineHTML.vInput14);
	vlineHTML.vInput14.setAttribute('type', 'checkbox');
	vlineHTML.vLabel14.innerHTML += 'Renaissance';
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-success badge badge-pill mr-1 neutralPointer" id="idAboutPrefDentellesLabel">
	vlineHTML.vLabel15 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel15)
	vlineHTML.vLabel15.setAttribute('id', 'idAboutPrefDentellesLabel'+vActiveProfile)
	vlineHTML.vLabel15.setAttribute('class', 'btn btn-outline-success badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Guerre en dentelles
	vlineHTML.vInput15 = window.document.createElement('input');
	vlineHTML.vLabel15.appendChild(vlineHTML.vInput15)
	vlineHTML.vInput15.setAttribute('type', 'checkbox');
	vlineHTML.vLabel15.innerHTML += 'Guerre en dentelles'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-danger badge badge-pill mr-1 neutralPointer" id="idAboutPrefAncienRegimeLabel">
	vlineHTML.vLabel16 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel16)
	vlineHTML.vLabel16.setAttribute('id', 'idAboutPrefAncienRegimeLabel'+vActiveProfile)
	vlineHTML.vLabel16.setAttribute('class', 'btn btn-outline-danger badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Ancien-regime
	vlineHTML.vInput16 = window.document.createElement('input');
	vlineHTML.vLabel16.appendChild(vlineHTML.vInput16)
	vlineHTML.vInput16.setAttribute('type', 'checkbox');
	vlineHTML.vLabel16.innerHTML += 'Ancien-régime'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-warning badge badge-pill mr-1 neutralPointer" id="idAboutPrefRevolutionLabel">
	vlineHTML.vLabel17 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel17)
	vlineHTML.vLabel17.setAttribute('id', 'idAboutPrefRevolutionLabel'+vActiveProfile)
	vlineHTML.vLabel17.setAttribute('class', 'btn btn-outline-warning badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Révolution Française
	vlineHTML.vInput17 = window.document.createElement('input');
	vlineHTML.vLabel17.appendChild(vlineHTML.vInput17)
	vlineHTML.vInput17.setAttribute('type', 'checkbox');
	vlineHTML.vLabel17.innerHTML += 'Révolution Française'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-info badge badge-pill mr-1 neutralPointer" id="idAboutPref1erEmpireLabel">
	vlineHTML.vLabel18 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel18)
	vlineHTML.vLabel18.setAttribute('id', 'idAboutPref1erEmpireLabel'+vActiveProfile)
	vlineHTML.vLabel18.setAttribute('class', 'btn btn-outline-info badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">1er Empire
	vlineHTML.vInput18 = window.document.createElement('input');
	vlineHTML.vLabel18.appendChild(vlineHTML.vInput18)
	vlineHTML.vInput18.setAttribute('type', 'checkbox');
	vlineHTML.vLabel18.innerHTML += '1er Empire'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-primary badge badge-pill mr-1 neutralPointer" id="idAboutPref2ndEmpireLabel">
	vlineHTML.vLabel19 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel19)
	vlineHTML.vLabel19.setAttribute('id', 'idAboutPref2ndEmpireLabel'+vActiveProfile)
	vlineHTML.vLabel19.setAttribute('class', 'btn btn-outline-primary badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">2nd Empire
	vlineHTML.vInput19 = window.document.createElement('input');
	vlineHTML.vLabel19.appendChild(vlineHTML.vInput19)
	vlineHTML.vInput19.setAttribute('type', 'checkbox');
	vlineHTML.vLabel19.innerHTML += '2nd Empire'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-secondary badge badge-pill mr-1 neutralPointer" id="idAboutPrefSecessionLabel">
	vlineHTML.vLabel20 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel20)
	vlineHTML.vLabel20.setAttribute('id', 'idAboutPrefSecessionLabel'+vActiveProfile)
	vlineHTML.vLabel20.setAttribute('class', 'btn btn-outline-secondary badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Guerre de sécession
	vlineHTML.vInput20 = window.document.createElement('input');
	vlineHTML.vLabel20.appendChild(vlineHTML.vInput20)
	vlineHTML.vInput20.setAttribute('type', 'checkbox');
	vlineHTML.vLabel20.innerHTML += 'Guerre de sécession'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-dark badge badge-pill mr-1 neutralPointer" id="idAboutPrefFarWestLabel">
	vlineHTML.vLabel21 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel21)
	vlineHTML.vLabel21.setAttribute('id', 'idAboutPrefFarWestLabel'+vActiveProfile)
	vlineHTML.vLabel21.setAttribute('class', 'btn btn-outline-dark badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Far West
	vlineHTML.vInput21 = window.document.createElement('input');
	vlineHTML.vLabel21.appendChild(vlineHTML.vInput21)
	vlineHTML.vInput21.setAttribute('type', 'checkbox');
	vlineHTML.vLabel21.innerHTML += 'Far West'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-success badge badge-pill mr-1 neutralPointer" id="idAboutPrefWW1Label">
	vlineHTML.vLabel22 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel22)
	vlineHTML.vLabel22.setAttribute('id', 'idAboutPrefWW1Label'+vActiveProfile)
	vlineHTML.vLabel22.setAttribute('class', 'btn btn-outline-success badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">1ère Guerre Mondiale
	vlineHTML.vInput22 = window.document.createElement('input');
	vlineHTML.vLabel22.appendChild(vlineHTML.vInput22)
	vlineHTML.vInput22.setAttribute('type', 'checkbox');
	vlineHTML.vLabel22.innerHTML += '1ère Guerre Mondiale'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-danger badge badge-pill mr-1 neutralPointer" id="idAboutPrefWW2Label">
	vlineHTML.vLabel23 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel23)
	vlineHTML.vLabel23.setAttribute('id', 'idAboutPrefWW2Label'+vActiveProfile)
	vlineHTML.vLabel23.setAttribute('class', 'btn btn-outline-danger badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">2ème Guerre mondiale
	vlineHTML.vInput23 = window.document.createElement('input');
	vlineHTML.vLabel23.appendChild(vlineHTML.vInput23)
	vlineHTML.vInput23.setAttribute('type', 'checkbox');
	vlineHTML.vLabel23.innerHTML += '2ème Guerre mondiale'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-warning badge badge-pill mr-1 neutralPointer" id="idAboutPrefContemporainLabel">
	vlineHTML.vLabel24 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel24)
	vlineHTML.vLabel24.setAttribute('id', 'idAboutPrefContemporainLabel'+vActiveProfile)
	vlineHTML.vLabel24.setAttribute('class', 'btn btn-outline-warning badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Contemporain
	vlineHTML.vInput24 = window.document.createElement('input');
	vlineHTML.vLabel24.appendChild(vlineHTML.vInput24)
	vlineHTML.vInput24.setAttribute('type', 'checkbox');
	vlineHTML.vLabel24.innerHTML += 'Contemporain'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-info badge badge-pill mr-1 neutralPointer" id="idAboutPrefFuturisteLabel">
	vlineHTML.vLabel25 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel25)
	vlineHTML.vLabel25.setAttribute('id', 'idAboutPrefFuturisteLabel'+vActiveProfile)
	vlineHTML.vLabel25.setAttribute('class', 'btn btn-outline-info badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Futuriste
	vlineHTML.vInput25 = window.document.createElement('input');
	vlineHTML.vLabel25.appendChild(vlineHTML.vInput25)
	vlineHTML.vInput25.setAttribute('type', 'checkbox');
	vlineHTML.vLabel25.innerHTML += 'Futuriste'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-primary badge badge-pill mr-1 neutralPointer" id="idAboutPrefFantastiqueLabel">
	vlineHTML.vLabel26 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel26)
	vlineHTML.vLabel26.setAttribute('id', 'idAboutPrefFantastiqueLabel'+vActiveProfile)
	vlineHTML.vLabel26.setAttribute('class', 'btn btn-outline-primary badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Fantastique
	vlineHTML.vInput26 = window.document.createElement('input');
	vlineHTML.vLabel26.appendChild(vlineHTML.vInput26)
	vlineHTML.vInput26.setAttribute('type', 'checkbox');
	vlineHTML.vLabel26.innerHTML += 'Fantastique'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-secondary badge badge-pill mr-1 neutralPointer" id="idAboutPrefHFrancaiseLabel">
	vlineHTML.vLabel27 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel27)
	vlineHTML.vLabel27.setAttribute('id', 'idAboutPrefHFrancaiseLabel'+vActiveProfile)
	vlineHTML.vLabel27.setAttribute('class', 'btn btn-outline-secondary badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Histoire Française
	vlineHTML.vInput27 = window.document.createElement('input');
	vlineHTML.vLabel27.appendChild(vlineHTML.vInput27)
	vlineHTML.vInput27.setAttribute('type', 'checkbox');
	vlineHTML.vLabel27.innerHTML += 'Histoire Française'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-dark badge badge-pill mr-1 neutralPointer" id="idAboutPrefHAmericaineLabel">
	vlineHTML.vLabel28 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel28)
	vlineHTML.vLabel28.setAttribute('id', 'idAboutPrefHAmericaineLabel'+vActiveProfile)
	vlineHTML.vLabel28.setAttribute('class', 'btn btn-outline-dark badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Histoire Américaine
	vlineHTML.vInput28 = window.document.createElement('input');
	vlineHTML.vLabel28.appendChild(vlineHTML.vInput28)
	vlineHTML.vInput28.setAttribute('type', 'checkbox');
	vlineHTML.vLabel28.innerHTML += 'Histoire Américaine'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-success badge badge-pill mr-1 neutralPointer" id="idAboutPrefHInternationaleLabel">
	vlineHTML.vLabel29 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel29)
	vlineHTML.vLabel29.setAttribute('id', 'idAboutPrefHInternationaleLabel'+vActiveProfile)
	vlineHTML.vLabel29.setAttribute('class', 'btn btn-outline-success badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Histoire internationale
	vlineHTML.vInput29 = window.document.createElement('input');
	vlineHTML.vLabel29.appendChild(vlineHTML.vInput29)
	vlineHTML.vInput29.setAttribute('type', 'checkbox');
	vlineHTML.vLabel29.innerHTML += 'Histoire internationale'
	// ------------------------------------------------------------------------------ 
// 						<label class="btn btn-outline-danger badge badge-pill mr-1 neutralPointer" id="idAboutPrefAutreLabel">
	vlineHTML.vLabel30 = window.document.createElement('label')
	vlineHTML.vDivCol14.appendChild(vlineHTML.vLabel30)
	vlineHTML.vLabel30.setAttribute('id', 'idAboutPrefAutreLabel'+vActiveProfile)
	vlineHTML.vLabel30.setAttribute('class', 'btn btn-outline-danger badge badge-pill mr-1 neutralPointer')

// 							<input type="checkbox">Autre
	vlineHTML.vInput30 = window.document.createElement('input');
	vlineHTML.vLabel30.appendChild(vlineHTML.vInput30)
	vlineHTML.vInput30.setAttribute('type', 'checkbox');
	vlineHTML.vLabel30.innerHTML += 'Autre'
	// ------------------------------------------------------------------------------ 

	this.fillPresentationCard(this.memberClient.member);
}

// -----------------------------------------------------------------------------
// Cette fonction affiche le contenu de la carte "Présentation" sur la page de profil
// -----------------------------------------------------------------------------
PresentationCard.prototype.fillPresentationCard = function(pMember){
	document.getElementById('idAvatarToken'+vActiveProfile).setAttribute('src', 'static/images/members/'+pMember.etatCivil.photo);

// pProfileInfo.vAboutPrenom.innerHTML = this.memberClient.member.etatCivil.firstName
	document.getElementById('idAboutPrenom'+vActiveProfile).innerHTML = pMember.etatCivil.firstName
																																		? pMember.etatCivil.firstName
																																		: 'Non renseigné';

// pProfileInfo.vAboutNom.innerHTML = this.memberClient.member.etatCivil.name
	document.getElementById('idAboutNom'+vActiveProfile).innerHTML 	= pMember.etatCivil.name
																																	? pMember.etatCivil.name
																																	: 'Non renseigné';

// pProfileInfo.vAboutAge.innerHTML = this.memberClient.member.etatCivil.birthDate 
	document.getElementById('idAboutAge'+vActiveProfile).innerHTML 	= pMember.etatCivil.birthDate 
																																	? vToolBox.calculeAge(pMember.etatCivil.birthDate, false)
																																	: 'Non renseigné';

// pProfileInfo.vAboutVille.innerHTML = this.memberClient.member.etatCivil.address.city
	document.getElementById('idAboutVille'+vActiveProfile).innerHTML 	= pMember.etatCivil.address.city
																																		? pMember.etatCivil.address.city
																																		: 'Non renseigné'; 

// pProfileInfo.vAboutDepartmentName.innerHTML = this.memberClient.member.etatCivil.address.departmentName;
	document.getElementById('idAboutDepartmentName'+vActiveProfile).innerHTML = pMember.etatCivil.address.departmentName;

	this.activeButtonOfSelectedCheckBoxReadOnly('prefGravures','idAboutPrefGravuresLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefLivres','idAboutPrefLivresLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefFilms','idAboutPrefFilmsLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefJeux','idAboutPrefJeuxLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefMaquettes','idAboutPrefMaquettesLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefFigurines','idAboutPrefFigurinesLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefBlindes','idAboutPrefBlindesLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefAvions','idAboutPrefAvionsLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefBateaux','idAboutPrefBateauxLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefDioramas','idAboutPrefDioramasLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefPrehistoire','idAboutPrefPrehistoireLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefAntiquite','idAboutPrefAntiquiteLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefMoyenAge','idAboutPrefMoyenAgeLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefRenaissance','idAboutPrefRenaissanceLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefDentelles','idAboutPrefDentellesLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefAncienRegime','idAboutPrefAncienRegimeLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefRevolution','idAboutPrefRevolutionLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('pref1erEmpire','idAboutPref1erEmpireLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('pref2ndEmpire','idAboutPref2ndEmpireLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefSecession','idAboutPrefSecessionLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefFarWest','idAboutPrefFarWestLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefWW1','idAboutPrefWW1Label'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefWW2','idAboutPrefWW2Label'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefContemporain','idAboutPrefContemporainLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefFuturiste','idAboutPrefFuturisteLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefFantastique','idAboutPrefFantastiqueLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefHFrancaise','idAboutPrefHFrancaiseLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefHAmericaine','idAboutPrefHAmericaineLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefHInternationale','idAboutPrefHInternationaleLabel'+vActiveProfile, pMember);
	this.activeButtonOfSelectedCheckBoxReadOnly('prefAutre','idAboutPrefAutreLabel'+vActiveProfile, pMember);

	document.getElementById('idAboutPresentation'+vActiveProfile).value = pMember.presentation;
}

// -----------------------------------------------------------------------------
// Cette fonction simule le click des boutons de préférences a true pour refléter
// le statut et la couleur correspondante des badges colorés
// - Elle ajoute ou retire la classe "active" du label
// - Comme cette fonction est "Read-Only", on ne change pas le statut réel des check-box sous-jacents
// -----------------------------------------------------------------------------
PresentationCard.prototype.activeButtonOfSelectedCheckBoxReadOnly = function(pIndex, pPrefLabel, pMember){
	if (pMember.preferences[pIndex]){
		document.getElementById(pPrefLabel).classList.add('active')
	} else {
		document.getElementById(pPrefLabel).classList.remove('active')
	}
}

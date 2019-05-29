// ************************************************************************
// ***      PresentationCard  : Affichage de la "Carte de présentation" ***
// ***                                                                  ***
// *** Objet : PresentationCard                                         ***
// ***                                                                  ***
// *** Cet objet sert la carte de présentation des données résumées     ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function PresentationCard (pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						
// -----------------------------------------------------------------------------
// Cette fonction affiche le contenu de la carte "Présentation" sur la page de profil
// -----------------------------------------------------------------------------
PresentationCard.prototype.displayPresentationCard = function(pProfileInfo){
	
	pProfileInfo.vAboutPrenom.innerHTML = this.memberClient.member.etatCivil.firstName
																			? this.memberClient.member.etatCivil.firstName
																			: 'Non renseigné';

	pProfileInfo.vAboutNom.innerHTML = this.memberClient.member.etatCivil.name
																		? this.memberClient.member.etatCivil.name
																		: 'Non renseigné';

	pProfileInfo.vAboutAge.innerHTML = this.memberClient.member.etatCivil.birthDate 
																		? vToolBox.calculeAge(this.memberClient.member.etatCivil.birthDate, false)
																		: 'Non renseigné';

	pProfileInfo.vAboutVille.innerHTML = this.memberClient.member.etatCivil.address.city
																			? this.memberClient.member.etatCivil.address.city
																			: 'Non renseigné'; 
	
	pProfileInfo.vAboutDepartmentName.innerHTML = this.memberClient.member.etatCivil.address.departmentName;

	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefGravures','idAboutPrefGravuresLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefLivres','idAboutPrefLivresLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefFilms','idAboutPrefFilmsLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefJeux','idAboutPrefJeuxLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefMaquettes','idAboutPrefMaquettesLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefFigurines','idAboutPrefFigurinesLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefBlindes','idAboutPrefBlindesLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefAvions','idAboutPrefAvionsLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefBateaux','idAboutPrefBateauxLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefDioramas','idAboutPrefDioramasLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefPrehistoire','idAboutPrefPrehistoireLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefAntiquite','idAboutPrefAntiquiteLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefMoyenAge','idAboutPrefMoyenAgeLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefRenaissance','idAboutPrefRenaissanceLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefDentelles','idAboutPrefDentellesLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefAncienRegime','idAboutPrefAncienRegimeLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefRevolution','idAboutPrefRevolutionLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('pref1erEmpire','idAboutPref1erEmpireLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('pref2ndEmpire','idAboutPref2ndEmpireLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefSecession','idAboutPrefSecessionLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefFarWest','idAboutPrefFarWestLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefWW1','idAboutPrefWW1Label');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefWW2','idAboutPrefWW2Label');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefContemporain','idAboutPrefContemporainLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefFuturiste','idAboutPrefFuturisteLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefFantastique','idAboutPrefFantastiqueLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefHFrancaise','idAboutPrefHFrancaiseLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefHAmericaine','idAboutPrefHAmericaineLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefHInternationale','idAboutPrefHInternationaleLabel');
	vAccountModal.activeButtonOfSelectedCheckBoxReadOnly('prefAutre','idAboutPrefAutreLabel');

	pProfileInfo.vAboutPresentation.value = this.memberClient.member.presentation;
}

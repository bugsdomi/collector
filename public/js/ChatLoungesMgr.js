// ************************************************************************
// ***      ChatLoungesMgr : Objet gérant les salons deC hat      			***
// ***                                                                  ***
// *** Objet : ChatLoungesMgr                                      			***
// ***                                                                  ***
// *** Cet objet  :                                                     ***
// ***   - Invite des amis connectés à discuterdans des salons          ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function ChatLoungesMgr(pMemberClient){   						// Fonction constructeur exportée
	this.memberClient = pMemberClient;

	this.vLoungeMenuLine = [];
};

// *****************************************************************************
// 											Gestion des recommandations
// *****************************************************************************


// --------------------------------------------------------------
// Ligne de menu pour inviter un ami a Tchatter
// --------------------------------------------------------------
ChatLoungesMgr.prototype.displayHeaderChatLounge= function(pFriend, pDivContain){
	var vLineHTML = {};					

	vLineHTML.vHdrChatFriend = window.document.createElement('a');
	pDivContain.appendChild(vLineHTML.vHdrChatFriend);
	vLineHTML.vHdrChatFriend.setAttribute('href', '#');
	vLineHTML.vHdrChatFriend.setAttribute('class', 'container list-group-item m-0 py-0');

	vLineHTML.vHdrDivRowChatFriend = window.document.createElement('div');
	vLineHTML.vHdrChatFriend.appendChild(vLineHTML.vHdrDivRowChatFriend);
	vLineHTML.vHdrDivRowChatFriend.setAttribute('id', 'idHdrDivRowChatFriend'+pFriend.indexFriendToRecommend);
	vLineHTML.vHdrDivRowChatFriend.setAttribute('class', 'row bg-success text-light');
	vLineHTML.vHdrDivRowChatFriend.setAttribute('style', 'cursor: default;');

	vLineHTML.vHdrDivAvatarChatFriend = window.document.createElement('div');
	vLineHTML.vHdrDivRowChatFriend.appendChild(vLineHTML.vHdrDivAvatarChatFriend);
	vLineHTML.vHdrDivAvatarChatFriend.setAttribute('class', 'col-2 containerAvatarToken p-0 text-center withNoScaling');
	
	vLineHTML.vHdrImgChatFriend = window.document.createElement('img');
	vLineHTML.vHdrDivAvatarChatFriend.appendChild(vLineHTML.vHdrImgChatFriend);
	vLineHTML.vHdrImgChatFriend.setAttribute('class', 'avatarToken tokenSize32 m-1');
	vLineHTML.vHdrImgChatFriend.setAttribute('alt', 'Membre');
	vLineHTML.vHdrImgChatFriend.setAttribute('src', 'static/images/members/'+pFriend.friendPhoto);
	
	vLineHTML.vHdrDivChatFriend = window.document.createElement('div');
	vLineHTML.vHdrDivRowChatFriend.appendChild(vLineHTML.vHdrDivChatFriend);
	vLineHTML.vHdrDivChatFriend.setAttribute('id', 'idHdrDivChatFriend'+pFriend.indexFriendToRecommend);
	vLineHTML.vHdrDivChatFriend.setAttribute('class', 'col-7 align-self-center px-0');
	vLineHTML.vHdrDivChatFriend.setAttribute('style', 'font-size: 0.9rem; font-weight:bold;');
	vLineHTML.vHdrDivChatFriend.innerHTML = ' Inviter '+pFriend.friendPseudo+' à discuter :';

	vLineHTML.vHdrDivBtnChatFriend = window.document.createElement('div');
	vLineHTML.vHdrDivRowChatFriend.appendChild(vLineHTML.vHdrDivBtnChatFriend);
	vLineHTML.vHdrDivBtnChatFriend.setAttribute('class', 'col-3 text-center align-self-center px-0');
}

// -----------------------------------------------------------------------------
// Cette méthode affiche la ligne permettant de créer un salon de Chat 
// -----------------------------------------------------------------------------
ChatLoungesMgr.prototype.menuCreateNewLounge = function(pFriend, pDivContain){
	var vLineHTML = {};		
	
	vLineHTML.vA = window.document.createElement('a');
	pDivContain.appendChild(vLineHTML.vA);
	vLineHTML.vA.setAttribute('href', '#');
	vLineHTML.vA.setAttribute('class', 'container zonedLines border list-group-item list-group-item-action list-group-item-white');

	vLineHTML.vDivRow = window.document.createElement('div');
	vLineHTML.vA.appendChild(vLineHTML.vDivRow);
	vLineHTML.vDivRow.setAttribute('class', 'row');
	vLineHTML.vDivRow.setAttribute('style', 'cursor: default;');

	vLineHTML.vDivAvatar = window.document.createElement('div');
	vLineHTML.vDivRow.appendChild(vLineHTML.vDivAvatar);
	vLineHTML.vDivAvatar.setAttribute('class', 'col-3 containerAvatarToken p-0 text-center withNoScaling');
		
	vLineHTML.vImg = window.document.createElement('img');
	vLineHTML.vDivAvatar.appendChild(vLineHTML.vImg);
	vLineHTML.vImg.setAttribute('class', 'avatarToken tokenSize32 m-1');
	vLineHTML.vImg.setAttribute('alt', 'Salon de Chat');
	vLineHTML.vImg.setAttribute('src', 'static/images/depositphotos_23804081-stock-illustration-green-glossy-web-button-with.jpg');

	vLineHTML.vDivPseudo = window.document.createElement('div');
	vLineHTML.vDivRow.appendChild(vLineHTML.vDivPseudo);
	vLineHTML.vDivPseudo.setAttribute('class', 'col-6 align-self-center px-0');
	vLineHTML.vDivPseudo.setAttribute('style', 'font-size: 0.8rem;');
	vLineHTML.vDivPseudo.innerHTML = 'dans un nouveau salon de discussion...';

	vLineHTML.vDivFA = window.document.createElement('div');
	vLineHTML.vDivRow.appendChild(vLineHTML.vDivFA);
	vLineHTML.vDivFA.setAttribute('class', 'col-3 text-center align-self-center px-0');

	vLineHTML.vBtnCreateNewLounge = window.document.createElement('button');
	vLineHTML.vDivFA.appendChild(vLineHTML.vBtnCreateNewLounge);
	vLineHTML.vBtnCreateNewLounge.setAttribute('type', 'button');
	vLineHTML.vBtnCreateNewLounge.setAttribute('class', 'btn btn-outline-success btn-sm');

	vLineHTML.vIFACreateNewLounge = window.document.createElement('i');
	vLineHTML.vBtnCreateNewLounge.appendChild(vLineHTML.vIFACreateNewLounge);
	vLineHTML.vIFACreateNewLounge.setAttribute('id', 'idIFAMenuLounge');
	vLineHTML.vIFACreateNewLounge.setAttribute('class', 'fa fa-th-large text-dark');

	var vDataToTransmit = {
		dataToTransmit	: vLineHTML,
		actionBtn				: vLineHTML.vIFACreateNewLounge.id,
		pFriend					: pFriend, 
	}

	vLineHTML.vBtnCreateNewLounge.addEventListener('click', vChatLoungesMgr.createNewChatLounge.bind(this),false);
	vLineHTML.vBtnCreateNewLounge.datas = vDataToTransmit;
	vLineHTML.vIFACreateNewLounge.datas = vDataToTransmit;

	vLineHTML.vBtnCreateNewLounge.addEventListener('mouseover', vMemberClient.changeBtnTxtColOver.bind(this),false);
	vLineHTML.vBtnCreateNewLounge.datas = vDataToTransmit;

	vLineHTML.vBtnCreateNewLounge.addEventListener('mouseout', vMemberClient.changeBtnTxtColOut.bind(this),false);
	vLineHTML.vBtnCreateNewLounge.datas = vDataToTransmit;
}

// --------------------------------------------------------------
// Cette fonction crée les lignes montrant les salons déjà créés
// --------------------------------------------------------------
function AddLoungesLines(pItem, pIndex, pDivContain, pFriend) {
	var vLineHTML = {};					
	
	vLineHTML.vA = window.document.createElement('a');
	if (!pDivContain){
		var vHdrRecoFriend = document.getElementById('idHdrAnchorRecoFriend'+pFriend.indexFriendToRecommend);
		var parentDiv1 = vHdrRecoFriend.parentNode;
		parentDiv1.insertBefore(vLineHTML.vA, vHdrRecoFriend);
	} else {
		pDivContain.appendChild(vLineHTML.vA);
	}
	vLineHTML.vA.setAttribute('id', 'idLoungeLineAnchor'+pIndex);
	vLineHTML.vA.setAttribute('href', '#');
	vLineHTML.vA.setAttribute('class', 'container zonedLines border list-group-item list-group-item-action list-group-item-white');

	vLineHTML.vDivRow = window.document.createElement('div');
	vLineHTML.vA.appendChild(vLineHTML.vDivRow);
	vLineHTML.vDivRow.setAttribute('class', 'row');
	vLineHTML.vDivRow.setAttribute('style', 'cursor: default;');

	vLineHTML.vDivAvatar = window.document.createElement('div');
	vLineHTML.vDivRow.appendChild(vLineHTML.vDivAvatar);
	vLineHTML.vDivAvatar.setAttribute('class', 'col-3 containerAvatarToken p-0 text-center withNoScaling');

	vLineHTML.vImg = window.document.createElement('img');
	vLineHTML.vDivAvatar.appendChild(vLineHTML.vImg);
	vLineHTML.vImg.setAttribute('id', 'idLoungeImg'+pIndex);
	vLineHTML.vImg.setAttribute('class', 'avatarToken tokenSize32 m-1');
	vLineHTML.vImg.setAttribute('alt', 'Salon de discussion');
	vLineHTML.vImg.setAttribute('src', 'static/images/depositphotos_23860217-stock-illustration-satin-sticker-chat-room-icon.jpg');

	vLineHTML.vDivPseudo = window.document.createElement('div');
	vLineHTML.vDivRow.appendChild(vLineHTML.vDivPseudo);
	vLineHTML.vDivPseudo.setAttribute('class', 'col-6 align-self-center px-0');
	vLineHTML.vDivPseudo.setAttribute('style', 'font-size: 0.8rem;');
	vLineHTML.vDivPseudo.innerHTML = 'dans le salon de discussion N° ' + pItem.vLoungeNumber;

	vLineHTML.vDivFA = window.document.createElement('div');
	vLineHTML.vDivRow.appendChild(vLineHTML.vDivFA);
	vLineHTML.vDivFA.setAttribute('class', 'col-3 text-center align-self-center px-0');

	vLineHTML.vBtnOpenChatLounge = window.document.createElement('button');
	vLineHTML.vDivFA.appendChild(vLineHTML.vBtnOpenChatLounge);
	vLineHTML.vBtnOpenChatLounge.setAttribute('type', 'button');
	vLineHTML.vBtnOpenChatLounge.setAttribute('class', 'btn btn-outline-success btn-sm');

	vLineHTML.vIFAOpenChatLounge = window.document.createElement('i');
	vLineHTML.vBtnOpenChatLounge.appendChild(vLineHTML.vIFAOpenChatLounge);
	vLineHTML.vIFAOpenChatLounge.setAttribute('id', 'idIFALounge'+pIndex);
	vLineHTML.vIFAOpenChatLounge.setAttribute('class', 'fa fa-users text-dark');

	var vDataToTransmit = {
		actionBtn	: vLineHTML.vIFAOpenChatLounge.id,
	}

	vLineHTML.vBtnOpenChatLounge.addEventListener('click', this.openChatLounge,false);
	vLineHTML.vBtnOpenChatLounge.datas = vDataToTransmit;
	vLineHTML.vIFAOpenChatLounge.datas = vDataToTransmit;

	vLineHTML.vBtnOpenChatLounge.addEventListener('mouseover', vMemberClient.changeBtnTxtColOver.bind(this),false);
	vLineHTML.vBtnOpenChatLounge.datas = vDataToTransmit;

	vLineHTML.vBtnOpenChatLounge.addEventListener('mouseout', vMemberClient.changeBtnTxtColOut.bind(this),false);
	vLineHTML.vBtnOpenChatLounge.datas = vDataToTransmit;

	return pItem;
}

// -----------------------------------------------------------------------------
//                      Création de la Carte "Lounge"                             
// -----------------------------------------------------------------------------
ChatLoungesMgr.prototype.displayLoungeCard = function(pFriend){
	var vLineHTML = {};						
	var vDivMountPointProfile = document.getElementById('idDivMountPointMainProfile');
	// ------------------------------------------------------------------------------ 
	//                               Carte "Lounge"                             
	// ------------------------------------------------------------------------------ 

	//* <div class="card border-warning mb-4">
	vLineHTML.vDivCardBorder = window.document.createElement('div');
	vDivMountPointProfile.appendChild(vLineHTML.vDivCardBorder);
	vLineHTML.vDivCardBorder.setAttribute('class', 'card border-warning mb-4');

	// ------------------------------------------------------------------------------ 
	//                       Entête de la carte "Lounge"                         
	// ------------------------------------------------------------------------------ 
	// 	<div class="card-header bg-warning border-bottom border-warning">
	vLineHTML.vDivCardHeader = window.document.createElement('div');
	vLineHTML.vDivCardBorder.appendChild(vLineHTML.vDivCardHeader);
	vLineHTML.vDivCardHeader.setAttribute('class', 'card-header bg-warning border-bottom border-warning py-0 pb-1');

	// 			<img id="idAvatarToken" class="avatarToken tokenSize50 ml-0" alt="Avatar" src="">
	vLineHTML.vImgAvatToken = window.document.createElement('img');
	vLineHTML.vDivCardHeader.appendChild(vLineHTML.vImgAvatToken);
	vLineHTML.vImgAvatToken.setAttribute('class', 'avatarToken tokenSize50 ml-0');
	vLineHTML.vImgAvatToken.setAttribute('alt', 'Avatar');
	vLineHTML.vImgAvatToken.setAttribute('src', 'static/images/members/'+this.memberClient.member.etatCivil.photo);

// 		<h5 class="card-title">Présentation</h5>
	vLineHTML.vH5 = window.document.createElement('h5');
	vLineHTML.vDivCardHeader.appendChild(vLineHTML.vH5);
	vLineHTML.vH5.setAttribute('class', 'card-title');
	vLineHTML.vH5.innerHTML='Salon de discussion N°'+ this.vLoungeMenuLine.length;

	// ------------------------------------------------------------------------------ 
	//                       Corps de la carte "Lounge"                          
	// ------------------------------------------------------------------------------ 

	// 	<div class="card-body" style="border: 1px black solid;">
	vLineHTML.vDivCardBody = window.document.createElement('div');
	vLineHTML.vDivCardBorder.appendChild(vLineHTML.vDivCardBody);
	vLineHTML.vDivCardBody.setAttribute('class', 'card-body py-0 px-3');
	vLineHTML.vDivCardBody.setAttribute('style', 'border: 1px black solid;');
	
	// ------------------------------------------------------------------------------ 
	//                       Zone de texte du Tchat                        
	// ------------------------------------------------------------------------------ 

// 				<div class="row">
	vLineHTML.vDivRow6 = window.document.createElement('div');
	vLineHTML.vDivCardBody.appendChild(vLineHTML.vDivRow6);
	vLineHTML.vDivRow6.setAttribute('class', 'row');

// 					<div class="col-sm-12 text-dark mb-2">Présentation</div>
	vLineHTML.vDivCol11 = window.document.createElement('div');
	vLineHTML.vDivRow6.appendChild(vLineHTML.vDivCol11);
	vLineHTML.vDivCol11.setAttribute('class', 'col-sm-12 text-dark my-0');
// vLineHTML.vDivCol11.innerHTML='Présentation';

// 					<textarea class="col-sm-12 presentationCard font-weight-bold" rows="2"  id="idAboutPresentation" disabled></textarea>
	vLineHTML.vTextAreaChatArea = window.document.createElement('textarea');
	vLineHTML.vDivRow6.appendChild(vLineHTML.vTextAreaChatArea);
	vLineHTML.vTextAreaChatArea.setAttribute('id', 'idChatArea'+ this.vLoungeMenuLine.length);
// vLineHTML.vTextAreaChatArea.setAttribute('class', 'col-sm-12 presentationCard font-weight-bold border-0');
	vLineHTML.vTextAreaChatArea.setAttribute('class', 'col-sm-12 presentationCard border-0');
	vLineHTML.vTextAreaChatArea.setAttribute('rows', '8');
	vLineHTML.vTextAreaChatArea.setAttribute('disabled', '');
	vLineHTML.vTextAreaChatArea.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none;');
	vLineHTML.vTextAreaChatArea.value = 'En attente de ' + pFriend.friendPseudo +'...\n' ;

	// ------------------------------------------------------------------------------ 
	//                       Footer de la carte                    
	// ------------------------------------------------------------------------------ 

	// Card-Footer
	vLineHTML.vDivFooterChatEdit = window.document.createElement('div');
	vLineHTML.vDivCardBorder.appendChild(vLineHTML.vDivFooterChatEdit);
	vLineHTML.vDivFooterChatEdit.setAttribute('class', 'card-footer border border-top-0 p-1 bg-warning');
	
	// C Ligne des champs de saisie "Ajout de commentaire L1" 
	vLineHTML.vDivContaddChatMsg = window.document.createElement('div');
	vLineHTML.vDivFooterChatEdit.appendChild(vLineHTML.vDivContaddChatMsg);
	vLineHTML.vDivContaddChatMsg.setAttribute('class', 'container pr-0');
	
	vLineHTML.vDivRow3Chat = window.document.createElement('div');
	vLineHTML.vDivContaddChatMsg.appendChild(vLineHTML.vDivRow3Chat);
	vLineHTML.vDivRow3Chat.setAttribute('class', 'row');

	vLineHTML.vTextAreaChatEdit = window.document.createElement('textarea');
	vLineHTML.vDivRow3Chat.appendChild(vLineHTML.vTextAreaChatEdit);
	vLineHTML.vTextAreaChatEdit.setAttribute('id', 'idTextAreaChatEdit'+ this.vLoungeMenuLine.length);
	vLineHTML.vTextAreaChatEdit.setAttribute('placeholder', 'Ecrire un message...');
	vLineHTML.vTextAreaChatEdit.setAttribute('class', 'form-control mt-1 ml-0 mr-3 px-1 border textAreaAutoResizable');
	vLineHTML.vTextAreaChatEdit.setAttribute('name', 'textAreaChatEdit'+ this.vLoungeMenuLine.length);
	vLineHTML.vTextAreaChatEdit.setAttribute('rows', '1');
	vLineHTML.vTextAreaChatEdit.setAttribute('style', 'box-shadow: none; resize: none;');

	// Groupe d'éléments pour la création de commentaires L1 (Bouton "Clear" + Bouton "Validation")
	vLineHTML.vClearChatEdit = window.document.createElement('div');
	vLineHTML.vDivFooterChatEdit.appendChild(vLineHTML.vClearChatEdit);
	vLineHTML.vClearChatEdit.setAttribute('class', 'row justify-content-between mt-1 mx-0 px-0');

	// Bouton "Clear L1"
	vLineHTML.vBtnClearChatEdit = window.document.createElement('button');
	vLineHTML.vClearChatEdit.appendChild(vLineHTML.vBtnClearChatEdit);
	vLineHTML.vBtnClearChatEdit.setAttribute('id', 'idBtnClearChatEdit'+ this.vLoungeMenuLine.length);
	vLineHTML.vBtnClearChatEdit.setAttribute('class', 'btn btn-sm border pushBtnFilters ml-3');

	vLineHTML.vIIconClearChatEdit = window.document.createElement('i');
	vLineHTML.vBtnClearChatEdit.appendChild(vLineHTML.vIIconClearChatEdit);
	vLineHTML.vIIconClearChatEdit.setAttribute('id', 'idIIconClearChatEdit'+ this.vLoungeMenuLine.length);
	vLineHTML.vIIconClearChatEdit.setAttribute('class', 'fa fa-fw fa-times');

	// Bouton "Validation L1" du chat
	vLineHTML.vBtnValidChatMsg = window.document.createElement('button');
	vLineHTML.vClearChatEdit.appendChild(vLineHTML.vBtnValidChatMsg);
	vLineHTML.vBtnValidChatMsg.setAttribute('id', 'idBtnAddChatMsg'+ this.vLoungeMenuLine.length);
	vLineHTML.vBtnValidChatMsg.setAttribute('class', 'btn btn-sm border pushBtnFilters mr-3');

	vLineHTML.vIIconAddChatMsg = window.document.createElement('i');
	vLineHTML.vBtnValidChatMsg.appendChild(vLineHTML.vIIconAddChatMsg);
	vLineHTML.vIIconAddChatMsg.setAttribute('id', 'idIIconAddChatMsg'+ this.vLoungeMenuLine.length);
	vLineHTML.vIIconAddChatMsg.setAttribute('class', 'fa fa-fw fa-check');

	vLineHTML.vBtnClearChatEdit.addEventListener('click', this.clearChatEdit.bind(this),false);
	vLineHTML.vBtnClearChatEdit.datas = vLineHTML;
	vLineHTML.vIIconClearChatEdit.datas = vLineHTML;	

	vLineHTML.vBtnValidChatMsg.addEventListener('click', this.publishChatMsg.bind(this),false);
	vLineHTML.vBtnValidChatMsg.datas = vLineHTML;
	vLineHTML.vIIconAddChatMsg.datas = vLineHTML;
	
	// Permet d'auto-resizer à la volée les champs "textarea" ayant le selecteur CSS "textAreaAutoResizable", 
	document.addEventListener('input', (event) => {
		if ((event.target.tagName.toLowerCase() === 'textarea') && 
				(event.target.className.indexOf('textAreaAutoResizable') > -1)){
			vToolBox.autoExpand(event.target);
		}
	}, false);
}

// --------------------------------------------------------------
// Publication d'un message sur le salon
// --------------------------------------------------------------
ChatLoungesMgr.prototype.publishChatMsg = function(event){
	if(event.target.datas.vTextAreaChatEdit.value){
		event.target.datas.vTextAreaChatArea.value +=  event.target.datas.vTextAreaChatEdit.value + '\n';
		vToolBox.autoResizeElem(event.target.datas.vTextAreaChatArea.id);						// Redimensionnement automatique (mais limité) du champs
		event.target.datas.vTextAreaChatEdit.value = '';
		$(event.target.datas.vTextAreaChatEdit).focus();
	}
};

// -----------------------------------------------------------------------------
// Cette méthode efface le champ de saisie du nouveau message
// -----------------------------------------------------------------------------
ChatLoungesMgr.prototype.clearChatEdit = function(event){
	event.target.datas.vTextAreaChatEdit.value = '';
	$(event.target.datas.vTextAreaChatEdit).focus();
}

// -----------------------------------------------------------------------------
// Cette fonction permet de créer un nouveau salon, de l'afficher, et de 
// l'affecter à mon invité
// -----------------------------------------------------------------------------
ChatLoungesMgr.prototype.createNewChatLounge = function(event){
	// Suppression des Listeners
	event.target.datas.dataToTransmit.vBtnCreateNewLounge.removeEventListener('click', this.createNewChatLounge,false);
	event.target.datas.dataToTransmit.vBtnCreateNewLounge.removeEventListener('mouseover', this.memberClient.changeBtnTxtColOver,false);
	event.target.datas.dataToTransmit.vBtnCreateNewLounge.removeEventListener('mouseout', this.memberClient.changeBtnTxtColOut,false);

	var vFriend 			= event.target.datas.pFriend;
	var vLoungeLocal 	=  
	{
		vLoungeNumber : (this.memberClient.vMyLounges.length)	+ 1,
		vLoungeOwner	: this.memberClient.member.pseudo,								// Pseudo du membre qui a créé le salon
		vInvited			: 
		[
			// {
			// myPseudo			: this.memberClient.member.pseudo,
			// myStatus			: cstWaiting, 
			// friendPseudo	: vfriendPseudo,
			// friendStatus	: cstJoin,
			// }
		],
	};

	vLoungeLocal.vInvited.push
	(
		{	myPseudo			: this.memberClient.member.pseudo,
			myStatus			: cstWaiting, 
			friendPseudo	: vFriend.friendPseudo,
			friendStatus	: cstJoin
		}
	);

	this.vLoungeMenuLine.push(new AddLoungesLines(vLoungeLocal, this.memberClient.vMyLounges.length, null, vFriend));
	this.memberClient.vMyLounges.push(vLoungeLocal);			// Ajout du nouveau salon dans ma liste de salons
	this.openChatLounge(event);

	this.sendInvitToChat(vLoungeLocal);

	toastr.options = {
		"closeButton": false,
		"debug": false,
		"newestOnTop": false,
		"progressBar": false,
		"positionClass": "toast-top-right",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": 1000,
		"hideDuration": 1000,
		"timeOut": 5000,
		"extendedTimeOut": 2500,
		"showEasing": "swing",
		"hideEasing": "swing",
		"showMethod": "show",
		"hideMethod": "slideUp"
	}
	
	toastr['success']('Invitation envoyée avec succès', 'Invitation envoyée à '+vLoungeLocal.vInvited[0].friendPseudo);
}

// -----------------------------------------------------------------------------
// Cette fonction affiche une ligne par salon de Chat déja créé ainsi qu'une 
// ligne permetttant de créer un nouveau salon
// -----------------------------------------------------------------------------
ChatLoungesMgr.prototype.displayLoungesLines = function(pFriend, pDivContain){
	var vLoungeMenuLine = [];
	vMemberClient.vMyLounges.forEach((item, index) => {
		vLoungeMenuLine.push(new AddLoungesLines(item, index, pDivContain, pFriend));
	});
	this.vLoungeMenuLine = vLoungeMenuLine;
};

// --------------------------------------------------------------
// Ouverture physique d'un salon de discussion
// Fermeture du DropDownMenu
// --------------------------------------------------------------
ChatLoungesMgr.prototype.openChatLounge = function(event){
	var vFriend = event.target.datas.pFriend;
	$("#idMyFriendLi" + cstMainProfileActive + vFriend.indexFriendToRecommend).dropdown('toggle'); // ferme le DropDown Menu

	vChatLoungesMgr.displayLoungeCard(vFriend);
}

// --------------------------------------------------------------
// Ennvoie l'invitation pour participer au Tchat
// --------------------------------------------------------------
ChatLoungesMgr.prototype.sendInvitToChat = function(pInvit){
	webSocketConnection.emit('invitToChat', pInvit); 
} 

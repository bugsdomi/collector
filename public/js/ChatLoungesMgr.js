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

	vLineHTML.vBtnCreateNewLounge.addEventListener('click', this.createNewChatLounge.bind(this),false);
	vLineHTML.vBtnCreateNewLounge.datas = vDataToTransmit;
	vLineHTML.vIFACreateNewLounge.datas = vDataToTransmit;

	vLineHTML.vBtnCreateNewLounge.addEventListener('mouseover', vMemberClient.changeBtnTxtColOver.bind(this),false);
	vLineHTML.vBtnCreateNewLounge.datas = vDataToTransmit;

	vLineHTML.vBtnCreateNewLounge.addEventListener('mouseout', vMemberClient.changeBtnTxtColOut.bind(this),false);
	vLineHTML.vBtnCreateNewLounge.datas = vDataToTransmit;
}

// --------------------------------------------------------------
// Cette fonction crée les lignes de mennu montrant les salons déjà créés
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
ChatLoungesMgr.prototype.displayLoungeCard = function(pWhichRole, pInvitChat){
	var vLineHTML = {};						
	var vRoomSuffix = '-Room-' + pInvitChat.vLoungeOwner + '-' + pInvitChat.vLoungeNumber
	var vDivMountPointProfile = document.getElementById('idDivMountPointMainProfile');

	vLineHTML.vDivCardBorder = window.document.createElement('div');
	vDivMountPointProfile.appendChild(vLineHTML.vDivCardBorder);
	vLineHTML.vDivCardBorder.setAttribute('class', 'card border-warning mb-4');

	// ------------------------------------------------------------------------------ 
	//                       Entête de la carte "Lounge"                         
	// ------------------------------------------------------------------------------ 
	vLineHTML.vDivCardHeader = window.document.createElement('div');
	vLineHTML.vDivCardBorder.appendChild(vLineHTML.vDivCardHeader);
	vLineHTML.vDivCardHeader.setAttribute('class', 'card-header bg-warning border-bottom border-warning py-0 pb-1');

	vLineHTML.vDivCardHeaderContainer = window.document.createElement('div');
	vLineHTML.vDivCardHeader.appendChild(vLineHTML.vDivCardHeaderContainer);
	vLineHTML.vDivCardHeaderContainer.setAttribute('class', 'container');

	vLineHTML.vDivCardHeaderRow = window.document.createElement('div');
	vLineHTML.vDivCardHeaderContainer.appendChild(vLineHTML.vDivCardHeaderRow);
	vLineHTML.vDivCardHeaderRow.setAttribute('class', 'row');

	vLineHTML.vImgAvatToken = window.document.createElement('img');
	vLineHTML.vDivCardHeaderRow.appendChild(vLineHTML.vImgAvatToken);
	vLineHTML.vImgAvatToken.setAttribute('class', 'avatarToken tokenSize50 ml-0');
	vLineHTML.vImgAvatToken.setAttribute('alt', 'Avatar');
	vLineHTML.vImgAvatToken.setAttribute('src', 'static/images/members/'+pInvitChat.vInvited[pInvitChat.vInvited.length-1].myPhoto);
	vLineHTML.vImgAvatToken.setAttribute('data-toggle', 'tooltip');
	vLineHTML.vImgAvatToken.setAttribute('data-placement', 'top');
	vLineHTML.vImgAvatToken.setAttribute('data-title', pInvitChat.vInvited[pInvitChat.vInvited.length-1].myPseudo);

	vLineHTML.vH5 = window.document.createElement('h5');
	vLineHTML.vDivCardHeaderRow.appendChild(vLineHTML.vH5);
	vLineHTML.vH5.setAttribute('class', 'card-title align-self-center mb-0');
	vLineHTML.vH5.innerHTML='Salon de discussion N°'+pInvitChat.vLoungeNumber;

	vLineHTML.vDivCardHeaderRowAvatar = window.document.createElement('div');
	vLineHTML.vDivCardHeaderContainer.appendChild(vLineHTML.vDivCardHeaderRowAvatar);
	vLineHTML.vDivCardHeaderRowAvatar.setAttribute('id', 'idDivCardHeaderRowAvatar' + vRoomSuffix);
	vLineHTML.vDivCardHeaderRowAvatar.setAttribute('class', 'row bg-white border border-dark rounded mt-1 visible');
	
	// ------------------------------------------------------------------------------ 
	//                       Corps de la carte "Lounge"                          
	// ------------------------------------------------------------------------------ 
	vLineHTML.vDivCardBody = window.document.createElement('div');
	vLineHTML.vDivCardBorder.appendChild(vLineHTML.vDivCardBody);
	vLineHTML.vDivCardBody.setAttribute('class', 'card-body py-0 px-3');
	vLineHTML.vDivCardBody.setAttribute('style', 'border: 1px black solid;');
	
	// ------------------------------------------------------------------------------ 
	//                       Zone de texte du Tchat                        
	// ------------------------------------------------------------------------------ 
	vLineHTML.vDivRow6 = window.document.createElement('div');
	vLineHTML.vDivCardBody.appendChild(vLineHTML.vDivRow6);
	vLineHTML.vDivRow6.setAttribute('class', 'row');

	vLineHTML.vDivCol11 = window.document.createElement('div');
	vLineHTML.vDivRow6.appendChild(vLineHTML.vDivCol11);
	vLineHTML.vDivCol11.setAttribute('class', 'col-sm-12 text-dark my-0');

	vLineHTML.vTextAreaChat = window.document.createElement('textarea');
	vLineHTML.vDivRow6.appendChild(vLineHTML.vTextAreaChat);
	vLineHTML.vTextAreaChat.setAttribute('id', 'idChatArea'+ vRoomSuffix);
	vLineHTML.vTextAreaChat.setAttribute('class', 'col-sm-12 presentationCard border-0 textAreaAutoResizable');
	vLineHTML.vTextAreaChat.setAttribute('rows', '8');
	vLineHTML.vTextAreaChat.setAttribute('disabled', '');
	vLineHTML.vTextAreaChat.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none;');

	if(pWhichRole ===  cstChatInviteur){
		vLineHTML.vTextAreaChat.value = 'En attente de ' + pInvitChat.vInvited[pInvitChat.vInvited.length-1].friendPseudo +'...\n' ;
	}	

	// ------------------------------------------------------------------------------ 
	//                       Footer de la carte                    
	// ------------------------------------------------------------------------------ 
	vLineHTML.vDivFooterChatEdit = window.document.createElement('div');
	vLineHTML.vDivCardBorder.appendChild(vLineHTML.vDivFooterChatEdit);
	vLineHTML.vDivFooterChatEdit.setAttribute('class', 'card-footer border border-top-0 p-1 bg-warning');
	
	vLineHTML.vDivContaddChatMsg = window.document.createElement('div');
	vLineHTML.vDivFooterChatEdit.appendChild(vLineHTML.vDivContaddChatMsg);
	vLineHTML.vDivContaddChatMsg.setAttribute('class', 'container pr-0');
	
	vLineHTML.vDivRow3Chat = window.document.createElement('div');
	vLineHTML.vDivContaddChatMsg.appendChild(vLineHTML.vDivRow3Chat);
	vLineHTML.vDivRow3Chat.setAttribute('class', 'row');

	vLineHTML.vTextAreaChatEdit = window.document.createElement('textarea');
	vLineHTML.vDivRow3Chat.appendChild(vLineHTML.vTextAreaChatEdit);
	vLineHTML.vTextAreaChatEdit.setAttribute('id', 'idTextAreaChatEdit' + vRoomSuffix);
	vLineHTML.vTextAreaChatEdit.setAttribute('placeholder', 'Ecrire un message...');
	vLineHTML.vTextAreaChatEdit.setAttribute('class', 'form-control mt-1 ml-0 mr-3 px-1 border');
	vLineHTML.vTextAreaChatEdit.setAttribute('name', 'textAreaChatEdit' + vRoomSuffix);
	vLineHTML.vTextAreaChatEdit.setAttribute('rows', '1');
	vLineHTML.vTextAreaChatEdit.setAttribute('style', 'box-shadow: none; resize: none;');

	vLineHTML.vClearChatEdit = window.document.createElement('div');
	vLineHTML.vDivFooterChatEdit.appendChild(vLineHTML.vClearChatEdit);
	vLineHTML.vClearChatEdit.setAttribute('class', 'row justify-content-between mt-1 mx-0 px-0');

	vLineHTML.vBtnClearChatEdit = window.document.createElement('button');
	vLineHTML.vClearChatEdit.appendChild(vLineHTML.vBtnClearChatEdit);
	vLineHTML.vBtnClearChatEdit.setAttribute('id', 'idBtnClearChatEdit'+ vRoomSuffix);
	vLineHTML.vBtnClearChatEdit.setAttribute('class', 'btn btn-sm border pushBtnFilters ml-3');

	vLineHTML.vIIconClearChatEdit = window.document.createElement('i');
	vLineHTML.vBtnClearChatEdit.appendChild(vLineHTML.vIIconClearChatEdit);
	vLineHTML.vIIconClearChatEdit.setAttribute('id', 'idIIconClearChatEdit'+ vRoomSuffix);
	vLineHTML.vIIconClearChatEdit.setAttribute('class', 'fa fa-fw fa-times');

	vLineHTML.vBtnValidChatMsg = window.document.createElement('button');
	vLineHTML.vClearChatEdit.appendChild(vLineHTML.vBtnValidChatMsg);
	vLineHTML.vBtnValidChatMsg.setAttribute('id', 'idBtnAddChatMsg'+ vRoomSuffix);
	vLineHTML.vBtnValidChatMsg.setAttribute('class', 'btn btn-sm border pushBtnFilters mr-3');

	vLineHTML.vIIconAddChatMsg = window.document.createElement('i');
	vLineHTML.vBtnValidChatMsg.appendChild(vLineHTML.vIIconAddChatMsg);
	vLineHTML.vIIconAddChatMsg.setAttribute('id', 'idIIconAddChatMsg'+ vRoomSuffix);
	vLineHTML.vIIconAddChatMsg.setAttribute('class', 'fa fa-fw fa-check');

	vLineHTML.vBtnClearChatEdit.addEventListener('click', this.clearChatEdit.bind(this),false);
	vLineHTML.vBtnClearChatEdit.datas = vLineHTML;
	vLineHTML.vIIconClearChatEdit.datas = vLineHTML;	

	vLineHTML.vBtnValidChatMsg.addEventListener('click', this.brodcastChatMsgToChatRoom.bind(this),false);
	vLineHTML.vBtnValidChatMsg.datas = vLineHTML;
	vLineHTML.vIIconAddChatMsg.datas = vLineHTML;
	
	// Permet d'auto-resizer à la volée les champs "textarea" ayant le selecteur CSS "textAreaAutoResizable", 
	document.addEventListener('input', (event) => {
		if ((event.target.tagName.toLowerCase() === 'textarea') && 
				(event.target.className.indexOf('textAreaAutoResizable') > -1)){
			vToolBox.autoExpand(event.target);
		}
	}, false);

	// Ajoute la déclaration d'évenements à chaque PopOver, ToolTip DropDown
	vToolBox.InitPopOverAndToolTipAndDropDown();

}

// --------------------------------------------------------------
// Affiche les avatars des amis participants au Tchat
// --------------------------------------------------------------
ChatLoungesMgr.prototype.displayChatingFriends = function(pFriendChatParam){
	var vLineHTML = {};		

	vLineHTML.vImgAvatInvitedToken = window.document.createElement('img');
	document.getElementById('idDivCardHeaderRowAvatar' + pFriendChatParam.vRoomSuffix).appendChild(vLineHTML.vImgAvatInvitedToken);
	vLineHTML.vImgAvatInvitedToken.setAttribute('id', 'idIChatInvitedFriendAvatar' + pFriendChatParam.vRoomSuffix + '-' + pFriendChatParam.friendPseudo);
	vLineHTML.vImgAvatInvitedToken.setAttribute('class', 'avatarToken tokenSize32 ml-1 my-1');

	if (pFriendChatParam.vWhichRole === cstChatInviteur){
		vLineHTML.vImgAvatInvitedToken.classList.add('waitingChatInvited');
	}

	vLineHTML.vImgAvatInvitedToken.setAttribute('alt', 'Avatar');
	vLineHTML.vImgAvatInvitedToken.setAttribute('src', 'static/images/members/'+pFriendChatParam.friendPhoto);
	vLineHTML.vImgAvatInvitedToken.setAttribute('data-toggle', 'tooltip');
	vLineHTML.vImgAvatInvitedToken.setAttribute('data-placement', 'top');
	vLineHTML.vImgAvatInvitedToken.setAttribute('data-title', pFriendChatParam.friendPseudo);

	// Ajoute la déclaration d'évenements à chaque PopOver, ToolTip DropDown
	vToolBox.InitPopOverAndToolTipAndDropDown();
}

// --------------------------------------------------------------
// Publication d'un message sur le salon
// --------------------------------------------------------------
ChatLoungesMgr.prototype.brodcastChatMsgToChatRoom = function(event){
	var vTextAreaChatEdit = event.target.datas.vTextAreaChatEdit;

	if(vTextAreaChatEdit.value){
		vMessage = {
			vRoom : vTextAreaChatEdit.id.slice(vTextAreaChatEdit.id.indexOf('-')+1),		// Prend tous les caractères situés après le "-"
			vMsg 	: vTextAreaChatEdit.value + '\n',
		}
		webSocketConnection.emit('message', vMessage); // Transmet le message aux autres abonnés au ChatRoom

		vTextAreaChatEdit.value = '';
		$(vTextAreaChatEdit).focus();
	}
};

// --------------------------------------------------------------
// Publication d'un message sur le salon
// --------------------------------------------------------------
ChatLoungesMgr.prototype.publishChatMsg = function(pMessage){
	var vTextAreaChat = document.getElementById('idChatArea'+'-'+pMessage.vRoom);
	vTextAreaChat.value +=  pMessage.vMsg;
	vToolBox.autoResizeElem(vTextAreaChat.id);						// Redimensionnement automatique (mais limité) du champs
}

// -----------------------------------------------------------------------------
// Cette méthode efface le champ de saisie du nouveau message
// -----------------------------------------------------------------------------
ChatLoungesMgr.prototype.clearChatEdit = function(event){
	event.target.datas.vTextAreaChatEdit.value = '';
	$(event.target.datas.vTextAreaChatEdit).focus();
}

// -----------------------------------------------------------------------------
// Cette fonction permet de créer un nouveau salon, (donc on nn'a qu'un seul 
// invité à ce moment-là) de l'afficher, et de l'affecter à mon invité
// -----------------------------------------------------------------------------
ChatLoungesMgr.prototype.createNewChatLounge = function(event){
	var vFriend 			= event.target.datas.pFriend;
	var vLoungeLocal 	=  
	{
		vLoungeNumber : (this.memberClient.vMyLounges.length)	+ 1,
		vLoungeOwner	: this.memberClient.member.pseudo,								// Pseudo du membre qui a créé le salon
		vInvited			: 
		[
			// {
			// myPseudo			: this.memberClient.member.pseudo,
			// myStatus			: cstChatWaiting, 
			// friendPseudo	: vfriendPseudo,
			// friendStatus	: cstChatJoin,
			// }
		],
	};

	vLoungeLocal.vInvited.push
	(
		{	myPseudo			: this.memberClient.member.pseudo,
			myPhoto				: this.memberClient.member.etatCivil.photo,
			myStatus			: cstChatWaiting, 
			friendPseudo	: vFriend.friendPseudo,
			friendPhoto		: vFriend.friendPhoto,
			friendStatus	: cstChatJoin,
		}
	);

	// Ajout de l'invitation dans le tableau des invitations
	this.vLoungeMenuLine.push(new AddLoungesLines(vLoungeLocal, this.memberClient.vMyLounges.length, null, vFriend));	
	this.memberClient.vMyLounges.push(vLoungeLocal);		// Ajout du nouveau salon dans ma liste de salons
	event.target.datas.vInvitChat = vLoungeLocal;				// Ajout de l'invitation à l'event
	event.target.datas.vWhichRole = cstChatInviteur;				// Ajout du rôle que je joue (suis-je l'inviteur ou l'invité ?)
	
	this.openChatLounge(event);

	var vFriendChatParam = {
		vRoomSuffix 	: '-Room-' + vLoungeLocal.vLoungeOwner + '-' + vLoungeLocal.vLoungeNumber,
		friendPseudo	: vFriend.friendPseudo,
		friendPhoto		: vFriend.friendPhoto,
		vWhichRole		: cstChatInviteur,
	};

	this.displayChatingFriends(vFriendChatParam)
	this.sendInvitToChat(vLoungeLocal);
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
// Ouverture physique d'un salon de discussion (donc on a qu'un 
// seul invité au départ)
// Fermeture du DropDownMenu
// --------------------------------------------------------------
ChatLoungesMgr.prototype.openChatLounge = function(event){
	var vFriend = event.target.datas.pFriend;
	var vInvitChat = event.target.datas.vInvitChat;
	var vWhichRole = event.target.datas.vWhichRole;

	$("#idMyFriendLi" + cstMainProfileActive + vFriend.indexFriendToRecommend).dropdown('toggle'); // ferme le DropDown Menu
	this.displayLoungeCard(vWhichRole ,vInvitChat);
}

// --------------------------------------------------------------
// Envoie l'invitation pour participer au Tchat
// --------------------------------------------------------------
ChatLoungesMgr.prototype.sendInvitToChat = function(pInvitChat){
	webSocketConnection.emit('createRoomAndInvitToChat', pInvitChat); 
} 











// --------------------------------------------------------------
// Création et gestion de la modale de réponse à l'invitation du TChat
// --------------------------------------------------------------
ChatLoungesMgr.prototype.displayModalChatInvitAnswer = function(pInvitChat){
	var vLineHTML = {};		
	var vWorkingSpace = document.getElementById('idWorkingSpace');
	var vRoomSuffix = '-Room-' + pInvitChat.vLoungeOwner + '-' + pInvitChat.vLoungeNumber;

	vLineHTML.vDivModalChatInvit = window.document.createElement('div');
	vWorkingSpace.appendChild(vLineHTML.vDivModalChatInvit);
	vLineHTML.vDivModalChatInvit.setAttribute('id', 'idModalChatInvit'+vRoomSuffix);
	vLineHTML.vDivModalChatInvit.setAttribute('class', 'modal px-0');
	vLineHTML.vDivModalChatInvit.setAttribute('data-keyboard', 'false');
	vLineHTML.vDivModalChatInvit.setAttribute('data-focus', 'true');
	vLineHTML.vDivModalChatInvit.setAttribute('tabindex', '-1');
	vLineHTML.vDivModalChatInvit.setAttribute('role', 'dialog');
	vLineHTML.vDivModalChatInvit.setAttribute('data-backdrop', 'static');
	vLineHTML.vDivModalChatInvit.setAttribute('aria-labelledby', 'idAriaModalChatInvitTitle'+vRoomSuffix);
	vLineHTML.vDivModalChatInvit.setAttribute('aria-hidden', 'true');
	vLineHTML.vDivModalChatInvit.setAttribute('style', 'z-index: 1060;');

	vLineHTML.vDivModalDialogChatInvit = window.document.createElement('div');
	vLineHTML.vDivModalChatInvit.appendChild(vLineHTML.vDivModalDialogChatInvit);
	vLineHTML.vDivModalDialogChatInvit.setAttribute('class', 'modal-dialog modal-dialog-centered');
	vLineHTML.vDivModalDialogChatInvit.setAttribute('role', 'document');
	
	vLineHTML.vDivModalContentChatInvit = window.document.createElement('div');
	vLineHTML.vDivModalDialogChatInvit.appendChild(vLineHTML.vDivModalContentChatInvit);
	vLineHTML.vDivModalContentChatInvit.setAttribute('class', 'modal-content');

	vLineHTML.vModalChatInvitHeader = window.document.createElement('div');
	vLineHTML.vDivModalContentChatInvit.appendChild(vLineHTML.vModalChatInvitHeader);
	vLineHTML.vModalChatInvitHeader.setAttribute('id', 'idModalChatInvitHeader'+vRoomSuffix);
	vLineHTML.vModalChatInvitHeader.setAttribute('class', 'modal-header border-bottom bg-warning text-dark');

	vLineHTML.vH5ModalHeaderChatInvit = window.document.createElement('h5');
	vLineHTML.vModalChatInvitHeader.appendChild(vLineHTML.vH5ModalHeaderChatInvit);
	vLineHTML.vH5ModalHeaderChatInvit.setAttribute('class', 'modal-title');
	
	vLineHTML.vIModalHeaderChatInvit = window.document.createElement('i');
	vLineHTML.vH5ModalHeaderChatInvit.appendChild(vLineHTML.vIModalHeaderChatInvit);
	vLineHTML.vIModalHeaderChatInvit.setAttribute('class', 'fa fa-comments');
	vLineHTML.vH5ModalHeaderChatInvit.innerHTML += ' Invitation à un Tchat';
	
	vLineHTML.vDivModalBodyChatInvit = window.document.createElement('div');
	vLineHTML.vDivModalContentChatInvit.appendChild(vLineHTML.vDivModalBodyChatInvit);
	vLineHTML.vDivModalBodyChatInvit.setAttribute('class', 'modal-body');
	
	vLineHTML.vFormModalBodyChatInvit = window.document.createElement('form');
	vLineHTML.vDivModalBodyChatInvit.appendChild(vLineHTML.vFormModalBodyChatInvit);
	vLineHTML.vFormModalBodyChatInvit.setAttribute('id', 'idChatInvitForm'+vRoomSuffix);
	vLineHTML.vFormModalBodyChatInvit.setAttribute('class', 'mb-4 mx-auto d-block');

	vLineHTML.vImgModalBodyChatInvit = window.document.createElement('img');
	vLineHTML.vDivModalBodyChatInvit.appendChild(vLineHTML.vImgModalBodyChatInvit);
	vLineHTML.vImgModalBodyChatInvit.setAttribute('src', 'static/images/favicon.png');
	vLineHTML.vImgModalBodyChatInvit.setAttribute('class', 'mb-4 mx-auto d-block');
	vLineHTML.vImgModalBodyChatInvit.setAttribute('alt', 'Logo du site \'Collect\'Or');
	vLineHTML.vImgModalBodyChatInvit.setAttribute('width', 'auto');
	vLineHTML.vImgModalBodyChatInvit.setAttribute('height', '72px');

	vLineHTML.vH3ModalBodyChatInvit = window.document.createElement('h5');
	vLineHTML.vDivModalBodyChatInvit.appendChild(vLineHTML.vH3ModalBodyChatInvit);
	vLineHTML.vH3ModalBodyChatInvit.setAttribute('class', 'h5 mb-3 font-weight-normal text-center');
	vLineHTML.vH3ModalBodyChatInvit.innerHTML = 'Acceptez-vous de rejoindre le salon de discussion N°'+ 
																								pInvitChat.vLoungeNumber + ' de '+
																								pInvitChat.vInvited[pInvitChat.vInvited.length-1].myPseudo + ' ?';

	vLineHTML.vDivModalFooterChatInvit = window.document.createElement('div');
	vLineHTML.vDivModalContentChatInvit.appendChild(vLineHTML.vDivModalFooterChatInvit);
	vLineHTML.vDivModalFooterChatInvit.setAttribute('class', 'modal-footer');

	vLineHTML.vBtnRefuseChatInvit = window.document.createElement('button');
	vLineHTML.vDivModalFooterChatInvit.appendChild(vLineHTML.vBtnRefuseChatInvit);
	vLineHTML.vBtnRefuseChatInvit.setAttribute('id', 'idBtnRefuseChatInvitn'+vRoomSuffix);
	vLineHTML.vBtnRefuseChatInvit.setAttribute('class', 'btn btn-danger');
	vLineHTML.vBtnRefuseChatInvit.innerHTML = 'Refuser';

	vLineHTML.vBtnAcceptChatInvit = window.document.createElement('button');
	vLineHTML.vDivModalFooterChatInvit.appendChild(vLineHTML.vBtnAcceptChatInvit);
	vLineHTML.vBtnAcceptChatInvit.setAttribute('id', 'idBtnAcceptChatInvitn'+vRoomSuffix);
	vLineHTML.vBtnAcceptChatInvit.setAttribute('class', 'btn btn-success');
	vLineHTML.vBtnAcceptChatInvit.innerHTML = 'Accepter';

	vLineHTML.vBtnRefuseChatInvit.addEventListener('click', this.refuseChatInvit.bind(this),false);
	vLineHTML.vBtnRefuseChatInvit.datas = pInvitChat;

	vLineHTML.vBtnAcceptChatInvit.addEventListener('click', this.acceptChatInvit.bind(this),false);
	vLineHTML.vBtnAcceptChatInvit.datas = pInvitChat;
}

// --------------------------------------------------------------
// Refuse à l'invitation du TChat
// Fermeture et destruction de la modale
// Renvoie l'invitation refusée à l'inviteur
// --------------------------------------------------------------
ChatLoungesMgr.prototype.refuseChatInvit = function(event){
	var vInvitChat = event.target.datas;
	this.destroyAnswerModal(vInvitChat);

	webSocketConnection.emit('refuseInvitToChat', vInvitChat); 
}

// --------------------------------------------------------------
// Accepte à l'invitation du TChat
// --------------------------------------------------------------
ChatLoungesMgr.prototype.acceptChatInvit = function(event){
	var vInvitChat = event.target.datas;
	this.destroyAnswerModal(vInvitChat);

	this.displayLoungeCard(cstChatGuest, vInvitChat);

	var vFriendChatParam = {
		vRoomSuffix : '-Room-' + vInvitChat.vLoungeOwner + '-' + vInvitChat.vLoungeNumber,
		vWhichRole	: cstChatGuest,
	};

	vInvitChat.vInvited.forEach((item) => {
		vFriendChatParam.friendPseudo	= item.friendPseudo,
		vFriendChatParam.friendPhoto	= item.friendPhoto,
		this.displayChatingFriends(vFriendChatParam);
	})

	webSocketConnection.emit('acceptInvitToChat', vInvitChat); 
}

// --------------------------------------------------------------
// Réponse à l'invitation du TChat
// Affiche la modale de choix de reponse
// --------------------------------------------------------------
ChatLoungesMgr.prototype.answerToChatInvit = function(pInvitChat){
	var vRoomSuffix = '-Room-' + pInvitChat.vLoungeOwner + '-' + pInvitChat.vLoungeNumber;
	this.displayModalChatInvitAnswer(pInvitChat);

	var vModalHeaderColorParams = 
	{
		activeColor : 'bg-success',
		modalHeader : document.getElementById('idModalChatInvitHeader'+vRoomSuffix),
	}
	new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
	// ouverture de la fenêtre modale de réponse à l'invitation au TChat
	$('#idModalChatInvit'+vRoomSuffix).modal('show');                   
}

// --------------------------------------------------------------
// Ferme la modale de Réponse à l'invitation du TChat et la 
// détruit dans le DOM
// --------------------------------------------------------------
ChatLoungesMgr.prototype.destroyAnswerModal = function(pInvitChat){
	var vRoomSuffix = '-Room-' + pInvitChat.vLoungeOwner + '-' + pInvitChat.vLoungeNumber;
	var vidModalChatInvit = 'idModalChatInvit' + vRoomSuffix;

	$('#'+vidModalChatInvit).modal('hide');     // Fermeture de la modale                                     

	var elem = document.getElementById(vidModalChatInvit);
	if (elem){
		elem.parentNode.removeChild(elem);
	}
}

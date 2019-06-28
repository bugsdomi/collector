// ************************************************************************
// ***      Posts : Objet gestion des posts                             ***
// ***                                                                  ***
// *** Objet : Posts                                                    ***
// ***                                                                  ***
// *** Cet objet sert à afficher :                                      ***
// ***   - A saisir les Posts                                           ***
// ***   - A les afficher d'une façon stackable                         ***
// ***   - A saisir les les commentaires (éventuellement de manière     ***
// ***     imbriquée)                                                   ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function PostsClient(pMemberClient){   						// Fonction constructeur exportée
	this.memberClient = pMemberClient;
	this.lastPublishedPost = 0;											// N0 du dernier Post publié affiché
	this.vPostTitle;																// Titre du Post
	this.vPostMsg;																	// Texte du Post
};

// ---------------------------------------------------------------------------------------------------------------------------
// Gestion des Posts
// Apres validation de la saisie dans la carte "Posts"
// Création d'un posts contenant le Posts qui vient d'être rédigé
// ---------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Cette méthode affiche la carte de saisie des Posts
// -----------------------------------------------------------------------------
PostsClient.prototype.displayPostEdit = function(){
	var vlineHTML = {};						
	var vMountPointPostEdit = document.getElementById('idDivMountPointPostEdit'+vActiveProfile);

	vlineHTML.vDivCard = window.document.createElement('div');
	vMountPointPostEdit.appendChild(vlineHTML.vDivCard);
	vlineHTML.vDivCard.setAttribute('id', 'idPostEditCard'+vActiveProfile);
	vlineHTML.vDivCard.setAttribute('class', 'card text-white bg-warning border-warning mb-3');


	// Card Header
	vlineHTML.vDivCardHeader = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardHeader);
	vlineHTML.vDivCardHeader.setAttribute('class', 'card-header py-0 pb-1');

	vlineHTML.vH5PostEditTitle = window.document.createElement('h5');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vH5PostEditTitle);
	vlineHTML.vH5PostEditTitle.setAttribute('class', 'card-title text-dark ml-0');
	vlineHTML.vH5PostEditTitle.innerHTML = 'Postez vos idées et informations...';


	// Card Body
	vlineHTML.vDivCardBody = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardBody);
	vlineHTML.vDivCardBody.setAttribute('class', 'card-body bg-white text-dark px-1 pt-2 pb-0');

	vlineHTML.vDivFormGroup = window.document.createElement('div');
	vlineHTML.vDivCardBody.appendChild(vlineHTML.vDivFormGroup);
	vlineHTML.vDivFormGroup.setAttribute('class', 'form-group');

	vlineHTML.vForm = window.document.createElement('form');
	vlineHTML.vDivFormGroup.appendChild(vlineHTML.vForm);
	
	vlineHTML.vDivContainerPost = window.document.createElement('div');
	vlineHTML.vForm.appendChild(vlineHTML.vDivContainerPost);
	vlineHTML.vDivContainerPost.setAttribute('class', 'container px-1');

	vlineHTML.vDivRow = window.document.createElement('div');
	vlineHTML.vDivContainerPost.appendChild(vlineHTML.vDivRow);
	vlineHTML.vDivRow.setAttribute('class', 'row m-0');

	vlineHTML.vH5PostSubject = window.document.createElement('h5');
	vlineHTML.vDivRow.appendChild(vlineHTML.vH5PostSubject);
	vlineHTML.vH5PostSubject.setAttribute('class', 'col-auto p-0 m-0');
	vlineHTML.vH5PostSubject.innerHTML = 'Sujet : ';

	vlineHTML.vInputSubject = window.document.createElement('input');
	vlineHTML.vDivRow.appendChild(vlineHTML.vInputSubject);
	vlineHTML.vInputSubject.setAttribute('id', 'idPostEditTitle'+vActiveProfile);
	vlineHTML.vInputSubject.setAttribute('type', 'text');
	vlineHTML.vInputSubject.setAttribute('placeholder', 'Titre du sujet');
	vlineHTML.vInputSubject.setAttribute('class', 'col-10 mx-auto px-0');
	vlineHTML.vInputSubject.setAttribute('name', 'postEditTitle'+vActiveProfile);
	vlineHTML.vInputSubject.setAttribute('style', 'border: none !important; box-shadow: none; outline: none;');
	
	vlineHTML.vTextAreaPost = window.document.createElement('textarea');
	vlineHTML.vDivContainerPost.appendChild(vlineHTML.vTextAreaPost);
	vlineHTML.vTextAreaPost.setAttribute('id', 'idPostEditArea'+vActiveProfile);
	vlineHTML.vTextAreaPost.setAttribute('class', 'form-control mt-2 px-0 pb-0 textAreaAutoResizable');
	vlineHTML.vTextAreaPost.setAttribute('name', 'postEditArea'+vActiveProfile);
	vlineHTML.vTextAreaPost.setAttribute('rows', '1');
	vlineHTML.vTextAreaPost.setAttribute('placeholder', 'Tapez votre texte ici...');
	vlineHTML.vTextAreaPost.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none;');


	// Card-Footer
	vlineHTML.vDivFooterPostEdit = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivFooterPostEdit);
	vlineHTML.vDivFooterPostEdit.setAttribute('class', 'card-footer border mt-1 py-1');

	vlineHTML.vDivCardFooterRow = window.document.createElement('div');
	vlineHTML.vDivFooterPostEdit.appendChild(vlineHTML.vDivCardFooterRow);
	vlineHTML.vDivCardFooterRow.setAttribute('class', 'row');

	vlineHTML.vDivCardFooterCol = window.document.createElement('div');
	vlineHTML.vDivCardFooterRow.appendChild(vlineHTML.vDivCardFooterCol);
	vlineHTML.vDivCardFooterCol.setAttribute('class', 'col-auto ml-auto');

	vlineHTML.vBtnValidPost = window.document.createElement('button');
	vlineHTML.vDivCardFooterCol.appendChild(vlineHTML.vBtnValidPost);
	vlineHTML.vBtnValidPost.setAttribute('id', 'idBtnValidPost'+vActiveProfile);
	vlineHTML.vBtnValidPost.setAttribute('type', 'button');
	vlineHTML.vBtnValidPost.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-success');
	vlineHTML.vBtnValidPost.innerHTML = 'Post';

	vlineHTML.vBtnValidPost.addEventListener('click', this.publishPost.bind(this),false);

	this.vPostTitle = document.getElementById('idPostEditTitle'+vActiveProfile);
	this.vPostMsg = document.getElementById('idPostEditArea'+vActiveProfile);

	// Permet de passer automatiquement dans le champ 'textArea' de la carte "PostEdit" lorsque l'on appui sur [Enter]
	$('#idPostEditTitle'+vActiveProfile).bind("keydown", function(event) {
    if (event.which === 13) {
			event.stopPropagation();
			event.preventDefault();
			$('#idPostEditArea'+vActiveProfile).focus();
    }
	});

	// Permet d'auto-resizer à la volée les champs "textarea" ayant le selecteur CSS "textAreaAutoResizable", 
	document.addEventListener('input', (event) => {
		if ((event.target.tagName.toLowerCase() === 'textarea') && 
				(event.target.className.indexOf('textAreaAutoResizable') > -1)){
			vToolBox.autoExpand(event.target);
		}
	}, false);
}





// -----------------------------------------------------------------------------
// Cette méthode affiche les Posts publiés
// -----------------------------------------------------------------------------
PostsClient.prototype.displayPublishedPosts = function(pPostToPublish, pActiveProfile){
	var vlineHTML = {};		
	var vPublishedPostIndex;
	var vLastPost;
	var vLastPostId;
	var vLastPostNumber;
	var vDataToTransmit;
	var vMountPointPostEdit = document.getElementById('idDivMountPointPostEdit'+pActiveProfile);

	// Détermine le dernier N° de Post par Exploitation du DOM
	if (vMountPointPostEdit.firstElementChild.nextElementSibling){									// Il y a au moins 1 Post
		vLastPost = vMountPointPostEdit.firstElementChild.nextElementSibling;
		vLastPostId = vLastPost.id;
		vLastPostNumber = vLastPostId.slice(('idPublishedPost' + pActiveProfile).length, vLastPostId.length)
		this.lastPublishedPost = parseInt(vLastPostNumber) + 1;
	} else {																																				// Il n'y a aucun Post
		this.lastPublishedPost = 0;
	}

	vPublishedPostIndex = this.lastPublishedPost;

	vlineHTML.vDivCard = window.document.createElement('div');
	vMountPointPostEdit.insertBefore(vlineHTML.vDivCard, vLastPost);								// Insertion du dernier Post avant l'avant-dernier Post, etc, etc
	vlineHTML.vDivCard.setAttribute('id', 'idPublishedPost'+ pActiveProfile + vPublishedPostIndex);
	vlineHTML.vDivCard.setAttribute('class', 'card text-white bg-warning border-warning mb-3');

	// Card Header
	vlineHTML.vDivCardHeader = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardHeader);
	vlineHTML.vDivCardHeader.setAttribute('class', 'card-header border-0 py-0');

	vlineHTML.vDivCardHeaderRow = window.document.createElement('div');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vDivCardHeaderRow);
	vlineHTML.vDivCardHeaderRow.setAttribute('class', 'row m-0 py-1 px-0');

	vlineHTML.vImgAvatToken = window.document.createElement('img');
	vlineHTML.vDivCardHeaderRow.appendChild(vlineHTML.vImgAvatToken);
	vlineHTML.vImgAvatToken.setAttribute('class', 'avatarToken tokenSize32 ml-0');
	vlineHTML.vImgAvatToken.setAttribute('alt', 'Avatar');
	vlineHTML.vImgAvatToken.setAttribute('src', 'static/images/'+pPostToPublish.authorPhoto);

	vlineHTML.vH5PostPseudo = window.document.createElement('h5');
	vlineHTML.vDivCardHeaderRow.appendChild(vlineHTML.vH5PostPseudo);
	vlineHTML.vH5PostPseudo.setAttribute('class', 'card-title ml-1 text-dark m-0 align-self-center');
	vlineHTML.vH5PostPseudo.innerHTML = pPostToPublish.authorPseudo;

	vlineHTML.vDivTimeStamp = window.document.createElement('div');
	vlineHTML.vDivCardHeaderRow.appendChild(vlineHTML.vDivTimeStamp);
	vlineHTML.vDivTimeStamp.setAttribute('class', 'text-dark p-0 ml-2 font-size-70 align-self-center');
	vlineHTML.vDivTimeStamp.innerHTML = moment(pPostToPublish.postDate).format('[à publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]');

	vlineHTML.vDivPostTimeStampMoment = window.document.createElement('div');
	vlineHTML.vDivCardHeaderRow.appendChild(vlineHTML.vDivPostTimeStampMoment);
	vlineHTML.vDivPostTimeStampMoment.setAttribute('id', 'idDivPostTimeStampMoment'+ pActiveProfile + vPublishedPostIndex);
	vlineHTML.vDivPostTimeStampMoment.setAttribute('class', 'd-none');
	vlineHTML.vDivPostTimeStampMoment.innerHTML = pPostToPublish.postDate;
	
	// Card Body
	vlineHTML.vDivCardBody = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardBody);
	vlineHTML.vDivCardBody.setAttribute('class', 'card-body bg-white text-dark px-1 pt-2 pb-0');
	
	vlineHTML.vDivContainerPost = window.document.createElement('div');
	vlineHTML.vDivCardBody.appendChild(vlineHTML.vDivContainerPost);
	vlineHTML.vDivContainerPost.setAttribute('class', 'container px-1');

	vlineHTML.vDivRow1 = window.document.createElement('div');
	vlineHTML.vDivContainerPost.appendChild(vlineHTML.vDivRow1);
	vlineHTML.vDivRow1.setAttribute('class', 'row m-0');
	vlineHTML.vDivRow1.setAttribute('style', 'overflow-x: hidden;');

	vlineHTML.vH5PostSubject = window.document.createElement('h5');
	vlineHTML.vDivRow1.appendChild(vlineHTML.vH5PostSubject);
	vlineHTML.vH5PostSubject.setAttribute('class', 'col-auto p-0 m-0');
	if (!pPostToPublish.postTitle){
		vlineHTML.vH5PostSubject.innerHTML = 'Sans titre';
	} else {
		vlineHTML.vH5PostSubject.innerHTML = pPostToPublish.postTitle;
	}
	
	vlineHTML.vTextAreaPost = window.document.createElement('textarea');
	vlineHTML.vDivContainerPost.appendChild(vlineHTML.vTextAreaPost);
	vlineHTML.vTextAreaPost.setAttribute('id', 'idPublishedPostArea' + pActiveProfile + vPublishedPostIndex);
	vlineHTML.vTextAreaPost.setAttribute('class', 'form-control bg-light mt-2 px-0 pb-0 textAreaAutoResizable');
	vlineHTML.vTextAreaPost.setAttribute('name', 'publishedPostArea'+pActiveProfile + vPublishedPostIndex);
	vlineHTML.vTextAreaPost.setAttribute('rows', '1');
	vlineHTML.vTextAreaPost.setAttribute('readonly', '');
	vlineHTML.vTextAreaPost.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none;');
	vlineHTML.vTextAreaPost.value = pPostToPublish.postMsg;
	vToolBox.autoResizeElem(vlineHTML.vTextAreaPost.id);						// Redimensionnement automatique (mais limité) du champs



	// On est toujours dans l'affichage du Post, mais c'est le début de la zone permettant la gestion des Commentaires L1
	// C Ligne des boutons "Ajout de commentaire L1" et "Suppression de Post"
	vlineHTML.vDivContFooterL1 = window.document.createElement('div');
	vlineHTML.vDivContainerPost.appendChild(vlineHTML.vDivContFooterL1);
	vlineHTML.vDivContFooterL1.setAttribute('class', 'container border-top my-2 pr-0');

		// R Ligne des boutons "Ajout de commentaire L1" et "Suppression de Post"
		vlineHTML.vDivRow2L1 = window.document.createElement('div');
		vlineHTML.vDivContFooterL1.appendChild(vlineHTML.vDivRow2L1);
		vlineHTML.vDivRow2L1.setAttribute('class', 'row justify-content-between my-2 mx-0 px-0');

		vlineHTML.vDivBtnAndPuceL1 = window.document.createElement('div');
		vlineHTML.vDivRow2L1.appendChild(vlineHTML.vDivBtnAndPuceL1);

			// Bouton "Ajouter un commentaire L1" et son icône
			vlineHTML.vBtnCommentL1 = window.document.createElement('button');
			vlineHTML.vDivBtnAndPuceL1.appendChild(vlineHTML.vBtnCommentL1);
			vlineHTML.vBtnCommentL1.setAttribute('id', 'idBtnCommentL1' + pActiveProfile + vPublishedPostIndex);
			vlineHTML.vBtnCommentL1.setAttribute('type', 'button');
			vlineHTML.vBtnCommentL1.setAttribute('data-toggle', 'collapse');
			vlineHTML.vBtnCommentL1.setAttribute('data-target', '#idDivCollapseL1' + pActiveProfile + vPublishedPostIndex);
			vlineHTML.vBtnCommentL1.setAttribute('aria-expanded', 'false');
			vlineHTML.vBtnCommentL1.setAttribute('aria-controls', 'idDivCollapseL1' + pActiveProfile + vPublishedPostIndex);
			vlineHTML.vBtnCommentL1.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-success px-1 py-0');

				vlineHTML.vIIconCommentL1 = window.document.createElement('i');
				vlineHTML.vBtnCommentL1.appendChild(vlineHTML.vIIconCommentL1);
				vlineHTML.vIIconCommentL1.setAttribute('class', 'fa fa-commenting-o fa-2x text-dark');

			//<span id="idNbrWaitingInvit" class="badge badge-danger"></span>
			vlineHTML.vSpanNbCommentL1 = window.document.createElement('span');
			vlineHTML.vDivBtnAndPuceL1.appendChild(vlineHTML.vSpanNbCommentL1);
			vlineHTML.vSpanNbCommentL1.setAttribute('id', 'idNbCommentsL1' + pActiveProfile + vPublishedPostIndex);
			vlineHTML.vSpanNbCommentL1.setAttribute('class', 'badge badge-danger ml-1 invisible');

			// Bouton "Suppression" + Gestion affichage de ce bouton en fonction du statut d'affichage du "Collapse"
			vlineHTML.vBtnDeletePost = window.document.createElement('button');
			vlineHTML.vDivRow2L1.appendChild(vlineHTML.vBtnDeletePost);
			vlineHTML.vBtnDeletePost.setAttribute('id', 'idBtnDeletePost' + pActiveProfile + vPublishedPostIndex);
			vlineHTML.vBtnDeletePost.setAttribute('type', 'button');
			vlineHTML.vBtnDeletePost.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-danger px-1 py-0 mr-3');
			vlineHTML.vBtnDeletePost.setAttribute('style', 'visibility: hidden;');
			vlineHTML.vBtnDeletePost.innerHTML = 'Supprimer';

			if 	((vMemberClient.member.pseudo === vlineHTML.vH5PostPseudo.innerHTML) || // Si je suis l'auteur du post, je peux effacer mon Post
					(pActiveProfile === cstMainProfileActive)){															// Le propriétaire du mur peut effacer tous les Posts qu'il désire (les siens et ceux des autres)
				vlineHTML.vBtnDeletePost.style.visibility='visible';											// Alors Affichage du bouton de suppression du Post

				vDataToTransmit = {
					activeProfile : pActiveProfile,
				}

				vlineHTML.vBtnDeletePost.addEventListener('click', this.deletePublishedPost.bind(this),false);
				vlineHTML.vBtnDeletePost.datas = vDataToTransmit;
			}


	// Card Footer
	vlineHTML.vDivFooterL1 = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivFooterL1);
	vlineHTML.vDivFooterL1.setAttribute('class', 'card-footer border mt-1 py-1 pr-1 d-none');
	
		// Gestion du "Collapse"
		// Debut de la zone "Collapse" - Tout ce qui est "Collapsé" à l'appui du bouton "AJouter un commentaire"
		vlineHTML.vDivCollapseL1 = window.document.createElement('div');
		vlineHTML.vDivFooterL1.appendChild(vlineHTML.vDivCollapseL1);
		vlineHTML.vDivCollapseL1.setAttribute('id', 'idDivCollapseL1' + pActiveProfile + vPublishedPostIndex);
		vlineHTML.vDivCollapseL1.setAttribute('class', 'collapse');

			// C Ligne des champs de saisie "Ajout de commentaire L1" 
			vlineHTML.vDivContAddCommentL1 = window.document.createElement('div');
			vlineHTML.vDivCollapseL1.appendChild(vlineHTML.vDivContAddCommentL1);
			vlineHTML.vDivContAddCommentL1.setAttribute('class', 'container pr-0');
		
				vlineHTML.vDivRow3L1 = window.document.createElement('div');
				vlineHTML.vDivContAddCommentL1.appendChild(vlineHTML.vDivRow3L1);
				vlineHTML.vDivRow3L1.setAttribute('class', 'row');

					vlineHTML.vTextAreaCommentL1 = window.document.createElement('textarea');
					vlineHTML.vDivRow3L1.appendChild(vlineHTML.vTextAreaCommentL1);
					vlineHTML.vTextAreaCommentL1.setAttribute('id', 'idTextAreaCommentL1'+pActiveProfile + vPublishedPostIndex);
					vlineHTML.vTextAreaCommentL1.setAttribute('placeholder', 'Ajouter un commentaire...');
					vlineHTML.vTextAreaCommentL1.setAttribute('class', 'form-control mt-1 ml-0 mr-3 px-1 border textAreaAutoResizable');
					vlineHTML.vTextAreaCommentL1.setAttribute('name', 'textAreaCommentL1'+pActiveProfile + vPublishedPostIndex);
					vlineHTML.vTextAreaCommentL1.setAttribute('rows', '1');
					vlineHTML.vTextAreaCommentL1.setAttribute('style', 'box-shadow: none; resize: none;');

			// Groupe d'éléments pour la création de commentaires L1 (Bouton "Clear" + Bouton "Validation")
				vlineHTML.vClearCommentL1 = window.document.createElement('div');
				vlineHTML.vDivCollapseL1.appendChild(vlineHTML.vClearCommentL1);
				vlineHTML.vClearCommentL1.setAttribute('class', 'row justify-content-between mt-1 mx-0 px-0');

					// Bouton "Clear L1"
					vlineHTML.vBtnClearCommentL1 = window.document.createElement('button');
					vlineHTML.vClearCommentL1.appendChild(vlineHTML.vBtnClearCommentL1);
					vlineHTML.vBtnClearCommentL1.setAttribute('id', 'idBtnClearCommentL1' + pActiveProfile + vPublishedPostIndex);
					vlineHTML.vBtnClearCommentL1.setAttribute('class', 'btn btn-sm border pushBtnFilters');

						vlineHTML.vIIconClearCommentL1 = window.document.createElement('i');
						vlineHTML.vBtnClearCommentL1.appendChild(vlineHTML.vIIconClearCommentL1);
						vlineHTML.vIIconClearCommentL1.setAttribute('id', 'idIIconClearCommentL1' + pActiveProfile + vPublishedPostIndex);
						vlineHTML.vIIconClearCommentL1.setAttribute('class', 'fa fa-fw fa-times');

					// Bouton "Validation L1" du commentaire
					vlineHTML.vBtnAddCommentL1 = window.document.createElement('button');
					vlineHTML.vClearCommentL1.appendChild(vlineHTML.vBtnAddCommentL1);
					vlineHTML.vBtnAddCommentL1.setAttribute('id', 'idBtnAddCommentL1' + pActiveProfile + vPublishedPostIndex);
					vlineHTML.vBtnAddCommentL1.setAttribute('class', 'btn btn-sm border pushBtnFilters mr-3');

						vlineHTML.vIIconAddCommentL1 = window.document.createElement('i');
						vlineHTML.vBtnAddCommentL1.appendChild(vlineHTML.vIIconAddCommentL1);
						vlineHTML.vIIconAddCommentL1.setAttribute('id', 'idIIconAddCommentL1' + pActiveProfile + vPublishedPostIndex);
						vlineHTML.vIIconAddCommentL1.setAttribute('class', 'fa fa-fw fa-check');



			// **********************************************************************************************************************************************
			// **********************************************************************************************************************************************
			// **********************************************************************************************************************************************
			// Début Zone des commentaires L1
			// **********************************************************************************************************************************************
			// **********************************************************************************************************************************************
			// **********************************************************************************************************************************************
			// Point de montage des commentaires L1
			vlineHTML.vDivMountpointCommentL1 = window.document.createElement('div');
			vlineHTML.vDivCollapseL1.appendChild(vlineHTML.vDivMountpointCommentL1);
			vlineHTML.vDivMountpointCommentL1.setAttribute('id', 'idDivMountPointCommentL1' + pActiveProfile + vPublishedPostIndex);
			vlineHTML.vDivMountpointCommentL1.setAttribute('class', 'text-dark mt-1 pl-1 pr-0 py-0 d-none');

			// Alimentation des commentaires L1 des différents Posts
			if (pPostToPublish.commentL1){				// S'il y a des commentaires associés au Post en cours de traitement, alors affichage des commentaires dans le DOM
				pPostToPublish.commentL1.forEach((item) => {
					item.postIndex = vPublishedPostIndex;	
				});
				this.displayStoredCommentL1(pPostToPublish.commentL1, pActiveProfile);
			}


	var vDataToTransmit = {
		activeProfile 	: pActiveProfile
	}

	vlineHTML.vBtnAddCommentL1.addEventListener('click', this.publishCommentL1.bind(this),false);
	vlineHTML.vBtnAddCommentL1.datas = vDataToTransmit;
	vlineHTML.vIIconAddCommentL1.datas = vDataToTransmit;

	vlineHTML.vBtnClearCommentL1.addEventListener('click', this.clearCommentL1.bind(this),false);
	vlineHTML.vBtnClearCommentL1.datas = vDataToTransmit;
  vlineHTML.vIIconClearCommentL1.datas = vDataToTransmit;	

	// Positionne le focus sur le champ du commentaire dès l'ouverture du "Collapse"
	$('#idDivCollapseL1' + pActiveProfile + vPublishedPostIndex).on('shown.bs.collapse', (event) => {
		this.formatCommentsL1(vlineHTML.vDivFooterL1, '#idTextAreaCommentL1', pActiveProfile, event)
	});

	// A la fermeture du Collapse, cache le Footer
	$('#idDivCollapseL1' + pActiveProfile + vPublishedPostIndex).on('hidden.bs.collapse', () => {
		vlineHTML.vDivFooterL1.classList.replace('d-block', 'd-none');
	});
}

// -----------------------------------------------------------------------------
// Cette méthode effectue des actions sur les commentaires au moment de leur ouverture :
// - Cache le bouton "Suppression de Post" pour éviter la confusion avec les commentaires
// - Affiche le cadre container des commentaires du Post
// - Resize automatiquement les champs des commentaires qui le nécessitent
// - Donne le focus au champs de saisie du commentaire
// -----------------------------------------------------------------------------
PostsClient.prototype.formatCommentsL1 = function(pFooter, pTextAreaCommentL1, pActiveProfile, event){
	var vBtnClicked = event.target.id;												// Obtient le N° d'indice du bouton "Supprimer" dans le DOM
	var vPostIndex;
	var vElem;
	
	pFooter.classList.replace('d-none', 'd-block');
	vPostIndex = vBtnClicked.slice(('idDivCollapseL1' + pActiveProfile).length, vBtnClicked.length);

	vElem = document.getElementById('idDivMountPointCommentL1' + pActiveProfile + vPostIndex);
	if (vElem.firstElementChild){												// S'il y a un commentaire
		vElem.classList.replace('d-none','d-block');			// On active le point de montage

		i=0;
		vElem = document.getElementById('idTextAreaCommentROL1' + pActiveProfile + vPostIndex + '-' + i);
		while (vElem) {
			vToolBox.autoResizeElem(vElem.id);
			i++;
			vElem = document.getElementById('idTextAreaCommentROL1' + pActiveProfile + vPostIndex + '-' + i);
		}	
		$(pTextAreaCommentL1 + pActiveProfile + vPostIndex).focus();
	}		
}

// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Post et le stocke dans la BDD
// -----------------------------------------------------------------------------
PostsClient.prototype.addNewPost = function(){
	var vPostToPublish = {
		postDate    		: moment().format(),													// Récupération de la date et heure actuelle
		postTitle				: this.vPostTitle.value,
		postMsg					: this.vPostMsg.value,
		authorPseudo 		: vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		authorPhoto			:	vMemberClient.member.etatCivil.photo,
		// Par contre le membre principal, peut poster un message sur le profil de son ami (Ami qui est le propriétaire de son mur et de tous les Posts qui y sont écrits)
		postOwnerMail		: this.memberClient.member.email,							// Pour pouvoir afficher QUE les Posts écrits sur le mur du propriétaire
		postOwnerPseudo	: this.memberClient.member.pseudo,						// Propriétaire du mur sur lequel sont affichés les posts (les siens et ceux ecrits pour lui par d autres)
	}	
	webSocketConnection.emit('addNewPost',vPostToPublish);
}	

// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Post
// -----------------------------------------------------------------------------
PostsClient.prototype.publishPost = function(){
	if (this.vPostMsg.value){				// Si le message est non vide, il est publié
		this.addNewPost();
	}

	// Réinitialisation (Contenant et contenu) de la carte "PostEdit"
	this.vPostTitle.value = null;
	this.vPostMsg.value = null;
	vToolBox.autoResizeElem(this.vPostMsg.id);
}

// -----------------------------------------------------------------------------
// Cette méthode supprime un Post
// On obtient d'abord le N° d'index en exploitant l'indice liés aux objets du DOM
// -----------------------------------------------------------------------------
PostsClient.prototype.deletePublishedPost = function(event){
	var vBtnClicked = event.target.id;												// Obtient le N° d'indice du bouton "Supprimer" dans le DOM
	index = vBtnClicked.slice(('idBtnDeletePost' + event.target.datas.activeProfile).length, vBtnClicked.length);

	// On va lire la Date/Heure associée au Post
	var vDivPostTimeStampMoment = document.getElementById('idDivPostTimeStampMoment'+event.target.datas.activeProfile+index);		
	vTimeStampMoment = moment(vDivPostTimeStampMoment.innerHTML).format();										// On formatte la Date/Heure au format par défaut, utilisé dans la BDD

	var vPostToDelete = {
		postOwnerMail 	: this.memberClient.member.email,
		postDate				: vTimeStampMoment,
		authorPseudo		:	vMemberClient.member.pseudo,
		postOwnerPseudo	: this.memberClient.member.pseudo,
		index						: parseInt(index),
	}

	webSocketConnection.emit('deletePost',vPostToDelete);
}


// -----------------------------------------------------------------------------
// Cette méthode va chercher les Posts à afficher au moment de l'affichage du profil
// -----------------------------------------------------------------------------
PostsClient.prototype.displayPosts = function(){
	this.displayPostEdit();																				// Affiche la carte d'édition des Posts
	var vPostToSearch = {
		postOwnerMail	: this.memberClient.member.email,							// Pour pouvoir afficher QUE les Posts écrits sur le mur du propriétaire
	}

	webSocketConnection.emit('askPostsList',vPostToSearch);
}

// -----------------------------------------------------------------------------
// Cette méthode affiche les Posts stockés en BDD à l'affichage du profil
// -----------------------------------------------------------------------------
PostsClient.prototype.displayStoredPosts = function(pPostsList, pActiveProfile){
	pPostsList.forEach((item) => {															// Pour chacun des posts du membre
		this.displayPublishedPosts(item, pActiveProfile);
	});
}








// *********************************************************************************************************
// *********************************************************************************************************
// *********************************************************************************************************
// *********************************************************************************************************
// Gestion des commentaires
// *********************************************************************************************************
// *********************************************************************************************************
// *********************************************************************************************************
// *********************************************************************************************************



// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Commentaire L1 et le stocke dans la BDD
// -----------------------------------------------------------------------------
PostsClient.prototype.addNewCommentL1 = function(pCommentL1Msg, pTimeStampMoment, pIndex){

	var vCommentL1ToAdd = {
		postOwnerMail					: this.memberClient.member.email,							// Clé N°1  : Le propriétaire du Post auquel va être rattaché le nouveau commentaire L1
		postOwnerPseudo				: this.memberClient.member.pseudo,
		postDate							: pTimeStampMoment,														// Clé N° 2 : La Date/Heure du Post auquel va être rattaché le nouveau commentaire L1
		commentL1Date   			: moment().format(),													// Récupération de la date et heure actuelle de rédaction Commentaire
		commentL1Msg					: pCommentL1Msg,
		commentL1AuthorPseudo : vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		commentL1AuthorPhoto	:	vMemberClient.member.etatCivil.photo,
		postIndex							: pIndex,																			// N° du Post auquel est rattaché le commentaire
	}	
	webSocketConnection.emit('addNewCommentL1',vCommentL1ToAdd);
}	

// -----------------------------------------------------------------------------
// Cette méthode publie un nouveau commentaire de Niveau 1 (L1)
// -----------------------------------------------------------------------------
PostsClient.prototype.publishCommentL1 = function(event){
	var vBtnClicked 		= event.target.id;
	var vActiveProfile 	= event.target.datas.activeProfile;
	var vPostIndex;					 

	if (vBtnClicked.startsWith('idIIconAddCommentL1')){
		vPostIndex = vBtnClicked.slice(('idIIconAddCommentL1' + vActiveProfile).length, vBtnClicked.length);
	} else {
		vPostIndex = vBtnClicked.slice(('idBtnAddCommentL1' + vActiveProfile).length, vBtnClicked.length);
	}

	// Récupération du TimeStamp du Post qui va avoir le commentaire
	// On va lire la Date/Heure associée au Post
	var vDivPostTimeStampMoment = document.getElementById('idDivPostTimeStampMoment'+ vActiveProfile + vPostIndex);		
	vTimeStampMoment = moment(vDivPostTimeStampMoment.innerHTML).format();			// On formatte la Date/Heure au format par défaut, utilisé dans la BDD

	var vCommentL1Msg = document.getElementById('idTextAreaCommentL1' + vActiveProfile + vPostIndex);

	if (vCommentL1Msg.value){
		this.addNewCommentL1(vCommentL1Msg.value, vTimeStampMoment, vPostIndex);
	}

	// Après transmission au serveur, on reset la valeur du champ, on rétablit sa taille par défaut, et on lui redonne le focus
	vCommentL1Msg.value = null;
	vToolBox.autoResizeElem(vCommentL1Msg.id);
	$('#'+vCommentL1Msg.id).focus();
}

// -----------------------------------------------------------------------------
// Cette méthode efface le champ de saisie du nouveau commentaire de Niveau 1 (L1)
// -----------------------------------------------------------------------------
PostsClient.prototype.clearCommentL1 = function(event){
	var vBtnClicked = event.target.id;
	var vActiveProfile = event.target.datas.activeProfile;
	var vPostIndex;					 

	if (vBtnClicked.startsWith('idIIconClearCommentL1')){
		vPostIndex = vBtnClicked.slice(('idIIconClearCommentL1' + vActiveProfile).length, vBtnClicked.length);
	} else {
		vPostIndex = vBtnClicked.slice(('idBtnClearCommentL1' + vActiveProfile).length, vBtnClicked.length);
	}

	document.getElementById('idTextAreaCommentL1'+ vActiveProfile + vPostIndex).value = '';
}

// -----------------------------------------------------------------------------
// Cette méthode affiche les commentaires de Niveau 1 stockés en BDD à l'affichage 
// des commentaires du post concerné
// -----------------------------------------------------------------------------
PostsClient.prototype.displayCommentL1 = function(pCommentL1, pActiveProfile){
	var vlineHTML = {};		
	var vlastPublishedCommentL1 = 0;
	var vMountPointCommentL1 = document.getElementById('idDivMountPointCommentL1' + pActiveProfile + pCommentL1.postIndex);
	var vLastCommentL1Id;
	var vLastCommentL1Number;
	var vPuceNbCommentsL1 = document.getElementById('idNbCommentsL1' + pActiveProfile + pCommentL1.postIndex);

	vMountPointCommentL1.classList.replace('d-none','d-block');

	// Détermine le dernier N° de Commentaire L1 par Exploitation du DOM
	if (vMountPointCommentL1.lastElementChild){																			// Il y a au moins 1 commentaire
		vLastCommentL1 = vMountPointCommentL1.lastElementChild;
		vLastCommentL1Id = vLastCommentL1.id;
		vLastCommentL1Number = vLastCommentL1Id.slice(vLastCommentL1Id.indexOf('-')+1);		// Prend tous les caractères situés après le "-"
		vlastPublishedCommentL1 = parseInt(vLastCommentL1Number) + 1;
	} else {																																			// Il n'y a aucun Post
		vlastPublishedCommentL1 = 0;
	}

	if (vlastPublishedCommentL1 + 1 > 0){
		vPuceNbCommentsL1.innerHTML = vlastPublishedCommentL1 + 1;
		vPuceNbCommentsL1.classList.replace('invisible','visible');
	} else {
		vPuceNbCommentsL1.classList.replace('visible','invisible');
	}

	// Ecriture du Commentaire proprement dit
	// <div class="media">
	vlineHTML.vDivMediaCommentL1 = window.document.createElement('div');
	vMountPointCommentL1.appendChild(vlineHTML.vDivMediaCommentL1);
	vlineHTML.vDivMediaCommentL1.setAttribute('id', 'idMediaCommentL1' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
	vlineHTML.vDivMediaCommentL1.setAttribute('class', 'media border rounded bgCommentL1  mb-1');

		//   <img src="..." class="mr-3" alt="...">
		vlineHTML.vImgCommentL1 = window.document.createElement('img');
		vlineHTML.vDivMediaCommentL1.appendChild(vlineHTML.vImgCommentL1);
		vlineHTML.vImgCommentL1.setAttribute('class', 'avatarToken tokenSize32 ml-2 mt-1');
		vlineHTML.vImgCommentL1.setAttribute('alt', 'Avatar');
		vlineHTML.vImgCommentL1.setAttribute('src', 'static/images/'+pCommentL1.commentL1AuthorPhoto);

		//   <div class="media-body">
		vlineHTML.vDivMediaBodyL1 = window.document.createElement('div');
		vlineHTML.vDivMediaCommentL1.appendChild(vlineHTML.vDivMediaBodyL1);
		vlineHTML.vDivMediaBodyL1.setAttribute('class', 'media-body bgCommentL1 border-left-0 rounded p-1');

		vlineHTML.vDivCommentL1HeaderRow = window.document.createElement('div');
		vlineHTML.vDivMediaBodyL1.appendChild(vlineHTML.vDivCommentL1HeaderRow);
		vlineHTML.vDivCommentL1HeaderRow.setAttribute('class', 'row m-0 py-1 px-0');

			//     <h5 class="mt-0">Media heading</h5>
			vlineHTML.vH5CommentL1Pseudo = window.document.createElement('h5');
			vlineHTML.vDivCommentL1HeaderRow.appendChild(vlineHTML.vH5CommentL1Pseudo);
			vlineHTML.vH5CommentL1Pseudo.setAttribute('class', 'my-0');
			vlineHTML.vH5CommentL1Pseudo.innerHTML = pCommentL1.commentL1AuthorPseudo;
			
			vlineHTML.vDivCommentL1TimeStamp = window.document.createElement('div');
			vlineHTML.vDivCommentL1HeaderRow.appendChild(vlineHTML.vDivCommentL1TimeStamp);
			vlineHTML.vDivCommentL1TimeStamp.setAttribute('class', 'text-dark p-0 ml-2 font-size-70 align-self-center');
			vlineHTML.vDivCommentL1TimeStamp.innerHTML = moment(pCommentL1.commentL1Date).format('[à commenté le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]');

			vlineHTML.vDivCommentL1TimeStampMoment = window.document.createElement('div');
			vlineHTML.vDivCommentL1HeaderRow.appendChild(vlineHTML.vDivCommentL1TimeStampMoment);
			vlineHTML.vDivCommentL1TimeStampMoment.setAttribute('id', 'idDivCommentL1TimeStampMoment'+ pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
			vlineHTML.vDivCommentL1TimeStampMoment.setAttribute('class', 'd-none');
			vlineHTML.vDivCommentL1TimeStampMoment.innerHTML = pCommentL1.commentL1Date;
		
		vlineHTML.vTextAreaCommentROL1 = window.document.createElement('textarea');
		vlineHTML.vDivMediaBodyL1.appendChild(vlineHTML.vTextAreaCommentROL1);
		vlineHTML.vTextAreaCommentROL1.setAttribute('id', 'idTextAreaCommentROL1' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
		vlineHTML.vTextAreaCommentROL1.setAttribute('class', 'form-control border rounded m-0 p-2 textAreaAutoResizable');
		vlineHTML.vTextAreaCommentROL1.setAttribute('name', 'textAreaCommentROL1' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
		vlineHTML.vTextAreaCommentROL1.setAttribute('rows', '1');
		vlineHTML.vTextAreaCommentROL1.setAttribute('readonly', '');
		vlineHTML.vTextAreaCommentROL1.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none; ');
		vlineHTML.vTextAreaCommentROL1.value = pCommentL1.commentL1Msg;
		vToolBox.autoResizeElem(vlineHTML.vTextAreaCommentROL1.id);						// Redimensionnement automatique (mais limité) du champs

	// On est toujours dans l'affichage du Commentaire L1, mais c'est le début de la zone permettant la gestion des Commentaires L2
	// C Ligne des boutons "Ajout de commentaire L2" et "Suppression de Commentaire L1"
	vlineHTML.vDivContFooterL2 = window.document.createElement('div');
	vlineHTML.vDivMediaBodyL1.appendChild(vlineHTML.vDivContFooterL2);
	vlineHTML.vDivContFooterL2.setAttribute('class', 'container my-2 pr-0');

		// R Ligne des boutons "Ajout de commentaire L1" et "Suppression de Post"
		vlineHTML.vDivRow2L2 = window.document.createElement('div');
		vlineHTML.vDivContFooterL2.appendChild(vlineHTML.vDivRow2L2);
		vlineHTML.vDivRow2L2.setAttribute('class', 'row justify-content-between my-2 mx-0 px-0');

		vlineHTML.vDivBtnAndPuceL2 = window.document.createElement('div');
		vlineHTML.vDivRow2L2.appendChild(vlineHTML.vDivBtnAndPuceL2);

			// Bouton "Ajouter un commentaire L1" et son icône
			vlineHTML.vBtnCommentL2 = window.document.createElement('button');
			vlineHTML.vDivBtnAndPuceL2.appendChild(vlineHTML.vBtnCommentL2);
			vlineHTML.vBtnCommentL2.setAttribute('id', 'idBtnCommentL2' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
			vlineHTML.vBtnCommentL2.setAttribute('type', 'button');
			vlineHTML.vBtnCommentL2.setAttribute('data-toggle', 'collapse');
			vlineHTML.vBtnCommentL2.setAttribute('data-target', '#idDivCollapseL2' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
			vlineHTML.vBtnCommentL2.setAttribute('aria-expanded', 'false');
			vlineHTML.vBtnCommentL2.setAttribute('aria-controls', 'idDivCollapseL2' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
			vlineHTML.vBtnCommentL2.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-success px-1 py-0');

				vlineHTML.vIIconCommentL2 = window.document.createElement('i');
				vlineHTML.vBtnCommentL2.appendChild(vlineHTML.vIIconCommentL2);
				vlineHTML.vIIconCommentL2.setAttribute('class', 'fa fa-commenting-o fa-2x text-dark');

			//<span id="idNbrWaitingInvit" class="badge badge-danger"></span>
			vlineHTML.vSpanNbCommentL2 = window.document.createElement('span');
			vlineHTML.vDivBtnAndPuceL2.appendChild(vlineHTML.vSpanNbCommentL2);
			vlineHTML.vSpanNbCommentL2.setAttribute('id', 'idNbCommentsL2' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
			vlineHTML.vSpanNbCommentL2.setAttribute('class', 'badge badge-danger ml-1 invisible');

			// Bouton "Suppression" + Gestion affichage de ce bouton en fonction du statut d'affichage du "Collapse"
			vlineHTML.vBtnDeleteCommentL1 = window.document.createElement('button');
			vlineHTML.vDivRow2L2.appendChild(vlineHTML.vBtnDeleteCommentL1);
			vlineHTML.vBtnDeleteCommentL1.setAttribute('id', 'idBtnDeleteCommentL1' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
			vlineHTML.vBtnDeleteCommentL1.setAttribute('type', 'button');
			vlineHTML.vBtnDeleteCommentL1.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-danger px-1 py-0 mr-3');
			vlineHTML.vBtnDeleteCommentL1.setAttribute('style', 'visibility: hidden;');
			vlineHTML.vBtnDeleteCommentL1.innerHTML = 'Supprimer';

			if 	((vMemberClient.member.pseudo === vlineHTML.vH5CommentL1Pseudo.innerHTML) || // Si je suis l'auteur du commentaire L1, je peux effacer mon commentaire
					(pActiveProfile === cstMainProfileActive)){													// Le propriétaire du mur peut effacer tous les Posts qu'il désire (les siens et ceux des autres)
				vlineHTML.vBtnDeleteCommentL1.style.visibility='visible';									// Alors Affichage du bouton de suppression du commentaire

				vDataToTransmit = {
					activeProfile : pActiveProfile,
				}

				vlineHTML.vBtnDeleteCommentL1.addEventListener('click', this.deletePublishedCommentL1.bind(this),false);
				vlineHTML.vBtnDeleteCommentL1.datas = vDataToTransmit;
			}

	// Card Footer
	vlineHTML.vDivFooterL2 = window.document.createElement('div');
	vlineHTML.vDivMediaBodyL1.appendChild(vlineHTML.vDivFooterL2); 
	vlineHTML.vDivFooterL2.setAttribute('class', 'card-footer bgCommentL5 border rounded ml-2 pl-1 mt-1 py-1 pr-1 d-none');
	
		// Gestion du "Collapse"
		// Debut de la zone "Collapse" - Tout ce qui est "Collapsé" à l'appui du bouton "AJouter un commentaire"
		vlineHTML.vDivCollapseL2 = window.document.createElement('div');
		vlineHTML.vDivFooterL2.appendChild(vlineHTML.vDivCollapseL2);
		vlineHTML.vDivCollapseL2.setAttribute('id', 'idDivCollapseL2' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
		vlineHTML.vDivCollapseL2.setAttribute('class', 'collapse');

			// C Ligne des champs de saisie "Ajout de commentaire L1" 
			vlineHTML.vDivContAddCommentL2 = window.document.createElement('div');
			vlineHTML.vDivCollapseL2.appendChild(vlineHTML.vDivContAddCommentL2);
			vlineHTML.vDivContAddCommentL2.setAttribute('class', 'container pr-0');
		
				vlineHTML.vDivRow3L2 = window.document.createElement('div');
				vlineHTML.vDivContAddCommentL2.appendChild(vlineHTML.vDivRow3L2);
				vlineHTML.vDivRow3L2.setAttribute('class', 'row');

					vlineHTML.vTextAreaCommentL2 = window.document.createElement('textarea');
					vlineHTML.vDivRow3L2.appendChild(vlineHTML.vTextAreaCommentL2);
					vlineHTML.vTextAreaCommentL2.setAttribute('id', 'idTextAreaCommentL2'+pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
					vlineHTML.vTextAreaCommentL2.setAttribute('placeholder', 'Répondre au commentaire...');
					vlineHTML.vTextAreaCommentL2.setAttribute('class', 'form-control mt-1 ml-0 mr-3 px-1 border textAreaAutoResizable');
					vlineHTML.vTextAreaCommentL2.setAttribute('name', 'textAreaCommentL2'+pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
					vlineHTML.vTextAreaCommentL2.setAttribute('rows', '1');
					vlineHTML.vTextAreaCommentL2.setAttribute('style', 'box-shadow: none; resize: none;');

			// Groupe d'éléments pour la création de commentaires L1 (Bouton "Clear" + Bouton "Validation")
				vlineHTML.vClearCommentL2 = window.document.createElement('div');
				vlineHTML.vDivCollapseL2.appendChild(vlineHTML.vClearCommentL2);
				vlineHTML.vClearCommentL2.setAttribute('class', 'row justify-content-between mt-1 mx-0 px-0');

					// Bouton "Clear L1"
					vlineHTML.vBtnClearCommentL2 = window.document.createElement('button');
					vlineHTML.vClearCommentL2.appendChild(vlineHTML.vBtnClearCommentL2);
					vlineHTML.vBtnClearCommentL2.setAttribute('id', 'idBtnClearCommentL2' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
					vlineHTML.vBtnClearCommentL2.setAttribute('class', 'btn btn-sm border pushBtnFilters');

						vlineHTML.vIIconClearCommentL2 = window.document.createElement('i');
						vlineHTML.vBtnClearCommentL2.appendChild(vlineHTML.vIIconClearCommentL2);
						vlineHTML.vIIconClearCommentL2.setAttribute('id', 'idIIconClearCommentL2' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
						vlineHTML.vIIconClearCommentL2.setAttribute('class', 'fa fa-fw fa-times');

					// Bouton "Validation L1" du commentaire
					vlineHTML.vBtnAddCommentL2 = window.document.createElement('button');
					vlineHTML.vClearCommentL2.appendChild(vlineHTML.vBtnAddCommentL2);
					vlineHTML.vBtnAddCommentL2.setAttribute('id', 'idBtnAddCommentL2' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
					vlineHTML.vBtnAddCommentL2.setAttribute('class', 'btn btn-sm border pushBtnFilters mr-3');

						vlineHTML.vIIconAddCommentL2 = window.document.createElement('i');
						vlineHTML.vBtnAddCommentL2.appendChild(vlineHTML.vIIconAddCommentL2);
						vlineHTML.vIIconAddCommentL2.setAttribute('id', 'idIIconAddCommentL2' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
						vlineHTML.vIIconAddCommentL2.setAttribute('class', 'fa fa-fw fa-check');



			// **********************************************************************************************************************************************
			// **********************************************************************************************************************************************
			// **********************************************************************************************************************************************
			// Début Zone des commentaires L2
			// **********************************************************************************************************************************************
			// **********************************************************************************************************************************************
			// **********************************************************************************************************************************************
			// Point de montage des commentaires 
			vlineHTML.vDivMountpointCommentL2 = window.document.createElement('div');
			vlineHTML.vDivCollapseL2.appendChild(vlineHTML.vDivMountpointCommentL2);
			vlineHTML.vDivMountpointCommentL2.setAttribute('id', 'idDivMountPointCommentL2' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1);
			vlineHTML.vDivMountpointCommentL2.setAttribute('class', 'bgCommentL5 text-dark mt-1 pl-1 pr-0 py-0 d-none');

			// Alimentation des commentaires L2 des différents Posts
			if (pCommentL1.commentL2){				// S'il y a des commentaires associés au Post en cours de traitement, alors affichage des commentaires dans le DOM
				pCommentL1.commentL2.forEach((item) => {
					item.postIndex 			=  pCommentL1.postIndex;
					item.commentL1Index = vlastPublishedCommentL1;	
				});
				this.displayStoredCommentL2(pCommentL1.commentL2, pActiveProfile);
			}


	var vDataToTransmit = {
		activeProfile 	: pActiveProfile,
	}

	vlineHTML.vBtnAddCommentL2.addEventListener('click', this.publishCommentL2.bind(this),false);
	vlineHTML.vBtnAddCommentL2.datas = vDataToTransmit;
	vlineHTML.vIIconAddCommentL2.datas = vDataToTransmit;

	vlineHTML.vBtnClearCommentL2.addEventListener('click', this.clearCommentL2.bind(this),false);
	vlineHTML.vBtnClearCommentL2.datas = vDataToTransmit;
  vlineHTML.vIIconClearCommentL2.datas = vDataToTransmit;	

	// Positionne le focus sur le champ du commentaire dès l'ouverture du "Collapse"
	$('#idDivCollapseL2' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1).on('shown.bs.collapse', (event) => {
		event.stopPropagation(); 
		event.preventDefault(); 
		this.formatCommentsL2(vlineHTML.vDivFooterL2, '#idTextAreaCommentL2', pActiveProfile, event )
	})

	// A la fermeture du Collapse, cache le Footer
	$('#idDivCollapseL2' +  pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedCommentL1).on('hidden.bs.collapse', (event) => {
		vlineHTML.vDivFooterL2.classList.replace('d-block', 'd-none');
		event.stopPropagation(); 
		event.preventDefault(); 
	});
}

// -----------------------------------------------------------------------------
// Cette méthode affiche les commentaires de Niveau 1 stockés en BDD à l'affichage 
// du post concerné
// -----------------------------------------------------------------------------
PostsClient.prototype.displayStoredCommentL1 = function(pCommentL1List, pActiveProfile){
	pCommentL1List.forEach((item) => {															// Pour chacun des posts du membre
		this.displayCommentL1(item, pActiveProfile);
	});
}



// -----------------------------------------------------------------------------
// Cette méthode supprime un commentaire de niveau 1
// -----------------------------------------------------------------------------
PostsClient.prototype.deletePublishedCommentL1 = function(event){
var vBtnClicked = event.target.id;												// Obtient le N° d'indice du bouton "Supprimer" dans le DOM
var vActiveProfile = event.target.datas.activeProfile;
var vPostIndex;
var vDivPostTimeStampMoment;
var vPostTimeStampMoment;
var vCommentL1Index;
var vDivCommentL1TimeStampMoment;
var vCommentL1TimeStampMoment;

	var vCompoundIndexPostAndL1 = vBtnClicked.slice(('idBtnDeleteCommentL1' + vActiveProfile).length, vBtnClicked.length);
	vPostIndex 			= vCompoundIndexPostAndL1.slice(0,vCompoundIndexPostAndL1.indexOf('-'));					 
	vCommentL1Index = vCompoundIndexPostAndL1.slice(vCompoundIndexPostAndL1.indexOf('-')+1);					 

	// On va lire la Date/Heure associée au Post
	vDivPostTimeStampMoment = document.getElementById('idDivPostTimeStampMoment'+vActiveProfile + vPostIndex);		
	vPostTimeStampMoment = moment(vDivPostTimeStampMoment.innerHTML).format();			// On formatte la Date/Heure au format par défaut, utilisé dans la BDD

	// On va lire la Date/Heure associée au Commentaire L1 que l'on supprime
	vDivCommentL1TimeStampMoment = document.getElementById('idDivCommentL1TimeStampMoment'+vActiveProfile + vCompoundIndexPostAndL1);		
	vCommentL1TimeStampMoment = moment(vDivCommentL1TimeStampMoment.innerHTML).format();			// On formatte la Date/Heure au format par défaut, utilisé dans la BDD

	var vCommentL1ToDelete = {
		postOwnerMail 	: this.memberClient.member.email,			// Propriétairre du mur
		postOwnerPseudo	: this.memberClient.member.pseudo,
		postDate				: vPostTimeStampMoment,
		postIndex				: parseInt(vPostIndex),
		commentL1Date		: vCommentL1TimeStampMoment,
		commentL1Index	: parseInt(vCommentL1Index),
	}

	webSocketConnection.emit('deleteCommentL1',vCommentL1ToDelete);
}

// -----------------------------------------------------------------------------
// Cette méthode supprime un commentaire de niveau 1
// -----------------------------------------------------------------------------
PostsClient.prototype.deleteCommentL1 = function(pCommentL1ToDelete, pActiveProfile){
	var vElem = document.getElementById('idMediaCommentL1' + pActiveProfile + pCommentL1ToDelete.postIndex + '-' + pCommentL1ToDelete.commentL1Index);
	var vParentNode = vElem.parentNode;
	
	// Effacement du commentaire L1 à l'écran
	vParentNode.removeChild(vElem);

	// Décalage des N° de Commentaires L1 supérieurs à celui qui vient d'être supprimé et de leurs L2
	this.renumberCommentsL1(0, 1, 0, vParentNode, pActiveProfile, pCommentL1ToDelete.postIndex, pCommentL1ToDelete.commentL1Index);

	var vPuceNbCommentsL1 = document.getElementById('idNbCommentsL1' + pActiveProfile + pCommentL1ToDelete.postIndex);
	var vNbCommentsL1 = parseInt(vPuceNbCommentsL1.innerHTML) - 1;
	vPuceNbCommentsL1.innerHTML = vNbCommentsL1;

	if (vNbCommentsL1 === 0){
		vPuceNbCommentsL1.classList.replace('visible','invisible');
	}
}
















// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Commentaire L2 et le stocke dans la BDD
// -----------------------------------------------------------------------------
PostsClient.prototype.addNewCommentL2 = function(pCommentL2Msg, pPostIndex, pPostTimeStampMoment, pCommentL1Index, pCommentL1TimeStampMoment){
	var vCommentL2ToAdd = {
		postOwnerMail					: this.memberClient.member.email,							// Clé N°1  : Le propriétaire du Post auquel va être rattaché le nouveau commentaire L1
		postOwnerPseudo				:	this.memberClient.member.pseudo,
		commentL2Date   			: moment().format(),													// Récupération de la date et heure actuelle de rédaction Commentaire
		commentL2Msg					: pCommentL2Msg,
		commentL2AuthorPseudo : vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		commentL2AuthorPhoto	:	vMemberClient.member.etatCivil.photo,
		postIndex							: parseInt(pPostIndex),																	// N° du Post auquel est rattaché le commentaire
		postDate							: pPostTimeStampMoment,												// Clé N° 2 : La Date/Heure du Post auquel va être rattaché le nouveau commentaire L1
		commentL1Index				:	parseInt(pCommentL1Index),														// N° du commentaire L1 auquel est rattaché le commentaire
		commentL1Date					: pCommentL1TimeStampMoment,									// Clé N° 2 : La Date/Heure du commentaire L1 auquel va être rattaché le nouveau commentaire L1
	}	

	webSocketConnection.emit('addNewCommentL2',vCommentL2ToAdd);
}	

// -----------------------------------------------------------------------------
// Cette méthode publie un nouveau commentaire de Niveau 2 (L2)
// -----------------------------------------------------------------------------
PostsClient.prototype.publishCommentL2 = function(event){
	var vBtnClicked 		= event.target.id;
	var vActiveProfile 	= event.target.datas.activeProfile;
	var vPostIndex;					 
	var vCommentL1Index;
	var vCompoundIndexPostAndL1;																								// Clé composée N° Post + N° Comment L1
	var vDivPostTimeStampMoment;
	var vPostTimeStampMoment;
	var vDivCommentL1TimeStampMoment;
	var vCommentL1TimeStampMoment;
	var vCommentL2Msg;
	
	if (vBtnClicked.startsWith('idIIconAddCommentL2')){
		vCompoundIndexPostAndL1 = vBtnClicked.slice(('idIIconAddCommentL2' + vActiveProfile).length, vBtnClicked.length);
	} else {
		vCompoundIndexPostAndL1 = vBtnClicked.slice(('idBtnAddCommentL2' + vActiveProfile).length, vBtnClicked.length);
	}
	
	vPostIndex 			= vCompoundIndexPostAndL1.slice(0,vCompoundIndexPostAndL1.indexOf('-'));					 
	vCommentL1Index = vCompoundIndexPostAndL1.slice(vCompoundIndexPostAndL1.indexOf('-')+1);					 

	// Récupération du TimeStamp du Post qui va avoir le commentaire
	// On va lire la Date/Heure associée au Post
	vDivPostTimeStampMoment = document.getElementById('idDivPostTimeStampMoment'+ vActiveProfile + vPostIndex);		
	vPostTimeStampMoment = moment(vDivPostTimeStampMoment.innerHTML).format();			// On formatte la Date/Heure au format par défaut, utilisé dans la BDD
	
	// Récupération du TimeStamp du commentaire L1 qui va avoir le commentaire L2
	// On va lire la Date/Heure associée au couple d'indexes composé (N° de Post et N° de commentaire L1)
	vDivCommentL1TimeStampMoment = document.getElementById('idDivCommentL1TimeStampMoment'+ vActiveProfile + vCompoundIndexPostAndL1);		
	vCommentL1TimeStampMoment = moment(vDivCommentL1TimeStampMoment.innerHTML).format();			// On formatte la Date/Heure au format par défaut, utilisé dans la BDD

	vCommentL2Msg = document.getElementById('idTextAreaCommentL2' + vActiveProfile + vCompoundIndexPostAndL1);
	if (vCommentL2Msg.value){
		this.addNewCommentL2(vCommentL2Msg.value, vPostIndex, vPostTimeStampMoment, vCommentL1Index, vCommentL1TimeStampMoment);
	}

	// Après transmission au serveur, on reset la valeur du champ, on rétablit sa taille par défaut, et on lui redonne le focus
	vCommentL2Msg.value = null;
	vToolBox.autoResizeElem(vCommentL2Msg.id);
	$('#'+vCommentL2Msg.id).focus();
}

// -----------------------------------------------------------------------------
// Cette méthode efface le champ de saisie du nouveau commentaire de Niveau 2 (L2)
// -----------------------------------------------------------------------------
PostsClient.prototype.clearCommentL2 = function(event){
	var vBtnClicked = event.target.id;
	var vActiveProfile = event.target.datas.activeProfile;

	if (vBtnClicked.startsWith('idIIconClearCommentL2')){
		vCompoundIndexPostAndL1 = vBtnClicked.slice(('idIIconClearCommentL2' + vActiveProfile).length, vBtnClicked.length);
	} else {
		vCompoundIndexPostAndL1 = vBtnClicked.slice(('idBtnClearCommentL2' + vActiveProfile).length, vBtnClicked.length);
	}

	document.getElementById('idTextAreaCommentL2'+ vActiveProfile + vCompoundIndexPostAndL1).value = '';
}

// -----------------------------------------------------------------------------
// Cette méthode effectue des actions sur les commentaires au moment de leur ouverture :
// - Cache le bouton "Suppression de Post" pour éviter la confusion avec les commentaires
// - Affiche le cadre container des commentaires du Post
// - Resize automatiquement les champs des commentaires qui le nécessitent
// - Donne le focus au champs de saisie du commentaire
// -----------------------------------------------------------------------------
PostsClient.prototype.formatCommentsL2 = function(pFooter, pTextAreaCommentL2, pActiveProfile, event){
	var vBtnClicked = event.target.id;												// Obtient le N° d'indice du bouton "Supprimer" dans le DOM
	var vElem;
	var vCompoundIndexPostAndL1;															// Clé composée N° Post + N° Comment L1
	
	pFooter.classList.replace('d-none', 'd-block');
	vCompoundIndexPostAndL1 = vBtnClicked.slice(('idDivCollapseL2' + pActiveProfile).length, vBtnClicked.length);
	
	vElem = document.getElementById('idDivMountPointCommentL2' + pActiveProfile + vCompoundIndexPostAndL1);
	if (vElem.firstElementChild){
		vElem.classList.replace('d-none','d-block');

		i=0;
		vElem = document.getElementById('idTextAreaCommentROL2' + pActiveProfile + vCompoundIndexPostAndL1 + '_' + i);
		while (vElem) {
			vToolBox.autoResizeElem(vElem.id);
			i++;
			vElem = document.getElementById('idTextAreaCommentROL2' + pActiveProfile + vCompoundIndexPostAndL1 + '_' + i);
		}
	}

	$(pTextAreaCommentL2 + pActiveProfile + vCompoundIndexPostAndL1).focus();
}

// -----------------------------------------------------------------------------
// Cette méthode affiche les commentaires de Niveau 2 stockés en BDD à l'affichage 
// des commentaires du post concerné et du commentaire L1 concerné
// -----------------------------------------------------------------------------
PostsClient.prototype.displayCommentL2 = function(pCommentL2, pActiveProfile){
	var vlineHTML = {};		
	var vlastPublishedCommentL2 = 0;
	var vMountPointCommentL2 = document.getElementById('idDivMountPointCommentL2' + pActiveProfile + pCommentL2.postIndex + '-' + pCommentL2.commentL1Index);
	var vPuceNbCommentsL2 = document.getElementById('idNbCommentsL2' + pActiveProfile + pCommentL2.postIndex + '-' + pCommentL2.commentL1Index);
	var vLastCommentL2Id;
	var vLastCommentL2Number;
	vMountPointCommentL2.classList.replace('d-none','d-block');

		
	// Détermine le dernier N° de Commentaire L2 par Exploitation du DOM
	if (vMountPointCommentL2.lastElementChild){																			// Il y a au moins 1 commentaire
		vLastCommentL2 = vMountPointCommentL2.lastElementChild;
		vLastCommentL2Id = vLastCommentL2.id;
		vLastCommentL2Number = vLastCommentL2Id.slice(vLastCommentL2Id.indexOf('_')+1);		// Prend tous les caractères situés après le "-"
		vlastPublishedCommentL2 = parseInt(vLastCommentL2Number) + 1;
	} else {																																			// Il n'y a aucun Post
		vlastPublishedCommentL2 = 0;
	}

	if (vlastPublishedCommentL2 + 1 > 0){
		vPuceNbCommentsL2.innerHTML = vlastPublishedCommentL2 + 1;
		vPuceNbCommentsL2.classList.replace('invisible','visible');
	} else {
		vPuceNbCommentsL2.classList.replace('visible','invisible');
	}



	// Ecriture du Commentaire proprement dit
	// <div class="media">
	vlineHTML.vDivMediaCommentL2 = window.document.createElement('div');
	vMountPointCommentL2.appendChild(vlineHTML.vDivMediaCommentL2);
	vlineHTML.vDivMediaCommentL2.setAttribute('id', 'idMediaCommentL2' + pActiveProfile + pCommentL2.postIndex + '-' + pCommentL2.commentL1Index + '_' + vlastPublishedCommentL2);
	vlineHTML.vDivMediaCommentL2.setAttribute('class', 'media mb-1');

		//   <img src="..." class="mr-3" alt="...">
		vlineHTML.vImgCommentL2 = window.document.createElement('img');
		vlineHTML.vDivMediaCommentL2.appendChild(vlineHTML.vImgCommentL2);
		vlineHTML.vImgCommentL2.setAttribute('class', 'avatarToken tokenSize32 ml-0 mt-1');
		vlineHTML.vImgCommentL2.setAttribute('alt', 'Avatar');
		vlineHTML.vImgCommentL2.setAttribute('src', 'static/images/'+pCommentL2.commentL2AuthorPhoto);

		//   <div class="media-body">
		vlineHTML.vDivMediaBodyL2 = window.document.createElement('div');
		vlineHTML.vDivMediaCommentL2.appendChild(vlineHTML.vDivMediaBodyL2);
		vlineHTML.vDivMediaBodyL2.setAttribute('class', 'media-body bgCommentL5 border rounded p-1');

		vlineHTML.vDivCommentL2HeaderRow = window.document.createElement('div');
		vlineHTML.vDivMediaBodyL2.appendChild(vlineHTML.vDivCommentL2HeaderRow);
		vlineHTML.vDivCommentL2HeaderRow.setAttribute('class', 'row m-0 py-1 px-0');

			//     <h5 class="mt-0">Media heading</h5>
			vlineHTML.vH5CommentL2Pseudo = window.document.createElement('h5');
			vlineHTML.vDivCommentL2HeaderRow.appendChild(vlineHTML.vH5CommentL2Pseudo);
			vlineHTML.vH5CommentL2Pseudo.setAttribute('class', 'my-0');
			vlineHTML.vH5CommentL2Pseudo.innerHTML = pCommentL2.commentL2AuthorPseudo;
			
			vlineHTML.vDivCommentL2TimeStamp = window.document.createElement('div');
			vlineHTML.vDivCommentL2HeaderRow.appendChild(vlineHTML.vDivCommentL2TimeStamp);
			vlineHTML.vDivCommentL2TimeStamp.setAttribute('class', 'text-dark p-0 ml-2 font-size-70 align-self-center');
			vlineHTML.vDivCommentL2TimeStamp.innerHTML = moment(pCommentL2.commentL2Date).format('[à commenté le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]');

			vlineHTML.vDivCommentL2TimeStampMoment = window.document.createElement('div');
			vlineHTML.vDivCommentL2HeaderRow.appendChild(vlineHTML.vDivCommentL2TimeStampMoment);
			vlineHTML.vDivCommentL2TimeStampMoment.setAttribute('id', 'idDivCommentL2TimeStampMoment'+ pActiveProfile + pCommentL2.postIndex + '-' + pCommentL2.commentL1Index  + '_' + vlastPublishedCommentL2);
			vlineHTML.vDivCommentL2TimeStampMoment.setAttribute('class', 'd-none');
			vlineHTML.vDivCommentL2TimeStampMoment.innerHTML = pCommentL2.commentL2Date;
		
		vlineHTML.vTextAreaCommentROL2 = window.document.createElement('textarea');
		vlineHTML.vDivMediaBodyL2.appendChild(vlineHTML.vTextAreaCommentROL2);
		vlineHTML.vTextAreaCommentROL2.setAttribute('id', 'idTextAreaCommentROL2' + pActiveProfile + pCommentL2.postIndex + '-' + pCommentL2.commentL1Index  + '_' + vlastPublishedCommentL2);
		vlineHTML.vTextAreaCommentROL2.setAttribute('class', 'form-control border rounded m-0 p-2 textAreaAutoResizable');
		vlineHTML.vTextAreaCommentROL2.setAttribute('name', 'textAreaCommentROL2' + pActiveProfile + pCommentL2.postIndex + '-' + pCommentL2.commentL1Index  + '_' + vlastPublishedCommentL2);
		vlineHTML.vTextAreaCommentROL2.setAttribute('rows', '1');
		vlineHTML.vTextAreaCommentROL2.setAttribute('readonly', '');
		vlineHTML.vTextAreaCommentROL2.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none; ');
		vlineHTML.vTextAreaCommentROL2.value = pCommentL2.commentL2Msg;
		vToolBox.autoResizeElem(vlineHTML.vTextAreaCommentROL2.id);						// Redimensionnement automatique (mais limité) du champs

	// On est toujours dans l'affichage du Commentaire L2, mais c'est le début de la zone permettant la gestion des Commentaires L3 ((si je les implémente)
	// C Ligne du boutons  "Suppression de Commentaire L2"
		vlineHTML.vDivContFooterL3 = window.document.createElement('div');
		vlineHTML.vDivMediaBodyL2.appendChild(vlineHTML.vDivContFooterL3);
		vlineHTML.vDivContFooterL3.setAttribute('class', 'container my-2 pr-0');

			// R Ligne des boutons "Ajout de commentaire L1" et "Suppression de Post"
			vlineHTML.vDivRow2L3 = window.document.createElement('div');
			vlineHTML.vDivContFooterL3.appendChild(vlineHTML.vDivRow2L3);
			vlineHTML.vDivRow2L3.setAttribute('class', 'row justify-content-between my-2 mx-0 px-0');

			// Bouton "Ajouter un commentaire L1" et son icône
			vlineHTML.vBtnCommentL2 = window.document.createElement('button');
			vlineHTML.vDivRow2L3.appendChild(vlineHTML.vBtnCommentL2);
			vlineHTML.vBtnCommentL2.setAttribute('type', 'button');
			vlineHTML.vBtnCommentL2.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-success px-1 py-0 invisible');

				vlineHTML.vIIconCommentL3 = window.document.createElement('i')
				vlineHTML.vBtnCommentL2.appendChild(vlineHTML.vIIconCommentL3)
				vlineHTML.vIIconCommentL3.setAttribute('class', 'fa fa-commenting-o fa-2x text-dark')

			// Bouton "Suppression" + Gestion affichage de ce bouton en fonction du statut d'affichage du "Collapse"
			vlineHTML.vBtnDeleteCommentL2 = window.document.createElement('button');
			vlineHTML.vDivRow2L3.appendChild(vlineHTML.vBtnDeleteCommentL2);
			vlineHTML.vBtnDeleteCommentL2.setAttribute('id', 'idBtnDeleteCommentL2' + pActiveProfile + pCommentL2.postIndex + '-' + pCommentL2.commentL1Index  + '_' + vlastPublishedCommentL2);
			vlineHTML.vBtnDeleteCommentL2.setAttribute('type', 'button');
			vlineHTML.vBtnDeleteCommentL2.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-danger px-1 py-0 mr-3');
			vlineHTML.vBtnDeleteCommentL2.setAttribute('style', 'visibility: hidden;');
			vlineHTML.vBtnDeleteCommentL2.innerHTML = 'Supprimer';

			if 	((vMemberClient.member.pseudo === vlineHTML.vH5CommentL2Pseudo.innerHTML) || // Si je suis l'auteur du commentaire L1, je peux effacer mon commentaire
					(pActiveProfile === cstMainProfileActive)){													// Le propriétaire du mur peut effacer tous les Posts qu'il désire (les siens et ceux des autres)
				vlineHTML.vBtnDeleteCommentL2.style.visibility='visible';									// Alors Affichage du bouton de suppression du commentaire

				vDataToTransmit = {
					activeProfile : pActiveProfile,
				}

				vlineHTML.vBtnDeleteCommentL2.addEventListener('click', this.deletePublishedCommentL2.bind(this),false);
				vlineHTML.vBtnDeleteCommentL2.datas = vDataToTransmit;
			}
}

// -----------------------------------------------------------------------------
// Cette méthode affiche les commentaires de Niveau 2 stockés en BDD à l'affichage 
// des commentaires du post concerné et du commentaire L1 concerné
// -----------------------------------------------------------------------------
PostsClient.prototype.displayStoredCommentL2 = function(pCommentL2List, pActiveProfile){
	pCommentL2List.forEach((item) => {															// Pour chacun des commentaires L2
		this.displayCommentL2(item, pActiveProfile);
	});
}















// -----------------------------------------------------------------------------
// Cette méthode supprime un commentaire de niveau 2
// -----------------------------------------------------------------------------
PostsClient.prototype.deletePublishedCommentL2 = function(event){
	var vBtnClicked = event.target.id;												// Obtient le N° d'indice du bouton "Supprimer" dans le DOM
	var vActiveProfile = event.target.datas.activeProfile;
	var vPostIndex;
	var vDivPostTimeStampMoment;
	var vPostTimeStampMoment;
	var vCommentL1Index;
	var vDivCommentL1TimeStampMoment;
	var vCommentL1TimeStampMoment;
	var vCommentL2Index;
	var vDivCommentL2TimeStampMoment;
	var vCommentL2TimeStampMoment;
	
	var vCompoundIndexPostAndL1AndL2 = vBtnClicked.slice(('idBtnDeleteCommentL2' + vActiveProfile).length, vBtnClicked.length);
	vPostIndex 			= vCompoundIndexPostAndL1AndL2.slice(0,vCompoundIndexPostAndL1AndL2.indexOf('-'));					 
	vCommentL1Index = vCompoundIndexPostAndL1AndL2.slice(vCompoundIndexPostAndL1AndL2.indexOf('-')+1, vCompoundIndexPostAndL1AndL2.indexOf('_'));					 
	vCommentL2Index = vCompoundIndexPostAndL1AndL2.slice(vCompoundIndexPostAndL1AndL2.indexOf('_')+1);					 

	// On va lire la Date/Heure associée au Post
	vDivPostTimeStampMoment = document.getElementById('idDivPostTimeStampMoment'+vActiveProfile + vPostIndex);		
	vPostTimeStampMoment = moment(vDivPostTimeStampMoment.innerHTML).format();			// On formatte la Date/Heure au format par défaut, utilisé dans la BDD

	// On va lire la Date/Heure associée au Commentaire L1 auquel appartient le commentaire L2 que l'on supprime
	vDivCommentL1TimeStampMoment = document.getElementById('idDivCommentL1TimeStampMoment'+vActiveProfile + vPostIndex + '-' + vCommentL1Index);		
	vCommentL1TimeStampMoment = moment(vDivCommentL1TimeStampMoment.innerHTML).format();			// On formatte la Date/Heure au format par défaut, utilisé dans la BDD

	// On va lire la Date/Heure associée au Commentaire L2 que l'on supprime
	vDivCommentL2TimeStampMoment = document.getElementById('idDivCommentL2TimeStampMoment'+vActiveProfile + vCompoundIndexPostAndL1AndL2);		
	vCommentL2TimeStampMoment = moment(vDivCommentL2TimeStampMoment.innerHTML).format();			// On formatte la Date/Heure au format par défaut, utilisé dans la BDD


	var vCommentL2ToDelete = {
		postOwnerMail 	: this.memberClient.member.email,			// Propriétairre du mur
		postOwnerPseudo	: this.memberClient.member.pseudo,
		postDate				: vPostTimeStampMoment,
		postIndex				: parseInt(vPostIndex),
		commentL1Date		: vCommentL1TimeStampMoment,
		commentL1Index	: parseInt(vCommentL1Index),
		commentL2Date		: vCommentL2TimeStampMoment,
		commentL2Index	: parseInt(vCommentL2Index),
	}

		webSocketConnection.emit('deleteCommentL2',vCommentL2ToDelete);
}
	
// -----------------------------------------------------------------------------
// Cette méthode supprime un commentaire de niveau 2
// -----------------------------------------------------------------------------
PostsClient.prototype.deleteCommentL2 = function(pCommentL2ToDelete, pActiveProfile){
	var vElem = document.getElementById('idMediaCommentL2' + pActiveProfile + pCommentL2ToDelete.postIndex + '-' + pCommentL2ToDelete.commentL1Index + '_' + pCommentL2ToDelete.commentL2Index);
	var vParentNode = vElem.parentNode;
	
	// Effacement du commentaire L1 à l'écran
	vParentNode.removeChild(vElem);

	// Décalage des N° de Commentaires L2 supérieurs à celui qui vient d'être supprimé 
	this.renumberCommentsL2(0, 0, 1, vParentNode, pActiveProfile, pCommentL2ToDelete.postIndex, pCommentL2ToDelete.commentL1Index, pCommentL2ToDelete.commentL2Index);

	var vPuceNbCommentsL2 = document.getElementById('idNbCommentsL2' + pActiveProfile + pCommentL2ToDelete.postIndex + '-' + pCommentL2ToDelete.commentL1Index);
	var vNbCommentsL2 = parseInt(vPuceNbCommentsL2.innerHTML) - 1;
	vPuceNbCommentsL2.innerHTML = vNbCommentsL2;

	if (vNbCommentsL2 === 0){
		vPuceNbCommentsL2.classList.replace('visible','invisible');
	}
}








// -----------------------------------------------------------------------------
// Décalage des N° de commentaires L2 dans les commentaires L1 dans les Posts 
// suivants un Post supprimé
// -----------------------------------------------------------------------------
PostsClient.prototype.renumberCommentsL2 = function(pCalledFromPost, pCalledFromL1, pCalledFromL2, 
																										pMountPointCommentL2, pActiveProfile, pPostIndex, pCommentL1Index, pCommentL2Index){
	var vElemId;
	var vElem;
	var vElemRoot;
	var vLastCommentL2Id;
	var vLastCommentL2Number;

	if (pMountPointCommentL2.lastElementChild){
		vLastCommentL2Id = pMountPointCommentL2.lastElementChild.id;																// S'il y a au moins 1 commentaire, je récupère son Id

		// On récupère le dernier N° de commentaire en prenant tous les caractères situés après le "-" dans l'Id du commentaire ()= N° de commentaire)
		vLastCommentL2Number = parseInt(vLastCommentL2Id.slice(vLastCommentL2Id.indexOf('_')+1));		// Il servira de borne haute dans la boucle "for" qui suit

		for (var k=pCommentL2Index; k <= (vLastCommentL2Number - pCalledFromL2); k++){																			
			vElemId = 'idMediaCommentL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (pCommentL1Index + pCalledFromL1) + '_' + (k + pCalledFromL2); 
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idMediaCommentL2'+pActiveProfile).length); 								
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + pCommentL1Index + '_' + k);				

			vElemId = 'idDivCommentL2TimeStampMoment'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (pCommentL1Index + pCalledFromL1) + '_' + (k + pCalledFromL2); 
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idDivCommentL2TimeStampMoment'+pActiveProfile).length); 		
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + pCommentL1Index + '_' + k);				

			vElemId = 'idTextAreaCommentROL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (pCommentL1Index + pCalledFromL1) + '_' + (k + pCalledFromL2);							
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idTextAreaCommentROL2'+pActiveProfile).length); 						
			vElem.setAttribute('name','textAreaCommentROL2' + pActiveProfile + pPostIndex + '-' + pCommentL1Index + '_' + k);	
			vElem.setAttribute('id', vElemRoot + pPostIndex + '-' + pCommentL1Index + '_' + k);																

			vElemId = 'idBtnDeleteCommentL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (pCommentL1Index + pCalledFromL1) + '_' + (k + pCalledFromL2);	
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idBtnDeleteCommentL2'+pActiveProfile).length); 							
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + pCommentL1Index + '_' + k);					
		}
	}
}

// -----------------------------------------------------------------------------
// Décalage des N° de commentaires L1 dans les Posts suivants un Post supprimé
// -----------------------------------------------------------------------------
PostsClient.prototype.renumberCommentsL1 = function(pCalledFromPost, pCalledFromL1, pCalledFromL2, pMountPointCommentL1, pActiveProfile, pPostIndex, PCommentL1Index){
	var vElemId;
	var vElem;
	var vElemRoot;
	var vLastCommentL1Id;
	var vLastCommentL1Number;
	var vMountPointCommentL2;
	

	if (pMountPointCommentL1.lastElementChild){
		vLastCommentL1Id = pMountPointCommentL1.lastElementChild.id;						// S'il y a au moins 1 commentaire, je récupère son Id
		
		// On récupère le dernier N° de commentaire en prenant tous les caractères situés après le "-" dans l'Id du commentaire ()= N° de commentaire)
		vLastCommentL1Number = parseInt(vLastCommentL1Id.slice(vLastCommentL1Id.indexOf('-')+1));							// Il servira de borne haute dans la boucle "for" qui suit
		for (var j = PCommentL1Index; j <= (vLastCommentL1Number - pCalledFromL1); j++){																			
			vElemId = 'idMediaCommentL1'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);									
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idMediaCommentL1'+pActiveProfile).length); 								
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + j);																
		
			vElemId = 'idDivCommentL1TimeStampMoment'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);			
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idDivCommentL1TimeStampMoment'+pActiveProfile).length); 		
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + j);																
		
			vElemId = 'idTextAreaCommentROL1'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);							
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idTextAreaCommentROL1'+pActiveProfile).length); 						
			vElem.setAttribute('name','textAreaCommentROL1' + pActiveProfile + pPostIndex + '-' + j);	
			vElem.setAttribute('id', vElemRoot + pPostIndex + '-' + j);																
		
			vElemId = 'idBtnCommentL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);										
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idBtnCommentL2'+pActiveProfile).length); 									
			vElem.setAttribute('data-target','#idDivCollapseL2' + pActiveProfile + pPostIndex + '-' + j);		
			vElem.setAttribute('aria-controls','idDivCollapseL2' + pActiveProfile + pPostIndex + '-' + j);	
			vElem.setAttribute('id', vElemRoot + pPostIndex + '-' + j);																
		
			vElemId = 'idBtnDeleteCommentL1'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);							
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idBtnDeleteCommentL1'+pActiveProfile).length); 						
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + j);																
		
			vElemId = 'idDivCollapseL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);										
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idDivCollapseL2'+pActiveProfile).length); 									
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + j);																
		
			vElemId = 'idTextAreaCommentL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);								
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idTextAreaCommentL2'+pActiveProfile).length); 							
			vElem.setAttribute('name','textAreaCommentL2' + pActiveProfile + pPostIndex + '-' + j);		
			vElem.setAttribute('id', vElemRoot + pPostIndex + '-' + j);																
		
			vElemId = 'idBtnClearCommentL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);								
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idBtnClearCommentL2'+pActiveProfile).length); 							
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + j);																
		
			vElemId = 'idIIconClearCommentL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);							
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idIIconClearCommentL2'+pActiveProfile).length); 						
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + j);																
		
			vElemId = 'idBtnAddCommentL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);									
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idBtnAddCommentL2'+pActiveProfile).length); 								
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + j);																
		
			vElemId = 'idIIconAddCommentL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);								
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idIIconAddCommentL2'+pActiveProfile).length); 							
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + j);																
		
			// Décalage des N° de Posts dans les commentaires L2 qui sont liés aux comme,ntaires L1 liés eux-même au Post

			// On récupère le point de montage des commentaires
			vMountPointCommentL2 = document.getElementById('idDivMountPointCommentL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1)) 
			this.renumberCommentsL2(pCalledFromPost, pCalledFromL1, pCalledFromL2, vMountPointCommentL2, pActiveProfile, pPostIndex, j, 0);

			vElemId = 'idDivMountPointCommentL2'+ pActiveProfile + (pPostIndex + pCalledFromPost) + '-' + (j + pCalledFromL1);					
			vElem = document.getElementById(vElemId);																									
			vElemRoot = vElemId.slice(0, ('idDivMountPointCommentL2'+pActiveProfile).length); 				
			vElem.setAttribute('id',vElemRoot + pPostIndex + '-' + j);																
		}
	}
}

// -----------------------------------------------------------------------------
// Cette méthode regenere une numerotation des iD de tous les Posts postérieurs 
// pour combler les trous et faciliter la gestion des évenements sur tous les postes
// -----------------------------------------------------------------------------
PostsClient.prototype.renumberPosts = function(pParentNode, pPostToDelete, pActiveProfile){
	var vMountPointCommentL1;

	// Renommage de tous les Posts supérieurs pour avoir une numérotation sequentielle des Posts (sans trous)
	if (pParentNode.firstElementChild.nextElementSibling){
		var vLastPost = pParentNode.firstElementChild.nextElementSibling.id;				// Identifiant du dernier Post car il est toujours suivant de la carte "PosteEdit"
		var vMaxPostNumber = vLastPost.slice(('idPublishedPost'+pActiveProfile).length, vLastPost.length);
		
		var i = pPostToDelete.index;
		while (i < vMaxPostNumber){   // Index du Post
			document.getElementById('idPublishedPost'+ pActiveProfile + (i + 1)).setAttribute('id', 'idPublishedPost'+ pActiveProfile + i);
			document.getElementById('idDivPostTimeStampMoment'+ pActiveProfile + (i + 1)).setAttribute('id', 'idDivPostTimeStampMoment'+ pActiveProfile + i);
			document.getElementById('idPublishedPostArea'+ pActiveProfile + (i + 1)).setAttribute('name', 'publishedPostArea'+ pActiveProfile + i);
			document.getElementById('idPublishedPostArea'+ pActiveProfile + (i + 1)).setAttribute('id', 'idPublishedPostArea'+ pActiveProfile + i);
			
			document.getElementById('idBtnCommentL1'+ pActiveProfile + (i + 1)).setAttribute('data-target', '#idDivCollapseL1'+ pActiveProfile + i);
			document.getElementById('idBtnCommentL1'+ pActiveProfile + (i + 1)).setAttribute('aria-controls', 'idDivCollapseL1'+ pActiveProfile + i);
			document.getElementById('idBtnCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnCommentL1'+ pActiveProfile + i);
			document.getElementById('idDivCollapseL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idDivCollapseL1'+ pActiveProfile + i);
			
			document.getElementById('idBtnDeletePost'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnDeletePost'+ pActiveProfile + i);
			
			document.getElementById('idTextAreaCommentL1'+ pActiveProfile + (i + 1)).setAttribute('name', 'textAreaCommentL1'+ pActiveProfile + i);
			document.getElementById('idTextAreaCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idTextAreaCommentL1'+ pActiveProfile + i);

			document.getElementById('idBtnClearCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnClearCommentL1'+ pActiveProfile + i);
			document.getElementById('idIIconClearCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idIIconClearCommentL1'+ pActiveProfile + i);
			document.getElementById('idBtnAddCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnAddCommentL1'+ pActiveProfile + i);
			document.getElementById('idIIconAddCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idIIconAddCommentL1'+ pActiveProfile + i);
			

			// Décalage des N° de Posts dans les commentaires L1 et L2 qui sont liés au Post
			// On récupère le point de montage des commentaires
			vMountPointCommentL1 = document.getElementById('idDivMountPointCommentL1'+ pActiveProfile + (i + 1));
			this.renumberCommentsL1(1, 0, 0, vMountPointCommentL1, pActiveProfile, i, 0);

			vMountPointCommentL1.setAttribute('id', 'idDivMountPointCommentL1'+ pActiveProfile + i);
			i++;
		}
	}
}

// -----------------------------------------------------------------------------
// Cette méthode supprime le Post correspondant à l'index passé en paramètre
// Regenere une numerotation des iD de tous les Posts postérieurs pour combler
// Les trous et faciliter la gestion des évenements sur tous les postes
// -----------------------------------------------------------------------------
PostsClient.prototype.deletePost = function(pPostToDelete, pActiveProfile){
	var vElem = document.getElementById('idPublishedPost' + pActiveProfile + pPostToDelete.index);
	var vParentNode = vElem.parentNode;
	
	// Effacement du Post
	vParentNode.removeChild(vElem);
	
	this.renumberPosts(vParentNode, pPostToDelete, pActiveProfile);
}

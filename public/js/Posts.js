// ************************************************************************
// ***      Posts : Objet gestion des posts                              ***
// ***                                                                  ***
// *** Objet : Posts                                                     ***
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

function Posts(pMemberClient){   						// Fonction constructeur exportée
	this.memberClient = pMemberClient;
	this.lastPublishedPost = 0;				// N0 du dernier Post publié affiché
	this.vPostTitle;
	this.vPostMsg;
};

// ---------------------------------------------------------------------------------------------------------------------------
// Gestion des Posts
// Apres validation de la saisie dans la carte "Posts"
// Création d'un posts contenant le Posts qui vient d'être rédigé
// ---------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Cette méthode affiche la carte de saisie des Posts
// -----------------------------------------------------------------------------
Posts.prototype.displayPostEdit = function(){
	var vlineHTML = {};						
	var vMountPointPostEdit = document.getElementById('idDivMountPointPostEdit'+vActiveProfile);

  // <div class="card text-white bg-warning border-warning mb-3">
	vlineHTML.vDivCard = window.document.createElement('div');
	vMountPointPostEdit.appendChild(vlineHTML.vDivCard);
	vlineHTML.vDivCard.setAttribute('id', 'idPostEditCard'+vActiveProfile);
	vlineHTML.vDivCard.setAttribute('class', 'card text-white bg-warning border-warning mb-3');

  // <div class="card-header">
	vlineHTML.vDivCardHeader = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardHeader);
	vlineHTML.vDivCardHeader.setAttribute('class', 'card-header py-0 pb-1');

//     <h5 class="card-title text-dark">Postez vos idées et informations...</h5>
	vlineHTML.vH5Header = window.document.createElement('h5');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vH5Header);
	vlineHTML.vH5Header.setAttribute('class', 'card-title text-dark ml-0');
	vlineHTML.vH5Header.innerHTML = 'Postez vos idées et informations...';

//   <div class="card-body bg-white text-dark px-1 pb-0">
	vlineHTML.vDivCardBody = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardBody);
	vlineHTML.vDivCardBody.setAttribute('class', 'card-body bg-white text-dark px-1 pb-0');

//     <div class="form-group">
	vlineHTML.vDivFormGroup = window.document.createElement('div');
	vlineHTML.vDivCardBody.appendChild(vlineHTML.vDivFormGroup);
	vlineHTML.vDivFormGroup.setAttribute('class', 'form-group');

//       <form>
	vlineHTML.vForm = window.document.createElement('form');
	vlineHTML.vDivFormGroup.appendChild(vlineHTML.vForm);
	
//         <div class="container px-1">
	vlineHTML.vDivContainer = window.document.createElement('div');
	vlineHTML.vForm.appendChild(vlineHTML.vDivContainer);
	vlineHTML.vDivContainer.setAttribute('class', 'container px-1');

//           <div class="row m-0">
	vlineHTML.vDivRow = window.document.createElement('div');
	vlineHTML.vDivContainer.appendChild(vlineHTML.vDivRow);
	vlineHTML.vDivRow.setAttribute('class', 'row m-0');

//             <h5 class="p-0 m-0 ">Sujet : </h5>
	vlineHTML.vH5Subject = window.document.createElement('h5');
	vlineHTML.vDivRow.appendChild(vlineHTML.vH5Subject);
	vlineHTML.vH5Subject.setAttribute('class', 'col-auto p-0 m-0');
	vlineHTML.vH5Subject.innerHTML = 'Sujet : ';

//  <input type="text" placeholder="Titre du sujet" id="idAccountPresentation" class="ml-2" name="accountPresentation" style="border: none !important; box-shadow: none; ">
	vlineHTML.vInputSubject = window.document.createElement('input');
	vlineHTML.vDivRow.appendChild(vlineHTML.vInputSubject);
	vlineHTML.vInputSubject.setAttribute('id', 'idPostEditTitle'+vActiveProfile);
	vlineHTML.vInputSubject.setAttribute('type', 'text');
	vlineHTML.vInputSubject.setAttribute('placeholder', 'Titre du sujet');
	vlineHTML.vInputSubject.setAttribute('class', 'col-10 mx-auto px-0');
	vlineHTML.vInputSubject.setAttribute('name', 'postEditTitle'+vActiveProfile);
	vlineHTML.vInputSubject.setAttribute('style', 'border: none !important; box-shadow: none;');
	
//           <textarea id="idAccountPresentation" rows="8" name="accountPresentation" placeholder="Tapez votre texte ici..." style="border: none !important; box-shadow: none; height: 100px;" class="form-control px-0 pb-0">
	vlineHTML.vTextAreaPost = window.document.createElement('textarea');
	vlineHTML.vDivContainer.appendChild(vlineHTML.vTextAreaPost);
	vlineHTML.vTextAreaPost.setAttribute('id', 'idPostEditArea'+vActiveProfile);
	vlineHTML.vTextAreaPost.setAttribute('class', 'form-control mt-1 px-0 pb-0 textAreaAutoResizable');
	vlineHTML.vTextAreaPost.setAttribute('name', 'postEditArea'+vActiveProfile);
	vlineHTML.vTextAreaPost.setAttribute('placeholder', 'Tapez votre texte ici...');
	vlineHTML.vTextAreaPost.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none;');

//   <div class="card-footer row justify-content-end py-1">
	vlineHTML.vDivFooter = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivFooter);
	vlineHTML.vDivFooter.setAttribute('class', 'card-footer row justify-content-end py-1');
	
//       <button type="button" class="btn btn-outline-success mr-4">Post</button>
	vlineHTML.vBtnValidPost = window.document.createElement('button');
	vlineHTML.vDivFooter.appendChild(vlineHTML.vBtnValidPost);
	vlineHTML.vBtnValidPost.setAttribute('id', 'idBtnValidPost'+vActiveProfile);
	vlineHTML.vBtnValidPost.setAttribute('type', 'button');

	vlineHTML.vBtnValidPost.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters mr-4 border-success');
	vlineHTML.vBtnValidPost.innerHTML = 'Post';

	vlineHTML.vBtnValidPost.addEventListener('click', this.publishPost.bind(this),false);
	vlineHTML.vBtnValidPost.datas = vDataToTransmit;

	this.vPostTitle = document.getElementById('idPostEditTitle'+vActiveProfile);
	this.vPostMsg = document.getElementById('idPostEditArea'+vActiveProfile);

	// Permet de passer automatiquement dans le champ 'textArea' de la carte "PostEdit"
	$('#idPostEditTitle'+vActiveProfile).bind("keydown", function(event) {
    if (event.which === 13) {
			event.stopPropagation();
			event.preventDefault();
			$('#idPostEditArea'+vActiveProfile).focus();
    }
	});

	// Permet d'auto-resizer les champs "textare" ayant le selecteur CSS "textAreaAutoResizable", 
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
Posts.prototype.displayPublishedPosts = function(pSubject, pMessage){
	var vlineHTML = {};						
	var vMountPointPostEdit = document.getElementById('idDivMountPointPostEdit'+vActiveProfile);

	// Détermination du N° d'Id
	// le N° d'Id est déterminé automatiquement par cette méthode
	while ($('#idPublishedPost'+ vActiveProfile +this.lastPublishedPost).length > 0) { 
		this.lastPublishedPost++;
	}

  // <div class="card text-white bg-warning border-warning mb-3">
	vlineHTML.vDivCard = window.document.createElement('div');

	if(this.lastPublishedPost === 0){									// Si c'est le 1er Post affiché, je l'affiche juste en dessous de l'éditeur de Posts
		vMountPointPostEdit.appendChild(vlineHTML.vDivCard);
	} else {																					// sinon je l'insere entre l'éditeur de Posts, et le dernier Post affiché situé juste au dessous
		var vLastPublishedPost = document.getElementById('idPublishedPost'+ vActiveProfile +(this.lastPublishedPost - 1));
		var parentDiv = vLastPublishedPost.parentNode;
		parentDiv.insertBefore(vlineHTML.vDivCard, vLastPublishedPost);
	}

	vlineHTML.vDivCard.setAttribute('id', 'idPublishedPost'+ vActiveProfile + this.lastPublishedPost);
	vlineHTML.vDivCard.setAttribute('class', 'card text-white bg-warning border-warning mb-3');

  // <div class="card-header">
	vlineHTML.vDivCardHeader = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardHeader);
	vlineHTML.vDivCardHeader.setAttribute('class', 'card-header py-0 pb-1');

  // <img src="static/images/favicon.png" class="ml-0" alt="Logo de 'Collect'Or'" height="50px">
	vlineHTML.vImgHeader = window.document.createElement('img');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vImgHeader);
	vlineHTML.vImgHeader.setAttribute('class', 'ml-0');
	vlineHTML.vImgHeader.setAttribute('src', 'static/images/favicon.png');
	vlineHTML.vImgHeader.setAttribute('alt', 'Logo de \'Collect\'Or');
	vlineHTML.vImgHeader.setAttribute('style', 'height: 50px;');

//     <h5 class="card-title text-dark">Postez vos idées et informations...</h5>
	vlineHTML.vH5Header = window.document.createElement('h5');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vH5Header);
	vlineHTML.vH5Header.setAttribute('class', 'card-title text-dark');
	vlineHTML.vH5Header.innerHTML = 'Postez vos idées et informations...';

//   <div class="card-body bg-white text-dark px-1 pb-0">
	vlineHTML.vDivCardBody = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardBody);
	vlineHTML.vDivCardBody.setAttribute('class', 'card-body bg-white text-dark px-1 pb-0');
	
//         <div class="container px-1">
	vlineHTML.vDivContainer = window.document.createElement('div');
	vlineHTML.vDivCardBody.appendChild(vlineHTML.vDivContainer);
	vlineHTML.vDivContainer.setAttribute('class', 'container px-1');

//           <div class="row m-0">
	vlineHTML.vDivRow = window.document.createElement('div');
	vlineHTML.vDivContainer.appendChild(vlineHTML.vDivRow);
	vlineHTML.vDivRow.setAttribute('class', 'row m-0');

//             <h5 class="p-0 m-0 ">Sujet : </h5>
	vlineHTML.vH5Subject = window.document.createElement('h5');
	vlineHTML.vDivRow.appendChild(vlineHTML.vH5Subject);
	vlineHTML.vH5Subject.setAttribute('class', 'col-auto p-0 m-0');
	vlineHTML.vH5Subject.innerHTML = 'Sujet : ';

//  <input type="text" placeholder="Titre du sujet" id="idAccountPresentation" class="ml-2" name="accountPresentation" style="border: none !important; box-shadow: none; ">
	vlineHTML.vInputSubject = window.document.createElement('input');
	vlineHTML.vDivRow.appendChild(vlineHTML.vInputSubject);
	vlineHTML.vInputSubject.setAttribute('id', 'idPublishedPostTitle' + vActiveProfile + this.lastPublishedPost);
	vlineHTML.vInputSubject.setAttribute('type', 'text');
	vlineHTML.vInputSubject.setAttribute('readonly', '');
	vlineHTML.vInputSubject.setAttribute('class', 'col-10 mx-auto px-0');
	vlineHTML.vInputSubject.setAttribute('name', 'publishedPostTitle'+vActiveProfile);
	vlineHTML.vInputSubject.setAttribute('style', 'border: none !important; box-shadow: none;');
	if (!pSubject){
		vlineHTML.vInputSubject.value = 'Sans titre';
	} else {
		vlineHTML.vInputSubject.value = pSubject;
	}
	
//           <textarea id="idAccountPresentation" rows="8" name="accountPresentation" placeholder="Tapez votre texte ici..." style="border: none !important; box-shadow: none; height: 100px;" class="form-control px-0 pb-0">
	vlineHTML.vTextAreaPost = window.document.createElement('textarea');
	vlineHTML.vDivContainer.appendChild(vlineHTML.vTextAreaPost);
	vlineHTML.vTextAreaPost.setAttribute('id', 'idPublishedPostArea' + vActiveProfile + this.lastPublishedPost);
	vlineHTML.vTextAreaPost.setAttribute('class', 'form-control bg-light px-0 pb-0 textAreaAutoResizable');
	vlineHTML.vTextAreaPost.setAttribute('name', 'publishedPostArea'+vActiveProfile);
	vlineHTML.vTextAreaPost.setAttribute('readonly', '');
	vlineHTML.vTextAreaPost.setAttribute('style', 'border: none !important; box-shadow: none; resize: none;');
	vlineHTML.vTextAreaPost.value = pMessage;
	
//   <div class="card-footer row justify-content-end py-1">
	vlineHTML.vDivFooter = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivFooter);
	vlineHTML.vDivFooter.setAttribute('class', 'card-footer row justify-content-end py-1');
	
//       <button type="button" class="btn btn-outline-success mr-4">Post</button>
	vlineHTML.vBtnDeletePost = window.document.createElement('button');
	vlineHTML.vDivFooter.appendChild(vlineHTML.vBtnDeletePost);
	vlineHTML.vBtnDeletePost.setAttribute('id', 'idBtnDeletePost' + vActiveProfile + this.lastPublishedPost);
	vlineHTML.vBtnDeletePost.setAttribute('type', 'button');
	vlineHTML.vBtnDeletePost.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters mr-4 border-danger');
	vlineHTML.vBtnDeletePost.innerHTML = 'Supprimer';

	vlineHTML.vBtnDeletePost.addEventListener('click', this.deletePublishedPost.bind(this),false);
}

// -----------------------------------------------------------------------------
// Cette méthode supprime un Post
// -----------------------------------------------------------------------------
Posts.prototype.deletePublishedPost = function(){
	alert('Post supprimé')
}

// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Post
// -----------------------------------------------------------------------------
Posts.prototype.addPublishedPost = function(){
	this.displayPublishedPosts(this.vPostTitle.value, this.vPostMsg.value);
}

// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Post
// -----------------------------------------------------------------------------
Posts.prototype.publishPost = function(){
	if (this.vPostMsg.value){
		this.addPublishedPost();
		vToolBox.autoResizeElem('idPublishedPostArea' + vActiveProfile + this.lastPublishedPost);
	}

	// Réinitialisation (Contenant et contenu) de la carte "PostEdit"
	this.vPostTitle.value = null;
	this.vPostMsg.value = null;
	vToolBox.autoResizeElem(this.vPostMsg.id);
}

// -----------------------------------------------------------------------------
// Cette méthode affiche les Posts
// -----------------------------------------------------------------------------
Posts.prototype.displayPosts = function(){
	this.displayPostEdit();
	this.displayPublishedPosts('Test 1','1111111');
	this.displayPublishedPosts('Test 2','2222222');
	this.displayPublishedPosts('Test 3','3333333');
	this.displayPublishedPosts('Test 4','4444444');
	this.displayPublishedPosts('Test 5','5555555');
	this.displayPublishedPosts('Test 6','6666666');
	this.displayPublishedPosts('Test 7','7777777');
	this.displayPublishedPosts('Test 8','8888888');
}


// ************************************************************************
// ***                                                                  ***
// *** Objet : ToolBox                                                  ***
// ***                                                                  ***
// *** Cet objet contient différentes méthodes générales variées et trop***
// *** peu nombreuses pour definir une catégorie spécifique             ***
// *** Il s'enrichiera au fur et à mesure du temps de nouvelles méthodes***
// ***                                                                  ***
// *** - 1 Générateur de nombre aléatoire :                             ***
// ***     - random(ValeurInférieure, ValeurSupérieure                  ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Une variable pour son instanciation                         ***
// ***                                                                  ***
// ************************************************************************
// --------------------------------------------------------------
function ToolBox(){
    this.screenWidth;              // Largeur de l'écran visible du navigateur
    this.screenHeight;             // Hauteur de l'écran visible du navigateur
    this.sensVertical = true;      // Constante pour la conversion Pourcentages / pixels
    this.sensHorizontal = false;   // Constante pour la conversion Pourcentages / pixels
}
// --------------------------------------------------------------
// Méthodes prototypées de l'objet "ToolBox"
// --------------------------------------------------------------
ToolBox.prototype.random = function(pValInf, pValSup){
    return Math.round(((pValSup - pValInf) * Math.random()) + pValInf);
}
// --------------------------------------------------------------
// Polyfill pour MSIE qui n'accepte pas la fonction Math.sign
// --------------------------------------------------------------
ToolBox.prototype.sign = function(x){
    return !(x = parseFloat(x)) ? x 
                                : x > 0 ? 1 
                                        : -1;
};
// --------------------------------------------------------------
ToolBox.prototype.getScreenSize = function(){
    this.screenWidth = (window.innerWidth);
    this.screenHeight = (window.innerHeight);
}
// --------------------------------------------------------------
ToolBox.prototype.refreshScreen = function(){   
    this.getScreenSize();
    window.location.href = window.location.href; // Apres un redimensionnement de l'écran, je le régénère from scratch;
}
// --------------------------------------------------------------
ToolBox.prototype.convertPercentToPixels = function(pValue,pOrientation){   
    return pOrientation ? (this.screenHeight / (100 / pValue))
                        : (this.screenWidth / (100 / pValue));
}
// --------------------------------------------------------------
// Transforme les secondes du joueurs stockées dans la BDD en H:Min:Sec
// --------------------------------------------------------------
ToolBox.prototype.addZero = function(pSection) { 
    return pSection < 10 ? '0' + pSection : pSection; 
};
// --------------------------------------------------------------
// Transforme les secondes du joueurs stockées dans la BDD en H:Min:Sec
// --------------------------------------------------------------
ToolBox.prototype.convertSecsToHoursMinsSecs = function(pNbreSecondes) {
    var vDate = new Date(pNbreSecondes * 1000); 
    var vFormattedTime = [];

    vFormattedTime.push(this.addZero(vDate.getHours()-1));
    vFormattedTime.push(this.addZero(vDate.getMinutes()));
    vFormattedTime.push(this.addZero(vDate.getSeconds()));

    return vFormattedTime.join(':');
}
// --------------------------------------------------------------
// Transforme les secondes du joueurs stockées dans la BDD en Jours:H:Min:Sec
// --------------------------------------------------------------
ToolBox.prototype.convertSecsToDaysHoursMinsSecs = function(pNbreSecondes) {
    var nbJours = Math.floor(pNbreSecondes/(86400));
    pNbreSecondes -= nbJours * 86400;
    return this.addZero(nbJours)+'j ' + this.convertSecsToHoursMinsSecs(pNbreSecondes);
}
// --------------------------------------------------------------
ToolBox.prototype.simpleRefreshScreen = function(){   
    self.location.reload();                                 // Régénération de l'écran from scratch;
    // window.location.assign(window.location.href)
}
// -----------------------------------------------------------------------------
// Cette fonction calcule l'age en fonction de la date de naissance et du jour actuel
// Si pAgeSeulement = true --> permet de ne retourner que l'age seulement
// Sinon, c'est l'age concaténé avec 'ans'
// -----------------------------------------------------------------------------
ToolBox.prototype.calculeAge = function(pBirthDate, pAgeSeulement){
    var today   = new Date();
    var annee   = pBirthDate.substr(0,4); 
    var mois    = pBirthDate.substr(5,2);
    var day     = pBirthDate.substr(8,2); 
    var age     = today.getFullYear() - annee; 

    var nbreMois = today.getMonth() - mois; // On calcul  le mois de la date - le mois de la date de naissance

    if (nbreMois < 0){
        age--;
    } else {
        if(nbreMois === 0){
            var nbreJours = today.getDay() - day;
            if(nbreJours < 0){
                age--;
            }
        }
    }

    if (!pAgeSeulement){
        return age = age < 2 ? age += ' an' : age += ' ans';
    } else {
        return age;
    }
}
// --------------------------------------------------------------------------------------------------------------
// elemOrId - jquery element or element id, defaults to $('<body>')'
// settings.color defaults to 'transparent'
// settings.opacity defaults to 1
// settings.zIndex defaults to 2147483647
// if settings.hourglasss==true change cursor to hourglass over mask
// 
//  Exemples d'utilisation
// maskOn(); // transparent page mask
// maskOn(null, {color:'gray', opacity:0.8}); // gray page mask with opacity
// maskOff(); // remove page mask
// maskOn(div); // transparent div mask
// maskOn(divId, {color:'gray', hourglass:true}); // gray div mask with hourglass
// maskOff(div); // remove div mask
// 
// Exemple réel
// Neutralise la NavBar du profil par defaut en appliquant un masque par-dessus 
// car aucun membre n'est connecté au lancement de la session
// vMemberClient.maskOn('idProfileNavBar', {zIndex:1, color:'white'}); 
// vToolBox.maskOn(vProfileNavBar, {zIndex:1, color:'white'}); 

// --------------------------------------------------------------------------------------------------------------
ToolBox.prototype.maskOn = function(elemOrId, settings) {
	var elem = this.elemFromParam(elemOrId);
	if (!elem) return;
	
	var maskDiv=elem.data('maskDiv');
	if (!maskDiv) {
		// maskDiv=$('<div style="position:fixed;display:inline"></div>');		// DH-
		maskDiv=$('<div style="position:absolute;display:inline"></div>');
		$('body').append(maskDiv);
		elem.data('maskDiv', maskDiv);
	}

	// Vérification de la présence de styles CSS dans les paramètres, sinon ==> Valeurs par défaut
	if (typeof settings==='undefined' || settings===null) settings={};
	if (typeof settings.color==='undefined' || settings.color===null) settings.color='transparent';
	if (typeof settings.opacity==='undefined' || settings.opacity===null) settings.opacity=1;
	if (typeof settings.zIndex==='undefined' || settings.zIndex===null) settings.zIndex=2147483647;
	if (typeof settings.hourglass==='undefined' || settings.hourglass===null) settings.hourglass=false;
	
	// DH-*
	// Etirement du maskdiv au-dessus de l'élément parent
	// var offsetParent = elem.offsetParent();
	// var widthPercents=elem.outerWidth()*100/offsetParent.outerWidth()+'%';
	// var heightPercents=elem.outerHeight()*100/offsetParent.outerHeight()+'%';
	// maskDiv.width(elem.offsetParent()[0].clientWidth);
	// maskDiv.height(elem.offsetParent()[0].clientHeight);
	// maskDiv.offset($(elem).offset());

	// DH+*
	// Etirement du maskdiv au-dessus de l'élément choisi lors l'appel de la fonction maskOn
	maskDiv.width(elem[0].clientWidth);
	maskDiv.height(elem[0].clientHeight);
	maskDiv.offset($(elem).offset());

	// set styles passés en paramètres ou par défaut
	maskDiv[0].style.backgroundColor = settings.color;
	maskDiv[0].style.opacity = settings.opacity;
	maskDiv[0].style.zIndex = settings.zIndex;
	if (settings.hourglass) this.hourglassOn(maskDiv);
	
	return maskDiv;
}

// --------------------------------------------------------------------------------------------------------------
// Décache et déprotège les éléments masqués par "maskOn"
// --------------------------------------------------------------------------------------------------------------
ToolBox.prototype.maskOff = function(elemOrId) {
	var elem = this.elemFromParam(elemOrId);
	if (!elem) return;
	
	var maskDiv=elem.data('maskDiv');
	if (!maskDiv) {
		console.log('maskOff no mask !');
		return;
	}

	elem.removeData('maskDiv');
	maskDiv.remove();
}

// --------------------------------------------------------------------------------------------------------------
// Si l icone "sablier" a été passée en paramètre lors du masquage des éléments, change l icone en sablier
// Si "decendents" est a true, alors montre également le sablier sur les déscendants ou "elemOrId"  (defaults --> true)
// --------------------------------------------------------------------------------------------------------------
ToolBox.prototype.hourglassOn = function(elemOrId, decendents) {
	var elem = this.elemFromParam(elemOrId);
	if (!elem) return;

	if (typeof decendents==='undefined' || decendents===null) decendents=true;

	if ($('style:contains("hourGlass")').length < 1) $('<style>').text('.hourGlass { cursor: wait !important; }').appendTo('head');
	if ($('style:contains("hourGlassWithDecendents")').length < 1) $('<style>').text('.hourGlassWithDecendents, .hourGlassWithDecendents * { cursor: wait !important; }').appendTo('head');
	elem.addClass(decendents ? 'hourGlassWithDecendents' : 'hourGlass');
}

// --------------------------------------------------------------------------------------------------------------
// Si l icone "sablier" a été passée en paramètre lors du masquage des éléments, retire l icone "sablier"
// --------------------------------------------------------------------------------------------------------------
ToolBox.prototype.hourglassOff = function(elemOrId) {
	var elem = this.elemFromParam(elemOrId);
	if (!elem) return;

	elem.removeClass('hourGlass');
	elem.removeClass('hourGlassWithDecendents');
}

// --------------------------------------------------------------------------------------------------------------
// Vérifie que l'élément passé en paramètre est valide
// --------------------------------------------------------------------------------------------------------------
ToolBox.prototype.elemFromParam = function(elemOrId) {
	var elem;
	if (typeof elemOrId==='undefined' || elemOrId===null) 
		elem=$('body');
	else if (typeof elemOrId === 'string' || elemOrId instanceof String) 
		elem=$('#'+elemOrId);
	else
		elem=$(elemOrId);

	if (!elem || elem.length===0) {
		console.log('elemFromParam no element !');
		return null;
	}
	return elem;
}


// --------------------------------------------------------------
// Fonction retournant le Pseudo d'un ami éventuellement splitté
// à partir d'un combo "PseudoAmiRecommandé/PseudoAmiRecommandeur"
// --------------------------------------------------------------
ToolBox.prototype.splitFriendFromCombo = function(pFriendCombo){
	var friendPair = pFriendCombo.split('/');

	if (friendPair.length === 1){													// S'il ne s'agit pas d'une recommandation, donc c'est une invitation directe
		vFriendPseudo = pFriendCombo;
	} else {
		vFriendPseudo = friendPair[0];
	}
	return vFriendPseudo;
}
// -----------------------------------------------------------------------------
//  Cette fonction initialise les popOver, toolTip et DropDown Menus de Bootstrap
// -----------------------------------------------------------------------------
ToolBox.prototype.InitPopOverAndToolTipAndDropDown = function(){
	$(function () {
		$('[data-toggle="popover"]').popover();			// Activation des PopOver de Bootstrap (pour les Notifications)
	});

	$(function () {
		$('[data-toggle="tooltip"]').tooltip();			// Activation des ToolTips de Bootstrap	(Pour les noms de mes amis)
	});

	$(function () {
		$('[data-toggle="dropdown"]').dropdown();		// Activation des DropDown de Bootstrap	(Pour les PopUp de recommandation)
	});
}
// -----------------------------------------------------------------------------
//  Cette fonction formate al date en JJ/MM/AA
// -----------------------------------------------------------------------------
ToolBox.prototype.setFormatDateJJMMAAA  = function(pDate){
	var myDate 	= new Date(pDate);

	var day 	= myDate.getDate();
	var month  	= myDate.getMonth() + 1; 	// Janvier commence à 0
	var year 	= myDate.getFullYear();

	if(day<10){
		day='0'+day;
	} 

	if (month < 10  )  {
		month = '0' + month; 
	}   

	var myDate = day + '/' + month+ '/' + year;
	return myDate
};
// -----------------------------------------------------------------------------
// Cette fonction recherche dans un Array (amis ou invitations), celui qui a la propriété 
// "pProperty", et la valeur correspondante à celle recherchée "pValue"
// ---------------------------------------------------------------------------
ToolBox.prototype.searchObjectInArray = (pArray, pProperty, pValue) => {
	return pArray.map((propertyFilter) => {
		return propertyFilter[pProperty];
	})
	.indexOf(pValue);
}

// -----------------------------------------------------------------------------
// Suppression de toutes le PopOver qui seraient encore ouvertes dû à la 
// simultaneïté des actions
// 
// Bootstrap sets a data field with key `bs.popover` on elements that have a popover.
// Note that there is no corresponding **HTML attribute** on the elements so we cannot
// perform a search by attribute.
// Purge des PopOver qui seraient encore affichée alors que l'utilisateur change d'ami à recommander
// -----------------------------------------------------------------------------
ToolBox.prototype.clearAllOpenedPopOverAndToolTip = function(){
	$("*").each(function () {
		var popover = $.data(this, "bs.popover");
		if (popover)
				$(this).popover('hide');
	});

	$("*").each(function () {
		var tooltip = $.data(this, "bs.tooltip");
		if (tooltip)
				$(this).tooltip('hide');
	});
}

// -----------------------------------------------------------------------------
// Cette fonction calcule la position d'un élément par rapport à son parent
// Ceci permet de connaitre une différence en X et Y que l'on peut associer aux
// coordonnées de la souris pour que l'élement colle au curseur de la souris
// -----------------------------------------------------------------------------
ToolBox.prototype.findPos = function(element, event) {
	var x = y = 0;
	if(element.offsetParent) {
		x = element.offsetLeft;
		y = element.offsetTop;

		while(element = element.offsetParent) {
			x += element.offsetLeft;
			y += element.offsetTop;
		}
	}

	var offsetX = event.clientX - x;
	var offsetY = event.clientY - y;

	return {
		'x' : offsetX, 
		'y' : offsetY
	};
}

// -----------------------------------------------------------------------------
//  Fin du module
// -----------------------------------------------------------------------------

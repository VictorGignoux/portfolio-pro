var isHiddenTechsShown = false;
var notificationAnimation;

document.addEventListener("DOMContentLoaded", function() {

	// remet l'id du projet courant de la page des projets à null
	if(sessionStorage.getItem("idProject") != null)
	{
		sessionStorage.setItem("idProject", null);
	}

	// gestion de la copie des coordonnées quand on clique dessus
	initCopy('aboutme-contacts-phone');
	initCopy('aboutme-contacts-mail');
	
});

/**
 * @brief Redirige le projet séléctionné dans la pages des projets
 * @param int it : l'id du projet séléctionné
 */
function openProject(id)
{
	sessionStorage.setItem("idProject", id);
	window.location.href = "projects.html";
}

/**
 * @brief Crée un évènement de copie sur les contacts
 * @param string elementId : l'id du contact copié
 */
function initCopy(elementId)
{
	const notificationText = document.getElementById('notification-text');
	const contact = document.getElementById(elementId);
	
	contact.addEventListener("click", () => {
		// récupère le contact choisi
    	let texte = contact.querySelector('p').innerText;
		let tempInput = document.createElement('input');
		tempInput.value = texte;
			
		// création d'un input temporaire pour permettre l'exécution de la commande "copy"
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand("copy");
		document.body.removeChild(tempInput);
			
		//affichage de la notification
		notificationText.innerText = "copié !";
		notificationText.style.top = "0";
		notificationText.style.width = "6vw";
		window.clearTimeout(notificationAnimation);
		notificationAnimation = setTimeout(() => {
			notificationText.style.top = "7vh";
		}, 2000);
	});
}

/**
 * @brief Permet d'afficher les techs cachées
 */
function hideAndShowHiddenTechs()
{
	const hiddenTechs = document.getElementById('techs-container-hidden');
	const hiddenTechsElements = hiddenTechs.querySelectorAll('.tech');
	const techsButton = document.getElementById('techs-button').querySelector('p');
	if(isHiddenTechsShown)
	{
		// animation de masquage des techs supplémentaires
		hiddenTechs.style.height = "0%";
		isHiddenTechsShown = false;
		techsButton.innerText = "voir tout";
			
		hiddenTechsElements.forEach(element => {
			element.style.transform = 'scale(0)';
		});
	}
	else
	{
		// animation d'affichage des techs cachées
		hiddenTechs.style.height = "35%";
		isHiddenTechsShown = true;
		techsButton.innerText = "cacher";
		
		hiddenTechsElements.forEach(element => {
			element.style.transform = 'scale(1)';
		});
	}
}
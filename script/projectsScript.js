const MAX_PROJECT_ID = 5;		// nombre de projets
var isScrolling = false;
var currentProjectId = MAX_PROJECT_ID-1;

document.addEventListener("DOMContentLoaded", () => {

	// initialisation des projets
	swipeProject(currentProjectId);

	// défilement des projets avec le scroll
	let page = document.getElementById('body');
	page.addEventListener('wheel', (event) => {
		if (isScrolling) return;
		isScrolling = true;
		//scroll up
	    if (event.deltaY > 0 && currentProjectId > 0)
	    {
	    	currentProjectId -= 1;
	        swipeProject(currentProjectId);
	    }
		//scroll down
	    else if(event.deltaY < 0 && currentProjectId < MAX_PROJECT_ID-1)
	    {
	    	currentProjectId += 1;
	        swipeProject(currentProjectId);
	    }

	    setTimeout(() => isScrolling = false, 150);
	});

	// lancement des vidéos au survol des projets
	let projects = document.querySelectorAll('.project');
	projects.forEach(project => {
		project.addEventListener('mouseenter', () => {
			let video = project.querySelector('video');
			if(video)
			{
				video.play();
			}
		});

		project.addEventListener('mouseleave', () => {
			let video = project.querySelector('video');
			if(video)
			{
				video.pause();
			}
		});
	});
});

// passe au projet suivant jusqu'à atteindre le projet dont l'id est passé en paramètre
function swipeProject(id)
{
	// augmente ou diminue l'id du projet courant en fontion de l'id passé en paramètre
	if(id > currentProjectId)
		currentProjectId += 1;
	else if(id < currentProjectId)
		currentProjectId -= 1;

	let projects = document.querySelectorAll('.project');

	//on cache la description actuelle
	var currentDescription = document.querySelector('.currentDescription');
	if(currentDescription)
		currentDescription.classList.remove('currentDescription');

	// change la postion et l'aspect des projet
	projects.forEach(project => {
		let idDif = currentProjectId - project.id;

		if(idDif === -1 || idDif === 1)
		{
			project.style.transform = 'scale(0.8)';
			project.style.top = `${15 + (-idDif) * (-18)}vh`;
			project.style.zIndex = '1';
			project.style.opacity = '0.6';
		}
		else if(idDif === 0)
		{
			project.style.transform = 'scale(1)';
			project.style.top = '15vh';
			project.style.zIndex = '10';
			project.style.opacity = '1';

			// affichage de la description correspondante
			var newCurrentDescription = document.getElementById(`description-${project.id}`);
			if(newCurrentDescription)
				newCurrentDescription.classList.add('currentDescription');
		}
		else
		{
			project.style.transform = 'scale(0)';
		}


	});

	// ---- gestion des points ------
	let points = document.querySelectorAll('.point');

	// retire le point courant
	let currentPoint = document.querySelector('.currentPoint');
	currentPoint.classList.remove('currentPoint');

	// nouveau point courant
	document.getElementById(`point${currentProjectId}`).classList.add('currentPoint');

	// la fonction est rappelée si le projet dont l'id est passé en paramètre n'est pas atteint
	if(currentProjectId != id)
	{
		setTimeout(() => swipeProject(id), 130);
	}
}

// permet de passer à l'image suivante dans les projets composés d'images
function swipeImage(projectId, direction)
{
	// variables nécessaires
	let project = document.getElementById(projectId);
	let imagesContainer = project.querySelector('.project-images');
	let imagesContainerPosLeft = imagesContainer.getAttribute('data-left');
	let imagesContainerChildCount = imagesContainer.children.length;
	let newPosLeft = parseInt(imagesContainerPosLeft) + direction * 100;

	// passe à l'image suivante s'il y en a une
	if(newPosLeft <= 0 && newPosLeft > imagesContainerChildCount * -100)
	{
		imagesContainer.setAttribute('data-left', newPosLeft);
		imagesContainer.style.left = `${newPosLeft}%`;
	}

	// cache ou affiche les flèches
	if(newPosLeft === 0)
	{
		let leftArrow = project.querySelector('.leftArrow');
		leftArrow.style.width = '0';
	}
	else
	{
		let leftArrow = project.querySelector('.leftArrow');
		leftArrow.style.width = '2vw';
	}

	if(newPosLeft === (imagesContainerChildCount-1) * -100)
	{
		let rightArrow = project.querySelector('.rightArrow');
		rightArrow.style.width = '0';
	}
	else
	{
		let rightArrow = project.querySelector('.rightArrow');
		rightArrow.style.width = '2vw';
	}
}
document.addEventListener("DOMContentLoaded", function() {

	if(sessionStorage.getItem("idProject") != null)
	{
		sessionStorage.setItem("idProject", null);
	}

	// gestion des tailles des projets
	// let projects = document.querySelectorAll('.project');
	// projects.forEach(project => {

	// 	project.addEventListener('mouseenter', () => {
	// 		project.style.width = "50%";
	// 		projects.forEach(otherProject => {
	// 			if(otherProject != project)
	// 			{
	// 				otherProject.style.width = "20%";
	// 			}
	// 		});
	// 	});

	// 	project.addEventListener('mouseleave', () => {
	// 		projects.forEach(aProject => {
	// 			aProject.style.width = "30%";
	// 		});
	// 	});
	// });


	const elements = document.querySelectorAll('*');

	// Crée un observer
	const observer = new IntersectionObserver((entries) => {
	  entries.forEach((entry) => {
	    if (entry.isIntersecting) {
	      entry.target.style.transform = "scale(1)";
	      entry.target.style.opacity = "1";
	    }
	  });
	}, {
	  threshold: 0.1, // Déclenche quand 10% de l'élément est visible
	});

	// Observe chaque .box
	elements.forEach((box) => observer.observe(box));

	// gestion de la copie des coordonnées quand on clique dessus
	initCopy('aboutme-contacts-phone');
	initCopy('aboutme-contacts-mail');
	
});

function openProject(id)
{
	sessionStorage.setItem("idProject", id);
	window.location.href = "projects.html";
}

function initCopy(elementId)
{
	let contact = document.getElementById(elementId);
	contact.addEventListener("click", () => {
    	let texte = contact.querySelector('p').innerText;
		let tempInput = document.createElement('input');
		tempInput.value = texte;
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand("copy");

		document.body.removeChild(tempInput);
	});
}
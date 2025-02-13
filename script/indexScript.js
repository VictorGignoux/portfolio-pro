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

});

function openProject(id)
{
	sessionStorage.setItem("idProject", id);
	window.location.href = "projects.html";
}
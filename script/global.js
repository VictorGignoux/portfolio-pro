const darkTheme = {
	name: "dark",
	colors: {
		background: "#1B1525",
		container: "#301C3B",
		containerInteraction: "#2B1535",
		border: "#54346B",
		button:	"#D1B3A1", /* 9A5CD0 */
		title: "#8457AA",
		text: "#E2DDFE"
	}
};

const lightTheme = {
	name: "light",
	colors: {
		background: "#F4FAFE",
		container: "#D5EDFF",
		containerInteraction: "#C3E4FE",
		border: "#91C7F0",
		button:	"#D1B3A1", /* 0099E6 */
		title: "#008CD4",
		text: "#063856"
	}
};

const root = document.querySelector(':root');

document.addEventListener("DOMContentLoaded", function() {

	/************** DECLARATIONS HTML ****************/
	const scrollButton = document.getElementById('scroll-button');
	const params = document.getElementById('params');
	const notification = document.getElementById('notification');
	const scroll = document.getElementById('scroll-container');
	const scrollValue = document.getElementById('scroll-content');

	/************* INIT ********************/

	// initialisation du theme par défaut (dark)
	const currentTheme = sessionStorage.getItem('theme');

	if(currentTheme === null)
	{
		sessionStorage.setItem('theme', 'dark');
		setTheme(darkTheme);
	}
	else if(currentTheme === 'light')
	{
		setTheme(lightTheme);
	}

	// affiche le bouton de scroll
	document.addEventListener('scroll', () => {
		if(window.scrollY > 500)
		{
			scrollButton.style.transform = 'scale(1)';
		}
		else
		{
			scrollButton.style.transform = 'scale(0)';
		}

		// garde les params et le scroll button "sticky"
		scrollButton.style.top = `calc(${window.scrollY}px + 90vh)`;
		params.style.top = `calc(${window.scrollY}px + 4vh)`;
		notification.style.top = `calc(${window.scrollY}px + 50vh)`;
		scroll.style.top = `calc(${window.scrollY}px + 40vh)`;
		let scrollPercentage = window.scrollY * 100 / (document.documentElement.scrollHeight - window.innerHeight);
		scrollValue.style.height = `${scrollPercentage}%`;
	});

	// animation d'apparition des éléments
	const elements = document.querySelectorAll('*:not(.no-start-animation)');

	const observer = new IntersectionObserver((entries) => {
	  entries.forEach((entry) => {
	  	// affiche les éléments quand il entre dans la partie visible de la page
	    if (entry.isIntersecting) 
	    {
	      	entry.target.style.transform = "scale(1)";
	     	entry.target.style.opacity = "1";
	    }
	    // pour répéter l'animation à chaque fois sans reload la page
	    /*else
	    {
	    	if(entry.target.className === "project")
	    	{
	    		entry.target.style.transform = "scale(0)";
	      		entry.target.style.opacity = "0";
	    	}
	    }*/
	  });
	}, {
	  	threshold: 0.1, // Déclenche quand 10% de l'élément est visible
	});

	elements.forEach((element) => observer.observe(element));

});

/**
 * @brief Met en place le thème choisi
 * param object theme : le thème choisi
 */
function setTheme(theme)
{
	root.style.setProperty('--background', theme.colors.background);
	root.style.setProperty('--container', theme.colors.container);
	root.style.setProperty('--container-interaction', theme.colors.containerInteraction);
	root.style.setProperty('--border', theme.colors.border);
	root.style.setProperty('--button', theme.colors.button);
	root.style.setProperty('--title', theme.colors.title);
	root.style.setProperty('--text', theme.colors.text);

	sessionStorage.setItem('theme', theme.name);
}

/**
 * @brief Met en place l'autre thème que le thème courant
 */
function switchTheme()
{
	const currentTheme = sessionStorage.getItem('theme');
	if(currentTheme === 'light')
	{
		setTheme(darkTheme);
	}
	else if(currentTheme === 'dark')
	{
		setTheme(lightTheme);
	}
}

/**
 * @brief Scroll doucement jusqu'en au de la page
 */
function scrollToTop()
{
	window.scroll({
	  top: 0,
	  behavior: "smooth",
	});
}
let darkTheme = {
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

let lightTheme = {
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

var root = document.querySelector(':root');

document.addEventListener("DOMContentLoaded", function() {

	// récupération des éléments html nécessaires
	let scrollButton = document.getElementById('scroll-button');
	let params = document.getElementById('params');

	// initialisation du theme par défaut (dark)
	let currentTheme = sessionStorage.getItem('theme');

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
	});

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
	let currentTheme = sessionStorage.getItem('theme');
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
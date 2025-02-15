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

	let currentTheme = sessionStorage.getItem('theme');

	// initialisation du theme par défaut (dark)
	if(currentTheme === null)
	{
		sessionStorage.setItem('theme', 'dark');
		setTheme(darkTheme);
	}
	else if(currentTheme === 'light')
	{
		setTheme(lightTheme);
	}

});

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
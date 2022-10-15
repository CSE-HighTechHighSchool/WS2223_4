let setTheme = localStorage.getItem("theme") ?? "light";

document.documentElement.setAttribute("data-theme", setTheme);

document.querySelectorAll(".switch").forEach((button) => {
	button.addEventListener("click", () => {
		setTheme = setTheme === "light" ? "dark" : "light";

		document.documentElement.setAttribute("data-theme", setTheme);
		localStorage.setItem("theme", setTheme);
	})
});

let setTheme = localStorage.getItem("theme") ?? "light";

document.documentElement.setAttribute("data-theme", setTheme);

document.querySelectorAll(".switch").forEach((button) => {
	button.addEventListener("click", () => {
		setTheme = setTheme === "light" ? "dark" : "light";

		document.documentElement.setAttribute("data-theme", setTheme);
		localStorage.setItem("theme", setTheme);
	});
});

let constrain = 20;
let mouseOverContainer = document.getElementById("saturn-parent");
let ex1Layer = document.getElementById("saturn-layer");

function transforms(x, y, el) {
	let box = el.getBoundingClientRect();
	let calcX = -(y - box.y - box.height / 2) / constrain;
	let calcY = (x - box.x - box.width / 2) / constrain;

	return (
		"perspective(1500px) " +
		"   rotateX(" +
		calcX +
		"deg) " +
		"   rotateY(" +
		calcY +
		"deg) "
	);
}

function transformElement(el, xyEl) {
	el.style.transform = transforms.apply(null, xyEl);
}

mouseOverContainer.onmousemove = function (e) {
	let xy = [e.clientX, e.clientY];
	let position = xy.concat([ex1Layer]);

	window.requestAnimationFrame(function () {
		transformElement(ex1Layer, position);
	});
};

let setTheme = localStorage.getItem("theme") ?? "light";

document.documentElement.setAttribute("theme", setTheme);

document.querySelectorAll(".switch").forEach((button) => {
	button.addEventListener("click", () => {
		setTheme = setTheme === "light" ? "dark" : "light";

		document.documentElement.setAttribute("theme", setTheme);
		localStorage.setItem("theme", setTheme);
	});
});

let constrain = 20;
let mouseOverContainer = document.getElementById("ex1");
let ex1Layer = document.getElementById("ex1-layer");

function transforms(x, y, el) {
	let box = el.getBoundingClientRect();
	let calcX = -(y - box.y - box.height / 2) / constrain;
	let calcY = (x - box.x - box.width / 2) / constrain;

	return (
		"perspective(300px) " +
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

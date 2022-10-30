let setTheme = localStorage.getItem("theme") ?? "light";

document.documentElement.setAttribute("theme", setTheme);

document.querySelectorAll(".switch").forEach((button) => {
	button.addEventListener("click", () => {
		setTheme = setTheme === "light" ? "dark" : "light";

		document.documentElement.setAttribute("theme", setTheme);
		localStorage.setItem("theme", setTheme);
	});
});

// Saturn movement
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

// Stars
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

// Reveal element
function reveal() {
	var reveals = document.querySelectorAll(".reveal");

	for (var i = 0; i < reveals.length; i++) {
		var windowHeight = window.innerHeight;
		var elementTop = reveals[i].getBoundingClientRect().top;
		// var elementVisible = 10;

		if (elementTop < windowHeight) {
			reveals[i].classList.add("active");
		}
		// else {
		// 	reveals[i].classList.remove("active");
		// }
	}
}

window.addEventListener("scroll", reveal);

//Timeline Progress

const scrollProgress = document.getElementById("#header_parent");

const height =
	document.documentElement.scrollHeight -
	document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
	const scrollTop =
		document.body.scrollTop || document.documentElement.scrollTop;
	scrollProgress.style.height = `${
		((scrollTop - 750) / (height - 400)) * 105
	}%`;
});

//Overall Scroll progress
function scrollDist() {
	const scrollProgress = document.getElementById("scroll-progress");
	const height =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;

	window.addEventListener("scroll", () => {
		const scrollTop =
			document.body.scrollTop || document.documentElement.scrollTop;
		scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
	});
}

scrollDist();

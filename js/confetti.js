document.querySelectorAll(".confetti").forEach((el) => {
	const confetti = new Confetti(el.id);
	confetti.destroyTarget(false);
});

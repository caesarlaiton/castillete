"use strict";

const body = document.querySelector("body");

function tagsModal(){

	const	aside = document.querySelector("aside"),
		tagsBtn = document.querySelector(".tagsBtn");

	let counter = 0;

	// Hide tags when ESC is pressed and counter is not 0 (tags are being displayed).
	window.addEventListener("keydown", event => {
		if (event.key === "Escape" && counter) {
			hideTags();
		};
	});

	window.addEventListener("resize", () => {
		if (counter && window.innerWidth >= 640){
			hideTags();
		};
	});

	// When the tags button is clicked:
	// hide tags when counter is 0 (tags are being displayed),
	// show tags otherwise.
	tagsBtn.addEventListener("click", () => {
		counter ? hideTags() : showTags();
	});
	
	function showTags(){
		editClasses("add", "remove");
		counter++;
	};

	function hideTags(){
		editClasses("remove", "add");
		counter = 0;
	};

	function editClasses(x, y){
		aside.classList[x]("top-0", "w-screen", "h-screen", "z-10", "p-4");
		body.classList[x]("overflow-y-hidden");

		tagsBtn.classList[y]("opacity-75");
		aside.classList[y]("hidden");
	};
};

function imgModal(){

	const btnsModal = document.querySelectorAll("button.modal"),
		imgModal = document.querySelector("img.modal"),
		divModal = document.querySelector("div.modal"),
		exitModal = document.querySelector("div.modal button");

	let btnModalNow = "";

	// Hide image modal when ESC is pressed and the image modal is being displayed.
	window.addEventListener("keydown", event => {
		if (event.key === "Escape" && !(divModal.classList.contains("hidden")) ) {
			hideImg();
		};
	});
	
	// Hide image modal when you click anywhere except the image modal being displayed.
	divModal.addEventListener("click", event => {
		if (event.target.tagName !== "IMG") {
			hideImg();
		};
	});

	// When the image modal is being displayed, you can't focus anything but the X button.
	exitModal.addEventListener("keydown", event => {
		if (event.key === "Tab") {
			event.preventDefault();
		};
	});

	// Replace image modal src by the image src of button pressed, display whole modal and focus exit button.
	function showImg(btnModal){
		btnModalNow = btnModal;

		imgModal.src = btnModal.firstElementChild.dataset.src;

		body.classList.toggle("overflow-y-hidden");
		divModal.classList.toggle("hidden");

		exitModal.focus();
	};

	// Hide image modal, and re-focus button pressed.
	function hideImg(){
		btnModalNow.focus();

		// If the image you're hiding didn't load:
		// toggle classes to not bug the next image animation.
		if (!(imgModal.complete)){
			transitionClasses();
		};

		divModal.classList.toggle("bg-black-opacity-75");

		transitionClasses();

		body.classList.toggle("overflow-y-hidden");

		// Let animation finish before hiding modal.
		setTimeout(() => {
			divModal.classList.toggle("hidden");

			btnModalNow.firstElementChild.classList.remove("opacity-75");

			imgModal.src = "";
		}, 1000);

	};

	// Image animation classes.
	function transitionClasses(){
		// divModal.classList.toggle("bg-black-opacity-75");
		divModal.firstElementChild.classList.toggle("translate-y-64");
		divModal.firstElementChild.classList.toggle("opacity-0");
	};

	btnsModal.forEach(btnModal => {
		btnModal.addEventListener("click", () => {
			showImg(btnModal);

			divModal.classList.toggle("bg-black-opacity-75");

			// Start animation when the image is completely loaded.
			imgModal.addEventListener("load", transitionClasses);
		});

		["mouseout", "blur"].forEach(event => btnModal.addEventListener(event, () => btnModal.firstElementChild.classList.remove("opacity-75") ));

		["mouseover", "focus"].forEach(event => btnModal.addEventListener(event, () => btnModal.firstElementChild.classList.add("opacity-75") ));
	});

};

tagsModal();
imgModal();

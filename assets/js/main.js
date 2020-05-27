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

	let btnModalPressed = "";

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
		btnModalPressed = btnModal;

		imgModal.src = btnModal.firstElementChild.firstElementChild.dataset.src;
		editClasses("add", "remove");
		exitModal.focus();
	};

	// Hide image modal, and re-focus button pressed.
	function hideImg(){
		btnModalPressed.focus();
		editClasses("remove", "add");
		editZoomClasses(btnModalPressed, "remove", "add");
	};

	function editClasses(x, y){
		body.classList[x]("overflow-y-hidden");

		divModal.classList[y]("hidden");
	};

	function editZoomClasses(btnModal, x, y){
		btnModal.firstElementChild.firstElementChild.classList[x]("opacity-75");

		btnModal.lastElementChild.classList[y]("hidden");
	};

	// Add click, hover and focus events to every button that act as a source to the image modal.
	btnsModal.forEach(btnModal => {

		btnModal.addEventListener("click", () => showImg(btnModal) );

		["mouseout", "blur"].forEach(event => btnModal.addEventListener(event, () => editZoomClasses(btnModal, "remove", "add") ));
		["mouseover", "focus"].forEach(event => btnModal.addEventListener(event, () => editZoomClasses(btnModal, "add", "remove") ));

	});

};

tagsModal();
imgModal();

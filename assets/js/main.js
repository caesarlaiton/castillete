"use strict";

const body = document.querySelector("body");

function tagsModal(){

	const	aside = document.querySelector("aside"),
		tagsTitle = document.querySelector(".tagsTitle"),
		tagsBtn = document.querySelector(".tagsBtn");

	let counter = 0;

	// Hide tags when ESC is pressed and counter is not 0 (tags are being displayed).
	window.addEventListener("keydown", event => {
		if (event.key === "Escape" && counter) {
			body.classList.remove("overflow-y-hidden");
			hideTags();
		};
	});

	window.addEventListener("resize", () => {
		if (counter && window.innerWidth >= 480){
			body.classList.remove("overflow-y-hidden");
			hideTags();
		};
	});

	// When the tags button is clicked:
	// hide tags when counter is 0 (tags are being displayed),
	// show tags otherwise.
	tagsBtn.addEventListener("click", () => {
		if (counter){
			aside.classList.add("opacity-0");
			body.classList.remove("overflow-y-hidden");
			setTimeout(hideTags, 300);
		} else {
			showTags();
			aside.classList.remove("opacity-0");
		};
	});
	
	function showTags(){
		body.classList.add("overflow-y-hidden");
		editClasses("add", "remove");
		counter++;
		tagsTitle.focus();
	};

	function hideTags(){
		editClasses("remove", "add");
		counter = 0;
		tagsBtn.blur();
	};

	function editClasses(x, y){
		aside.classList[x]("fixed", "top-0", "w-screen", "h-screen-minus", "z-10", "p-4", "bg-gray-100", "overflow-y-auto");

		tagsBtn.classList[y]("opacity-75");
		aside.classList[y]("hidden", "mr-16");
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

		imgModal.src = btnModal.firstElementChild.dataset.modal;

		body.classList.add("overflow-y-hidden");
		divModal.classList.remove("hidden");

		exitModal.focus();
	};

	// Hide image modal, and re-focus button pressed.
	function hideImg(){
		btnModalNow.focus();

		// If the image you're hiding didn't load:
		// toggle classes to not bug the next image animation.
		if (!(imgModal.complete)){
			transitionClasses("add");
		};

		btnModalNow.firstElementChild.classList.remove("opacity-50");

		divModal.classList.remove("bg-black-opacity-75");

		transitionClasses("add");

		body.classList.remove("overflow-y-hidden");

		// Let animation finish before hiding modal.
		setTimeout(() => {
			divModal.classList.add("hidden");

			imgModal.src = "";
		}, 500);

	};

	// Image animation classes.
	function transitionClasses(act){
		divModal.firstElementChild.classList[act]("translate-y-64", "opacity-0");
		exitModal.classList[act]("opacity-0");
	};

	btnsModal.forEach(btnModal => {
		btnModal.addEventListener("click", () => {
			showImg(btnModal);

			divModal.classList.add("bg-black-opacity-75");

			// Start animation when the image is completely loaded.
			imgModal.addEventListener("load", () => transitionClasses("remove"));
		});

		["mouseout", "blur"].forEach(event => btnModal.addEventListener(event, () => btnModal.firstElementChild.classList.remove("opacity-50") ));

		["mouseover", "focus"].forEach(event => btnModal.addEventListener(event, () => btnModal.firstElementChild.classList.add("opacity-50") ));
	});

};

tagsModal();
imgModal();

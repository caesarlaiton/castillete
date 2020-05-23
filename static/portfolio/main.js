"use strict";

const body = document.querySelector("body"),
	aside = document.querySelector("aside"),
	tagsBtn = document.querySelector(".tagsBtn"),
	btnModal = document.querySelector("button.modal"),
	divModal = document.querySelector("div.modal");

let counter = 0;

window.addEventListener("keydown", event => checkKey(event));
divModal.addEventListener("click", event => checkClick(event));
btnModal.addEventListener("click", showModal);
tagsBtn.addEventListener("click", checkCounter);

function checkCounter(){
	counter ? hideTags() : showTags();
};

function checkKey(event){
	if (event.key === "Escape" && counter){
		hideTags();
	} else if (event.key === "Escape" && !(divModal.style.display)){
		hideModal();
	};
};

function checkClick(event){
	if (event.target.tagName === "IMG"){
		return;
	} else {
		hideModal();
	};
};

function showTags(){
	body.style.overflowY = "hidden";
	tagsBtn.classList.remove("opacity-75");
	aside.classList.add("fixed", "top-0", "left-0", "w-screen", "h-screen", "bg-gray-100", "z-10", "p-4");
	aside.classList.remove("hidden");
	counter++;
};

function hideTags(){
	body.style.overflowY = "scroll";
	tagsBtn.classList.add("opacity-75");
	aside.classList.add("hidden");
	aside.classList.remove("fixed", "top-0", "left-0", "w-screen", "h-screen", "bg-gray-100", "z-10", "p-4");
	counter = 0;
};

function showModal(){
	body.style.overflowY = "hidden";
	divModal.classList.remove("hidden");
};

function hideModal(){
	body.style.overflowY = "scroll";
	divModal.classList.add("hidden");
};

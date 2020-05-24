"use strict";

const body = document.querySelector("body"),
	aside = document.querySelector("aside"),
	tagsBtn = document.querySelector(".tagsBtn"),
	btnsModal = document.querySelectorAll("button.modal"),
	imgModal = document.querySelector("img.modal"),
	divModal = document.querySelector("div.modal"),
	exitModal = document.querySelector("div.modal button");

let counter = 0,
	actualBtn = "";

window.addEventListener("keydown", event => checkKey(event));
divModal.addEventListener("click", event => checkClick(event));
tagsBtn.addEventListener("click", checkCounter);

btnsModal.forEach(btnModal => btnModal.addEventListener("click", function(){ showModal(btnModal) }));

btnsModal.forEach(btnModal => btnModal.addEventListener("mouseover", function(){
	console.log(btnModal);
	btnModal.firstElementChild.firstElementChild.classList.add("opacity-75");
	btnModal.lastElementChild.classList.remove("hidden");
}));

btnsModal.forEach(btnModal => btnModal.addEventListener("mouseout", function(){
	btnModal.firstElementChild.firstElementChild.classList.remove("opacity-75");
	btnModal.lastElementChild.classList.add("hidden")
}));

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

function showModal(btnModal){
	actualBtn = btnModal;
	imgModal.src = btnModal.firstElementChild.firstElementChild.src;
	body.style.overflowY = "hidden";
	divModal.classList.remove("hidden");
	exitModal.focus();
};

function hideModal(){
	body.style.overflowY = "scroll";
	divModal.classList.add("hidden");
	actualBtn.focus();
	console.log(actualBtn);
	actualBtn.lastElementChild.classList.add("hidden");
};

exitModal.addEventListener("keydown", event => {
	if (event.key === "Tab"){
		event.preventDefault();
	};
});

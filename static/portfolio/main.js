"use strict";

const body = document.querySelector("body"),
  main = document.querySelector("main"),
  divModal = document.querySelector("div.modal"),
  imgModal = document.querySelector("img.modal");

main.addEventListener("click", event => checkTag(event));
main.addEventListener("keydown", event => checkKey(event));

function checkTag(event){
  if (event.tagName === "IMG" || event.target.tagName === "IMG"){
    imgModal.src = event.src || event.target.src;
    showModal();
  } else {
    hideModal();
  };
};

function checkKey(event){
  switch (event.key) {
    case "Enter":
      event.preventDefault();
      checkTag(event.originalTarget.firstChild);
      break;
    case "Escape":
      hideModal();
      break;
    default:
      break;
  };
};

function showModal() {
  divModal.style.visibility = "visible";
  body.style.overflowY = "hidden";
};

function hideModal() {
  divModal.style.visibility = "hidden";
  body.style.overflowY = "visible";
};

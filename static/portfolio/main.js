"use strict";

let div = document.getElementsByClassName("special")[0].style,
  img = document.getElementsByClassName("special")[1],
  main = document.getElementsByTagName("main")[0];

main.addEventListener("click", event => {
  check(event);
});

main.addEventListener("keydown", event => {
  if (event.key === "Enter"){
    event.preventDefault();
    check(event.originalTarget.firstChild);
  } else if (event.key === "Escape"){
    div.visibility = "hidden";
  };
});

function check(event){
  if (event.tagName === "IMG" || event.target.tagName === "IMG"){
    img.src = event.src || event.target.src;
    div.visibility = "visible";
  } else {
    div.visibility = "hidden";
  };
};

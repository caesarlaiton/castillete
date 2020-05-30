"use strict";

var body = document.querySelector("body");

function tagsModal() {
  var aside = document.querySelector("aside"),
      tagsTitle = document.querySelector(".tagsTitle"),
      tagsBtn = document.querySelector(".tagsBtn");
  var counter = 0; // Hide tags when ESC is pressed and counter is not 0 (tags are being displayed).

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && counter) {
      body.classList.remove("overflow-y-hidden");
      hideTags();
    }

    ;
  });
  window.addEventListener("resize", function () {
    if (counter && window.innerWidth >= 480) {
      body.classList.remove("overflow-y-hidden");
      hideTags();
    }

    ;
  }); // When the tags button is clicked:
  // hide tags when counter is 0 (tags are being displayed),
  // show tags otherwise.

  tagsBtn.addEventListener("click", function () {
    if (counter) {
      aside.classList.add("opacity-0");
      body.classList.remove("overflow-y-hidden");
      setTimeout(hideTags, 300);
    } else {
      showTags();
      aside.classList.remove("opacity-0");
    }

    ;
  });

  function showTags() {
    body.classList.add("overflow-y-hidden");
    editClasses("add", "remove");
    counter++;
    tagsTitle.focus();
  }

  ;

  function hideTags() {
    editClasses("remove", "add");
    counter = 0;
    tagsBtn.blur();
  }

  ;

  function editClasses(x, y) {
    aside.classList[x]("fixed", "top-0", "w-screen", "h-screen-minus", "z-10", "p-4", "bg-gray-100", "overflow-y-auto");
    tagsBtn.classList[y]("opacity-75");
    aside.classList[y]("hidden", "mr-16");
  }

  ;
}

;

function imgModal() {
  var btnsModal = document.querySelectorAll("button.modal"),
      imgModal = document.querySelector("img.modal"),
      divModal = document.querySelector("div.modal"),
      exitModal = document.querySelector("div.modal button");
  var btnModalNow = ""; // Hide image modal when ESC is pressed and the image modal is being displayed.

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !divModal.classList.contains("hidden")) {
      hideImg();
    }

    ;
  }); // Hide image modal when you click anywhere except the image modal being displayed.

  divModal.addEventListener("click", function (event) {
    if (event.target.tagName !== "IMG") {
      hideImg();
    }

    ;
  }); // When the image modal is being displayed, you can't focus anything but the X button.

  exitModal.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
      event.preventDefault();
    }

    ;
  }); // Replace image modal src by the image src of button pressed, display whole modal and focus exit button.

  function showImg(btnModal) {
    btnModalNow = btnModal;
    imgModal.src = btnModal.firstElementChild.dataset.modal;
    body.classList.toggle("overflow-y-hidden");
    divModal.classList.toggle("hidden");
    exitModal.focus();
  }

  ; // Hide image modal, and re-focus button pressed.

  function hideImg() {
    btnModalNow.focus(); // If the image you're hiding didn't load:
    // toggle classes to not bug the next image animation.

    if (!imgModal.complete) {
      transitionClasses();
    }

    ;
    btnModalNow.firstElementChild.classList.remove("opacity-75");
    divModal.classList.toggle("bg-black-opacity-75");
    transitionClasses();
    body.classList.toggle("overflow-y-hidden"); // Let animation finish before hiding modal.

    setTimeout(function () {
      divModal.classList.toggle("hidden");
      imgModal.src = "";
    }, 500);
  }

  ; // Image animation classes.

  function transitionClasses() {
    // divModal.classList.toggle("bg-black-opacity-75");
    divModal.firstElementChild.classList.toggle("translate-y-64");
    divModal.firstElementChild.classList.toggle("opacity-0");
    exitModal.classList.toggle("opacity-0");
  }

  ;
  btnsModal.forEach(function (btnModal) {
    btnModal.addEventListener("click", function () {
      showImg(btnModal);
      divModal.classList.toggle("bg-black-opacity-75"); // Start animation when the image is completely loaded.

      imgModal.addEventListener("load", transitionClasses);
    });
    ["mouseout", "blur"].forEach(function (event) {
      return btnModal.addEventListener(event, function () {
        return btnModal.firstElementChild.classList.remove("opacity-75");
      });
    });
    ["mouseover", "focus"].forEach(function (event) {
      return btnModal.addEventListener(event, function () {
        return btnModal.firstElementChild.classList.add("opacity-75");
      });
    });
  });
}

;
tagsModal();
imgModal();


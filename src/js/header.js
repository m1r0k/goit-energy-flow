document.addEventListener("DOMContentLoaded", function() {
  const openMobileMenuBtn = document.querySelector(".open-mobile-menu-btn");
  const closeMobileMenuBtn = document.querySelector(".mobile-menu-close-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const backdrop = document.querySelector(".backdrop");

  function openMobileMenu() {
    mobileMenu.classList.add("open");
    backdrop.classList.add("open");
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    backdrop.classList.remove("open");
  }

  openMobileMenuBtn.addEventListener("click", openMobileMenu);
  closeMobileMenuBtn.addEventListener("click", closeMobileMenu);
  backdrop.addEventListener("click", closeMobileMenu);
});

document.addEventListener("DOMContentLoaded", function() {
  const logoLink = document.querySelector(".logo");
  const homeButton = document.getElementById("homeButton");

  logoLink.addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "../../index.html"; 
  });

  homeButton.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "../../index.html";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const favoritesButton = document.getElementById("favoritesButton");

  favoritesButton.addEventListener("click", function() {
    window.location.href = "favorites.html";
  });
});
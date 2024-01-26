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
  
// HEADER SWITCHER BETWEEN HOME AND FAVORITES 
const toggleSwitch = document.getElementById("toggleSwitch");
const homeLink = document.getElementById("homeLink");
const favoritesLink = document.getElementById("favoritesLink");

toggleSwitch.addEventListener("change", function() {
  if (toggleSwitch.checked) {
    // If the switch is checked, change the href of Home to Favorites
    homeLink.href = "./favorites/favorites.html";
    homeLink.textContent = "Favorites";
    favoritesLink.href = "./header.html";
    favoritesLink.textContent = "Home";
  } else {
    // If the switch is not checked, revert the href back to the original
    homeLink.href = "./header.html";
    homeLink.textContent = "Home";
    favoritesLink.href = "./favorites/favorites.html";
    favoritesLink.textContent = "Favorites";
  }
});
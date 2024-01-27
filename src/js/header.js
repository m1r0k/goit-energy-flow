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
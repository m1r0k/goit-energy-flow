document.addEventListener('DOMContentLoaded', function() {
    var openMobileMenuBtn = document.querySelector('.open-mobile-menu-btn');
    var mobileMenu = document.querySelector('.mobile-menu');
    var backdrop = document.querySelector('.backdrop');
    var closeMobileMenuBtn = document.querySelector('.mobile-menu-close-btn'); 
    openMobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('expanded');
        backdrop.classList.toggle('expanded');
    });

    function closeMobileMenu() {
        mobileMenu.classList.remove("expanded"); 
        backdrop.classList.remove("expanded"); 
    }

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
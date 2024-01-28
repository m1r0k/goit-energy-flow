document.addEventListener('DOMContentLoaded', function() {
    const favoritesButton = document.getElementById('favoritesButton');

    favoritesButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        const favoritesURL = favoritesButton.getAttribute('href');
        const favoritesWindow = window.open(favoritesURL, '_blank'); 

       
        if (favoritesWindow) {
            favoritesWindow.focus();
        } else {
            alert('Будь ласка, дозвольте спливаючі вікна для цього сайту, щоб відкрити сторінку "Favorites".');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const openMobileMenuBtn = document.querySelector('.open-mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const backdrop = document.querySelector('.backdrop');
    const closeMobileMenuBtn = document.querySelector('.mobile-menu-close-btn'); 
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
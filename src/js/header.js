const menu = document.querySelector('.mobile-backdrop');
const openBtn = document.querySelector('.open-mobile-menu-btn');
const closeBtn = document.querySelector('.mobile-menu-close-btn');

openBtn.addEventListener("click", function () {
  menu.classList.toggle("open");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", function () {
  menu.classList.toggle("open");
  document.body.style.overflow = "scroll";
});
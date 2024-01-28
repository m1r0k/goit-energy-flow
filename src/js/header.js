openBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
  document.body.style.overflow = "hidden";
  closeBtn.addEventListener("click", closeModal);
});



const closeModal = () => {
  menu.classList.toggle("open");
  document.body.style.overflow = "scroll";
  removeEventListener('click', closeBtn);
}

import { renderExercise } from './modal';
let exList;
let favoritesList;
let paginationButtons;
const itemsPerPage = 6;
if (window.location.pathname.endsWith('/favorites.html')) {
 favoritesList = document.querySelector('.favorites-list');
 paginationButtons = document.querySelectorAll(
  '.favorites-pagination-block button'
 );
 showPage(1);
 paginationButtons.forEach(button => {
  button.addEventListener('click', () => {
   const pageNumber = parseInt(button.textContent);
   showPage(pageNumber);
  });
 });
}
function showPage(pageNumber) {
 const startIndex = (pageNumber - 1) * itemsPerPage;
 const endIndex = startIndex + itemsPerPage;
 const items = favoritesList.querySelectorAll('.workout-card');
 items.forEach((item, index) => {
  if (index >= startIndex && index < endIndex) {
   item.style.display = 'block';
  } else {
   item.style.display = 'none';
  }
 });
 paginationButtons.forEach(button => {
  if (parseInt(button.textContent) === pageNumber) {
   button.classList.add('active-btn');
  } else {
   button.classList.remove('active-btn');
  }
 });
}

function bindFavouriteRemoval() {
  const removeFromFavoritesBtns = document.querySelectorAll('.workout-trash-btn');

  if (removeFromFavoritesBtns) {
    removeFromFavoritesBtns.forEach(function(btn) {
      btn.addEventListener('click', removeFavoritesClickHandler);
    });
  }
}
function removeFavoritesClickHandler(e) {
  e.preventDefault();

  let favouriteId = e.target.getAttribute('data-id');

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const index = favorites.findIndex((exercise) => {
    return String(exercise._id) === String(favouriteId);
  });

  if (index !== -1) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    let elementToRemove = document.querySelector('.favorites-item[data-favourite-id="' + favouriteId + '"]');

    elementToRemove.remove();
  }
};

if (window.location.pathname.endsWith('/favorites.html')) {
 displayFavorites();
}
function displayFavorites() {
 const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
 const messageInfoBlock = document.querySelector('.message-info');
 if (favorites.length > 0) {
  messageInfoBlock.style.display = 'none';
 } else {
  messageInfoBlock.style.display = 'block';
 }
  if (favorites.length === 0) {
  favoritesList.innerHTML = `
   <div class="message-info-block">
    <img class="message-info-svg" src="./images/favorites/dumbbell.jpg" alt="dumbbell" />
    <p class="message-info-text">
     It appears that you haven't added any exercises to your favorites yet. To get
     started, you can add exercises that you like to your favorites for easier
     access in the future.
    </p>
   </div>
  `;
 } else {
  favoritesList.innerHTML = favorites.map(exercise => `
   <li class="favorites-item" data-favourite-id="${exercise._id}">
    <div class="workout-card-wrapper">
     <div class="workout-card">
      <div class="workout-header">
       <div class="workout-header-wrapper">
        <p class="workout-title" >Workout</p>
        <button class="workout-trash-btn" id="workout-trash-btn" type="button" data-id="${exercise._id}">
         <svg class="workout-icon-trash" id="workout-icon-trash" width="16" height="16">
          <use href="./images/icons.svg#icon-trash" data-id="${exercise._id}"></use>
         </svg>
        </button>
        <p class="workout-rating" id="workout-rating">4.0</p>
        <svg class="workout-rating-icon" id="workout-rating-icon" width="18" height="18">
         <use href="./images/icons.svg#icon-star"></use>
        </svg>
       </div>
       <button class="workout-start-button" id="workout-start-button" type="button">Start
        <svg class="workout-icon-start" id="workout-icon-start" width="14" height="14">
         <use href="./images/icons.svg#icon-arrow"></use>
        </svg>
       </button>
      </div>
      <div class="workout-name-wrapper">
       <svg class="workout-icon-man" id="workout-icon-man" width="24" height="24">
        <use href="./images/icons.svg#icon-man"></use>
       </svg>
       <p class="workout-name" id="workout-name">${exercise.name}</p>
      </div>
      <div class="workout-inform-wrapper">
       <p class="workout-calories" id="workout-calories">Burned calories: <span class="number-calories" id="number-calories">${exercise.burnedCalories}&#160;&#8260;&#160;${exercise.time}&#160;min</span></p>
       <p class="workout-body-part" id="workout-body-part">Body part: <span class="body-part" id="body-part">${exercise.bodyPart}</span></p>
       <p class="workout-target" id="workout-target">Target: <span class="target" id="target">${exercise.target}</span></p>
      </div>
     </div>
    </div>
   </li>
  `).join('');
 }
  bindFavouriteRemoval();
}
/* Start */
if(exList) {
  exList.addEventListener('click', onCardClick);
}
function onCardClick(e) {
 let exSubtype = e.target.dataset.name;
 let exFilter = e.target.dataset.filter;
 if (exFilter === 'bodyparts') {
  exFilter = 'bodypart';
 }
 if (e.target.nodeName === 'UL') {
  return;
 }
 exForm.classList.remove('visually-hidden');
 span.classList.remove('visually-hidden');
 secondSpan.textContent = exSubtype;
 exList.innerHTML = '';
 exPagination.innerHTML = '';
 getExercisesCards(exFilter, exSubtype).then(
  ({ data: { results, totalPages } }) => {
   exList.insertAdjacentHTML('beforeend', renderCards(results));
   const starBtn = document.querySelectorAll('.workout-start-button');
   starBtn.forEach(btn =>
    btn.addEventListener('click', () => {
     renderExercise(btn.dataset.id);
    })
   );
   renderPagBtn(totalPages);
   exPagination.firstChild.classList.add('active-pag-btn');
   exList.removeEventListener('click', onCardClick);
  }
 );
 if (innerWidth >= 768 && innerWidth < 1440) {
  exHeader.style.marginBottom = '55px';
 }
}

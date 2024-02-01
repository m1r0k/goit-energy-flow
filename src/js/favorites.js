import { renderExercise } from './modal';
import star from './../images/svg/icon-star.svg';
import trash from './../images/svg/icon-trash.svg';
import man from './../images/svg/icon-man.svg';
import arrow from './../images/svg/icon-arrow.svg';

let favoritesList;
let paginationButtons;
const exList = document.querySelector('.favorites-list');
const exForm = document.querySelector('.exercises-form');
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
//  const messageInfoBlock = document.querySelector('.message-info');
//  if (favorites.length > 0) {
//   messageInfoBlock.style.display = 'none';
//  } else {
//   messageInfoBlock.style.display = 'block';
//  }
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
         <img
            class="workout-icon-trash" id="workout-icon-trash-${exercise._id}" data-id="${exercise._id}" width="16" height="16"
            src="${trash}" 
            />
        </button>
        <p class="workout-rating" id="workout-rating">4.0</p>
       <img src="${star}" class="workout-rating-icon" id="workout-rating-icon-${exercise._id}" width="18" height="18" 
       />
       </div>
       <button class="workout-start-button" id="workout-start-button" type="button" data-id="${exercise._id}">Start
         <img
            class="workout-icon-start" id="workout-icon-start-${exercise._id}" width="14" height="14 "
            src="${arrow}"/>
       </button>
      </div>
      <div class="workout-name-wrapper">
       <img src="${man}" class="workout-icon-man" id="workout-icon-man-${exercise._id}" width="16" height="16" />
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

   const starBtn = document.querySelectorAll('.workout-start-button');
   starBtn.forEach(btn =>
    btn.addEventListener('click', () => {
     renderExercise(btn.dataset.id);
    })
   );


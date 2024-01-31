/*let favoritesList;
let paginationButtons;

const itemsPerPage = 6;
if (window.location.pathname === './src/favorites.html') {
  favoritesList = document.querySelector('.workout-item');
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

  const items = favoritesList.querySelectorAll('.workout-list');
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
}*/

let favoritesList;

if (window.location.pathname.endsWith('/favorites.html')) {
  favoritesList = document.querySelector('.favorites-list');
  displayFavorites();
}

const removeFromFavoritesBtn = document.querySelectorAll('.workout-trash-btn');

  if (removeFromFavoritesBtn) {
    removeFromFavoritesBtn.addEventListener('click', removeFavoritesClickHandler);
  }
   function removeFavoritesClickHandler(e) {
     e.preventDefault();

     let favouriteId = e.target.getAttribute('data-id');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const index = favorites.findIndex((exercise) => {
      return String(exercise._id) === String(favouriteId);
    });

    console.log(index);

    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      let elementToRemove = document.querySelector('.workout-card[data-favourite-id="' + favouriteId + '"]');

      elementToRemove.remove();
    }
  };


function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favoritesList.innerHTML = `
      <div class="message-info">
        <div class="message-info-block">
          <img class="message-info-svg" src="./images/favorites/dumbbell.jpg" alt="dumbbell" />
          <p class="message-info-text">
            It appears that you haven't added any exercises to your favorites yet. To get
            started, you can add exercises that you like to your favorites for easier
            access in the future.
          </p>
        </div>
      </div>
    `;
  } else {

    favoritesList.innerHTML = favorites.map(exercise => `

      <div class="workout-card" data-favourite-id="${exercise._id}">
            <div class="workout-header">
                <div class="workout-header-wrapper">
                    <p class="workout-title" id="workout-title-${exercise._id}">workout</p>
                    <button class="workout-trash-btn" id="workout-trash-btn-${exercise._id}" type="button" data-id="${exercise._id}">
                        <svg class="workout-icon-trash" id="workout-icon-trash-${exercise._id}" width="16" height="16">
                            <use href="./images/icons.svg#icon-trash" data-id="${exercise._id}"></use>
                        </svg>
                    </button>
                    <p class="workout-rating" id="workout-rating-${exercise._id}">${exercise.rating}</p>
                    <svg class="workout-rating-icon" id="workout-rating-icon-${exercise._id}" width="18" height="18">
                        <use href="./images/icons.svg#icon-star"></use>
                    </svg>

                </div>
                <button class="workout-start-button" id="workout-start-button-${exercise._id}" type="button">Start
                    <svg class="workout-icon-start" id="workout-icon-start-${exercise._id}" width="14" height="14">
                        <use href="./images/icons.svg#icon-arrow"></use>
                    </svg>
                </button>
            </div>
            <div class="workout-name-wrapper">
                <svg class="workout-icon-man" id="workout-icon-man-${exercise._id}" width="24" height="24">
                    <use href="./images/icons.svg#icon-man"></use>
                </svg>
                <p class="workout-name" id="workout-name">${exercise.name}</p>
            </div>
            <div class="workout-inform-wrapper">
                <p class="workout-calories" id="workout-calories-${exercise._id}">Burned calories: <span class="number-calories" id="number-calories-${exercise._id}">${exercise.burnedCalories}&nbsp;⁄&nbsp;${exercise.time}&nbsp;min</span></p>
                <p class="workout-body-part" id="workout-body-part-${exercise._id}">Body part: <span class="body-part" id="body-part">${exercise.bodyPart}</span></p>
                <p class="workout-target" id="workout-target-${exercise._id}">Target: <span class="target" id="target">${exercise.target}</span></p>
            </div>
            </div>
    `).join('');
  }
}
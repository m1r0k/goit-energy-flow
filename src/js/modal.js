import heart from '../images/svg/icon-heart.svg'
import iziToast from "izitoast";
import { getExercise } from './api'
import { renderReview } from './review';


const backDrop = document.querySelector('.backdrop');



// RENDER //

export async function renderExercise(_id) {

  document.body.style.overflow = "hidden"

  backDrop.classList.remove('visually-hidden');

  const exerciseModalData = await getExercise(_id).then(res => res.data);

  backDrop.innerHTML = makeExerciseCard(exerciseModalData);

  localStorage.setItem('ratingClose', JSON.stringify(exerciseModalData._id));

  // ADD TO FAVORITES //

  const addToFavoritesBtn = document.querySelector('.modal-btn-favorites');

  addToFavoritesBtn.addEventListener('click', addToFavoritesClickHandler);

  function addToFavoritesClickHandler(e) {
    e.preventDefault();

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const index = favorites.findIndex((exercise) => {
      return String(exercise._id) === String(exerciseModalData._id);
    });

    console.log(index);

    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      addToFavoritesBtn.innerHTML = checkExerciseIsFavorite(exerciseModalData._id);
      iziToast.show({
        message: 'The exercise has been removed from favorites',
        messageColor: '#f7f7fc',
        backgroundColor: '#3939db',
        position: 'topRight'
      });
    } else {
      favorites.push(exerciseModalData);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      addToFavoritesBtn.innerHTML = checkExerciseIsFavorite(exerciseModalData._id);
      iziToast.show({
        message: 'The exercise has been added to favorites',
        messageColor: '#f7f7fc',
        backgroundColor: '#219c2b',
        position: 'topRight'
      });
    }
  };


  // CLOSE MODAL //

  function closeModal() {
    backDrop.innerHTML = '';
    localStorage.removeItem('ratingClose');
    backDrop.classList.add('visually-hidden');
    addToFavoritesBtn.removeEventListener('click', addToFavoritesClickHandler);
    closeBtn.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', escapeKeyHandler);
    backDrop.removeEventListener('click', backdropClickHandler);
    document.body.style.overflow = 'visible';
  }

  const closeBtn = document.querySelector('.modal-btn-close');
  closeBtn.addEventListener('click', closeModal);

  function escapeKeyHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  document.addEventListener('keydown', escapeKeyHandler);

  function backdropClickHandler(e) {
    if (e.target === backDrop) {
      closeModal();
    }
  };

  backDrop.addEventListener('click', backdropClickHandler);
  openReview();
};

function makeExerciseCard({
  gifUrl, name, rating, target, bodyPart, equipment,
  popularity, burnedCalories, time, description, _id
}) {
  const parsedRating = Math.round(parseFloat(rating));
  const formattedRating = parsedRating.toFixed(1);

  const capitalizedName = capitalizeFirstLetter(name);
  const capitalizedTarget = capitalizeFirstLetter(target);
  const capitalizedBodyPart = capitalizeFirstLetter(bodyPart);
  const capitalizedEquipment = capitalizeFirstLetter(equipment);

  const stars = Array.from({ length: 5 }, (_, starIndex) => `
  <li>
    <svg style="fill: rgba(126, 132, 127, 0.20);" xmlns="http://www.w3.org/2000/svg" width="14" height="13"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>
  </li>
`).map((star, starIndex) => {
  if (starIndex < parsedRating) {
    return star.replace('<svg', `<svg style="fill: #eea10c;" title="${formattedRating}"`);
  }
  return star;
}).join('');


  return `
        <div class="modal-window">
  <div>
    <button class="modal-btn-close" type="button">
      <svg class="modal-btn-close-svg" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.833 8.167 8.167 19.833m0-11.666 11.666 11.666"/>
      </svg>
    </button>
  </div>
  <div class="modal-tablet-pc-ver">
    <div class="modal-video">
      <img class="modal-video-img" width="360" height="360" src="${gifUrl}" alt="Animated GIF">
    </div>
    <div class="wrapper-info">
      <h1 class="modal-title">${capitalizedName}</h1>
      <div class="modal-rating">
        <p class="modal-rating-numbers">${formattedRating}</p>
        <ul class="modal-rating-stars">
          ${stars}
        </ul>
      </div>
      <div class="modal-info">
        <ul class="modal-info-list">
          <li>
            <h3 class="modal-info-list-title">Target</h3>
            <p class="modal-info-list-title-value">${capitalizedTarget}</p>
          </li>
          <li>
            <h3 class="modal-info-list-title">Body Part</h3>
            <p class="modal-info-list-title-value">${capitalizedBodyPart}</p>
          </li>
          <li>
            <h3 class="modal-info-list-title">Equipment</h3>
            <p class="modal-info-list-title-value">${capitalizedEquipment}</p>
          </li>
          <li>
            <h3 class="modal-info-list-title">Popular</h3>
            <p class="modal-info-list-title-value">${popularity}</p>
          </li>
          <li>
            <h3 class="modal-info-list-title">Burned Calories</h3>
            <p class="modal-info-list-title-value">${burnedCalories}/${time} min</p>
          </li>
        </ul>
      </div>
      <p class="descr">${description}</p>
    </div>
  </div>
  <div class="modal-btns">
    <button class="modal-btn-favorites" type="button">
      ${checkExerciseIsFavorite(_id)}
    </button>
    <button class="modal-give-rating" type="button">
      Give a rating
    </button>
  </div>
</div>
      `;
}

function checkExerciseIsFavorite(_id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const index = favorites.findIndex((exercise) => String(exercise._id) === String(_id));

  if (index === -1) {
    return `Add to favorites <div>
            <img src="${heart}" class="modal-btn-favorites-svg" />
        </div>`
  } else {
    return `Remove from <div>
          <img src="${heart}" class="modal-btn-favorites-svg" />
        </div>`
  }
}

function openReview() {
  const reviewBtn = document.querySelector('.modal-give-rating');
  reviewBtn.addEventListener('click', renderReview, { once: true });
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
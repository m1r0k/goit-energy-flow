import { filterExercises, getExercisesCards } from './api';
const btnFilterList = document.querySelector('.btn-wrapper');
const exFilterBtn = document.querySelectorAll('.exercises-btn-filter');
const exList = document.querySelector('.exercises-list');
const exPagination = document.querySelector('.exercises-pagination');
const span = document.querySelector('.span');
const secondSpan = document.querySelector('.second-span');

let query = 'Muscles';

filterExercises(query).then(({ data: { results, totalPages } }) => {
  exFilterBtn[0].classList.add('is-active');
  exList.insertAdjacentHTML('beforeend', renderFilterItems(results));
  renderPagBtn(totalPages);
  exPagination.firstChild.classList.add('active-pag-btn');
});

btnFilterList.addEventListener('click', e => {
  //   exList.classList.remove('visually-hidden');
  span.classList.add('visually-hidden');
  const button = e.target;
  if (button.nodeName !== 'BUTTON') {
    return;
  }
  const activeFilterBtn = document.querySelector('.is-active');

  if (activeFilterBtn) {
    activeFilterBtn.classList.remove('is-active');
  }
  button.classList.add('is-active');
  query = button.textContent;

  filterExercises(query).then(({ data: { results, totalPages } }) => {
    exList.innerHTML = '';
    exList.insertAdjacentHTML('beforeend', renderFilterItems(results));

    renderPagBtn(totalPages);
    exPagination.firstChild.classList.add('active-pag-btn');
  });
});

exPagination.addEventListener('click', onPagBtnClick);

function onPagBtnClick(e) {
  let page = e.target.textContent;
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const activePagBtn = document.querySelector('.active-pag-btn');
  if (activePagBtn) {
    activePagBtn.classList.remove('active-pag-btn');
  }
  e.target.classList.add('active-pag-btn');

  fetchEx(query, page);
}

function renderFilterItems(data) {
  return data
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(
      ({ name, filter, imgUrl }) => `<li
          class="exercises-item"
          style="
          background:linear-gradient(0deg, rgba(16, 16, 16, 0.70) 0%, rgba(16, 16, 16, 0.70) 100%), url(${imgUrl});
          background-size: cover;
  background-repeat: no-repeat; 
          "
          data-name = "${name}"
          data-filter = "${filter.toLowerCase().split(' ').join('')}"
        >
        <div class = "text-wrapper">
          <p class="exercises-name" >${name}</p>
          <p class="exercises-text">${filter}</p>
          </div>
        </li>`
    )
    .join('');
}

function renderPagBtn(totalPages) {
  const buttons = Array(totalPages)
    .fill()
    .map(
      (_, idx) =>
        `<button class = "exercises-pagination-btn" type = "button">${
          idx + 1
        }</button>`
    )
    .join('');
  exPagination.innerHTML = '';
  exPagination.insertAdjacentHTML('beforeend', buttons);
}

function fetchEx(query, page) {
  return fetch(
    `https://energyflow.b.goit.study/api/filters?filter=${query}&page=${page}&limit=12`
  )
    .then(res => res.json())
    .then(({ results }) => {
      exList.innerHTML = '';
      exList.insertAdjacentHTML('beforeend', renderFilterItems(results));
    });
}

exList.addEventListener('click', onCardClick);

function onCardClick(e) {
  let exSubtype = e.target.dataset.name;
  let exFilter = e.target.dataset.filter;

  if (exFilter === 'bodyparts') {
    exFilter = 'bodypart';
  }

  span.classList.remove('visually-hidden');
  secondSpan.textContent = exSubtype;
  exList.innerHTML = '';
  exPagination.innerHTML = '';
  getExercisesCards(exFilter, exSubtype).then(({ data: { results } }) => {
    console.log(results);
    exList.insertAdjacentHTML('beforeend', renderCards(results));
  });
}

function renderCards(card) {
  return card
    .map(
      ({ name, rating, burnedCalories, target, bodyPart, time }) => `<li
          class="workout-item"
          <div class="workout-card">    
      <div class="workout-header">
          <div class="workout-header-wrapper">
            <p class="workout-title" id="workout-title">workout</p>
            <p class="workout-rating" id="workout-rating">${rating}</p>
              <svg
              class="workout-rating-icon"
              id="workout-rating-icon"
              width="18"
              height="18"
            >
              <use href="./images/icons.svg#icon-star"></use>
            </svg>
          </div>
          <button
            class="workout-start-button"
            id="workout-start-button"
            type="button"
          >
            Start
            <svg
              class="workout-icon-start"
              id="workout-icon-start"
              width="14"
              height="14"
            >
              <use href="./images/icons.svg#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div class="workout-name-wrapper">
          <svg
            class="workout-icon-man"
            id="workout-icon-man"
            width="24"
            height="24"
          >
            <use href="./images/icons.svg#icon-man"></use>
          </svg>
          <p class="workout-name" id="workout-name">${name}</p>
        </div>
        <div class="workout-inform-wrapper">
          <p class="workout-calories" id="workout-calories">
            Burned calories:
            <span class="number-calories" id="number-calories"
              >${burnedCalories} / ${time} min</span
            >
          </p>
          <p class="workout-body-part" id="workout-body-part">
            Body part: <span class="body-part" id="body-part">${bodyPart}</span>
          </p>
          <p class="workout-target" id="workout-target">
            Target: <span class="target" id="target">${target}</span>
          </p>
          </div>
          </div>
            
      `)
    .join('');
} 

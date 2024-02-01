import star from '../images/svg/icon-star.svg';
import arrow from '../images/svg/icon-arrow.svg';
import man from '../images/svg/icon-man.svg';
import { filterExercises, getExercisesCards } from './api';
import axios from 'axios';
import { renderExercise } from './modal';
const btnFilterList = document.querySelector('.btn-wrapper');
const exFilterBtn = document.querySelectorAll('.exercises-btn-filter');
const exForm = document.querySelector('.exercises-form');
const exList = document.querySelector('.exercises-list');
const exPagination = document.querySelector('.exercises-pagination');
let span = document.querySelector('.span');
const secondSpan = document.querySelector('.second-span');
const exHeader = document.querySelector('.exercises-header');

let query = 'Muscles';

let allPages = 0;

filterExercises(query).then(({ data: { results, totalPages, page } }) => {
  exFilterBtn[0].classList.add('is-active');

  exList.insertAdjacentHTML('beforeend', renderFilterItems(results));
  renderPagBtn(totalPages, page);
});

btnFilterList.addEventListener('click', onFiltersBtnClick);

function onFiltersBtnClick(e) {
  span.classList.add('visually-hidden');
  const button = e.target;
  if (button.nodeName !== 'BUTTON') {
    return;
  }
  const activeFilterBtn = document.querySelector('.is-active');
  if (activeFilterBtn) {
    activeFilterBtn.classList.remove('is-active');
  }

  if (innerWidth >= 768 && innerWidth < 1440) {
    exHeader.style.marginBottom = '32px';
  }

  button.classList.add('is-active');
  query = button.textContent;
  exList.addEventListener('click', onCardClick);
  filterExercises(query).then(({ data: { results, totalPages, page } }) => {
    exList.innerHTML = '';
    exList.insertAdjacentHTML('beforeend', renderFilterItems(results));

    renderPagBtn(totalPages, page);

    exForm.classList.add('visually-hidden');
  });
}

exList.addEventListener('click', onCardClick);

function onCardClick(e) {
  if (e.target.nodeName != 'UL') {
    let exSubtype = e.target.closest('li').dataset.name;
    let exFilter = e.target.closest('li').dataset.filter;

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
      ({ data: { results, totalPages, page } }) => {
        exList.insertAdjacentHTML('beforeend', renderCards(results));

        const startBtn = document.querySelectorAll('.workout-start-button');
        startBtn.forEach(btn =>
          btn.addEventListener('click', () => {
            renderExercise(btn.dataset.id);
          }, { once: true })
        );

        renderPagBtn(totalPages, page);

        exPagination.removeEventListener('click', onPagFilterBtnClick);
        exPagination.addEventListener('click', onPagExBtnClick);

        allPages = totalPages;

        exPagination.firstChild.classList.add('active-pag-btn');
        exList.removeEventListener('click', onCardClick);
      }

    );

    if (innerWidth >= 768 && innerWidth < 1440) {
      exHeader.style.marginBottom = '55px';
    }
  }
}

function onPagExBtnClick(e) {
  let page = e.target.textContent;

  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const activePagBtn = document.querySelector('.active-pag-btn');
  if (activePagBtn) {
    activePagBtn.classList.remove('active-pag-btn');
  }
  e.target.classList.add('active-pag-btn');
  const keyword = exForm.querySelector('input').value.trim();

  nextPage(allPages, page);
  getExercisesCards(query.toLowerCase(), secondSpan.textContent, page, keyword).then(res => {
    exList.innerHTML = '';
    exList.insertAdjacentHTML('beforeend', renderCards(res.data.results));

    const startBtn = document.querySelectorAll('.workout-start-button');
    startBtn.forEach(btn =>
      btn.addEventListener('click', () => {
        renderExercise(btn.dataset.id);
      })
    );
  });
}

function onPagFilterBtnClick(e) {
  let page = e.target.textContent;

  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const activePagBtn = document.querySelector('.active-pag-btn');
  if (activePagBtn) {
    activePagBtn.classList.remove('active-pag-btn');
  }
  e.target.classList.add('active-pag-btn');

  filterExercises(query, page).then(res => {

    exList.innerHTML = '';
    exList.insertAdjacentHTML('beforeend', renderFilterItems(res.data.results));
  });
}

function renderFilterItems(data) {
  exPagination.addEventListener('click', onPagFilterBtnClick);
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

          <p class="exercises-name" >${name}</p>
          <p class="exercises-text" >${filter}</p>

        </li>`
    )
    .join('');
}

function nextPage(totalPages, page) {
  const maxDisplayedPages = 5;

  let startIdx = Math.max(1, page - Math.floor(maxDisplayedPages / 2));
  let endIdx = Math.min(startIdx + maxDisplayedPages - 1, totalPages);

  if (endIdx - startIdx + 1 < maxDisplayedPages) {
    startIdx = Math.max(1, endIdx - maxDisplayedPages + 1);
  }

  const buttonsPage = Array.from({ length: endIdx - startIdx + 1 }, (_, idx) => {
    const pageNum = startIdx + idx;

    return pageNum === Number(page)
      ? `<button class="exercises-pagination-btn active-pag-btn" type="button">${pageNum}</button>`
      : `<button class="exercises-pagination-btn" type="button">${pageNum}</button>`;
  }).join('');

  exPagination.innerHTML = '';
  exPagination.insertAdjacentHTML('beforeend', buttonsPage);
}


function renderPagBtn(totalPages, page) {
  let buttons = ''

  if (totalPages > 5) {
    buttons = [page - 2, page - 1, page, page + 1, page + 2]
      .fill(page, 3, 4)
      .map(
        (_, idx) =>
          `<button class = "exercises-pagination-btn" type = "button">${idx + 1
          }</button>`
      )
      .join('');

  } else {
    buttons = Array(totalPages)
      .fill()
      .map(
        (_, idx) =>
          `<button class = "exercises-pagination-btn" type = "button">${idx + 1
          }</button>`
      )
      .join('');
  }

  exPagination.innerHTML = '';
  exPagination.insertAdjacentHTML('beforeend', buttons);
  const checkActive = Array.from(exPagination.querySelectorAll('.exercises-pagination-btn')).some(
    (elem) => elem.classList.contains('active-pag-btn'));

  if (!checkActive) {
    exPagination.firstChild.classList.add('active-pag-btn');
  }
}

function renderCards(card) {
  return card
    .map(
      ({ name, rating, burnedCalories, target, bodyPart, time, _id }) => `<li
          class="workout-item">
          <div class="workout-card">
      <div class="workout-header">
          <div class="workout-header-wrapper">
            <p class="workout-title">workout</p>
            <p class="workout-rating">${rating}</p>
            <img
            class="workout-rating-icon"
              src="${star}" />
          </div>
          <button
            class="workout-start-button"
            data-id = "${_id}"
            type="button"
          >
            Start
             <img
              class="workout-icon-start"
             src="${arrow}" />
          </button>
        </div>
        <div class="workout-name-wrapper">
           <img
            class="workout-icon-man"
            src="${man}" />
          <p class="workout-name">${name}</p>
        </div>

        <div class="workout-inform-wrapper">

        <p class="workout-calories">
            Burned calories:
            <span class="number-calories">${burnedCalories} / ${time} min</span>
          </p>

        <p class="workout-body-part">
            Body part:
            <span class="body-part">${bodyPart}</span>
          </p>

          <p class="workout-target">
            Target: <span class="target">${target}</span>
          </p>

          </div>
          </div>
</li>
      `
    )
    .join('');
}

// пошук //

function getFilterAndSubtypeInfo(filter, name, page, keyword) {
  getExercisesCards(filter, name, page, keyword).then(response => {

    if (String(response.data.results) === '') {
      exList.innerHTML = `
      <li class="workout-item-no-results">
  <p class="workout-no-results">
    Unfortunately, <span class="workout-no-results-span">no results</span> were found. You may want to consider other
    search options to find the exercise you are looking
    for. Our range is wide and you have the opportunity to find more options that suit your needs.
  </p>
</li>`
      exPagination.classList.add('visually-hidden');
    } else {
      exPagination.classList.remove('visually-hidden');
      exList.innerHTML = '';
      exList.insertAdjacentHTML('beforeend', renderCards(response.data.results));
    }


  });
}

function onexFormSubmit(e) {
  e.preventDefault();

  let filter = document.querySelector('.exercises-btn-filter.is-active').textContent.toLocaleLowerCase();

  if (filter === "body parts") {
    filter = 'bodypart';
  }


  const nowPage = document.querySelector('.exercises-pagination-btn.active-pag-btn').textContent;
  const keyword = exForm.querySelector('input').value.trim();

  getFilterAndSubtypeInfo(filter, secondSpan.textContent.toLowerCase(), nowPage, keyword);
  exForm.reset();
}

exForm.addEventListener('submit', onexFormSubmit);

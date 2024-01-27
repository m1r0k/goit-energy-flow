import { filterExercises } from './api';
const btnFilterList = document.querySelector('.btn-wrapper');
const exFilterBtn = document.querySelectorAll('.exercises-btn-filter');
const exList = document.querySelector('.exercises-list');
const exPagination = document.querySelector('.exercises-pagination');

let query = 'Muscles';

filterExercises(query).then(({ data: { results, totalPages } }) => {
  exFilterBtn[0].classList.add('is-active');
  exList.insertAdjacentHTML('beforeend', renderFilterItems(results));
  renderPagBtn(totalPages);
});

btnFilterList.addEventListener('click', e => {
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
  });
});

exPagination.addEventListener('click', onPagBtnClick);

function onPagBtnClick(e) {
  let page = e.target.textContent;
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

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
        >
        <div class = "text-wrapper">
          <p class="exercises-name">${name}</p>
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
        `<button class = "exercises-pagination-btn" type = "button" data-page-number = ${
          idx + 1
        }>${idx + 1}</button>`
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

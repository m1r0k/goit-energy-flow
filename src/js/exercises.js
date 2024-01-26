import { filterExercises } from './api';

const exFilterBtn = document.querySelectorAll('.exercises-btn-filter');
const exList = document.querySelector('.exercises-list');
console.log('exFilterBtn :>> ', exFilterBtn);
console.log('exList', exList);

filterExercises('Muscles').then(({ data: { results } }) => {
  console.log(results);
  exFilterBtn[0].classList.add('current');
  exList.insertAdjacentHTML('beforeend', renderFilter(results));
});

function renderFilter(data) {
  return data
    .map(
      ({ name, filter, imgUrl }) => `<li
          class="exercises-item"
          style="
           background-image: url(${imgUrl}) 
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

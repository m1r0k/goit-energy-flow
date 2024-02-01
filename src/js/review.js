import { renderExercise } from "./modal";
import { leaveReview } from "./api";
import iziToast from "izitoast";

const backdrop = document.querySelector('.backdrop');


export function renderReview() {

    backdrop.innerHTML = '';

    backdrop.insertAdjacentHTML('beforeend', `
    <div class="rating">

        <button type="button" class="rating-close-btn">
             <svg class="rating-close-btn-icon" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.833 8.167 8.167 19.833m0-11.666 11.666 11.666"/>
      </svg>
        </button>

        <form action="post" class="rating-form">

            <p class="rating-stars-text">Rating</p>

            <div class="rating-stars-box">

                <p class="rating-number">0.0</p>

                <ul class="rating-list">

                <li>
                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="1" name="rating" required>
                      <svg class="rating-icon-star" data-number="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>
                </label>
                </li>

                <li>
                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="2" name="rating" required>
                      <svg class="rating-icon-star" data-number="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>
                </label>
                </li>

                <li>
                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="3" name="rating" required>
                       <svg class="rating-icon-star" data-number="3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>
                </label>
                </li>

                <li>
                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="4" name="rating" required>
                        <svg class="rating-icon-star" data-number="4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>
                </label>
                </li>

                <li>
                <label class="rating-label">
                    <input class="rating-stars-btn visually-hidden" type="radio" value="5" name="rating" required>
                         <svg class="rating-icon-star" data-number="5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>
                </label>
                </li>
                
                </ul>

            </div>

            <input class="rating-email" type="email" name="rating-email" placeholder="Email" required>

                <textarea class="rating-comment" name="rating-comment" placeholder="Your comment" required></textarea>

                <button class="rating-send-btn" type="submit">Send</button>
        </form>
    </div>`);


    // close
    const ratingCloseBtn = document.querySelector('.rating-close-btn');
    ratingCloseBtn.addEventListener('click', () => renderExercise(JSON.parse(localStorage.getItem('ratingClose'))), { once: true });

    // stars
    const ratingList = document.querySelector('.rating-list');
    const ratingStars = document.querySelectorAll('.rating-icon-star');
    const ratingNumber = document.querySelector('.rating-number')
    giveStars(ratingList, ratingStars, ratingNumber);

    // send
    const ratingEmail = document.querySelector('.rating-email');
    const ratingComment = document.querySelector('.rating-comment');
    const ratingForm = document.querySelector('.rating-form');

    sendReview(ratingEmail, ratingComment, ratingForm, ratingNumber)
}

function giveStars(ratingList, ratingStars, ratingNumber) {

    ratingList.addEventListener('mousedown', event => {
        const ratingClickedStar = event.target.closest('svg.rating-icon-star');

        ratingNumber.textContent = `${ratingClickedStar.dataset.number}.0`

        ratingStars.forEach(star => star.style.fill = "rgba(27, 27, 27, 0.20)");

        for (let i = 0; i < ratingClickedStar.dataset.number; i++) ratingStars[i].style.fill = "#EEA10C";
    });
}

function sendReview(ratingEmail, ratingComment, ratingForm, ratingNumber) {
    ratingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        try {
            leaveReview(
                JSON.parse(localStorage.getItem('ratingClose')),
                Number(ratingNumber.textContent.slice(0, 1)),
                ratingEmail.value,
                ratingComment.value
            );
            iziToast.show({
                message: 'Thanks you for your review',
                messageColor: '#f7f7fc',
                backgroundColor: '#0ac21c',
                position: 'topRight'
            });

            renderExercise(JSON.parse(localStorage.getItem('ratingClose')));
        } catch (error) {
            iziToast.show({
                message: 'Sorry, something goes wrong',
                messageColor: '#f7f7fc',
                backgroundColor: '#c71212',
                position: 'topRight'
            });
        }
    });
}
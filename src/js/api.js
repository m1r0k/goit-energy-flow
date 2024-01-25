import axios from "axios"

const BASE_URL = 'https://energyflow.b.goit.study/api/';


// фільтри для блоку з видами вправав
export function filterExercises(value) {
    return axios(`${BASE_URL}filters`, {
        method: 'get',
        params: {
            filter: value,
            limit: 12,
        }
    });
}

// отримати вправи
export function getExercises(bodyparts, muscles, equipment, keyword) {
    return axios(`${BASE_URL}exercises`, {
        method: 'get',
        params: {
            bodyparts,
            muscles,
            equipment,
            keyword,
            limit: 9,
        }
    });
}

// взяти одину вправу за айді
export function getExercise(id) {
    return axios(`${BASE_URL}exercises`, {
        method: 'get',
        params: {
            id
        }
    });
}

// отримати цититу
export function getQuote() {
    return axios(`${BASE_URL}quote`, {
        method: 'get',
    });
}

// підписатися на розсилку
export function subscribe(email) {
    return axios.post(`${BASE_URL}subscription`, {
        email
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
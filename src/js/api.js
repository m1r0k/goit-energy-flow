import axios from "axios"

const BASE_URL = 'https://energyflow.b.goit.study/api/';


export function filterExercises(value) {
    axios(`${BASE_URL}filters`, {
        method: 'get',
        params: {
            filter: value,
            limit: 12,
        }
    });
}

export function filterSubtypeOfExercises(bodyparts, muscles, equipment, keyword) {
    axios(`${BASE_URL}exercises`, {
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

export function getExercise(id) {
    axios(`${BASE_URL}exercises`, {
        method: 'get',
        params: {
            id
        }
    });
}

export function getQuote() {
    axios(`${BASE_URL}quote`, {
        method: 'get',
    });
}
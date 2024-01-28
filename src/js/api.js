import axios from 'axios';

const BASE_URL = 'https://energyflow.b.goit.study/api/';

// фільтри для блоку з видами вправав
export async function filterExercises(value) {
  return await axios(`${BASE_URL}filters`, {
    method: 'get',
    params: {
      filter: value,
      limit: 12,
    },
  });
}

// отримати вправи
export async function getExercises(bodyparts, muscles, equipment, keyword) {
  return await axios(`${BASE_URL}exercises`, {
    method: 'get',
    params: {
      bodyparts,
      muscles,
      equipment,
      keyword,
      limit: 9,
    },
  });
}

// взяти одину вправу за айді
export async function getExercise(id) {
  return await axios(`${BASE_URL}exercises`, {
    method: 'get',
    params: {
      id,
    },
  });
}

// отримати цититу
export async function getQuote() {
  return await axios(`${BASE_URL}quote`, {
    method: 'get',
  });
}

// підписатися на розсилку
export async function subscribe(email) {
  return await axios.post(
    `${BASE_URL}subscription`,
    {
      email,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

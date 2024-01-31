import axios from 'axios';

const BASE_URL = 'https://energyflow.b.goit.study/api/';

export async function getExercisesCards(filter, name, totalPages, keyword) {
  return await axios(`${BASE_URL}exercises`, {
    method: 'get',
    params: {
      [filter]: name,
      keyword,
      totalPages,
      limit: 9,
    },
  });
}

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
export async function getExercise(_id) {
  return await axios(`${BASE_URL}exercises/${_id}`, {
    method: 'get',
  });
}

// отримати цититу
export async function getQuote() {
  try {
    const response = await fetch("https://energyflow.b.goit.study/api/quote");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
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

// відправити відгук

export async function leaveReview(id, rate, email, review) {
  await axios.patch(`${BASE_URL}exercises/${id}/rating`, {
    rate,
    email,
    review
  }, {
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    }
  });
}
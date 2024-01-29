import { getQuote } from "./api";

document.addEventListener("DOMContentLoaded", function () {
  const storedQuote = localStorage.getItem("quote");
  const storedDate = localStorage.getItem("quoteDate");

  if (storedQuote && storedDate && new Date().toISOString().split('T')[0] === storedDate) {
    displayQuote(JSON.parse(storedQuote));
  } else {
    fetchQuoteFromBackend();
  }
});

function fetchQuoteFromBackend() {
  getQuote()
    .then(({ author, quote }) => {
      displayQuote({ author, quote });
      localStorage.setItem("quote", JSON.stringify({ author, quote }));
      localStorage.setItem("quoteDate", new Date().toISOString().split('T')[0]);
    })
    .catch(error => {
      console.error("Error fetching quote:", error);
    });
}

function displayQuote(quoteData) {
  const quoteTextElement = document.querySelector(".quot-text");
  const quoteAuthorElement = document.querySelector(".quot-author");
    quoteTextElement.textContent = quoteData.quote;
    quoteAuthorElement.textContent = quoteData.author;
  
}

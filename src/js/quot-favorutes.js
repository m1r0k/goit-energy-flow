import { getQuote } from "./api";

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const storedQuote = localStorage.getItem("quote");
    const storedDate = localStorage.getItem("quoteDate");

    if (storedQuote && storedDate && new Date().toISOString().split('T')[0] === storedDate) {
      displayQuote(JSON.parse(storedQuote));
    } else {
      const quoteData = await fetchQuoteFromBackend();
      displayQuote(quoteData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

async function fetchQuoteFromBackend() {
  try {
    const { author, quote } = await getQuote(); 
    localStorage.setItem("quote", JSON.stringify({ author, quote }));
    localStorage.setItem("quoteDate", new Date().toISOString().split('T')[0]);
    return { author, quote };
  } catch (error) {
    throw error; 
  }
}

function displayQuote(quoteData) {
  const quoteTextElement = document.querySelector(".quote-text");
  const quoteAuthorElement = document.querySelector(".quote-author");
  quoteTextElement.textContent = quoteData.quote;
  quoteAuthorElement.textContent = quoteData.author;
}



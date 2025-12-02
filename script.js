const quoteTextElement = document.getElementById('quote-text');
const quoteAuthorElement = document.getElementById('quote-author');
const API_URL = 'https://zenquotes.io/api/random';

/**
 * Fetches a random quote from the Zen Quotes API and updates the DOM.
 */
async function fetchAndDisplayQuote() {
    try {
        // Show a temporary loading message
        quoteTextElement.textContent = "Fetching inspiration...";
        quoteAuthorElement.textContent = "";

        // 1. Fetch the data
        const response = await fetch(API_URL);
        
        // 2. Parse the JSON response
        const data = await response.json();
        
        // The API returns an array with one object, so we access index 0
        const quote = data[0]; 

        // 3. Update the HTML elements with the new quote
        quoteTextElement.textContent = `“${quote.q}”`;
        // Handle case where author might be missing or generic
        quoteAuthorElement.textContent = `- ${quote.a || 'Unknown'}`; 

    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteTextElement.textContent = "Error loading quote. Please check your network connection.";
        quoteAuthorElement.textContent = "";
    }
}

// Initial call to load a quote immediately when the page loads
fetchAndDisplayQuote();

// Set up the interval to refresh the quote every 60 seconds (60000 milliseconds)
const REFRESH_INTERVAL_MS = 60000; 
setInterval(fetchAndDisplayQuote, REFRESH_INTERVAL_MS);
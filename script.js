const quoteTextElement = document.getElementById('quote-text');
const quoteAuthorElement = document.getElementById('quote-author');

// We are using the reliable Quotable API now
const API_URL = 'https://api.quotable.io/random'; 

/**
 * Fetches a random quote from the Quotable API and updates the DOM.
 */
async function fetchAndDisplayQuote() {
    // 1. Show the "Loading" message only on the *first* load.
    // We skip this during scheduled interval refreshes for a cleaner look.
    if (quoteTextElement.textContent === 'Loading...' || quoteTextElement.textContent.startsWith('Error')) {
         quoteTextElement.textContent = "Fetching new inspiration...";
         quoteAuthorElement.textContent = "";
    }

    try {
        const response = await fetch(API_URL);
        
        // Check for non-200 status codes (like 429 Rate Limit or 500 Server Error)
        if (!response.ok) {
            throw new Error(`API returned status: ${response.status}`);
        }

        const data = await response.json();
        
        // 2. Update the HTML elements
        quoteTextElement.textContent = `“${data.content}”`;
        quoteAuthorElement.textContent = `- ${data.author || 'Unknown'}`; 

    } catch (error) {
        console.error('Error fetching quote:', error);
        // If an error occurs, it will simply keep the last successfully loaded quote visible.
        // We only update the console, not the display, to avoid the flicker.
    }
}

// Initial call to load a quote immediately when the page loads
fetchAndDisplayQuote();

// Set up the interval to refresh the quote every 60 seconds (60000 milliseconds)
const REFRESH_INTERVAL_MS = 60000; 
setInterval(fetchAndDisplayQuote, REFRESH_INTERVAL_MS);

const quoteTextElement = document.getElementById('quote-text');
const quoteAuthorElement = document.getElementById('quote-author');
const API_URL = 'https://api.quotable.io/random'; 

/**
 * Fetches a random quote from the Quotable API and updates the DOM.
 */
async function fetchAndDisplayQuote(isInitialLoad = false) {
    // Only show a loading message if this is the very first time running (isInitialLoad is true)
    if (isInitialLoad) {
         quoteTextElement.textContent = "Loading an inspiring quote...";
         quoteAuthorElement.textContent = "";
    }

    try {
        const response = await fetch(API_URL);
        
        // Throw an error if the network response was not successful (e.g., 429 Rate Limit)
        if (!response.ok) {
            throw new Error(`API returned status: ${response.status}`);
        }

        const data = await response.json();
        
        // 1. Successful fetch: Update the HTML elements
        quoteTextElement.textContent = `“${data.content}”`;
        quoteAuthorElement.textContent = `- ${data.author || 'Unknown'}`; 

    } catch (error) {
        console.error('Error fetching quote:', error);
        
        // 2. Unsuccessful fetch: If an error occurs, we DON'T change the display
        // The screen will simply keep the last successfully loaded quote visible.
        if (isInitialLoad) {
            quoteTextElement.textContent = "Error: Could not load quote. Check Console.";
            quoteAuthorElement.textContent = "";
        }
    }
}

// Initial call: Pass 'true' to show the loading message
fetchAndDisplayQuote(true);

// Set up the interval to refresh the quote every 60 seconds
const REFRESH_INTERVAL_MS = 60000; 
// Interval calls do NOT pass a parameter, so the function assumes isInitialLoad is false (default)
setInterval(fetchAndDisplayQuote, REFRESH_INTERVAL_MS);

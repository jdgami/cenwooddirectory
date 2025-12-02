const quoteTextElement = document.getElementById('quote-text');
const quoteAuthorElement = document.getElementById('quote-author');

// **NEW API URL: Quotable API**
const API_URL = 'https://api.quotable.io/random'; 

/**
 * Fetches a random quote from the Quotable API and updates the DOM.
 */
async function fetchAndDisplayQuote() {
    try {
        quoteTextElement.textContent = "Fetching inspiration...";
        quoteAuthorElement.textContent = "";

        const response = await fetch(API_URL);
        
        // Throw an error if the network response was not successful (e.g., 404, 500)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // The Quotable API returns structure: data.content and data.author
        quoteTextElement.textContent = `“${data.content}”`;
        quoteAuthorElement.textContent = `- ${data.author || 'Unknown'}`; 

    } catch (error) {
        console.error('Error fetching quote:', error);
        // Display a helpful error message on the screen
        quoteTextElement.textContent = "Error loading quote. Switching to backup source...";
        quoteAuthorElement.textContent = "";

        // **Optional Backup Fallback (using a static quote)**
        setTimeout(() => {
            quoteTextElement.textContent = "“The best way to predict the future is to create it.”";
            quoteAuthorElement.textContent = "- Peter Drucker";
        }, 3000);
    }
}

// Initial call and interval refresh remains the same
fetchAndDisplayQuote();

const REFRESH_INTERVAL_MS = 60000; 
setInterval(fetchAndDisplayQuote, REFRESH_INTERVAL_MS);

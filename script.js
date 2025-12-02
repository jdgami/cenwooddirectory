// Ensure the script runs only after the entire HTML document is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Get references to your HTML elements
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    const API_URL = 'https://api.quotable.io/random'; 
    const REFRESH_INTERVAL_MS = 60000; // 60 seconds

    // Safety Check: Exit if the required elements are not found in the HTML.
    if (!quoteTextElement || !quoteAuthorElement) {
        console.error("CRITICAL ERROR: Could not find HTML elements with IDs 'quote-text' or 'quote-author'. Please check your index.html.");
        return; 
    }
    
    /**
     * Fetches a random quote from the Quotable API and updates the DOM.
     * This function now handles both initial load and interval refreshes.
     */
    async function fetchAndDisplayQuote() {
        
        // On the very first load, we set a temporary 'Loading...' state.
        // On subsequent interval refreshes, we let the old quote remain until the new one is ready (no flicker).
        if (quoteTextElement.textContent === 'Loading...' || quoteTextElement.textContent === '') {
             quoteTextElement.textContent = "Loading an inspiring quote...";
             quoteAuthorElement.textContent = "";
        }
        
        try {
            const response = await fetch(API_URL);
            
            // Check for non-200 status codes (e.g., 404, 500)
            if (!response.ok) {
                throw new Error(`API error status: ${response.status}`);
            }

            const data = await response.json();
            
            // Success: Update the HTML elements
            quoteTextElement.textContent = `“${data.content}”`;
            quoteAuthorElement.textContent = `- ${data.author || 'Unknown'}`; 

        } catch (error) {
            console.error('Fetch error during quote attempt:', error);
            
            // If the *initial* load failed, display an error message for the user.
            if (quoteTextElement.textContent.includes('Loading')) {
                 quoteTextElement.textContent = "Error: Could not load quote. Check the console for details.";
                 quoteAuthorElement.textContent = "";
            }
            // If it fails on an interval refresh, we do nothing, letting the old quote stay visible.
        }
    }

    // Initial load: This is what you see when you first open the page.
    // We set the initial text to trigger the loading state logic inside the function.
    quoteTextElement.textContent = '';
    fetchAndDisplayQuote();

    // Set up the interval to refresh the quote
    setInterval(fetchAndDisplayQuote, REFRESH_INTERVAL_MS);
});

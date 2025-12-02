// Ensure the script runs only after the entire HTML document is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Get references to your HTML elements
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    const API_URL = 'https://api.quotable.io/random'; // The working API
    const REFRESH_INTERVAL_MS = 60000; // 60 seconds

    // Safety Check
    if (!quoteTextElement || !quoteAuthorElement) {
        console.error("CRITICAL ERROR: Missing HTML elements.");
        return; 
    }
    
    /**
     * Fetches a random quote from the Quotable API and updates the DOM.
     */
    async function fetchAndDisplayQuote() {
        
        // Show loading state only if the screen is currently empty
        if (quoteTextElement.textContent === '') {
             quoteTextElement.textContent = "Loading an inspiring quote...";
             quoteAuthorElement.textContent = "";
        }
        
        try {
            const response = await fetch(API_URL);
            
            // Check for non-200 status codes
            if (!response.ok) {
                // Throwing here sends execution to the catch block, but it won't update the screen's content
                throw new Error(`API error status: ${response.status}`);
            }

            const data = await response.json();
            
            // Success: Update the HTML elements
            quoteTextElement.textContent = `“${data.content}”`;
            quoteAuthorElement.textContent = `- ${data.author || 'Unknown'}`; 

        } catch (error) {
            console.error('Fetch error during quote attempt:', error);
            
            // If the initial load failed, display an error message
            if (quoteTextElement.textContent.includes('Loading')) {
                 quoteTextElement.textContent = "Error: Could not load quote. Check network.";
                 quoteAuthorElement.textContent = "";
            }
        }
    }

    // Initial load
    quoteTextElement.textContent = '';
    fetchAndDisplayQuote();

    // Set up the interval to refresh the quote
    setInterval(fetchAndDisplayQuote, REFRESH_INTERVAL_MS);
});

// Ensure the script runs only after the entire HTML document is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Get references to your HTML elements
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    
    // *** NEW API URL: Type.fit Quotes ***
    const API_URL = 'https://type.fit/api/quotes'; 
    
    const REFRESH_INTERVAL_MS = 60000; // 60 seconds

    // Safety Check: Exit if the required elements are not found.
    if (!quoteTextElement || !quoteAuthorElement) {
        console.error("CRITICAL ERROR: Missing HTML elements.");
        return; 
    }
    
    /**
     * Fetches a random quote from the Type.fit API and updates the DOM.
     */
    async function fetchAndDisplayQuote() {
        
        // Show loading state only if the screen is currently empty
        if (quoteTextElement.textContent.includes('Error') || quoteTextElement.textContent === '') {
             quoteTextElement.textContent = "Loading an inspiring quote...";
             quoteAuthorElement.textContent = "";
        }
        
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`API error status: ${response.status}`);
            }

            const data = await response.json();
            
            // The Type.fit API returns an array of ALL quotes. We pick one randomly.
            const randomIndex = Math.floor(Math.random() * data.length);
            const quote = data[randomIndex];
            
            // Success: Update the HTML elements
            quoteTextElement.textContent = `“${quote.text}”`;
            
            // Note: Type.fit sometimes returns "type.fit" as the author, which we hide.
            let author = quote.author || 'Unknown';
            if (author === "type.fit") {
                author = "Unknown";
            }
            
            quoteAuthorElement.textContent = `- ${author}`; 

        } catch (error) {
            console.error('Fetch error during quote attempt:', error);
            
            // If the initial load failed, display an error message for the user.
            if (quoteTextElement.textContent.includes('Loading')) {
                 quoteTextElement.textContent = "Error: Could not load quote. The API may be down.";
                 quoteAuthorElement.textContent = "Check the browser console for network details.";
            }
        }
    }

    // Initial load
    quoteTextElement.textContent = '';
    fetchAndDisplayQuote();

    // Set up the interval to refresh the quote
    setInterval(fetchAndDisplayQuote, REFRESH_INTERVAL_MS);
});

// Ensure the script runs only after the entire HTML document is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    const REFRESH_INTERVAL_MS = 60000; // 60 seconds

    // ----------------------------------------------------
    // LOCAL QUOTE DATA: Add your own quotes here!
    // ----------------------------------------------------
    const localQuotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
        { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "The mind is everything. What you think you become.", author: "Buddha" },
        { text: "The power of imagination makes us infinite.", author: "John Muir" },
        { text: "Perfection is not attainable, but if we chase perfection we can catch excellence.", author: "Vince Lombardi" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
    ];
    
    // Safety Check
    if (!quoteTextElement || !quoteAuthorElement) {
        console.error("CRITICAL ERROR: Missing HTML elements.");
        return; 
    }
    
    /**
     * Selects a random quote from the local array and updates the DOM.
     */
    function displayLocalQuote() {
        if (localQuotes.length === 0) {
            quoteTextElement.textContent = "Error: No quotes loaded locally.";
            quoteAuthorElement.textContent = "";
            return;
        }

        // 1. Get a random index
        const randomIndex = Math.floor(Math.random() * localQuotes.length);
        const quote = localQuotes[randomIndex];
        
        // 2. Update the HTML elements
        quoteTextElement.textContent = `“${quote.text}”`;
        quoteAuthorElement.textContent = `- ${quote.author || 'Unknown'}`; 
    }

    // Initial load
    quoteTextElement.textContent = "Loading local inspiration...";
    quoteAuthorElement.textContent = "";
    
    displayLocalQuote();

    // Set up the interval to refresh the quote
    setInterval(displayLocalQuote, REFRESH_INTERVAL_MS);
});

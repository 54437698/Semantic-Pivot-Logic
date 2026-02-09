/**
 * Semantic Pivot Logic (SPL) - Content Script
 * Visionary: [Your Name] | Technical Assistant: Gemini
 * Function: Scans logographic search results and performs logical back-translation.
 */

async function translateText(text) {
    // Using a public endpoint for the proof-of-concept
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data[0][0][0]; // Extract the translated string
    } catch (error) {
        return "[Translation Error]";
    }
}

async function backPivotResults() {
    // Target the main headings (h3) and snippets in Google Search Results
    const elements = document.querySelectorAll('h3, .VwiC3b'); 

    for (let el of elements) {
        const originalText = el.innerText;
        // Only translate if it looks like Chinese (Logographic)
        if (/[\u4e00-\u9fa5]/.test(originalText)) {
            const englishTranslation = await translateText(originalText);
            
            // Create a small 'Logic Anchor' tag to show it was pivoted
            const anchor = document.createElement('span');
            anchor.style.color = '#00ff00';
            anchor.style.fontSize = '0.8em';
            anchor.innerText = ` [SPL Pivot: ${englishTranslation}]`;
            
            el.appendChild(anchor);
        }
    }
}

// Run the pivot check when the page loads
window.addEventListener('load', backPivotResults);

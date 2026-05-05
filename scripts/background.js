// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GENERATE_SUMMARY") {
    // We call an async function separately because the listener must return true for async
    handleAISummary(request.payload).then(sendResponse);
    return true; 
  }
});

async function handleAISummary(payload) {
  try {
    // 1. Check Cache first (Storage Requirement)
    const cacheKey = btoa(payload.title).slice(0, 16); // Simple key from title
    const cachedData = await chrome.storage.local.get(cacheKey);
    
    if (cachedData[cacheKey]) {
      return { success: true, data: cachedData[cacheKey] };
    }

    // 2. If no cache, call AI API (Example using Gemini)
    const apiKey = "YOUR_API_KEY_HERE"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Summarize the following article into 3 clear bullet points and provide an estimated reading time. Text: ${payload.text}` }]
        }]
      })
    });

    const result = await response.json();
    const summary = result.candidates[0].content.parts[0].text;

    // 3. Save to Cache
    await chrome.storage.local.set({ [cacheKey]: summary });

    return { success: true, data: summary };
  } catch (error) {
    console.error("AI Error:", error);
    return { success: false, error: "Failed to generate summary." };
  }
}
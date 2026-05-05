document.addEventListener('DOMContentLoaded', async () => {
  const summarizeBtn = document.getElementById('summarizeBtn');
  const loader = document.getElementById('loader');
  const outputArea = document.getElementById('outputArea');
  const summaryContent = document.getElementById('summaryContent');
  const pageTitleDisplay = document.getElementById('pageTitle');

  // 1. Get current tab info
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  pageTitleDisplay.innerText = tab.title.split(' - ')[0]; // Clean title

  summarizeBtn.addEventListener('click', async () => {
    summarizeBtn.classList.add('hidden');
    loader.classList.remove('hidden');

    try {
      // 2. Ask Content Script for page text
      const pageData = await chrome.tabs.sendMessage(tab.id, { action: "EXTRACT_CONTENT" });

      // 3. Ask Background Script to call AI
      chrome.runtime.sendMessage(
        { action: "GENERATE_SUMMARY", payload: pageData },
        (response) => {
          loader.classList.add('hidden');
          if (response.success) {
            outputArea.classList.remove('hidden');
            summaryContent.innerText = response.data;
          } else {
            summarizeBtn.classList.remove('hidden');
            alert("Error: " + response.error);
          }
        }
      );
    } catch (err) {
      loader.classList.add('hidden');
      summarizeBtn.classList.remove('hidden');
      console.error(err);
    }
  });

  // Reset functionality
  document.getElementById('resetBtn').addEventListener('click', () => {
    outputArea.classList.add('hidden');
    summarizeBtn.classList.remove('hidden');
  });
});
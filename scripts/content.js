/**
 * Heuristic content extraction
 * Filters out nav, footer, and sidebars to get the meat of the article.
 */
function extractMainContent() {
  const selectors = ['article', 'main', '.post-content', '.article-body', 'body'];
  let selectedElement = null;

  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el) {
      selectedElement = el.cloneNode(true); // Clone so we don't mess up the live UI
      break;
    }
  }

  // Remove "noise" from the clone
  const noise = selectedElement.querySelectorAll('nav, footer, aside, script, style, .ads, .comments');
  noise.forEach(el => el.remove());

  return {
    text: selectedElement.innerText.replace(/\s+/g, ' ').trim().slice(0, 6000),
    title: document.title
  };
}

// Listen for the "EXTRACT" message from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "EXTRACT_CONTENT") {
    const pageData = extractMainContent();
    sendResponse(pageData);
  }
});
# AI Page Summarizer 
**Frontend Track — Stage 4A Project**

An intelligent Chrome Extension built with **Manifest V3** that distills complex webpages into concise, structured summaries using the Gemini AI API.

##  Features
- **Heuristic Content Extraction:** Intelligently filters out navigation, sidebars, and ads.
- **AI-Powered Summaries:** Generates 3 key bullet points and an estimated reading time.
- **Efficient Caching:** Uses `chrome.storage` to prevent duplicate API calls.
- **Secure Architecture:** Keeps API logic in the background service worker.

##  Architecture
The extension follows a modular **Manifest V3** structure:
- **`content.js`**: Handles DOM extraction and noise reduction.
- **`background.js`**: Manages API communication and storage.
- **`popup/`**: Clean, typography-first user interface.

##  Installation
1. Clone this repository.
2. Open `scripts/background.js` and add your API Key to the `GEMINI_API_KEY` variable.
3. Go to `chrome://extensions/` in your browser.
4. Enable **Developer Mode**.
5. Click **Load unpacked** and select this project folder.

##  Credits
- **Icon:** [Paper icons](https://www.flaticon.com/free-icons/paper) created by Freepik - Flaticon
- **Developer:** Oguejiofor Chinwendu Vivian

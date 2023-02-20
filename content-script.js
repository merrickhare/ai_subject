(async ()=> {
    const metaTag = document.querySelector(`meta[name="keywords"]`);
    const metaName = metaTag ? metaTag.getAttribute("content") : null;
    chrome.runtime.sendMessage({ metaName });
})();

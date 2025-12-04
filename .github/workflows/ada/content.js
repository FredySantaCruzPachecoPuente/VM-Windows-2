(function() {
    function init() {
        const s = document.createElement('script');
        s.src = browser.runtime.getURL('embedded.js');
        (document.head || document.documentElement).appendChild(s);
        s.onload = () => s.remove();
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
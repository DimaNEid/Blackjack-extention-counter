
document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("url-input");
    const saveInputBtn = document.getElementById("save-input-btn");
    const saveTabBtn = document.getElementById("save-tab-btn");
    const deleteAllBtn = document.getElementById("delete-all-btn");
    const linksList = document.getElementById("links-list");


    function loadLinks() {
        const savedLinks = JSON.parse(localStorage.getItem("savedLinks")) || [];
        linksList.innerHTML = "";

        savedLinks.forEach((link) => {
            const li = document.createElement("li");
            li.textContent = link;
            linksList.appendChild(li);
        });
    }

    function saveLink(link) {
        const savedLinks = JSON.parse(localStorage.getItem("savedLinks")) || [];
        savedLinks.push(link);
        localStorage.setItem("savedLinks", JSON.stringify(savedLinks));
        loadLinks();
    }


    saveInputBtn.addEventListener("click", () => {
        const inputUrl = urlInput.value.trim();
        if (inputUrl) {
            saveLink(inputUrl);
            urlInput.value = "";
        }
    });


    saveTabBtn.addEventListener("click", async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab && tab.url) {
                saveLink(tab.url);
            }
        } catch (error) {
            console.error("Error accessing tab:", error);
        }
    });

    // Event listener for "Delete All" button
    deleteAllBtn.addEventListener("click", () => {
        localStorage.removeItem("savedLinks");
        linksList.innerHTML = "";
    });


    loadLinks();
});
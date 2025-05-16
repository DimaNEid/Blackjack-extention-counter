
document.addEventListener("DOMContentLoaded", () => {
    const currentCountElement = document.getElementById("current-count");
    const incrementBtn = document.getElementById("increment-btn");
    const saveBtn = document.getElementById("save-btn");
    const entryList = document.getElementById("entry-list");

    let currentCount = 0;
    let previousEntries = [];


    function updateCurrentCount() {
        currentCountElement.textContent = currentCount;
    }


    function saveAndReset() {
        if (currentCount > 0) {
            previousEntries.push(currentCount);
            const listItem = document.createElement("li");
            listItem.textContent = currentCount;
            entryList.appendChild(listItem);

            currentCount = 0;
            updateCurrentCount();
        }
    }


    incrementBtn.addEventListener("click", () => {
        currentCount++;
        updateCurrentCount();
    });


    saveBtn.addEventListener("click", () => {
        saveAndReset();
    });

    updateCurrentCount();
});
let itemsToLoad = 0;
let itemsLoaded = 0;

const loaderEvents = new EventTarget();

const progressFill = document.querySelector(".progress-fill");

function addLoadItem() {
    itemsToLoad++;
}

function markLoaded() {
    itemsLoaded++;

    updateProgress();

    if (itemsLoaded >= itemsToLoad) {
        finishLoading();
    }
}

function updateProgress() {
    const progress = itemsLoaded / itemsToLoad;
    progressFill.style.width = `${progress * 100}%`;
}

    // setTimeout(() => {
    //     finishLoading();
    // }, 8000);

function finishLoading() {
    progressFill.style.width = "100%";

    setTimeout(() => {
        document.getElementById("page-loader").classList.add("hidden");
        // emit event
        loaderEvents.dispatchEvent(new Event("finished"));
        
    }, 300);
    
}

export { loaderEvents, addLoadItem, markLoaded };

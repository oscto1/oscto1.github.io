let itemsToLoad = 0;
let itemsLoaded = 0;

const loaderEvents = new EventTarget();

const progressFill = document.querySelector(".progress-fill");

let finishTimeout = null;
let hasStartedLoading = false;

function addLoadItem() {
    itemsToLoad++;
    hasStartedLoading = true;
}

function markLoaded() {
    itemsLoaded++;
    updateProgress();

    if (!hasStartedLoading) return;

    if (itemsLoaded >= itemsToLoad) {
        if (finishTimeout) clearTimeout(finishTimeout);

        finishTimeout = setTimeout(() => {
            if (itemsLoaded >= itemsToLoad) {
                finishLoading();
            }
        }, 100);
    }
}

function updateProgress() {
    if (itemsToLoad === 0) return;

    const progress = Math.min(itemsLoaded / itemsToLoad, 1);
    // console.log(progress + "%");
    progressFill.style.width = `${progress * 100}%`;
}

    // setTimeout(() => {
    //     finishLoading();
    // }, 8000);

function finishLoading() {
    // progressFill.style.width = "90%";
    setTimeout(() => {
        // document.getElementById("page-loader").classList.add("hidden");
        // emit event
        loaderEvents.dispatchEvent(new Event("finished"));
        
    }, 300);
 
}

export { loaderEvents, addLoadItem, markLoaded };

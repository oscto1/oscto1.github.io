import { worldSize, getVisibleWorldHeight, isTouchDevice, width } from "./scene";
import { projects, createProjectCard } from "./projects";
import nipplejs from 'nipplejs';


// header setup ---------------------------------------------------------------------------------------
const headerSections = document.querySelector('.header-sections');
if(width>768){
    headerSections.innerHTML = `<a href="#hero" class="nav-link">Home</a>
                                <a href="#projects" class="nav-link">Projects</a>
                                <a href="#about" class="nav-link">About</a>`
}else{
    headerSections.innerHTML = `<a class="active" id="section-hint">Home</a>`
}

const sectionMap = {
  hero: "Home",
  projects: "Projects",
  about: "About"
};
// Projects -----------------------------------------------------------------
const cardGrid = document.querySelector(".card-grid");

for (const project of projects){
    const card = await createProjectCard(project, "en");
    cardGrid.appendChild(card);
}

//videos
let activeVideo = null;

function pauseActiveVideo() {
    if (!activeVideo) return;

    const oldCard = activeVideo.closest(".card");
    const oldButton = oldCard?.querySelector(".play_button");

    activeVideo.pause();
    if (oldButton) oldButton.style.display = "block";

    activeVideo = null;
}

function handleVideoClick(video) {
    const playButton = video.parentElement.querySelector(".play_button");

    // If another video is playing → pause only that one
    if (activeVideo && activeVideo !== video) {
        pauseActiveVideo();
    }

    // Toggle current video
    if (video.paused) {
        video.play()
            .then(() => {
                if (playButton) playButton.style.display = "none";
                activeVideo = video;
            })
            .catch(err => console.log("Playback failed:", err));
    } else {
        video.pause();
        if (playButton) playButton.style.display = "block";
        activeVideo = null;
    }
}

const videos = document.querySelectorAll(".videos");

for (const video of videos) {
    video.addEventListener("click", function (e) {
        e.stopPropagation();
        handleVideoClick(this);
    });
}
// --------------------------------------------------------------------------
// const sections = document.querySelectorAll("section");
const visibilityMap = new Map();
// Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        visibilityMap.set(entry.target.id, entry.intersectionRatio);
    });

    //find the most visible section
    let maxRatio = 0;
    let activeId = null;

    visibilityMap.forEach((ratio, id) => {
        if(ratio > maxRatio){
            maxRatio = ratio;
            activeId = id;
        }
    });

    if(!activeId) return;

    //Update UI;
    if(width > 786){
            document.querySelectorAll(".nav-link").forEach(link =>
            link.classList.remove("active")
        );

        const activeLink = document.querySelector(`.nav-link[href="#${activeId}"]`);
        if (activeLink) activeLink.classList.add("active");
    }else{
        const hint = document.querySelector("#section-hint");
        if (hint && sectionMap[activeId]) {
            hint.textContent = sectionMap[activeId];
        }
    }
}, {
//   threshold: Array.from({ length: 101 }, (_, i) => i / 100), //smooth tracking
    threshold: 0,
  rootMargin: "-50% 0px -50% 0px" // center of viewport
});

// Observe sections
document.querySelectorAll("section").forEach(section => {
  visibilityMap.set(section.id, 0);
  observer.observe(section);
});

// controls setup -------------------------------------------------------------------------------------
const controls_box = document.querySelector('#controls_div');
let joystickInput = {
    forward: 0,
    turn: 0
};
// let isMovingJoystick = false;

// let joystickActive = false;
let joystick;
const joystickZone = document.querySelector('#joystick-zone');
const moveZone = document.querySelector('#move-zone');
const forkZone = document.querySelector('#fork-zone');

const arrow = document.querySelector("#onJoystickToggle");
if(isTouchDevice){
    controls_box.innerHTML = `<p>Toggle forklift controls</p>
    <button class="glass-element control-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M448 128C554 128 640 214 640 320C640 426 554 512 448 512L192 512C86 512 0 426 0 320C0 214 86 128 192 128L448 128zM192 240C178.7 240 168 250.7 168 264L168 296L136 296C122.7 296 112 306.7 112 320C112 333.3 122.7 344 136 344L168 344L168 376C168 389.3 178.7 400 192 400C205.3 400 216 389.3 216 376L216 344L248 344C261.3 344 272 333.3 272 320C272 306.7 261.3 296 248 296L216 296L216 264C216 250.7 205.3 240 192 240zM432 336C414.3 336 400 350.3 400 368C400 385.7 414.3 400 432 400C449.7 400 464 385.7 464 368C464 350.3 449.7 336 432 336zM496 240C478.3 240 464 254.3 464 272C464 289.7 478.3 304 496 304C513.7 304 528 289.7 528 272C528 254.3 513.7 240 496 240z"/></svg>
    </button>`;
    // controls_box.style.backgroundColor = 'rgba(0,0,0,0)';
    const btnToggleControls = document.getElementsByClassName("toggleControls");
    console.log(btnToggleControls);
    
    for(let i = 0; i < btnToggleControls.length; i++)
    {
        btnToggleControls[i].addEventListener('click', ()=>{
            joystickZone.classList.toggle('hidden');
            if(joystickZone.classList.contains("hidden"))            {
                arrow.style.transform = "rotate(180deg)";
                arrow.style.bottom = "10px";
            }else{
                arrow.style.transform = "rotate(0deg)";
                arrow.style.bottom = "150px"
            }; 
        });
    }  
    
    // forklift
    joystick = nipplejs.create({
        zone: moveZone,
        mode: 'static',
        // multitouch: false,
        position: { left: '100px', bottom: '70px' },
        color: 'white',
        size: 100
    });

    joystick.on('move', (event) => {
       
        joystickInput.turn = Math.abs(event.data.vector.x) > 0.1 ? event.data.vector.x : 0;
        joystickInput.forward = Math.abs(event.data.vector.y) > 0.1 ? -event.data.vector.y : 0;
    });
    joystickZone.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });

    joystick.on('end', () => {
        joystickInput.forward = 0;
        joystickInput.turn = 0;
    });

    // fork
    //TODO
    console.log("touch");
}else{
    joystickZone.style.display = "none";
    arrow.style.display = "none";
    controls_box.innerHTML = ` <div class="ctrl_hint">
                                    <img src="img/wasd.png" alt="wasd"  height="50">
                                    <p>Drive</p>
                                </div>
                                <div class="ctrl_hint">
                                    <img src="img/ik.png" alt="ik"  height="50">
                                    <p>Move fork</p>
                                </div>
                                `;
    console.log("keyboard");
}

function pageYToWorldZ(pageY)
{
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    return (pageY / scrollHeight) * worldSize.height;
}

function getPixelsPerWorldUnit()
{
    return window.innerHeight / getVisibleWorldHeight();
}

function worldDistanceToPixels(worldDistance)
{
    return worldDistance * getPixelsPerWorldUnit();
}

export { worldDistanceToPixels, joystick, joystickInput }
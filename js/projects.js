import { addLoadItem,markLoaded } from "./loading.js";

const projectCategories = {
    1: {
        en: "Games",
        es: "Juegos"
    },
    2: {
        en: "Software projects",
        es: "Proyectos de software"
    }
}

const projects = [
    {
        id: 1,
        year: "2025 - 2026",
        title: {
            "en": "Forkfest",
            "es": "Forkfest"
        },
        category: 1,
        description: {
            "en": "C#, Multiplayer application with client-server synchronization and gameplay systems implemented using Unity NGO.",
            "es": "Aplicación multijugador en C# con sincronización cliente-servidor y sistemas de juego implementado usando Unity NGO.",
        },
        tech: ["C#", "Unity", "NGO"],
        cta: {
            "en": "Check updates",
            "es": "Ver avances"
        },
        link: "https://www.instagram.com/olliqadev/",
        img: "img/forkfest/thumbnail.png",
        video: "img/forkfest/output.mp4",
    },
    {
        id: 2,
        year: "2023",
        title: {
            "en": "Math Slopes",
            "es": "Math Slopes"
        },
        category: 1,
        description: {
            "en": "Browser-based application built with Phaser (JavaScript), implementing game state management, input handling, scoring logic, and dynamic difficulty.",
            "es": "Aplicación para navegador desarrollada con Phaser (JavaScript), que implementa la gestión de estados de juego, manejo de entradas, lógica de puntuación y dificultad dinámica.",
        },
        tech: ["PhaserJS"],
        cta: {
            "en": "Try now",
            "es": "Probar ahora"
        },
        link: "project/ski_slopes/index.html",
        img: "img/ski/1.png",
        video: "img/ski/1.mp4",
    },
    {
        id: 3,
        year: "2021",
        title: {
            "en": "Unity Arcade",
            "es": "Arcade Unity"
        },
        category: 1,
        description: {
            "en": "C#, Unity project recreating some classic arcade mechanics , implementing input handling, collision detection, scoring systems, and basic UI logic.",
            "es": "Proyecto en C# y Unity que recrea mecánicas de algunos juegos arcade e implementa el manejo de entradas, la detección de colisiones y lógica de interfaz de usuario.",
        },
        tech: ["C#", "Unity"],
        cta: {
            "en": "Try now",
            "es": "Probar ahora"
        },
        link: "Arcade/arcade.html",
        img: "img/arcade/arcade1.png",
        video: "img/arcade/arcade1.mp4",
    },
    {
        id: 4,
        year: "2025",
        title: {
            "en": "Sort Algorithms",
            "es": "Algoritmos de ordenamiento"
        },
        category: 2,
        description: {
            "en": "Interactive visualization tool demonstrating sorting algorithms (Merge, Quick, Heap, Bubble), including step-by-step execution.",
            "es": "Herramienta de visualización interactiva que muestra algoritmos de ordenamiento (Merge, Quick, Heap, Bubble), con ejecución paso a paso.",
        },
        tech: ["Javascript"],
        cta: {
            "en": "Try now",
            "es": "Probar ahora"
        },
        link: "project/sort_visualizer/index.html",
        img: "img/sort_visualizer/1.png",
        video: "img/sort_visualizer/1.mp4",
    },
    {
        id: 5,
        year: "2021",
        title: {
            "en": "Messapp",
            "es": "Messapp"
        },
        category: 2,
        description: {
            "en": "Chat room application built with React and Firebase, implementing messaging, Google authentication, and cloud-based data synchronization.",
            "es": "Aplicación de salas de chat desarrollada con React y Firebase, que incluye funciones de mensajería, autenticación de Google y sincronización de datos en la nube.",
        },
        tech: ["React", "Firebase"],
        cta: {
            "en": "Try now",
            "es": "Probar ahora"
        },
        link: "https://messa-69e78.firebaseapp.com/",
        img: "img/messaging/Messa2-min.png",
        video: "",
    }
]


const jobType = new URLSearchParams(window.location.search).get('type');

let playIconTemplate = null;

async function loadPlayIcon() {
  if (!playIconTemplate) {
    const res = await fetch("img/icons/play-video.svg");
    const svgText = await res.text();

    const wrapper = document.createElement("div");
    wrapper.innerHTML = svgText.trim();

    playIconTemplate = wrapper.firstElementChild;
    playIconTemplate.classList.add("play_button");
  }

  // return a fresh copy each time
  return playIconTemplate.cloneNode(true);
}

function getCategoryPriority(jobType) {
    if (jobType === "SE") {
        return { 2: 0, 1: 1 };
    }
    return null; // default order
}

function sortProjects(projects, jobType) {
    const priority = getCategoryPriority(jobType);

    if (!priority) return projects;

    return [...projects].sort((a, b) => {
        return (priority[a.category] ?? 99) - (priority[b.category] ?? 99);
    });
}

const sortedProjects = sortProjects(projects, jobType);

async function createProjectCard(project, lang) {
    try{
        const card = document.createElement("div");
        card.className = "card";

        if (project.video !== "") {
            

            const wrapper = document.createElement("div");
            wrapper.className = "video-wrapper";

            const media = Object.assign(document.createElement("video"), {
                id: "video" + project.id,
                poster: project.img,
                preload: "metadata",
                playsInline: true,
                muted: true,
                loop: true,
            });

            let loaded = false;

            function done() {
                if (loaded) return;
                loaded = true;
                markLoaded();
            }

            media.addEventListener('loadeddata', done);

            media.addEventListener('error', done);

            media.classList.add("ready");
            media.addEventListener('playing', () => {
                media.classList.add('ready');
            });

            media.addEventListener('pause', () => {
                if (media.readyState >= 3) {
                    media.classList.add('ready');
                }
            });

            media.addEventListener('waiting', () => {
                media.classList.remove('ready');
            });

            media.addEventListener('error', () => {
                loader.innerHTML = "⚠️";
            });
            
            let retried = false;

            setTimeout(() => {
                if (media.readyState < 2 && !retried) {
                    retried = true;

                    console.log("Video stuck, reloading:", media.id);

                    media.load(); // reload only
                }
            }, 3000);

            const icon = await loadPlayIcon();
            const loader = document.createElement("div");
            const spinner = document.createElement("div");
            spinner.classList.add("video-spinner");
            loader.appendChild(spinner);


            media.addEventListener('error', () => {
                console.warn("Video failed:", media.src);

                loader.innerHTML = "⚠️"; // or retry icon
            });
            loader.classList.add("video-loader");

            const source = document.createElement("source");
            source.src = project.video;
            source.type = "video/mp4";

            media.classList.add("videos");

            media.appendChild(source);
            wrapper.appendChild(media);
            wrapper.appendChild(icon);
            wrapper.appendChild(loader);

            card.appendChild(wrapper);
        } else {
            // addLoadItem();
            const img = document.createElement("img");
            img.onload = markLoaded;
            img.onerror = markLoaded;

            img.src = project.img;
            img.alt = project.title[lang];

            card.appendChild(img); 
        }

        const content = document.createElement("div");
        content.style.padding = "20px";
        content.id = project.id;

        const category = document.createElement("div");
        category.classList.add("card-category");
        const categoryLabel = projectCategories[project.category][lang];
        category.innerText = project.year + " • " + categoryLabel;

        const header = document.createElement("div");
        header.classList.add("card-header");

        const title = document.createElement("h3");
        title.style.margin = "0";
        title.textContent = project.title[lang];

        header.appendChild(title);

        for(let i = 0; i < project.tech.length; i++){
            let techElem = document.createElement("div");
            techElem.classList.add("card-tech-elem");
            techElem.innerText = project.tech[i];
            header.appendChild(techElem);
        }

        const desc = document.createElement("p");
        desc.textContent = project.description[lang];

        const link = document.createElement("a");
        link.href = project.link;
        link.target = "_blank";
        link.textContent = project.cta[lang];

        content.append(category, header, desc, link);
        content.classList.add("card-content");
        card.appendChild(content);

        card.classList.add("show");
        card.dataset.category = project.category;

        return card;
    }catch(err){
        console.error("Failed loading project card: " + err);
    }   
}

function translateProjects(lang){
    let projectsCards = document.querySelectorAll(".card-content");
    
    for(let i=0; i<projectsCards.length; i++){
        const match = projects.find(obj => obj.id === parseInt(projectsCards[i].id, 10));
        if(match){
            projectsCards[i].querySelector("h3").innerText = match.title[lang];
            projectsCards[i].querySelector("p").innerText = match.description[lang];
            projectsCards[i].querySelector("a").innerText = match.cta[lang];
            projectsCards[i].querySelector(".card-category").innerText = match.year + " • " + projectCategories[match.category][lang];
        }
    }
}

function filterProjects(category) {
    if (!category) return allProjects;

    return allProjects.filter(p => p.category === category);
}

export {sortedProjects, createProjectCard, translateProjects}
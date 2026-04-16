const projects = [
    {
        id: 1,
        title: {
            "en": "Forkfest",
            "es": "Forkfest"
        },
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
        video: "img/forkfest/forkfest.mp4",
    },
    {
        id: 2,
        title: {
            "en": "Math Slopes",
            "es": "Math Slopes"
        },
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
        title: {
            "en": "Unity Arcade",
            "es": "Arcade Unity"
        },
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
        title: {
            "en": "Sort Algorithms",
            "es": "Algoritmos de ordenamiento"
        },
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
    
]


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

async function createProjectCard(project, lang) {
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

        const icon = await loadPlayIcon();

        const source = document.createElement("source");
        source.src = project.video;
        source.type = "video/mp4";

        media.classList.add("videos");

        media.appendChild(source);
        wrapper.appendChild(media);
        wrapper.appendChild(icon);

        card.appendChild(wrapper);
    } else {
        const img = document.createElement("img");
        img.src = project.img;
        img.alt = project.title[lang];
        card.appendChild(img);
    }

    const content = document.createElement("div");
    content.style.padding = "20px";

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

    content.append(header, desc, link);
    content.classList.add("card-content");
    card.appendChild(content);

    return card;
}

export {projects, createProjectCard}
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
        tech: ["C#", "Unity"],
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
            "en": "Forkfest",
            "es": "Forkfest"
        },
        description: {
            "en": "C#, Multiplayer application with client-server synchronization and gameplay systems implemented using Unity.",
            "es": "Aplicación multijugador en C# con sincronización cliente-servidor y sistemas de juego implementado usando Unity.",
        },
        tech: ["C#", "Unity"],
        cta: {
            "en": "Check updates",
            "es": "Ver avances"
        },
        link: "https://www.instagram.com/olliqadev/",
        img: "img/forkfest/thumbnail.png",
        video: "",
    }
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

    const title = document.createElement("h3");
    title.style.margin = "0";
    title.textContent = project.title[lang];

    const desc = document.createElement("p");
    desc.textContent = project.description[lang];

    const link = document.createElement("a");
    link.href = project.link;
    link.textContent = project.cta[lang];

    content.append(title, desc, link);
    card.appendChild(content);

    return card;
}

export {projects, createProjectCard}
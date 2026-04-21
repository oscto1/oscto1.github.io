import { translateProjects } from "./projects";

const allowedLanguages = ["es", "en"];

const translations = {
    en: {
        nav: {
            home: "Home",
            projects: "Projects",
            about: "About"
        },
        controls_hint: {
            1: "Toggle forklift controls",
            2: "Drive",
            3: "Move fork"
        },
        degree : "Software Engineer",
        sections:{
            home: "Home",
            projects: "Projects",
            about: "About"
        },
        project_cat:{
            "all": "All",
            1: "Games",
            2: "Software projects"
        },
        aboutme: `I’m a software developer from Colombia focused on interactive systems and real-time applications.\n 
                    I enjoy building responsive systems that combine performance, logic, and user experience. I mainly work with C#, JavaScript, and Python, using tools like Unity to develop features such as multiplayer systems, procedural generation, and runtime tools.\n
                    I’m continuously improving my skills and interested in writing clean, maintainable code, with some experience in security testing that helps me consider edge cases and reliability.`,
        contact: {
            title: "Contact",
            name: "Your name",
            email: "Your email",
            message: "Your message",
            send_button: "Send Message",
            success_message: "Thanks! Your message was sent.",
            alternative: "You can also contact me via:"
        }
    },
    es: {
        nav: {
            home: "Inicio",
            projects: "Proyectos",
            about: "Sobre mí"
        },
        controls_hint: {
            1: "Controla el montacargas",
            2: "Conduce",
            3: "Palas"
        },
        degree : "Ingeniero de Software",
        sections:{
            home: "Inicio",
            projects: "Proyectos",
            about: "Sobre mí"
        },
        project_cat:{
            "all": "Todos",
            1: "Juegos",
            2: "Proyectos de software"
        },
        aboutme: `Soy desarrollador de software de Colombia, enfocado en sistemas interactivos y aplicaciones en tiempo real.\n
                    Me gusta crear sistemas dinámicos que combinan rendimiento, lógica y experiencia de usuario.
                    Trabajo principalmente con C#, JavaScript y Python, utilizando herramientas como Unity para desarrollar funcionalidades como sistemas multijugador, generación procedural y herramientas en tiempo de ejecución.\n
                    Sigo mejorando mis habilidades, con interés en escribir código limpio y mantenible, y tengo algo de experiencia en pruebas de seguridad que me ayuda a considerar diversos casos y confiabilidad.`,
        contact: {
            title: "Contacto",
            name: "Tu nombre",
            email: "Tu correo electrónico",
            message: "Tu mensaje",
            send_button: "Enviar Mensaje",
            success_message: "Gracias! El mensaje fue enviado.",
            alternative: "También puedes contactarme a través de:"
        }
    }
}

const inputTags = ["TEXTAREA", "INPUT"]
function translate(lang){
    // console.log(lang);
    // console.log(getLang());
    // if(lang === getLang()) return; 
    // console.log(lang);

    const safeLang = allowedLanguages.includes(lang) ? lang : "en";
    localStorage.setItem('lang', safeLang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if(inputTags.includes(el.nodeName))
        {
            el.placeholder = t(key, safeLang);
        }
        else{
            el.textContent = t(key, safeLang);
        }
        
    });

    translateProjects(safeLang); 
}

function t(path, lang) {
    return path.split('.').reduce((obj, key) => obj?.[key], translations[lang]);
}

function initLang()
{
    if(!localStorage.getItem('lang')){
        console.log("Language not found in localStorage. Setting it!");
        if(navigator.language.split('-')[0] === 'es')
        {
            localStorage.setItem('lang', 'es');
        }
        else
        {
            localStorage.setItem('lang', 'en');
        }
    }
}

function getLang(){
    const lang = localStorage.getItem("lang");
    return allowedLanguages.includes(lang) ? lang : "en";
}

initLang();
translate(getLang());

export {translate, getLang, t}
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
        }
    }
}


function translate(lang){
    // console.log(lang);
    // console.log(getLang());
    // if(lang === getLang()) return; 
    // console.log(lang);

    const safeLang = allowedLanguages.includes(lang) ? lang : "en";
    localStorage.setItem('lang', safeLang);

    document.querySelectorAll("[data-i18n]").forEach(el => { 
        const key = el.dataset.i18n;
        el.textContent = t(key, safeLang);
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
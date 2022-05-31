
var preloader = document.getElementsByClassName('preloader')[0];
let language = "en";
let current_page = "home";
let tobet = [
    get_slect("menu"), get_slect("home"), get_slect("aboutme"),
    get_slect("projects"), get_slect("stats"),
    get_slect("contact_me"),
    get_slect("lang"),
]

window.onload = function () {
    language = getCookie("lang");
    current_page = getCookie("page");

    if (!current_page) {
        current_page = "home";
    }

    if (!language) {
        if (navigator.languages.includes("uz")) {
            language = "uz";
        }
        else if (navigator.languages.includes("ru")) {
            language = "ru";
        }
    }


    fadeOutEffect; delay(0000);
    tr_page(language, current_page);
}

function open_menu() {
    header = document.getElementsByClassName("cli-header")[0];
    sty = header.style.overflow;
    (sty == "visible") ? header.style.overflow = "hidden"
        : header.style.overflow = "visible";
}

async function type(text) {
    if (text) {
        s = await document.getElementsByClassName("result")[0];
        let j = 0;
        for (i = 0; i <= text.length; i++) {
            if (text.slice(i, i + 4) == "<br>") {
                i += 4;
                await delay(generateRandomNumber(0, 7) * 50);
            }
            if (j == 0) {
                s.innerHTML = await text.slice(0, i);
                j = 1;
            }
            else {
                i -= 1; j = 0;
                s.innerHTML = await text.slice(0, i) + "_";
            }

            await delay(generateRandomNumber(0, 3) * 10);
        }
    }
}


function generateRandomNumber(min, max) {
    highlightedNumber = Math.random() * (max - min) + min;

    return highlightedNumber;
};

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

function full_me() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        elem.requestFullscreen();
    }
}

const fadeOutEffect = setInterval(() => {
    if (!preloader.style.opacity) {
        preloader.style.opacity = 1;
    }
    if (preloader.style.opacity > 0) {
        preloader.style.opacity -= 0.1;
    } else {
        preloader.style.display = "none";
        clearInterval(fadeOutEffect);
    }
}, 00);

function get_slect(attr) {
    return document.getElementById(attr);
}

function tr_page(lang) {

    for (i = 0; i < tobet.length; i++) {
        tobet[i].innerHTML = promises[lang]["buttons"][i];
    }
    language = lang
    setCookie("lang", lang, 30);
    type(promises[language]["text"][current_page]);

}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

for (f = 1; f <= 5; f++) {
    tobe = tobet[f];
    if (f != 3 || f != 4) {
        tobe.addEventListener('click', function () {
            current_page = this.id;
            type(promises[language]["text"][this.id]);
            setCookie("page", this.id, 30);
        }, false);
    }
}
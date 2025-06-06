let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

const lightBtn = document.getElementById("light-mode");
const darkBtn = document.getElementById("dark-mode");
const body = document.body;
const homeSection = document.querySelector(".home");

function ativarModoClaro() {
  body.classList.add("light-mode");
  homeSection.classList.add("light-mode");
  lightBtn.classList.add("active");
  darkBtn.classList.remove("active");
  atualizarImagens(true);
  localStorage.setItem("modo", "claro");
}

function ativarModoEscuro() {
  body.classList.remove("light-mode");
  homeSection.classList.remove("light-mode");
  lightBtn.classList.remove("active");
  darkBtn.classList.add("active");
  atualizarImagens(false);
  localStorage.setItem("modo", "escuro");
}

function atualizarImagens(modoClaroAtivo) {
  const imagensIntegrantes = {
    "integrante-yeri": {
      dark: "root/mídia/imagens/página_inicial/cosmic_yeri.jpeg",
      light: "root/mídia/imagens/página_inicial/feelr_yeri.jpg"
    },
    "integrante-joy": {
      dark: "root/mídia/imagens/página_inicial/cosmic_joy.jpeg",
      light: "root/mídia/imagens/página_inicial/feelr_joy.jpeg"
    },
    "integrante-wendy": {
      dark: "root/mídia/imagens/página_inicial/cosmic_wendy.jpeg",
      light: "root/mídia/imagens/página_inicial/feelr_wendy.jpeg"
    },
    "integrante-seulgi": {
      dark: "root/mídia/imagens/página_inicial/cosmic_seulgi.jpeg",
      light: "root/mídia/imagens/página_inicial/feelr_seulgi.jpg"
    },
    "integrante-irene": {
      dark: "root/mídia/imagens/página_inicial/cosmic_irene.jpeg",
      light: "root/mídia/imagens/página_inicial/feelr_irene.jpg"
    },
    "cover_feel_my_rhythm": {
      dark: "root/mídia/imagens/página_inicial/cover-feel_my_rhythm.png",
      light: "root/mídia/imagens/página_inicial/cover_feel.png"
    },
    "cover_peek_a_boo": {
      dark: "root/mídia/imagens/página_inicial/cover-peek_a_boo.png",
      light: "root/mídia/imagens/página_inicial/cover_red.png"
    },
    "gif_group": {
      dark: "root/mídia/imagens/página_inicial/cosmic_gif.webp",
      light: "root/mídia/imagens/página_inicial/feel_gif.gif"
    }
  };

  for (let integrante in imagensIntegrantes) {
    const el = document.getElementById(integrante);
    if (el) {
      el.src = modoClaroAtivo
        ? imagensIntegrantes[integrante].light
        : imagensIntegrantes[integrante].dark;
    }
  }
}

lightBtn.addEventListener("click", ativarModoClaro);
darkBtn.addEventListener("click", ativarModoEscuro);

document.addEventListener("DOMContentLoaded", () => {
  const modoSalvo = localStorage.getItem("modo");
  if (modoSalvo === "claro") {
    ativarModoClaro();
  } else {
    ativarModoEscuro();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const readMoreBtn = document.querySelector(".read-more-btn");
  const extraText = document.querySelector(".extra-text");

  if (readMoreBtn && extraText) {
    readMoreBtn.addEventListener("click", function () {
      extraText.classList.toggle("active");

      if (extraText.classList.contains("active")) {
        readMoreBtn.textContent = currentLang === "pt" ? "LEIA MENOS" : "READ LESS";
      } else {
        readMoreBtn.textContent = currentLang === "pt" ? "LEIA MAIS" : "READ MORE";
      }
    });
  }
});

const defaultLang = "pt";
const supportedLangs = ["pt", "en"];
let currentLang = defaultLang;

function setLanguage(lang) {
  if (!supportedLangs.includes(lang)) return;
  currentLang = lang;

  document.getElementById("btn_pt").classList.toggle("active", lang === "pt");
  document.getElementById("btn_en").classList.toggle("active", lang === "en");

  const file = lang === "pt" ? "ptindex" : "engindex";

  fetch(`root/traduções/${file}.json`)
    .then((res) => res.json())
    .then((data) => applyTranslations(data))
    .catch((err) => console.error("Erro ao carregar traduções:", err));
}

function applyTranslations(data) {
  if (!data) return;

  const safeSet = (id, value, isHTML = false) => {
    const el = document.getElementById(id);
    if (el) {
      isHTML ? (el.innerHTML = value) : (el.textContent = value);
    }
  };

  safeSet("home_title", data.home.title);
  safeSet("home_text", data.home.text);

  safeSet("about_title", data.about.title);
  safeSet("about_subtitle", data.about.subtitle);
  safeSet("about_text", data.about.text);
  safeSet("about_extra", data.about.extra);
  safeSet("btn_read_more", data.general.btn_read_more);

  safeSet("members_title", data.members.title);
  safeSet("members_intro", data.members.intro, true);

  safeSet("yeri_name", data.members.yeri.name);
  safeSet("members_yeri_info_1", data.members.yeri.info[0]);
  safeSet("members_yeri_info_2", data.members.yeri.info[1]);
  safeSet("members_yeri_info_3", data.members.yeri.info[2]);

  safeSet("joy_name", data.members.joy.name);
  safeSet("members_joy_info_1", data.members.joy.info[0]);
  safeSet("members_joy_info_2", data.members.joy.info[1]);
  safeSet("members_joy_info_3", data.members.joy.info[2]);

  safeSet("wendy_name", data.members.wendy.name);
  safeSet("members_wendy_info_1", data.members.wendy.info[0]);
  safeSet("members_wendy_info_2", data.members.wendy.info[1]);
  safeSet("members_wendy_info_3", data.members.wendy.info[2]);

  safeSet("seulgi_name", data.members.seulgi.name);
  safeSet("members_seulgi_info_1", data.members.seulgi.info[0]);
  safeSet("members_seulgi_info_2", data.members.seulgi.info[1]);
  safeSet("members_seulgi_info_3", data.members.seulgi.info[2]);

  safeSet("irene_name", data.members.irene.name);
  safeSet("members_irene_info_1", data.members.irene.info[0]);
  safeSet("members_irene_info_2", data.members.irene.info[1]);
  safeSet("members_irene_info_3", data.members.irene.info[2]);

  safeSet("concepts_title", data.concepts.title);
  safeSet("concepts_text", data.concepts.text, true);
  safeSet("side_red", data.general.red_side);
  safeSet("side_velvet", data.general.velvet_side);
  safeSet("footer_text", data.general.footer, true);
}

function init() {
  document.getElementById("btn_pt").addEventListener("click", () => setLanguage("pt"));
  document.getElementById("btn_en").addEventListener("click", () => setLanguage("en"));

  setLanguage(defaultLang);
}

document.addEventListener("DOMContentLoaded", init);
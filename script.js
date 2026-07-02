// Hamburguer
const hamburguer = document.querySelector(".hamburguer");
const menu = document.querySelector(".menu");

if (hamburguer && menu) {
  hamburguer.addEventListener("click", () => {
    menu.classList.toggle("ativo");
    hamburguer.classList.toggle("ativo");
  });
}

// Header scroll
const header = document.querySelector("header");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scroll", window.scrollY > 50);
  });
}

// Animar
const elementos = document.querySelectorAll(".animar");

if (elementos.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ativo");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  elementos.forEach((el) => observer.observe(el));
}

// Cards
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("ativo");
  });
});

// Botão ver mais projetos
const botao = document.querySelector(".btn-ver-mais");
const ocultos = document.querySelectorAll(".oculto");

if (botao && ocultos.length > 0) {
  let aberto = false;

  botao.addEventListener("click", (e) => {
    e.preventDefault();

    ocultos.forEach((card) => {
      card.classList.toggle("mostrar");
    });

    aberto = !aberto;
    botao.textContent = aberto ? "Ver menos" : "Ver todos projetos";
  });
}

// Galeria Observatório

document.addEventListener("DOMContentLoaded", () => {
  const fotos = [
    "observatorio01.jpg",
    "observatorio02.jpg",
    "observatorio03.jpg",
    "observatorio04.jpg",
    "observatorio05.jpg",
    "observatorio06.jpg",
    "observatorio07.jpg",
    "observatorio08.jpg",
    "observatorio09.jpg",
    "observatorio10.jpg",
  ];

  const galeria = document.getElementById("galeriaFotos");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const fechar = document.querySelector(".fechar");
  const anterior = document.querySelector(".anterior");
  const proximo = document.querySelector(".proximo");

  let fotoAtual = 0;

  fotos.forEach((foto, index) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    const img = document.createElement("img");
    img.src = `imagem/galeria/${foto}`;
    img.alt = "Foto do Observatório";

    img.addEventListener("click", () => {
      fotoAtual = index;
      lightbox.classList.add("ativo");
      lightboxImg.src = `imagem/galeria/${fotos[fotoAtual]}`;
    });

    slide.appendChild(img);
    galeria.appendChild(slide);
  });

  new Swiper(".galeria-swiper", {
    loop: true,
    speed: 600,
    spaceBetween: 20,
    slidesPerView: 4,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      320: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  });

  fechar.addEventListener("click", () => {
    lightbox.classList.remove("ativo");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("ativo");
    }
  });

  proximo.addEventListener("click", () => {
    fotoAtual++;

    if (fotoAtual >= fotos.length) {
      fotoAtual = 0;
    }

    lightboxImg.src = `imagem/galeria/${fotos[fotoAtual]}`;
  });

  anterior.addEventListener("click", () => {
    fotoAtual--;

    if (fotoAtual < 0) {
      fotoAtual = fotos.length - 1;
    }

    lightboxImg.src = `imagem/galeria/${fotos[fotoAtual]}`;
  });
});

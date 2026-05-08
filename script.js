// Ativar o hamburguer
const hamburguer = document.querySelector(".hamburguer");
const menu = document.querySelector(".menu");

hamburguer.addEventListener("click", () => {
  menu.classList.toggle("ativo");
  hamburguer.classList.toggle("ativo");
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});

// Animar
const elementos = document.querySelectorAll(".animar");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("ativo"); // aparece
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
  },
);

elementos.forEach((el) => observer.observe(el));

// card abrir mais
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("ativo");
  });
});

// Botão ver mais projetos
const botao = document.querySelector(".btn-ver-mais");
const ocultos = document.querySelectorAll(".oculto");

let aberto = false;

botao.addEventListener("click", (e) => {
  e.preventDefault();

  ocultos.forEach((card) => {
    card.classList.toggle("mostrar");
  });

  aberto = !aberto;

  botao.textContent = aberto ? "ver menos" : "Ver todos projetos";
});

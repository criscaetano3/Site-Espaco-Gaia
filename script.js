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
      } else {
        entry.target.classList.remove("ativo"); // some
      }
    });
  },
  {
    threshold: 0.2,
  },
);

elementos.forEach((el) => observer.observe(el));

// botão saiba mais
const botoes = document.querySelectorAll(".btn-projeto");

botoes.forEach((botao) => {
  botao.addEventListener("click", function (e) {
    e.preventDefault();

    const cardAtual = this.closest(".card");
    const todosCards = document.querySelectorAll(".card");

    const jaEstaAtivo = cardAtual.classList.contains("ativo");

    // fecha todos
    todosCards.forEach((card) => {
      card.classList.remove("ativo");
      card.querySelector(".btn-projeto").textContent = "Saiba mais";
    });

    // se NÃO estava aberto → abre
    if (!jaEstaAtivo) {
      cardAtual.classList.add("ativo");
      this.textContent = "Ver menos";
    }
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

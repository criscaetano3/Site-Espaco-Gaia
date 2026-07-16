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
    "observatorio11.jpg",
    "observatorio12.jpg",
    "observatorio13.jpg",
    "observatorio14.jpg",
    "observatorio15.jpg",
    "observatorio16.jpg",
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

// Pagina linha do tempo
// Seleciona todos os elementos da página Linha do Tempo
// que possuem a classe ldt-revelar.
const elementosLinhaDoTempo = document.querySelectorAll(".ldt-revelar");

// Função responsável por mostrar os elementos
// quando eles entram na área visível da tela.
function revelarLinhaDoTempo() {
  const limiteVisivel = window.innerHeight * 0.85;

  elementosLinhaDoTempo.forEach((elemento) => {
    const posicaoElemento = elemento.getBoundingClientRect().top;

    if (posicaoElemento < limiteVisivel) {
      elemento.classList.add("ldt-visivel");
    }
  });
}

// Executa quando a página carregar.
window.addEventListener("load", revelarLinhaDoTempo);

// Executa sempre que o usuário rolar a página.
window.addEventListener("scroll", revelarLinhaDoTempo);

// Página programa ciclos
document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     ELEMENTOS DA PÁGINA CICLOS
  ====================================================== */

  const elementosAnimados = document.querySelectorAll("[data-ciclos-animacao]");

  const anoRodape = document.querySelector("#ciclos-ano");

  const imagensPagina = document.querySelectorAll(
    ".ciclos-hero-imagem, " +
      ".ciclos-imagem-principal, " +
      ".ciclos-galeria-imagem",
  );

  /* =====================================================
     ANO AUTOMÁTICO NO RODAPÉ
  ====================================================== */

  if (anoRodape) {
    anoRodape.textContent = new Date().getFullYear();
  }

  /* =====================================================
     ROLAGEM SUAVE DOS LINKS INTERNOS DA PÁGINA
  ====================================================== */

  const linksInternos = document.querySelectorAll(
    'a[href^="#"]:not([href="#"])',
  );

  linksInternos.forEach((link) => {
    link.addEventListener("click", (evento) => {
      const destinoId = link.getAttribute("href");

      if (!destinoId) {
        return;
      }

      const destino = document.querySelector(destinoId);

      if (!destino) {
        return;
      }

      evento.preventDefault();

      const header = document.querySelector("header");

      const alturaHeader = header ? header.offsetHeight : 0;

      const posicaoDestino =
        destino.getBoundingClientRect().top + window.scrollY - alturaHeader;

      window.scrollTo({
        top: posicaoDestino,
        behavior: "smooth",
      });
    });
  });

  /* =====================================================
     ANIMAÇÕES AO ROLAR A PÁGINA
  ====================================================== */

  if ("IntersectionObserver" in window) {
    const observadorAnimacao = new IntersectionObserver(
      (entradas, observador) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("ciclos-animacao-ativa");

            observador.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    elementosAnimados.forEach((elemento, indice) => {
      const atraso = (indice % 4) * 0.08;

      elemento.style.transitionDelay = `${atraso}s`;

      observadorAnimacao.observe(elemento);
    });
  } else {
    elementosAnimados.forEach((elemento) => {
      elemento.classList.add("ciclos-animacao-ativa");
    });
  }

  /* =====================================================
     ACESSIBILIDADE: MOVIMENTO REDUZIDO
  ====================================================== */

  const movimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  function verificarMovimentoReduzido() {
    if (!movimentoReduzido.matches) {
      return;
    }

    elementosAnimados.forEach((elemento) => {
      elemento.classList.add("ciclos-animacao-ativa");
      elemento.style.transition = "none";
      elemento.style.transitionDelay = "0s";
    });
  }

  verificarMovimentoReduzido();

  if (movimentoReduzido.addEventListener) {
    movimentoReduzido.addEventListener("change", verificarMovimentoReduzido);
  }

  /* =====================================================
     AVISO QUANDO UMA IMAGEM NÃO FOR ENCONTRADA
  ====================================================== */

  imagensPagina.forEach((imagem) => {
    imagem.addEventListener("error", () => {
      const elementoPai = imagem.parentElement;

      imagem.classList.add("ciclos-imagem-indisponivel");

      imagem.alt = "Imagem do Programa Ciclos ainda não adicionada";

      if (!elementoPai) {
        return;
      }

      const avisoExistente = elementoPai.querySelector(".ciclos-aviso-imagem");

      if (avisoExistente) {
        return;
      }

      const aviso = document.createElement("div");

      aviso.className = "ciclos-aviso-imagem";

      aviso.innerHTML = `
        <i
          class="fa-regular fa-image"
          aria-hidden="true"
        ></i>

        <span>
          Imagem do Programa Ciclos ainda não adicionada
        </span>
      `;

      elementoPai.appendChild(aviso);
    });
  });
});

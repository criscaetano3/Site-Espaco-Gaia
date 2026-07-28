/* =========================================================
   LIGHTBOX DA GALERIA
========================================================= */

const aldearImagens = document.querySelectorAll(".aldear-lightbox-item");

const aldearLightbox = document.querySelector(".aldear-lightbox");

const aldearImagemGrande = document.querySelector(".aldear-lightbox-img");

const aldearBotaoFechar = document.querySelector(".aldear-lightbox-fechar");

/* Abre a imagem no lightbox */

aldearImagens.forEach((imagem) => {
  imagem.addEventListener("click", (evento) => {
    evento.preventDefault();

    const caminhoImagem = imagem.getAttribute("href");

    aldearImagemGrande.src = caminhoImagem;

    aldearLightbox.classList.add("ativo");

    document.body.style.overflow = "hidden";
  });
});

/* Fecha o lightbox */

function fecharAldearLightbox() {
  aldearLightbox.classList.remove("ativo");

  document.body.style.overflow = "";

  setTimeout(() => {
    aldearImagemGrande.src = "";
  }, 350);
}

/* Fecha pelo botão X */

if (aldearBotaoFechar) {
  aldearBotaoFechar.addEventListener("click", fecharAldearLightbox);
}

/* Fecha clicando no fundo escuro */

if (aldearLightbox) {
  aldearLightbox.addEventListener("click", (evento) => {
    if (evento.target === aldearLightbox) {
      fecharAldearLightbox();
    }
  });
}

/* Fecha pressionando a tecla Esc */

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && aldearLightbox.classList.contains("ativo")) {
    fecharAldearLightbox();
  }
});

/* =========================================================
   ROLAGEM SUAVE DOS LINKS INTERNOS
========================================================= */

const aldearLinksInternos = document.querySelectorAll('a[href^="#"]');

aldearLinksInternos.forEach((link) => {
  link.addEventListener("click", (evento) => {
    const destinoId = link.getAttribute("href");

    if (destinoId === "#") {
      return;
    }

    const destino = document.querySelector(destinoId);

    if (!destino) {
      return;
    }

    evento.preventDefault();

    const alturaHeader = document.querySelector(".header")?.offsetHeight || 0;

    const posicaoDestino =
      destino.getBoundingClientRect().top + window.scrollY - alturaHeader;

    window.scrollTo({
      top: posicaoDestino,

      behavior: "smooth",
    });
  });
});

/* =========================================================
   ANIMAÇÃO DAS SEÇÕES AO ROLAR
========================================================= */

const aldearElementosAnimados = document.querySelectorAll(
  `
    .aldear-sobre-imagem,
    .aldear-sobre-texto,
    .aldear-pilar-card,
    .aldear-encontros-texto,
    .aldear-encontros-imagens,
    .aldear-rede-card,
    .aldear-transformacao-conteudo,
    .aldear-transformacao-imagem,
    .aldear-ods-card,
    .aldear-lightbox-item
    `,
);

/* Adiciona classe inicial */

aldearElementosAnimados.forEach((elemento) => {
  elemento.classList.add("aldear-animar");
});

/* Observa quando o elemento aparece na tela */

const aldearObservador = new IntersectionObserver(
  (entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("aldear-aparecer");

        observador.unobserve(entrada.target);
      }
    });
  },

  {
    threshold: 0.15,

    rootMargin: "0px 0px -50px 0px",
  },
);

aldearElementosAnimados.forEach((elemento) => {
  aldearObservador.observe(elemento);
});

/* =========================================================
   ANIMAÇÃO SEQUENCIAL DOS CARDS
========================================================= */

function aplicarAtrasoAldear(seletor) {
  const elementos = document.querySelectorAll(seletor);

  elementos.forEach((elemento, indice) => {
    elemento.style.transitionDelay = `${indice * 0.12}s`;
  });
}

aplicarAtrasoAldear(".aldear-pilar-card");

aplicarAtrasoAldear(".aldear-rede-card");

aplicarAtrasoAldear(".aldear-ods-card");

aplicarAtrasoAldear(".aldear-lightbox-item");

/* =========================================================
   DESTAQUE DAS ODS NO HERO
========================================================= */

const aldearHeroOds = document.querySelectorAll(".aldear-section-ods-item img");

aldearHeroOds.forEach((icone, indice) => {
  icone.style.animationDelay = `${indice * 0.15}s`;

  icone.classList.add("aldear-ods-flutuar");
});

/* =========================================================
   EFEITO PARALLAX LEVE NO HERO
========================================================= */

const aldearHero = document.querySelector(".aldear-hero");

function aplicarParallaxAldear() {
  if (!aldearHero) {
    return;
  }

  if (window.innerWidth <= 750) {
    aldearHero.style.backgroundPosition = "center";

    return;
  }

  const rolagem = window.scrollY;

  const movimento = rolagem * 0.25;

  aldearHero.style.backgroundPosition = `center calc(50% + ${movimento}px)`;
}

window.addEventListener("scroll", aplicarParallaxAldear, { passive: true });

/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

const aldearBotaoTopo = document.createElement("button");

aldearBotaoTopo.type = "button";

aldearBotaoTopo.className = "aldear-voltar-topo";

aldearBotaoTopo.setAttribute("aria-label", "Voltar ao início da página");

aldearBotaoTopo.innerHTML = "↑";

document.body.appendChild(aldearBotaoTopo);

/* Mostra ou esconde o botão */

function controlarBotaoTopoAldear() {
  if (window.scrollY > 600) {
    aldearBotaoTopo.classList.add("ativo");
  } else {
    aldearBotaoTopo.classList.remove("ativo");
  }
}

window.addEventListener("scroll", controlarBotaoTopoAldear, { passive: true });

/* Volta ao início */

aldearBotaoTopo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

/* =========================================================
   CARREGAMENTO SEGURO DA PÁGINA
========================================================= */

window.addEventListener("load", () => {
  document.body.classList.add("aldear-pagina-carregada");

  controlarBotaoTopoAldear();

  aplicarParallaxAldear();
});

/* =========================================================
   PÁGINA PROJETO SEMENTES DA GAIA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     BOTÕES "SAIBA MAIS" DOS CARDS
  ======================================================= */

  const botoesDetalhes = document.querySelectorAll(".sementes-btn-detalhes");

  botoesDetalhes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const cardAtual = botao.closest(".sementes-acao-card");

      if (!cardAtual) return;

      const cardEstaAberto = cardAtual.classList.contains("ativo");

      /*
        Fecha os outros cards antes de abrir o atual.
        Assim, somente um card fica aberto por vez.
      */

      document.querySelectorAll(".sementes-acao-card").forEach((card) => {
        card.classList.remove("ativo");

        const botaoCard = card.querySelector(".sementes-btn-detalhes");

        if (botaoCard) {
          botaoCard.setAttribute("aria-expanded", "false");

          const textoBotao = botaoCard.querySelector("span");

          if (textoBotao) {
            textoBotao.textContent = "Saiba mais";
          }
        }
      });

      /*
        Caso o card clicado estivesse fechado,
        ele será aberto.
      */

      if (!cardEstaAberto) {
        cardAtual.classList.add("ativo");

        botao.setAttribute("aria-expanded", "true");

        const textoBotao = botao.querySelector("span");

        if (textoBotao) {
          textoBotao.textContent = "Ver menos";
        }
      }
    });
  });

  /* =======================================================
     GALERIA COM MODAL
  ======================================================= */

  const itensGaleria = document.querySelectorAll(".sementes-galeria-item");

  const modal = document.querySelector("#sementes-modal");

  const imagemModal = document.querySelector("#sementes-modal-imagem");

  const botaoFecharModal = document.querySelector("#sementes-modal-fechar");

  function abrirModal(caminhoImagem, textoAlternativo) {
    if (!modal || !imagemModal) return;

    imagemModal.src = caminhoImagem;

    imagemModal.alt = textoAlternativo || "Imagem ampliada do Projeto Sementes";

    modal.classList.add("ativo");

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("sementes-modal-aberto");

    if (botaoFecharModal) {
      botaoFecharModal.focus();
    }
  }

  function fecharModal() {
    if (!modal || !imagemModal) return;

    modal.classList.remove("ativo");

    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("sementes-modal-aberto");

    /*
      Aguarda o fim da animação antes
      de limpar a imagem.
    */

    setTimeout(() => {
      imagemModal.src = "";
    }, 350);
  }

  itensGaleria.forEach((item) => {
    item.addEventListener("click", () => {
      const caminhoImagem =
        item.dataset.imagem || item.querySelector("img")?.src;

      const textoAlternativo = item.querySelector("img")?.alt;

      if (!caminhoImagem) return;

      abrirModal(caminhoImagem, textoAlternativo);
    });
  });

  if (botaoFecharModal) {
    botaoFecharModal.addEventListener("click", fecharModal);
  }

  if (modal) {
    modal.addEventListener("click", (evento) => {
      /*
        Fecha somente quando clicar
        no fundo escuro do modal.
      */

      if (evento.target === modal) {
        fecharModal();
      }
    });
  }

  /*
    Fecha o modal ao pressionar ESC.
  */

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modal?.classList.contains("ativo")) {
      fecharModal();
    }
  });

  /* =======================================================
     ANIMAÇÃO DOS ELEMENTOS AO ROLAR
  ======================================================= */

  const elementosRevelar = document.querySelectorAll(".sementes-revelar");

  if ("IntersectionObserver" in window) {
    const observadorElementos = new IntersectionObserver(
      (entradas, observador) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");

            observador.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    elementosRevelar.forEach((elemento) => {
      observadorElementos.observe(elemento);
    });
  } else {
    /*
      Caso o navegador não aceite
      IntersectionObserver.
    */

    elementosRevelar.forEach((elemento) => {
      elemento.classList.add("visivel");
    });
  }

  /* =======================================================
     CONTADOR DOS NÚMEROS DE IMPACTO
  ======================================================= */

  const contadores = document.querySelectorAll(".sementes-contador");

  let contadoresIniciados = false;

  function animarContadores() {
    if (contadoresIniciados) return;

    contadoresIniciados = true;

    contadores.forEach((contador) => {
      const numeroFinal = Number(contador.dataset.numero);

      if (Number.isNaN(numeroFinal)) return;

      let numeroAtual = 0;

      const duracao = 1600;

      const intervalo = 30;

      const quantidadePassos = duracao / intervalo;

      const incremento = numeroFinal / quantidadePassos;

      const animacao = setInterval(() => {
        numeroAtual += incremento;

        if (numeroAtual >= numeroFinal) {
          contador.textContent = numeroFinal;

          clearInterval(animacao);

          return;
        }

        contador.textContent = Math.floor(numeroAtual);
      }, intervalo);
    });
  }

  const secaoImpacto = document.querySelector("#impacto-sementes");

  if (secaoImpacto && "IntersectionObserver" in window) {
    const observadorImpacto = new IntersectionObserver(
      (entradas, observador) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            animarContadores();

            observador.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.3,
      },
    );

    observadorImpacto.observe(secaoImpacto);
  } else {
    animarContadores();
  }

  /* =======================================================
     ANO AUTOMÁTICO NO RODAPÉ
  ======================================================= */

  const anoAtual = document.querySelector("#ano-atual");

  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  /* =======================================================
     ROLAGEM SUAVE NOS LINKS INTERNOS
  ======================================================= */

  const linksInternos = document.querySelectorAll('a[href^="#"]');

  linksInternos.forEach((link) => {
    link.addEventListener("click", (evento) => {
      const destinoId = link.getAttribute("href");

      if (!destinoId || destinoId === "#") return;

      const destino = document.querySelector(destinoId);

      if (!destino) return;

      evento.preventDefault();

      destino.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});

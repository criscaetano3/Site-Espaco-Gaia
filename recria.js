document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS DAS FOTOS
  const fotos = document.querySelectorAll(".recria-foto");
  const lightboxFoto = document.getElementById("recriaLightbox");
  const imagemAmpliada = document.getElementById("recriaLightboxImagem");
  const fecharFoto = document.getElementById("recriaLightboxFechar");

  // ELEMENTOS DOS VÍDEOS
  const videos = document.querySelectorAll(".recria-video-card");
  const lightboxVideo = document.getElementById("recriaVideoLightbox");
  const player = document.getElementById("recriaVideoPlayer");
  const fecharVideo = document.getElementById("recriaVideoFechar");

  let botaoAnterior = null;

  // CONTROLE DA ROLAGEM
  function atualizarRolagem() {
    const fotoAberta = lightboxFoto?.classList.contains("ativo");
    const videoAberto = lightboxVideo?.classList.contains("ativo");

    document.body.style.overflow = fotoAberta || videoAberto ? "hidden" : "";
  }

  // ABRIR FOTOS
  if (lightboxFoto && imagemAmpliada) {
    fotos.forEach((foto) => {
      foto.addEventListener("click", () => {
        const caminho =
          foto.dataset.img || foto.querySelector("img")?.getAttribute("src");

        if (!caminho) return;

        botaoAnterior = foto;
        imagemAmpliada.src = caminho;
        imagemAmpliada.alt = foto.querySelector("img")?.alt || "Foto do ReCria";

        lightboxFoto.classList.add("ativo");
        atualizarRolagem();
        fecharFoto?.focus();
      });
    });
  }

  // FECHAR FOTOS
  function fecharLightboxFoto() {
    if (!lightboxFoto) return;

    lightboxFoto.classList.remove("ativo");
    atualizarRolagem();

    if (imagemAmpliada) {
      imagemAmpliada.removeAttribute("src");
    }

    botaoAnterior?.focus();
  }

  fecharFoto?.addEventListener("click", fecharLightboxFoto);

  lightboxFoto?.addEventListener("click", (evento) => {
    if (evento.target === lightboxFoto) {
      fecharLightboxFoto();
    }
  });

  // ABRIR VÍDEOS
  if (lightboxVideo && player) {
    videos.forEach((card) => {
      card.addEventListener("click", () => {
        const caminho = card.dataset.video;

        if (!caminho) return;

        botaoAnterior = card;
        player.src = caminho;
        player.load();

        lightboxVideo.classList.add("ativo");
        atualizarRolagem();
        fecharVideo?.focus();

        player.play().catch(() => {
          console.log("Clique no play para reproduzir.");
        });
      });
    });
  }

  // FECHAR VÍDEOS
  function fecharLightboxVideo() {
    if (!lightboxVideo) return;

    player?.pause();

    if (player) {
      player.removeAttribute("src");
      player.load();
    }

    lightboxVideo.classList.remove("ativo");
    atualizarRolagem();
    botaoAnterior?.focus();
  }

  fecharVideo?.addEventListener("click", fecharLightboxVideo);

  lightboxVideo?.addEventListener("click", (evento) => {
    if (evento.target === lightboxVideo) {
      fecharLightboxVideo();
    }
  });

  // FECHAR COM ESC
  document.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape") return;

    if (lightboxFoto?.classList.contains("ativo")) {
      fecharLightboxFoto();
    }

    if (lightboxVideo?.classList.contains("ativo")) {
      fecharLightboxVideo();
    }
  });

  // ROLAGEM SUAVE
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (evento) => {
      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const destino = document.getElementById(id.slice(1));

      if (destino) {
        evento.preventDefault();
        destino.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

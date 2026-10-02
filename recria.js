document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       LIGHTBOX DAS FOTOS
    ====================================================== */

  const fotos = document.querySelectorAll(".recria-foto");

  const lightbox = document.getElementById("recriaLightbox");

  const lightboxImagem = document.getElementById("recriaLightboxImagem");

  const fecharFoto = document.getElementById("recriaLightboxFechar");

  fotos.forEach((foto) => {
    foto.addEventListener("click", () => {
      const imagem = foto.getAttribute("data-img");

      if (!imagem) {
        return;
      }

      lightboxImagem.src = imagem;

      lightbox.classList.add("ativo");

      document.body.style.overflow = "hidden";
    });
  });

  function fecharLightboxFoto() {
    lightbox.classList.remove("ativo");

    document.body.style.overflow = "";

    setTimeout(() => {
      lightboxImagem.src = "";
    }, 300);
  }

  if (fecharFoto) {
    fecharFoto.addEventListener("click", fecharLightboxFoto);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (evento) => {
      if (evento.target === lightbox) {
        fecharLightboxFoto();
      }
    });
  }

  /* =====================================================
       LIGHTBOX DOS VÍDEOS
    ====================================================== */

  const videos = document.querySelectorAll(".recria-video-card");

  const videoLightbox = document.getElementById("recriaVideoLightbox");

  const videoPlayer = document.getElementById("recriaVideoPlayer");

  const fecharVideo = document.getElementById("recriaVideoFechar");

  videos.forEach((videoCard) => {
    videoCard.addEventListener("click", () => {
      const caminhoVideo = videoCard.getAttribute("data-video");

      if (!caminhoVideo) {
        return;
      }

      videoPlayer.src = caminhoVideo;

      videoLightbox.classList.add("ativo");

      document.body.style.overflow = "hidden";

      videoPlayer.play().catch(() => {
        console.log("O navegador aguardou o usuário iniciar o vídeo.");
      });
    });
  });

  function fecharLightboxVideo() {
    videoPlayer.pause();

    videoPlayer.currentTime = 0;

    videoPlayer.removeAttribute("src");

    videoPlayer.load();

    videoLightbox.classList.remove("ativo");

    document.body.style.overflow = "";
  }

  if (fecharVideo) {
    fecharVideo.addEventListener("click", fecharLightboxVideo);
  }

  if (videoLightbox) {
    videoLightbox.addEventListener("click", (evento) => {
      if (evento.target === videoLightbox) {
        fecharLightboxVideo();
      }
    });
  }

  /* =====================================================
       TECLA ESC
    ====================================================== */

  document.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape") {
      return;
    }

    if (lightbox && lightbox.classList.contains("ativo")) {
      fecharLightboxFoto();
    }

    if (videoLightbox && videoLightbox.classList.contains("ativo")) {
      fecharLightboxVideo();
    }
  });

  /* =====================================================
       SCROLL SUAVE
    ====================================================== */

  const linksInternos = document.querySelectorAll('a[href^="#"]');

  linksInternos.forEach((link) => {
    link.addEventListener("click", (evento) => {
      const id = link.getAttribute("href");

      if (!id || id === "#") {
        return;
      }

      const destino = document.querySelector(id);

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

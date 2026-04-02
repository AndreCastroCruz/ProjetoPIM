document.addEventListener("DOMContentLoaded", function () {
  const logado = localStorage.getItem("logado");
  const time = localStorage.getItem("timeUsuario");

  const jogos = document.querySelectorAll(".jogo");
  const botoes = document.querySelectorAll(".comprar");

  // 🔒 NÃO LOGADO
  if (!logado) {
    botoes.forEach(botao => {
      botao.disabled = true;
      botao.style.opacity = "0.5";
      botao.innerText = "Faça login para comprar";
    });
  }

  // 🎯 LOGADO → FILTRA JOGOS
  if (logado && time) {
    jogos.forEach(jogo => {
      const timeJogo = jogo.getAttribute("data-time");

      if (!timeJogo.includes(time)) {
        jogo.style.display = "none";
      }
    });
  }
});
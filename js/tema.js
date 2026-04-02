document.addEventListener("DOMContentLoaded", function () {
  const usuario = localStorage.getItem("usuarioLogado"); // 🔥 pega usuário
  const time = localStorage.getItem("timeUsuario");
  const container = document.querySelector(".overlay");

  // 🔥 só aplica tema se estiver logado
  if (container && usuario && time) {
    if (time === "palmeiras") {
      container.classList.add("neon-palmeiras");
    } else if (time === "corinthians") {
      container.classList.add("neon-corinthians");
    } else if (time === "flamengo") {
      container.classList.add("neon-flamengo");
    } else if (time === "santos") {
      container.classList.add("neon-santos");
    } else if (time === "sao-paulo") {
      container.classList.add("neon-saopaulo");
    } else if (time === "vasco") {
      container.classList.add("neon-vasco");
    }
  }

  // 🔥 se NÃO estiver logado, garante que remove tudo
  if (!usuario && container) {
    container.classList.remove(
      "neon-palmeiras",
      "neon-corinthians",
      "neon-flamengo",
      "neon-santos",
      "neon-saopaulo",
      "neon-vasco"
    );
  }
});
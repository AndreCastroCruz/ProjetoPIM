document.addEventListener("DOMContentLoaded", function () {
const botoesComprar = document.querySelectorAll(".comprar");

  botoesComprar.forEach(botao => {
    botao.addEventListener("click", () => {

      const usuario = localStorage.getItem("usuarioLogado");

      if (!usuario) {
        alert("Você precisa estar logado!");
        window.location.href = "login.html";
        return;
      }

      const jogo = botao.parentElement;

      const nome = jogo.querySelector("h3").innerText;
      const preco = Number(jogo.querySelector(".preco").dataset.preco);
      const data = jogo.querySelector(".data").innerText;
      const hora = jogo.querySelector(".hora").innerText;
      const quantidade = Number(jogo.querySelector(".quantidade").value);
      const local = jogo.querySelector(".local").innerText;

      const total = preco * quantidade;

      const item = {
        nome,
        preco,
        quantidade,
        total,
        data,
        hora,
        local
      };

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      carrinho.push(item);

      localStorage.setItem("carrinho", JSON.stringify(carrinho));

      alert(`Ingressos adicionados ao carrinho!\nTotal: R$ ${total}`);
    });
  });

  // ================= FILTRAR JOGOS POR TIME =================
  const jogosContainer = document.querySelector(".jogos-container");

  if (jogosContainer) {
    const timeUsuario = localStorage.getItem("timeUsuario");

    const jogos = document.querySelectorAll(".jogo");

    jogos.forEach(jogo => {
      const titulo = jogo.querySelector("h3").innerText.toLowerCase();

      if (!titulo.includes(timeUsuario)) {
        jogo.style.display = "none";
      }
    });
  }

});
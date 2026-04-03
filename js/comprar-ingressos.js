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

      const jogo = botao.closest(".jogo");

      const nome = jogo.querySelector("h3").innerText;
      const preco = Number(jogo.querySelector(".preco").dataset.preco);
      const data = jogo.querySelector(".data").innerText;
      const hora = jogo.querySelector(".hora").innerText;
      const quantidade = Number(jogo.querySelector(".quantidade").value);
      const local = jogo.querySelector(".local").innerText;

      // 🔥 NOVO: PEGAR SETOR
      const setor = jogo.querySelector(".setor").value;

      if (!setor) {
        alert("Selecione um setor!");
        return;
      }

      const total = preco * quantidade;

      const item = {
        nome,
        preco,
        quantidade,
        total,
        data,
        hora,
        local,
        setor // 🔥 AGORA SALVA O SETOR
      };

      let carrinho = JSON.parse(localStorage.getItem("carrinho_" + usuario)) || [];

      carrinho.push(item);

      localStorage.setItem("carrinho_" + usuario, JSON.stringify(carrinho));

      alert(`Ingressos adicionados ao carrinho!\nSetor: ${setor}\nTotal: R$ ${total}`);
    });

    
  });
});
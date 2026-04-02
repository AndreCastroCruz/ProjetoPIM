document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector("#carrinho-container");
  const totalGeralEl = document.querySelector("#total-geral");

  const usuario = localStorage.getItem("usuarioLogado");
  const logado = localStorage.getItem("logado");

  console.log("Usuário:", usuario);

  if (!usuario || !logado) {
    container.innerHTML = "<h2>Faça login para ver seu carrinho</h2>";
    return;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho_" + usuario)) || [];

  console.log("Carrinho:", carrinho);

  function renderCarrinho() {
    container.innerHTML = "";

    let totalGeral = 0;

    if (carrinho.length === 0) {
      container.innerHTML = "<p>Seu carrinho está vazio</p>";
      totalGeralEl.innerText = "";
      return;
    }

    carrinho.forEach((item, index) => {
      totalGeral += item.total;

      const div = document.createElement("div");
      div.classList.add("item-carrinho");

      div.innerHTML = `
        <h3>${item.nome}</h3>
        <p>📅 ${item.data}</p>
        <p>⏰ ${item.hora}</p>
        <p>🎫 Setor: ${item.setor}</p>
        <p>Quantidade: ${item.quantidade}</p>
        <p>Valor: R$ ${item.total}</p>
        <button class="remover" data-index="${index}">🗑️</button>
      `;

      container.appendChild(div);
    });

    totalGeralEl.innerText = "Total: R$ " + totalGeral;

    document.querySelectorAll(".remover").forEach(botao => {
      botao.addEventListener("click", () => {
        const index = botao.dataset.index;

        carrinho.splice(index, 1);

        localStorage.setItem("carrinho_" + usuario, JSON.stringify(carrinho));

        renderCarrinho();
      });
    });
  }

  renderCarrinho();
});
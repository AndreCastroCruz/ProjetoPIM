const container = document.querySelector("#carrinho-container");
  const totalGeralEl = document.querySelector("#total-geral");

  if (container && totalGeralEl) {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    function renderCarrinho() {
      container.innerHTML = "";
      let totalGeral = 0;

      carrinho.forEach((item, index) => {
        totalGeral += item.total;

        const div = document.createElement("div");
        div.classList.add("item-carrinho");

        div.innerHTML = `
          <h3>${item.nome}</h3>
          <p>📅 ${item.data}</p>
          <p>⏰ ${item.hora}</p>
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
          localStorage.setItem("carrinho", JSON.stringify(carrinho));

          renderCarrinho();
        });
      });
    }

    renderCarrinho();
  }
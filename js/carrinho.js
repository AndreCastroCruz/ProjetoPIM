document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector("#carrinho-container");

  const usuario = localStorage.getItem("usuarioLogado");
  const logado = localStorage.getItem("logado");

  let cupomAplicado = null;

  const btnCupom = document.querySelector("#aplicar-cupom");
  const inputCupom = document.querySelector("#cupom");
  const msgCupom = document.querySelector("#mensagem-cupom");
  const areaCupom = document.querySelector("#area-cupom"); // 🔥 MOVIDO PRA CIMA

  console.log("Usuário:", usuario);

  if (!usuario || !logado) {
    container.innerHTML = "<h2>Faça login para ver seu carrinho</h2>";
    return;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho_" + usuario)) || [];

  console.log("Carrinho:", carrinho);

  function validarCupom(codigo) {
    const regex = /^[A-Z]{3}[0-9]{3}$/;
    return regex.test(codigo);
  }

  // 🔥 BOTÃO CUPOM
  if (btnCupom) {
    btnCupom.addEventListener("click", () => {
      const codigo = inputCupom.value.toUpperCase();

      if (!validarCupom(codigo)) {
        msgCupom.innerText = "Código inválido! Use formato ABC123";
        msgCupom.style.color = "red";
        return;
      }

      cupomAplicado = codigo;

      msgCupom.innerText = "Cupom aplicado com sucesso!";
      msgCupom.style.color = "green";

      renderCarrinho();
    });
  }

  function renderCarrinho() {
    container.innerHTML = "";

    // 🔥 PEGAR DADOS DO USUÁRIO
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioAtual = usuarios.find(u => u.email === usuario);

    // 🔥 REGRA FINAL DO CUPOM (AQUI ESTÁ O SEGREDO)
    if (areaCupom) {
      if (
        carrinho.length > 0 &&
        (!usuarioAtual || !usuarioAtual.socio)
      ) {
        areaCupom.style.display = "block";
      } else {
        areaCupom.style.display = "none";
      }
    }

    if (carrinho.length === 0) {
      container.innerHTML = "<p>Seu carrinho está vazio</p>";
      return;
    }

    // 🔥 DEFINIR DESCONTO
    let desconto = 0;

    if (usuarioAtual && usuarioAtual.socio === "bronze") {
      desconto = 0.15;
    }

    if (usuarioAtual && usuarioAtual.socio === "prata") {
      desconto = 0.25;
    }

    carrinho.forEach((item, index) => {

      const div = document.createElement("div");
      div.classList.add("item-carrinho");

      // 🔥 CALCULAR DESCONTO POR ITEM
      let valorDesconto = item.total * desconto;
      let totalFinal = item.total - valorDesconto;

      // 🔥 APLICAR CUPOM (somente NÃO sócio)
      if (!usuarioAtual?.socio && cupomAplicado) {
        let descontoCupom = totalFinal * 0.1;

        // 🔥 bônus por quantidade
        if (item.quantidade >= 3) {
          descontoCupom += totalFinal * 0.02; // 🔥 agora menor que sócio
        }
        
        totalFinal -= descontoCupom;
        valorDesconto += descontoCupom;
      }

      div.innerHTML = `
        <h3>${item.nome}</h3>
        <p>📅 ${item.data}</p>
        <p>⏰ ${item.hora}</p>
        <p>🎫 Setor: ${item.setor}</p>
        <p>Quantidade: ${item.quantidade}</p>

        <p>Total: R$ ${item.total.toFixed(2)}</p>

        ${valorDesconto > 0
          ? `
            <p style="color: #00ffcc;">Desconto: -R$ ${valorDesconto.toFixed(2)}</p>
            <h4>Total com desconto: R$ ${totalFinal.toFixed(2)}</h4>
            `
          : ""
        }

        <button class="remover" data-index="${index}">🗑️</button>
      `;

      container.appendChild(div);
    });

    // 🔥 REMOVER ITEM
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
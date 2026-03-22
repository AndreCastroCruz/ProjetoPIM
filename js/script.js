document.addEventListener("DOMContentLoaded", function () {

  // ================= LOGIN =================
  const formLogin = document.querySelector(".form-login");

  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.querySelector("#emailLogin").value;
      const senha = document.querySelector("#senhaLogin").value;

      const usuarioSalvo = localStorage.getItem("usuario");
      const senhaSalva = localStorage.getItem("senha");

      if (email === "" || senha === "") {
        alert("Preencha todos os campos!");
        return;
      }

      if (email === usuarioSalvo && senha === senhaSalva) {
        localStorage.setItem("usuarioLogado", email);
        alert("Login realizado!");
        window.location.href = "jogos.html";
      } else {
        alert("Email ou senha inválidos!");
      }
    });
  }

  // ================= CADASTRO =================
  const formCadastro = document.querySelector(".form-cadastro");

  if (formCadastro) {
    formCadastro.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.querySelector("#nomeCadastro").value.trim();
      const email = document.querySelector("#emailCadastro").value.trim();
      const senha = document.querySelector("#senhaCadastro").value.trim();
      const confirmarSenha = document.querySelector("#confirmarSenha").value;

      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
      }

      localStorage.setItem("nome", nome);
      localStorage.setItem("usuario", email);
      localStorage.setItem("senha", senha);

      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html";
    });
  }

  // ================= COMPRAR INGRESSO =================
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

  // ================= LOGOUT =================
  const logout = document.querySelector("#logout");

  if (logout) {
    logout.addEventListener("click", (e) => {
      e.preventDefault();

      localStorage.removeItem("usuarioLogado");

      alert("Você saiu da conta!");
      window.location.href = "../index.html";
    });
  }

  // ================= CARRINHO =================
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
          <p>📅 Data: ${item.data}</p>
          <p>⏰ Hora: ${item.hora}</p>
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

  // ================= MODAL PAGAMENTO =================
  const btnFinalizar = document.querySelector("#finalizar-compra");
  const modal = document.querySelector("#modal-pagamento");

  const tituloModal = document.querySelector("#titulo-modal");

  const telaOpcoes = document.querySelector("#tela-opcoes");
  const telaPix = document.querySelector("#tela-pix");
  const telaCartao = document.querySelector("#tela-cartao");
  const loading = document.querySelector("#loading");

  // ABRIR MODAL
  if (btnFinalizar && modal) {
    btnFinalizar.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";

      tituloModal.innerText = "Forma de pagamento";

      telaOpcoes.style.display = "block";
      telaPix.style.display = "none";
      telaCartao.style.display = "none";
      loading.style.display = "none";
    });
  }

  // ESCOLHER FORMA
  document.querySelectorAll(".opcao-pagamento").forEach(btn => {
    btn.addEventListener("click", () => {
      const tipo = btn.dataset.tipo;

      telaOpcoes.style.display = "none";

      if (tipo === "pix") {
        telaPix.style.display = "block";
        telaCartao.style.display = "none";
        tituloModal.innerText = "Escaneie o QR Code";
      } else {
        telaCartao.style.display = "block";
        telaPix.style.display = "none";
        tituloModal.innerText = "Complete os campos";
      }
    });
  });

  // CANCELAR PIX
  document.querySelector("#cancelar-pix")?.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // CANCELAR CARTÃO
  document.querySelector("#cancelar-cartao")?.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // FINALIZAR COMPRA
  function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];

    ingressos = ingressos.concat(carrinho);

    localStorage.setItem("ingressos", JSON.stringify(ingressos));
    localStorage.removeItem("carrinho");

    alert("Pagamento aprovado! 🎉");
    window.location.href = "meus-ingressos.html";
  }

  // PIX
  document.querySelector("#ja-paguei")?.addEventListener("click", () => {
    telaPix.style.display = "none";
    loading.style.display = "block";

    setTimeout(() => {
      finalizarCompra();
    }, 2000);
  });

  // CARTÃO
  document.querySelector("#pagar-cartao")?.addEventListener("click", () => {
    telaCartao.style.display = "none";
    loading.style.display = "block";

    setTimeout(() => {
      finalizarCompra();
    }, 2000);
  });

  // ================= MEUS INGRESSOS =================
  const containerIngressos = document.querySelector("#ingressos-container");

  if (containerIngressos) {

    let ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];

    if (ingressos.length === 0) {
      containerIngressos.innerHTML = "<p>Você ainda não comprou ingressos.</p>";
    } else {

      ingressos.forEach(item => {

        const div = document.createElement("div");
        div.classList.add("item-carrinho");

        div.innerHTML = `
          <h3>${item.nome}</h3>
          <p>📅 ${item.data}</p>
          <p> ${item.hora}</p>
          <p>Quantidade: ${item.quantidade}</p>
          <p>Valor: R$ ${item.total}</p>

          <button class="ver-ingresso">Ver meu ingresso</button>
        `;

        containerIngressos.appendChild(div);
        div.querySelector(".ver-ingresso").addEventListener("click", () => {
          abrirTelaIngressos(item);
        });
      });
    }
  }

});

function abrirPopupIngresso(nomeJogo) {
  const popup = document.getElementById("popup-ingresso");
  const qr = document.getElementById("qrcode-img");

  // gera QR Code com base no nome do jogo
  qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(nomeJogo)}`;

  popup.style.display = "flex";
}

function fecharPopup() {
  document.getElementById("popup-ingresso").style.display = "none";
}

function abrirTelaIngressos(item) {
  const tela = document.getElementById("tela-ingressos");
  const lista = document.getElementById("lista-qrcodes");

  lista.innerHTML = "";

  // cria um QRCode para cada ingresso
  for (let i = 0; i < item.quantidade; i++) {

    const wrapper = document.createElement("div");
    wrapper.classList.add("ingresso");

    wrapper.innerHTML = `
  <h3>${item.nome}</h3>
  <p>${item.data}</p>
  <p>${item.local}</p>

  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(item.nome + i)}">

  <span>Ingresso ${i + 1}</span>
`;

    lista.appendChild(wrapper);
  }

  tela.style.display = "flex";
}

function fecharTelaIngressos() {
  document.getElementById("tela-ingressos").style.display = "none";
}
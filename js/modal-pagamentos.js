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

    const usuario = localStorage.getItem("usuarioLogado");
    const carrinho = JSON.parse(localStorage.getItem("carrinho_" + usuario)) || [];

    // 🔥 VERIFICA SE ESTÁ VAZIO
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    // 👉 SE TIVER ITENS, ABRE NORMAL
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
  const usuario = localStorage.getItem("usuarioLogado");

  let carrinho = JSON.parse(localStorage.getItem("carrinho_" + usuario)) || [];
  let ingressos = JSON.parse(localStorage.getItem("ingressos_" + usuario)) || [];

  // move itens do carrinho para ingressos
  ingressos = ingressos.concat(carrinho);

  // salva ingressos do usuário
  localStorage.setItem("ingressos_" + usuario, JSON.stringify(ingressos));

  // limpa carrinho do usuário
  localStorage.removeItem("carrinho_" + usuario);

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
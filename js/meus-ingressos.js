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
          <p>⏰ ${item.hora}</p>
          <p>Quantidade: ${item.quantidade}</p>

          <button class="ver-ingresso">Ver meu ingresso</button>
        `;

        containerIngressos.appendChild(div);
        div.querySelector(".ver-ingresso").addEventListener("click", () => {
          abrirTelaIngressos(item);
        });
      });
    }
  }

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

document.addEventListener("DOMContentLoaded", () => {

  const titulo = document.getElementById("titulo-socio");
  const area = document.getElementById("area-socio");

  const usuarioLogado = localStorage.getItem("usuarioLogado");
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(u => u.email === usuarioLogado);

  // 🔥 NÃO É SÓCIO
  if (!usuario || !usuario.socio) {

    titulo.innerText = "Seja Sócio";

    area.innerHTML = `
      <div class="planos">

        <div class="item-carrinho">
          <h3>🥉 Bronze</h3>
          <p>R$ 19,90 / mês</p>
          <p>10% de desconto nos ingressos</p>
          <button onclick="virarSocio('bronze')">Assinar</button>
        </div>

        <div class="item-carrinho">
          <h3>🥈 Prata</h3>
          <p>R$ 39,90 / mês</p>
          <p>20% de desconto nos ingressos</p>
          <button onclick="virarSocio('prata')">Assinar</button>
        </div>

      </div>
    `;

  } else {

    // 🔥 JÁ É SÓCIO
    titulo.innerText = "Meu Sócio";

    area.innerHTML = `
      <div class="item-carrinho">
        <h3>Seu plano atual</h3>
        <p>🏆 ${usuario.socio.toUpperCase()}</p>
        <p>Status: Ativo</p>

        <button onclick="trocarPlano()">Trocar Plano</button>
        <button onclick="cancelarSocio()">Cancelar Sócio</button>
      </div>
    `;
  }

});


// 🔥 VIRAR SÓCIO
function virarSocio(tipo) {
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(u => u.email === usuarioLogado);

  if (usuario) {
    usuario.socio = tipo;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Agora você é sócio " + tipo + "!");
    location.reload();
  }
}


// 🔁 TROCAR PLANO
function trocarPlano() {
  const area = document.getElementById("area-socio");

  area.innerHTML = `
    <h3>Escolha um novo plano</h3>

    <div class="planos">
      <div class="item-carrinho">
        <h3>🥉 Bronze</h3>
        <button onclick="virarSocio('bronze')">Selecionar</button>
      </div>

      <div class="item-carrinho">
        <h3>🥈 Prata</h3>
        <button onclick="virarSocio('prata')">Selecionar</button>
      </div>
    </div>
  `;
}


// ❌ CANCELAR
function cancelarSocio() {
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(u => u.email === usuarioLogado);

  if (usuario) {
    delete usuario.socio;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Você cancelou seu plano.");
    location.reload();
  }
}
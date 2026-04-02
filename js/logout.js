// ================= LOGOUT =================
const logout = document.querySelector("#logout");

if (logout) {
  logout.addEventListener("click", (e) => {
    e.preventDefault();

    // remove login
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("logado");


    // 🔥 REMOVE O NEON NA HORA
    document.body.classList.remove(
      "neon-corinthians",
      "neon-palmeiras",
      "neon-santos",
      "neon-saopaulo",
      "neon-flamengo",
      "neon-vasco"
    );

    alert("Você saiu da conta!");
    window.location.href = "../index.html";
  });
}
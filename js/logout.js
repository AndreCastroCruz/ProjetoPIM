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
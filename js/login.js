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
const formLogin = document.querySelector(".form-login");

if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("#emailLogin").value;
    const senha = document.querySelector("#senhaLogin").value;

    if (email === "" || senha === "") {
      alert("Preencha todos os campos!");
      return;
    }

    // 🔥 PEGA TODOS OS USUÁRIOS
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 🔥 PROCURA O USUÁRIO
    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuario) {
      // 🔥 SALVA SESSÃO
      localStorage.setItem("usuarioLogado", usuario.email);
      localStorage.setItem("logado", "true");

      // 🔥 ESSENCIAL PRO NEON
      localStorage.setItem("timeUsuario", usuario.time);

      alert("Login realizado!");
      window.location.href = "jogos.html";
    } else {
      alert("Email ou senha inválidos!");
    }
  });
}
const formCadastro = document.querySelector(".form-cadastro");

  if (formCadastro) {
    formCadastro.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.querySelector("#nomeCadastro").value.trim();
      const email = document.querySelector("#emailCadastro").value.trim();
      const senha = document.querySelector("#senhaCadastro").value.trim();
      const confirmarSenha = document.querySelector("#confirmarSenha").value;
      const time = document.getElementById("time").value;

      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
      }

      if (!time) {
        alert("Selecione um time!");
        return;
      }

      localStorage.setItem("nome", nome);
      localStorage.setItem("usuario", email);
      localStorage.setItem("senha", senha);
      localStorage.setItem("timeUsuario", time);

      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html";
    });
  }
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

    // 🔥 PEGA USUÁRIOS EXISTENTES OU CRIA ARRAY
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 🔥 VERIFICA SE EMAIL JÁ EXISTE
    const usuarioExistente = usuarios.find(u => u.email === email);

    if (usuarioExistente) {
      alert("Esse email já está cadastrado!");
      return;
    }

    // 🔥 ADICIONA NOVO USUÁRIO
    usuarios.push({
      nome: nome,
      email: email,
      senha: senha,
      time: time
    });

    // 🔥 SALVA TODOS OS USUÁRIOS
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
  });
}
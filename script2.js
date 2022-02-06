// const urlDoBack = "http://localhost:8000"; //rodando local
const urlDoBack = "https://back-recados.herokuapp.com/"; //rodando heroku

function entrar() {
    let login = document.getElementById("login");
    let cadastrar = document.getElementById("cadastro");
    login.style.display = "flex";
    cadastrar.style.display = "none";

    document.getElementById("userNameLogin").value = "";
    document.getElementById("senhaLogin").value = "";
}

function logando () {
    let nomeLogin = document.getElementById("userNameLogin").value;
    let senhaLogin = document.getElementById("senhaLogin").value;

    if (!nomeLogin || !senhaLogin) {
        alert("Preencha todos os dados.");

    } else {
        axios.post(`${urlDoBack}/login`, {
            nome: nomeLogin,
            senha: senhaLogin,

        }).then(resposta => {
            localStorage.setItem("usuarioLogadoGrowdev", JSON.stringify(resposta.data.usuario));
            window.location.href = "index3.html";

        }) .catch((err) => {
            alert(err.response.data)
        })
    }
}


function cadastrar() {
    let login = document.getElementById("login");
    let cadastrar = document.getElementById("cadastro");
    login.style.display = "none";
    cadastrar.style.display = "flex";

    document.getElementById("userNameCadastro").value = "";
    document.getElementById("senhaCadastro").value = "";
    document.getElementById("senhaConfirmacaoCadastro").value = ""; 
}

entrar();

function criarNovoUsuario () {
    let nome = document.getElementById("userNameCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;
    let confirmaçaoSenha = document.getElementById("senhaConfirmacaoCadastro").value;
    
    if (nome == "" || senha == "" || confirmaçaoSenha == "") {
        alert ("Por favor preencha todos os dados");

    } else {

        if (senha == confirmaçaoSenha) {
            
            axios.post(`${urlDoBack}/cadastro`, {
                nome: nome,
                senha: senha,
                
                }).then((res) => {
                    nome.value = "";
                    senha.value = "";
                
                        limpaCadastro()
                        // buscarComentarios()
                        alert(res.data)
                
                }).catch((err) => {
                    alert(err.response.data)
                })
            
        } else {
            alert("Senhas não conferem");
        }
    }
}

function limpaCadastro() {
    document.getElementById("userNameCadastro").value = "";
    document.getElementById("senhaCadastro").value = "";
    document.getElementById("senhaConfirmacaoCadastro").value = "";
}





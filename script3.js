let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogadoGrowdev"));
// const urlDoBack = "http://localhost:8000"; //rodando local
const urlDoBack = "https://back-recados.herokuapp.com"; //rodando heroku

function salvarRecado (event) {
    event.preventDefault();

    let salvarDescricao = document.getElementById("descricao").value;
    let salvarDetalhamento = document.getElementById("detalhamento").value;

    if (!salvarDescricao || !salvarDetalhamento) {
        alert("Preencha todos os campos");

    } else {
        console.log("oi")
        axios.post(`${urlDoBack}/recado`, {
            usuario: usuarioLogado.id, 
            descricao: salvarDescricao,
            detalhamento: salvarDetalhamento,
            
        }).then((res) => {
            console.log(res)
            alert(res.data)
            listarRecados();
            
        }).catch((err) => {
            alert(err.response.data)
        })
    }
}

function paginaInicial () {
    window.location.href = "index.html";
}

function listarRecados () {

    axios.get(`${urlDoBack}/listarecados/${usuarioLogado.id}`).then(function(res) {
        let tbody = document.getElementById("tbody");
        tbody.innerHTML = "";
        console.log('res',res)
        res.data.forEach(function(recado, index) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let botaoExcluir = document.createElement("button")
            let botaoEditar = document.createElement("button");

            td1.innerHTML = recado.id;
            td2.innerHTML = recado.descricao;
            td3.innerHTML = recado.detalhamento;

            botaoExcluir.className = "btn btn-danger";
            botaoExcluir.innerText = "EXCLUIR";
            botaoEditar.className = "btn btn-info";
            botaoEditar.innerHTML = "EDITAR";
            botaoEditar.style.marginLeft = "5px";
            botaoExcluir.onclick = () => excluirRecado(recado.id); //cria função que executa exclusao
            botaoEditar.onclick = () => editarRecado(recado);

            td4.appendChild(botaoExcluir);
            td4.appendChild(botaoEditar);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            
            tbody.appendChild(tr);
        })
    }).catch((err) => {
        alert(err.response.data)
        
    })
}

function excluirRecado (idRecado) {

    axios.delete(`${urlDoBack}/recado/${idRecado}`).then((res) => {
        alert(res.data)

    }).catch((err) => {
        alert(err.response.data)
    })

    listarRecados();
    
}

function editarRecado (recado) {
    let novaDescricao = prompt("Nova Descrição:", recado.descricao );
    if (novaDescricao == null || novaDescricao == "") {
        return;
    }
    let novoDetalhamento = prompt("Novo Detalhamento:", recado.detalhamento );
    if (novoDetalhamento == null || novoDetalhamento == "") {
        return;
    }

    axios.put(`${urlDoBack}/recado/${recado.id}`, {
        descricao: novaDescricao,
        detalhamento: novoDetalhamento

    }).then((res) => {
        alert(res.data)

    }).catch((err) => {
        alert(err.response.data)
    })

    listarRecados();
}


listarRecados();



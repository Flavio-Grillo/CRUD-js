//Pegando os Dados dos usúarios 
let usuarios  = users;
//Define o id de um novo usuario ao ser inserido na lista
let novoid = usuarios.length + 1;

//gera HTML da tabela de usúario
function gerarTabelaUsuarios(){

    let tab = document.getElementById("tab");
    //se existir uma tabela antiga exclui a tabela
    if (tab){
        tab.remove();
    }

    //criando tabela 
    let tabela = document.createElement("table");
    tabela.setAttribute("id","tab");

    //criando o cabeçalho da tabela
    let cabecalho = tabela.createTHead();
    let linhaCabecalho = cabecalho.insertRow();

    //pega o nome das chaves do objeto JSON (colunas da tabela)

    let chaves = Object.keys(usuarios[0]);
    let colunas = chaves; 
    colunas.forEach(coluna => {
         let th = document.createElement('th');
         th.textContent = coluna;
         linhaCabecalho.appendChild(th);
    });

    //criando corpo da tabela
    let corpo = tabela.createTBody();
    usuarios.forEach(usuario => {
        let linha = corpo.insertRow();
        Object.values (usuario).forEach(valor =>{
            let cell = linha.insertCell();
            cell.textContent = valor;
        });
    });
    let divtab = document.getElementById("divtab");
    divtab.appendChild(tabela);
}

//adiciona na tabela a coluna do CRUD 

function adicionarColunaCRUD(){
    const btns = ["Editar", "Excluir"];
    let tabela = document.getElementById("tab");
    let thead = tabela.getElementsByTagName("thead")[0];
    let tbody = tabela.getElementsByTagName("tbody")[0];

    //adiciona o cabeçalho da nova coluna CRUD

    let novaCelulaCabecalho = document.createElement("th");
    novaCelulaCabecalho.textContent = "CRUD";
    thead.rows[0].appendChild(novaCelulaCabecalho);

    //cria os botoes e as linhas da tabela 

    for (i = 0; i < tbody.rows.length; i++){
        let novaCelula = tbody.rows[i].insertCell(-1);

        btns.forEach(btn => {
            const botao = document.createElement("button");
            if (btn == "Editar"){
                botao.setAttribute("onclick", "editarLinha(this)");
            }else {
                botao.setAttribute("onclick", "excluirUsuario(this)")

            }
            botao.textContent = btn;
            novaCelula.appendChild(botao);
        });
    }
}


//limpa os inputs do for 

function limparFormulario(){
    //pega todos os inputs do form
    const inputs = document.querySelectorAll('input');

    // intera pelo array de inputs  limpando o campo 
    inputs.forEach(input => {
    inputs.values= "";
    });
}

// captura o usuario da linha em que o botao foi clickado 

function editarLinha(button){
    //pega a tr da linha do botao
    const linha = button.closest('tr');

    //pega todas as células da linha 
    const colunas = linha.getElementsByTagName("td");

    //cria um objeto JSON para transferir os dados do usuario 
    const user = {
        id: colunas [0].textContent, 
        nome: colunas [1].textContent,
        cidade: colunas [2].textContent,
        telefone: colunas [3].textContent
    };
    console.log(user);
    jsonToForm(user);

    //Posiciona a página com o scroll mostrando o form 
    var section = document.querySelector(".container");
    section.scrollIntoView({behavior: 'smooth'});
}

//atualiza a tabela e a coluna do CRUD 
function atualizaTabela(){
    //Limpa os inputs do FORM 
    limparFormulario();
    //chama a função que gera a tabela novamente quando o array de usuarios e atualizada 
    gerarTabelaUsuarios();
    //chama a função que adiciona a coluna do CRUD 
    adicionarColunaCRUD();
}


//Tranfere os dados para o formulario para um user JSON
//Transfere o user para o array de usuarios
//Atualiza os dados da tabela 
function formToJSON(event){
    //nao deixa executar o submit no form
    event.preventDefault();

    let user = {id: "", nome: "", email: "", cidade: "", telefone: ""};

    //Seleciona todos os inputs do form
    const inputs = document.querySelectorAll('input');
    
    //Pega os valores dos inputs e transfere para o objeto json user
    inputs .forEach(input => {
        user[input.name] = input.value;
    });

    if(user.id != ""){

        let index = usuarios.findIndex(usuario => usuario.id === user.id);
        if (index !== -1){
            usuarios[index] = user;
        }

    }else{
        inserirUsuario(user);
    }

    console.log(user);
    atualizaTabela();

}


//insere o usuario no array 
function inserirUsuario(user){
    user.id = novoid.toString();
    novoid += 1;
    usuarios.push(user);
}

//transfere os dados da linha da tabela para o form 
function jsonToForm(user){
    for (const key in user){
        const input = document.querySelector(`[name="${key}"]`);
        if(input){
            input.value = user[key];
        }
    }
}


//excluir o usuario da linha que o botao foi clicado na tabela 
function excluirUsuario(button){
    //Pega a linha em que o botao foi clicado 
    const linha = button.closest('tr');
    //pega as colunas da linha 
    const colunas = linha.getElementsByTagName('td');    
    //pega o id do usuario 
    const userId = colunas[0].textContent;
    //Percorre o array de usuarios para encontrar o usuário pelo ID
    const index = usuarios.findIndex(user => user.id === userId);
    console.log("Excluindo: " + index);

    if (index !== -1){
        usuarios.splice(index, 1);
        atualizaTabela();
        console.log(`Usuario com id $(userId) excluído com sucesso.`)
    }else{
        console.log(`Usuário com id $(userId) não encontrado`)
    }

}
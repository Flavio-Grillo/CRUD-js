//Pegando os Dados dos usúarios 
let usuarios  = users;

//gera HTML da tabela de usúario
function gerarTabelaUsuarios(){

    let tab = document.getElementById("divtab");

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
            botao.textContent = btn;
            novaCelula.appendChild(botao);
            
        });
    }

}
// 1 pegar os valores
// 2 calcular idade
// 3 gerar a faixa etaria
//4 organizar objeto pessoa na lista
// 5 cadastrar a pessoa na lista
//6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7 Rendenizar o conteudo da tabela com as pessoas cadastradas
// 8 botao para limpar os registros
function calcular(event) {
    event.preventDefault()
    console.log("foi execultada a funcao calcular")
    usuario = pegarosvaloresdousuario()
   let idadeCalculada = calcularaIdade(usuario.ano)
   let idadeAtual = faixaEtaria(idadeCalculada)
   console.log(idadeAtual)
    usuario=organizarosdados(usuario,idadeCalculada,idadeAtual)
    cadastrarUsuario(usuario)
    window.location.reload()
    
}

function pegarosvaloresdousuario(){
    let nomeRecebido = document.getElementById("nome"). value.trim()
    let anoRecebido = document.getElementById("ano-nascimento").value
    let mesRecebido = document.getElementById("mes-nascimento"). value
    let diaRecebido = document.getElementById("dia-nascimento").value

    let dadosUsuario={
        nome: nomeRecebido,
        
        ano: anoRecebido,
        mes: mesRecebido,
        dia: diaRecebido
    }
    console.log(dadosUsuario)


return dadosUsuario
}

function calcularaIdade(ano){
   let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear() 
    let idade = anoAtual-ano
    console.log(idade)
    return idade
    

    
    
  
}

function faixaEtaria(idade){
    if(idade<=12){
        return "Crianca"

    } else if (idade >=13 && idade <=17){
        return "adolecente"
    }else if (idade>=18 && idade <=65){
        return "aduto"
}   else {
    return "idoso"
}
}

function organizarosdados(dadosUsuario,idadeAtual,idade){
    let dadosOrganizados = {
        ...dadosUsuario,
        idadepessoa: idadeAtual,
        idadecidadao: idade,
    }
    return dadosOrganizados
}

function cadastrarUsuario(dadosUsuario){

    let listaUsuarios = []

    if(localStorage.getItem("usuariosCadastrados")!= null ){
        listaUsuarios = localStorage.getItem("usuariosCadastrados")
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    // adiciona a lista de usuarios

    listaUsuarios.push(dadosUsuario)

    // salva a listaUsuarios no localStorage

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))

    // localStorage.getItem("usuariocadastrados")
//     if(localStorage.getItem("usuariosCadastrados") ! = null){

//     }
//     localStorage.setItem("nomeUsuario","Elias")
}

function carregarUsuarios(){
    listaCarregada = []
    if (localStorage.getItem("usuariosCadastrados")!= null ){
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
        console.log(listaCarregada)

    }
    if(listaCarregada.length == 0){
    let tabela = document.getElementById("corpo-tabela")
    tabela.innerHTML = `<tr class= "linha-mensagem">
    < td colspan ="6">nenhum usuario cadastrado :</td> </tr>`

      
} else{
    // montar conteudo da tabela
    montarTabela(listaCarregada)
}

console.log(listaCarregada) 


}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())
 
// passo 7

function montarTabela(listaUsuarios){
    let tabela = document.getElementById("corpo-tabela")
    let templeite = ""
    listaUsuarios.forEach(usuario=>{
        // console.log("o usuario e:", usuario)
        templeite += ` <tr>
        <td data-cell="nome">${usuario.nome}</td>
        <td data-cell="data de nascimento">${usuario.dia + "/" +usuario.mes+"/"+usuario.ano}</td>
        <td data-cell="idade">${usuario.idadecidadao}</td>
        <td data-cell="faixa etária">${usuario.idadepessoa}</td>
    </tr>                
        `
    })

    tabela.innerHTML = templeite
}

function deletarRegistros() {
    localStorage.removeItem("usuariosCadastrados")

    // Recarrega a pagina

    window.location.reload()
}


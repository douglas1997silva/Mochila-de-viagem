 const formulario = document.querySelector('#novoItem');
 const lista = document.querySelector('#lista');
 //onde fica os itens quandoe adicionado na lista
 const itens = JSON.parse(localStorage.getItem('itens'))||[]

 

 itens.forEach((elemento) =>{
    criaElemento(elemento)

 })
 //PEGANDO DADOS DO FORMULARIO COM SUBMIT EO EVENTO ADDEVENTLISTENER COM EVENTO
  formulario.addEventListener('submit',(evento) => {
    evento.preventDefault()
   // console.log(evento.target.elements['nome'].value)
    //console.log(evento.target.elements['quantidade'].value)
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe =itens.find(elemento => elemento.nome === nome.value)
    const itemAtual = {
      'nome': nome.value,
      'quantidade': quantidade.value
     }
     
     if(existe){
       itemAtual.id = existe.id 
       autualizaElementos(itemAtual)
       itens[ itens.findIndex(elemento => elemento === existe.id)] = itemAtual
     }
     else{
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]) .id + 1: 0 ;
    criaElemento(itemAtual)
     //itens e arrays para somar com as listar que for cirada no armazenamento
     itens.push(itemAtual)
     }
    
  //locastorage e para armazenar string na pagina
     localStorage.setItem('itens', JSON.stringify(itens))
     //para deixar input vazio na hora de escrever
      nome.value = ''
      quantidade.value = ''

  })
 //função criar elemntos 
  function criaElemento(itens){
 //console.log(nome)// eo input que vai o nome do item
 //console.log(quantidade)//eo numero que vai no input quantidade

   const novoItem = document.createElement('li')
   novoItem.classList.add('item')
   //console.log(novoItem)
   const numeroTtem = document.createElement('strong')
   numeroTtem.dataset.id =itens.id
   
   numeroTtem.innerHTML = itens.quantidade
   novoItem.appendChild(numeroTtem) 
   novoItem.innerHTML += itens.nome

   lista.appendChild(novoItem)
   novoItem.appendChild(botaoDeleta (itens.id))
   
   //função de atualizar 
  }
  function autualizaElementos(itens){
    document.querySelector("[data-id='"+itens.id+"']").innerHTML = itens.quantidade
  }

  function botaoDeleta (id){
    const elementoBotao = document.createElement('button')
     elementoBotao.innerText = 'X'
    
     elementoBotao.addEventListener('click',function() {
        deletaElemento(this.parentNode,id)
     })
      return elementoBotao
  }
  
  function deletaElemento(tag, id){
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento === id), 1)
    localStorage.setItem('itens', JSON.stringify(itens))

     console.log(itens)
  }
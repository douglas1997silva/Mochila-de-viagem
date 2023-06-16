const novoItem = document.querySelector('#novoItem');
const list =document.querySelector('#lista');

const itens = JSON.parse(localStorage.getItem('caixa'))|| [];
  

itens.forEach((elemento) =>{
   criarElemento(elemento);
})

novoItem.addEventListener('submit', (evento)=>{
    evento.preventDefault()
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const existe = itens.find(elemento=> elemento.nome ===nome.value)
    const novacaixa = {
      'nome':nome.value,
      'quantidade':quantidade.value
    }
     if(existe){
      novoItem.id =existe.id 
      novoItem[existe.id] =novoItem
      
     }
     else {
      novoItem.id = itens.lenght
      criarElemento(novoItem);
  
      itens.push(novoItem)
     }

   localStorage.setItem('caixa',JSON.stringify(itens));
   nome.value=''
   quantidade.value=''
})

function criarElemento(itens){
 
 const novoelemento = document.createElement('li')

   novoelemento.classList.add('lista');

   const numeroitem = document.createElement('strong')
   numeroitem.dataset.id = itens.id
   numeroitem.innerHTML =itens.quantidade

   novoelemento.appendChild(numeroitem)

   novoelemento.innerHTML+= itens.nome

   list.appendChild(novoelemento);

}
 function autualizaElementos(itens){
   document.querySelector("[data-id='"+ itens.id+"']").innerHTML = itens.quantidade
 }
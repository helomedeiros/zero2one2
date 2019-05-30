function atualizaEventos() {
    let listaEventos = document.querySelector("#listagem-eventos");
    listaEventos.innerHTML = '';
    
    const url = 'https://api.conexaonfe.com.br/v1/eventos';

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'fff',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response.json().then(res => {
            console.log(res);
            res.forEach(addEventoTela);

        }));
    })
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })
}
function addEventoTela(evento, index, array) {
 
    let table = document.querySelector("#table-eventos");
    let tr = document.createElement("tr");
    tr.classList.add("class-tr");
    let td = document.createElement("td");
    let tdLabel = document.createElement("label");
    td.classList.add("class-td");
   
    tdLabel.classList.add("evento");
    tdLabel.setAttribute("code", evento.id);
    tdLabel.classList.add("label-evento");

    td.appendChild(tdLabel);
    tdLabel.textContent = evento.evento;
    let tdData = document.createElement("td");
    tdData.classList.add("class-td-data");
    let inputData = document.createElement("input");
    inputData.setAttribute("type","date");
    inputData.setAttribute("id","data");
    inputData.setAttribute("name", "data");
    inputData.classList.add("class-data");

    tdData.appendChild(inputData);
    tr.appendChild(td);
    tr.appendChild(tdData);
    table.appendChild(tr);

    let trButton = document.querySelector("#tr-button");
    table.appendChild(trButton);
  
   
}
function addEventosHoje(evento, index, array) {
 
    let table = document.querySelector("#table-eventos-hoje");

    let tr = document.createElement("tr");
    tr.classList.add("class-tr-hoje");

    let td = document.createElement("td");
    td.classList.add("class-td");

    let tdLabel = document.createElement("label");  
    tdLabel.classList.add("evento");
    tdLabel.setAttribute("code", evento.id);
    tdLabel.classList.add("label-evento");
    tdLabel.textContent = evento.evento;
    
    
   /* let tdData = document.createElement("td");
    tdData.classList.add("class-td-data");

    let tdDataLabel = document.createElement("label");
    let dataFormat = moment(evento.data).format("DD/MM/YYYY");
    tdDataLabel.textContent = dataFormat;*/

    td.appendChild(tdLabel);
    //tdData.appendChild(tdDataLabel);
    tr.appendChild(td);
  //  tr.appendChild(tdData);
    table.appendChild(tr);  
   
}


let botaoListar = document.querySelector("#listar-hoje");


function obtemEventos(tr) {
    
    let evento = {
        evento: tr.querySelector(".class-td").textContent,
        data: tr.querySelector(".class-td-data input").value  
    }
    
    let hoje = moment(new Date()).format("DD/MM/YYYY");
    let dataDigitada = moment(evento.data).format("DD/MM/YYYY");

    if (hoje === dataDigitada){

        addEventosHoje(evento);
        
    }
  
}

function limparEventosHoje(evento){
    let table = document.querySelector("#table-eventos-hoje");

    if (evento !== undefined) {
        table.removeChild(evento);
    }
    
   
  

}

botaoListar.addEventListener("click", function (){
   
    event.preventDefault();
    document.querySelectorAll("#table-eventos-hoje .class-tr-hoje").forEach(limparEventosHoje);
    
    let tr = document.querySelectorAll(".class-tr");
    limparEventosHoje();
    let eventos = tr.forEach(obtemEventos);

});  


atualizaEventos();
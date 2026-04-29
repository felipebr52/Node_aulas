const form= document.getElementById('form-tarefa');
const lista = document.getElementById('lista-tarefas');
const apiurl= '/tarefas';

function carregarTarefas(){
    fetch(apiurl)
    .then((resposta)=>resposta.json())
    .then((tarefas) =>{
        lista.innerHTML = "";
        tarefas.forEach((tarefas) => {
            console.log(criarTarefaNova(tarefas));
            lista.appendChild(criarTarefaNova(tarefas));

            // let dataformatada = new Date(tarefas.data_conclusao);
            // let datafinal =dataformatada.toLocaleDateString("pt-BR")
            // lista.innerHTML += `<li>
            //     ${tarefas.titulo} - ${tarefas.descricao} - ${datafinal} - ${tarefas.status_tarefa}
            //     </li>`     
        });
    })
}

carregarTarefas();

function cadastrarTarefa(tarefas){
    const opcoes={
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(tarefas),

    }
    fetch(apiurl,opcoes).then((resposta)=>{
        resposta.json();
    }).then((dados)=>{
        console.log(dados);
        carregarTarefas();
    })
}

form.addEventListener('submit',(evento)=>{
    evento.preventDefault();
    let metodo= form.hasAttribute("data-editing-id") ? "PUT" : "POST";
    let id=form.hasAttribute("data-editing-id") ? form.hasAttribute("data-editing-id") : 0;

    let url=id>0 ? `${apiurl}/${id}` : apiurl;

    form.titulo.value = tarefa.titulo;
    form.descricao.value = tarefa.descricao;
    form.data_conclusao.value = tarefa.data_conclusao;
    form.status_tarefa.checked = tarefa.status_tarefa;

    const tarefa ={
        titulo:document.getElementById('titulo').value,
        descricao:document.getElementById('descricao').value,
        data_conclusao:document.getElementById('data_conclusao').value,
        status_tarefa:document.getElementById('status_tarefa').checked ? 1:0
    }
    cadastrarTarefa(tarefa);
    form.reset();
})

lista.addEventListener('click',function(e){
    const liClicado = e.target.closest('li');
    if(!liClicado) return;
    const id = liClicado.getAttribute("data-id");''
    console.log(e.target);
    if(e.target.closest(".editar")){
       fetch(`${apiurl}/${id}`)
       .then((res)=> res.json()).then((dados)=> {
        const dataFormatada = new Date(dados.data_conclusao).toISOString().split("T")[0];
        form.titulo.value = dados.titulo;
        form.descricao.value = dados.descricao;
        form.data_conclusao.value = dataFormatada;
        form.status_tarefa.checked = dados.status_tarefa === 1 ? true : false;
        form.setAttribute("data-editing-id", dados.id);
       });
    }
})

function criarTarefaNova(tarefa){
    const dataformatada = new Date(tarefa.data_conclusao).toLocaleDateString("pt-BR");
    const li = document.createElement('li');
    li.textContent = `Nova tarefa - ${dataformatada}`;
    li.id=tarefa.id;
    li.setAttribute("data-id",tarefa.id);
    li.className=tarefa.status_tarefa ? "tarefa-concluida" : "tarefa-pendente";
    const btnConcluir = tarefa.status_tarefa ? `<button class="desfazer" title="Desfazer"<i class="fa-solid fa-recycle"></i></button>` : `<button class="concluir" title="Concluir"><i class="fa-solid fa-check"></i></button>`;

    li.innerHTML= `
    <span>
        <i class="fa-regular ${tarefa.status_tarefa ? "fa-check-circle" : "fa-circle"}"></i>
        <b>${tarefa.titulo}</b> - ${tarefa.descricao} 
        <small><i class="fa-regular fa-clock"></i>${dataformatada}</small>
    </span>
    <div class="acoes">   
        ${btnConcluir}
        ${tarefa.status_tarefa ? "" : '<button class="editar" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>'}
        <button class="remover"><i class="fa-solid fa-trash"></i></button>
    </div>
    `;
    return li;
}
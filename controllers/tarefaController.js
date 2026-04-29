import tarefaModel from "../models/tarefaModel.js"

//listar
const buscarTarefas = async (req,res ) =>{
    const tarefas =await tarefaModel.buscarTarefas();
    res.status(200).json(tarefas);
}
//criar
const criarTarefas = async (req, res) =>{
    const tarefa = req.body;
    const id = await tarefaModel.criarTarefas(tarefa);
    res.status(201).json({id,...tarefa});
}
//atualizar
const atualizarTarefa = async(req,res)=>{
    try{
        const {id}= req.params;
        const tarefa = req.body;
        await tarefaModel.atualizarTarefa(id, tarefa);
        tarefa.id=id;
        res.status(200).json({id,...tarefa});

    }catch(error){
        res.status(500).json({message:"Erro ao atualizar tarefa."+error.message})
    }
}

const buscarTarefaPorId = async(req,res)=>{
    try{
        const {id} = req.params;
        const tarefa = await tarefaModel.buscarTarefaPorId(id);
        res.status(200).json(tarefa);
    }catch(error){
        res.status(500).json({message:"Erro ao buscar tarefa."+error.message})
    }
}

export default{
    buscarTarefas,
    criarTarefas,
    atualizarTarefa,
    buscarTarefaPorId
}
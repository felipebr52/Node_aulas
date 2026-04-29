import { conectarDB } from "../configs/database.js";

const buscarTarefas =async () =>{
    const con =await conectarDB();
    const [rows] =await con.query("SELECT * FROM tarefa");

    return rows;
}

const criarTarefas =async(tarefa)=>{
    console.log(tarefa);
    const con =await conectarDB();
    const [result]=await con.query("INSERT INTO tarefa SET ?",tarefa);
    return result.insertId;
}

const atualizarTarefa = async(id,tarefa)=>{
    const con = await conectarDB();
    await con.query("UPDATE tarefa SET ? WHERE id=?", [tarefa, id]);
}

const buscarTarefaPorId = async(id)=>{
    const con = await conectarDB();
    const [res] = await con.query("SELECT * FROM tarefa WHERE id=?", [id]);
    return res[0];
}

export default {
    buscarTarefas,
    criarTarefas,
    atualizarTarefa,
    buscarTarefaPorId
}
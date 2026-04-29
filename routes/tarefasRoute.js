import express from 'express';
import tarefaController from '../controllers/tarefaController.js';


const router =express.Router();

router.get('/', tarefaController.buscarTarefas);
router.post('/',tarefaController.criarTarefas);
router.put('/:id',tarefaController.atualizarTarefa)
router.get('/:id',tarefaController.buscarTarefaPorId)
export default router

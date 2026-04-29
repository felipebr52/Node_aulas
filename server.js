import express from 'express'
import dotenv from 'dotenv'
import tarefaRoute from './routes/tarefasRoute.js'
import cors from 'cors'
import {conectarDB} from './configs/database.js';

dotenv.config();
const app =express();
const PORTA= process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use('/tarefas',tarefaRoute)
app.get("/", async(req,res) =>{
    res.send("API funcionando!")
})
app.get('/',(req,res)=>{
    res.sendFile("index.html",{root:"public"});
});

app.listen(PORTA, ()=>{
    console.log(`http://localhost:${PORTA}`)
})
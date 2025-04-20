const express = require('express')
const mongoose = require('mongoose')
const taskRouter = require('./routes/task.route')
const sprintRouter = require('./routes/sprint.route')
const backlogRouter = require('./routes/backlog.route')
const bodyParser = require('body-parser')
const { existeBacklog } = require('./controllers/backlog.controller')
const { config } = require ('dotenv')
config()

const app = express();

app.use(bodyParser.json());

(async () => {
    await existeBacklog();
  })();

app.use('/tasks', taskRouter);
app.use('/sprints', sprintRouter);
app.use('/backlog', backlogRouter);



mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
const db = mongoose.connection;

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
    
})



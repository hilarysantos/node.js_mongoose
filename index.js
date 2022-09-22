// Aula 06

const express = require('express')
const mongoose = require('mongoose')
const Task = require('./models/task')

const mongourl = 'mongodb+srv://toti:toti@toti.faoj2lq.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongourl, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Não foi dessa vez!'))

const app = express()

app.use(express.static('./views'))
app.set('view engine', 'ejs')



app.get('/produtos', (req, res) => {
    res.render('produtos')
})

app.get('/cadastro', async (req, res) => {
    const task = await Task.create({name: 'Karen'})

    res.json({ task })
})

app.get('/alunos', async (req, res) => {
    const tasks = await Task.find({})

    res.json({ tasks })
})

app.get('/atualizar/:id', async (req, res) => {
    const task = await Task.findById(req.params.id)

    task.name = 'Pierre'
    await task.save()

    res.send({ task })
})

app.get('/delete/:id', async (req, res) => {
    await Task.deleteOne({ _id: req.params.id }, () => {
        console.log('Deletado do Mongo!')
    })

    res.send('Deletado!')
})

app.put('/atualizarperfil', (req, res) => {
    res.render('update')
})

app.delete('/deletarconta', (req, res) => {
    res.render('delete')
})

app.listen(3000, () => {
    console.log('Servidor funcionando. Acesse localhost:3000')
})

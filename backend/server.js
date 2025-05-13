const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { v4: uuid } = require("uuid")

const app = express()
const Port = 3000

app.use(cors())
app.use(bodyParser.json())

let produtos = []

// CREATE
app.post('/produtos', (req, res) => {
    const { nome, descricao, preco, imagem } = req.body

    if (!nome || !descricao || !preco || !imagem) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
    }

    const novoItem = { id: uuid(), nome, descricao, preco, imagem }
    produtos.push(novoItem)
    res.status(201).json(novoItem)
})

// READ
app.get('/produtos', (req, res) => {
    res.json(produtos)
})

// UPDATE
app.put('/produtos/:id', (req, res) => {
    const produtoId = req.params.id
    const { nome, descricao, preco, imagem } = req.body

    if (!nome || !descricao || !preco || !imagem) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
    }

    const produtoIndex = produtos.findIndex(item => item.id === produtoId)
    if (produtoIndex === -1) {
        return res.status(404).json({ error: 'Produto não encontrado.' })
    }

    produtos[produtoIndex] = { id: produtoId, nome, descricao, preco, imagem }
    res.json(produtos[produtoIndex])
})

// DELETE
app.delete('/produtos/:id', (req, res) => {
    const produtoId = req.params.id
    const inicioProduto = produtos.length
    produtos = produtos.filter(item => item.id !== produtoId)

    if (produtos.length === inicioProduto) {
        return res.status(404).json({ error: 'Produto não encontrado.' })
    }

    res.status(204).send()
})

// INICIAR SERVIDOR
app.listen(Port, () => {
    console.log(`Servidor rodando na porta ${Port}`)
})

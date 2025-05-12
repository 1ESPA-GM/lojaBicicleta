import { useState, useEffect } from 'react'
import axios from 'axios'

const Produtos = () => {
  const API_URL = 'http://localhost:3000/produtos'

  const [produtos, setProdutos] = useState([])
  const [novoProduto, setNovoProduto] = useState({ nome: '', descricao: '', descricao2: '', imagem: '' })
  const [editar, setEditar] = useState(false)

  const cadastrarProduto = async () => {
    if (!novoProduto.nome || !novoProduto.descricao || !novoProduto.descricao2) {
      alert('Todos os campos são obrigatórios')
      return
    }
    try {
      const response = await axios.post(API_URL, novoProduto)
      setProdutos([...produtos, response.data])
      setNovoProduto({ nome: '', descricao: '', descricao2: '' })
      setEditar(false)
    } catch (error) {
      console.log('Erro ao criar o produto', error)
    }
  }

  useEffect(() => {
    consultarProdutos()
  }, []) // Corrigido: adiciona array de dependências vazio para evitar chamadas infinitas

  const consultarProdutos = async () => {
    try {
      const response = await axios.get(API_URL)
      setProdutos(response.data)
    } catch (error) {
      console.log('Erro ao buscar produtos', error)
    }
  }

  const alterarProduto = async () => {
    if (!novoProduto.nome || !novoProduto.descricao || !novoProduto.descricao2) {
      alert('Todos os campos são obrigatórios')
      return
    }
    try {
      const response = await axios.put(`${API_URL}/${novoProduto.id}`, novoProduto)
      setProdutos(produtos.map((produto) => (produto.id === novoProduto.id ? response.data : produto)))
      setNovoProduto({ nome: '', descricao: '', descricao2: '' })
      setEditar(false)
    } catch (error) {
      console.log('Erro ao atualizar o produto', error)
    }
  }

  const deletaProduto = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        setProdutos(produtos.filter((produto) => produto.id !== id))
      } catch (error) {
        console.log('Erro ao excluir o produto', error)
      }
    } else {
      console.log('Exclusão do produto cancelada.')
    }
  }

  const handleEditar = (produto) => {
    setNovoProduto(produto)
    setEditar(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editar) {
      alterarProduto()
    } else {
      cadastrarProduto()
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Produtos</h1>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Nome"
            value={novoProduto.nome}
            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
          <input
            type="text"
            id="descricao"
            placeholder="Descrição"
            value={novoProduto.descricao}
            onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="descricao2" className="block text-sm font-medium text-gray-700">Preço</label>
          <input
            type="text"
            id="descricao2"
            placeholder="Preço em R$"
            value={novoProduto.descricao2}
            onChange={(e) => setNovoProduto({ ...novoProduto, descricao2: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {editar ? 'Alterar' : 'Cadastrar'}
        </button>
      </form>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id} className="border p-2 mb-2 rounded flex items-center justify-between">
            <div>
              <strong className="font-semibold"> <img src="/bike01.webp" alt="bicicleta" width={250} /> {produto.nome}</strong> - {produto.descricao} - R$ {produto.descricao2}
            </div>
            <div>
              <button
                onClick={() => handleEditar(produto)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => deletaProduto(produto.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Produtos

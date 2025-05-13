import { useState, useEffect } from 'react'
import axios from 'axios'

const Produtos = () => {
  const API_URL = 'http://localhost:3000/produtos'

  const [produtos, setProdutos] = useState([])
  const [novoProduto, setNovoProduto] = useState({ nome: '', descricao: '', preco: '', imagem: '' })
  const [editar, setEditar] = useState(false)

  const cadastrarProduto = async () => {
    if (!novoProduto.nome || !novoProduto.descricao || !novoProduto.preco || !novoProduto.imagem) {
      alert('Todos os campos são obrigatórios')
      return
    }
    try {
      const response = await axios.post(API_URL, novoProduto)
      setProdutos([...produtos, response.data])
      setNovoProduto({ nome: '', descricao: '', preco: '', imagem: '' })
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
    if (!novoProduto.nome || !novoProduto.descricao || !novoProduto.preco || !novoProduto.imagem) {
      alert('Todos os campos são obrigatórios')
      return
    }
    try {
      const response = await axios.put(`${API_URL}/${novoProduto.id}`, novoProduto)
      setProdutos(produtos.map((produto) => (produto.id === novoProduto.id ? response.data : produto)))
      setNovoProduto({ nome: '', descricao: '', preco: '', imagem: '' })
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
    setNovoProduto({
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      imagem: produto.imagem,
    })
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
    <div className="container mx-auto px-4 py-8">
      {/* FORMULÁRIO */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto mb-10 grid gap-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {editar ? 'Editar Produto' : 'Cadastrar Produto'}
        </h2>

        <input
          type="text"
          placeholder="Nome"
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
          className="p-2 border rounded w-full"
        />

        <input
          type="text"
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
          className="p-2 border rounded w-full"
        />

        <input
          type="text"
          placeholder="Preço (R$)"
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
          className="p-2 border rounded w-full"
        />

        <input
          type="text"
          placeholder="URL da imagem (opcional)"
          value={novoProduto.imagem}
          onChange={(e) => setNovoProduto({ ...novoProduto, imagem: e.target.value })}
          className="p-2 border rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          {editar ? 'Salvar Alterações' : 'Cadastrar Produto'}
        </button>
      </form>

      {/* LINHA DE PRODUTOS COM IMAGENS PEQUENAS */}
      <div className="flex flex-wrap justify-center gap-6">
        {produtos.map((produto) => (
          <div 
            key={produto.id} 
            className="w-52 bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <img 
              src={produto.imagem || '/bike01.webp'} 
              alt={produto.nome} 
              className="w-24 h-24 object-cover rounded mb-3"
            />
            <h3 className="text-md font-bold text-center">{produto.nome}</h3>
            <p className="text-sm text-gray-600 text-center">{produto.descricao}</p>
            <p className="text-green-600 font-semibold text-sm mt-1">R$ {produto.preco}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEditar(produto)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-1 px-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => deletaProduto(produto.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-2 rounded"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Produtos

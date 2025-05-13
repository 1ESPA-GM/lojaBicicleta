import { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const API_URL = 'http://localhost:3000/produtos'
  const [produtos, setProdutos] = useState([])

  // Consulta inicial e a cada 5 segundos
  useEffect(() => {
    consultarProdutos()

    const intervalo = setInterval(() => {
      consultarProdutos()
    }, 5000) // atualiza a cada 5s

    return () => clearInterval(intervalo) // limpa quando o componente desmontar
  }, [])

  const consultarProdutos = async () => {
    try {
      const response = await axios.get(API_URL)
      setProdutos(response.data)
    } catch (error) {
      console.log('Erro ao buscar produtos', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Bikes Disponíveis</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {produtos.length === 0 ? (
          <p className="text-gray-500">Nenhum produto cadastrado.</p>
        ) : (
          produtos.map((produto) => (
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
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
import { useState } from 'react'

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Mensagem enviada! (integre com backend ou EmailJS)')
    // Aqui você pode usar fetch/axios para enviar os dados ao backend
    console.log(formData)
    setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Fale Conosco</h2>
      
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="assunto"
          placeholder="Assunto"
          value={formData.assunto}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded"
        />
        <textarea
          name="mensagem"
          placeholder="Digite sua mensagem..."
          value={formData.mensagem}
          onChange={handleChange}
          rows="5"
          required
          className="p-3 border border-gray-300 rounded resize-none"
        ></textarea>
        
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  )
}

export default Contato
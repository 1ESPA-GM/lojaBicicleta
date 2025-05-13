import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">BikesTop</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/produtos" className="hover:underline">Cadastrar</Link>
        <Link to="/contato" className="hover:underline">Contato</Link>
        <Link to="/sobre" className="hover:underline">Sobre</Link>
      </div>
    </nav>
  )
}

export default Navbar
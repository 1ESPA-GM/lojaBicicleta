import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Sobre = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  }

  const imagens = [
    '/cailou.webp',
    '/minibike.jpg',
    '/rosapink.jpg'
  ]

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">Sobre Nossa Loja</h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-10">
        Bem-vindo à <strong>BikesTop</strong>, a sua loja especializada em bicicletas para todos os estilos!
        Desde modelos urbanos até mountain bikes de alta performance, oferecemos produtos de qualidade,
        atendimento especializado e uma experiência de compra única. 🚴‍♂️
      </p>
      <div className="max-w-4xl mx-auto mb-12">
        <Slider {...settings}>
          {imagens.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 object-contain rounded shadow-md"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2 text-blue-600">Variedade</h3>
          <p className="text-gray-600">
            Bicicletas para todos os gostos: estrada, trilha, lazer e muito mais!
          </p>
        </div>

        <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2 text-blue-600">Qualidade</h3>
          <p className="text-gray-600">
            Trabalhamos com as melhores marcas e oferecemos garantia em todos os produtos.
          </p>
        </div>

        <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2 text-blue-600">Atendimento</h3>
          <p className="text-gray-600">
            Equipe especializada pronta para te ajudar antes, durante e depois da compra.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sobre
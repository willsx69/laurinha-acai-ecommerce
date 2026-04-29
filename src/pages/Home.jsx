import { Link } from 'react-router-dom'

export default function Home() {
  const scrollToProducts = () => {
    const target = document.getElementById('copos-acai')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text animate-item" style={{animationDelay: '0.2s'}}>
            <h1 className="animate-item" style={{animationDelay: '0.4s'}}> PARA QUEM GOSTA E QUER AÇAÍ DE VERDADE</h1>
            <p className="animate-item" style={{animationDelay: '0.6s'}}>Experimente você também e venha sentir o verdadeiro sabor da Amazônia.</p>
            <Link to="/produtos" className="hero-btn animate-item" style={{animationDelay: '0.8s'}}>
              Fazer Pedido
            </Link>
          </div>
          <div className="hero-image animate-item" style={{animationDelay: '0.8s'}}>
            <img src="/imagem1.png" alt="Açaí" />
          </div>
        </div>
      </section>
    </>
  )
}
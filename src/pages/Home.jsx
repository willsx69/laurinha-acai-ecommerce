import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Para quem gosta e quer açaí de verdade</h1>
            <p>Experimente você também e venha sentir o verdadeiro sabor da Amazônia.</p>
            <div className="hero-buttons">
              <Link to="/produtos" className="hero-btn-primary">
                Ver Produtos
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/imagem1.png" alt="Açaí artesanal" />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🌿</div>
            <h3>100% Natural</h3>
            <p>Açaí selecionado da Amazônia</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Delivery</h3>
            <p>Entrega rápida na região</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Feito com Amor</h3>
            <p>Receita exclusiva</p>
          </div>
        </div>
      </section>

    </>
  )
}
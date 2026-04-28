import { useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-logo animate-item" style={{animationDelay: '0.2s'}}>
            <img src="/logo_açai.png" alt="Logo Açaí São" />
          </a>
          
          <button 
            className={`navbar-toggle animate-item ${menuOpen ? 'active' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
          
          <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
            <li className="animate-item" style={{animationDelay: '0.3s'}}><a href="/">Início</a></li>
            <li className="animate-item" style={{animationDelay: '0.4s'}}><a href="/quem-somos">Quem Somos</a></li>
            <li className="animate-item" style={{animationDelay: '0.5s'}}><a href="/produtos">Produtos</a></li>
            <li className="has-submenu animate-item" style={{animationDelay: '0.6s'}}>
              <a href="/food-service">Food Service</a>
              <ul className="submenu">
                <li><a href="/food-service/">Food Service</a></li>
                <li><a href="/revendedor">Seja um revendedor</a></li>
              </ul>
            </li>
            <li className="animate-item" style={{animationDelay: '0.7s'}}><a href="/fale-conosco">Fale Conosco</a></li>
            <li className="animate-item" style={{animationDelay: '0.8s'}}><a href="/onde-comprar" className="navbar-cta-mobile">Onde Comprar</a></li>
          </ul>
          
          <a href="/onde-comprar" className="navbar-cta animate-item" style={{animationDelay: '0.9s'}}>Onde Comprar</a>
        </div>
      </nav>
      
      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text animate-item" style={{animationDelay: '0.2s'}}>
              <h1 className="animate-item" style={{animationDelay: '0.4s'}}> PARA QUEM GOSTA E QUER AÇAÍ DE VERDADE</h1>
              <p className="animate-item" style={{animationDelay: '0.6s'}}>Experimente você também e venha sentir o verdadeiro sabor da Amazônia.</p>
              <a href="https://wa.me/559286320127?text=Olá,%20vim%20pelo%20site%20e%20quero%20pedir%20um%20açaí%20no%20copo%20%F0%9F%8D%87" className="hero-btn animate-item" style={{animationDelay: '0.8s'}} target="_blank" rel="noopener noreferrer">Quero Saber Mais</a>
            </div>
            <div className="hero-image animate-item" style={{animationDelay: '1s'}}>
              <img src="/imagem1.png" alt="Açaí" />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
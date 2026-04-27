import { useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-logo">
            <img src="/logo_açai.png" alt="Logo Açaí São" />
          </a>
          
          <button 
            className={`navbar-toggle ${menuOpen ? 'active' : ''}`} 
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
            <li><a href="/">Início</a></li>
            <li><a href="/quem-somos">Quem Somos</a></li>
            <li><a href="/produtos">Produtos</a></li>
            <li className="has-submenu">
              <a href="/food-service">Food Service</a>
              <ul className="submenu">
                <li><a href="/food-service/">Food Service</a></li>
                <li><a href="/revendedor">Seja um revendedor</a></li>
              </ul>
            </li>
            <li><a href="/fale-conosco">Fale Conosco</a></li>
            <li><a href="/onde-comprar" className="navbar-cta-mobile">Onde Comprar</a></li>
          </ul>
          
          <a href="/onde-comprar" className="navbar-cta">Onde Comprar</a>
        </div>
      </nav>
      
      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1> PARA QUEM GOSTA E QUER AÇAÍ DE VERDADE</h1>
              <p>A maior porcentagem de fruto do mercado, diretamente da Região Amazônica para o Rio de Janeiro.</p>
              <a href="/quem-somos" className="hero-btn">Quero Saber Mais</a>
            </div>
            <div className="hero-image">
              <img src="/imagem1.png" alt="Açaí" />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
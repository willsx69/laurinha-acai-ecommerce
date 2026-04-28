import { useState } from 'react'
import './App.css'
import Menu from './components/Menu'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const openCart = () => setShowCart(true)
  const closeMenu = () => setMenuOpen(false)

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
            <li className="animate-item" style={{animationDelay: '0.3s'}}><a href="/" onClick={closeMenu}>Início</a></li>
            <li className="animate-item" style={{animationDelay: '0.4s'}}><a href="/quem-somos" onClick={closeMenu}>Quem Somos</a></li>
            <li className="animate-item" style={{animationDelay: '0.5s'}}><a href="/produtos" onClick={closeMenu}>Produtos</a></li>
            <li className="has-submenu animate-item" style={{animationDelay: '0.6s'}}>
              <a href="/food-service" onClick={closeMenu}>Food Service</a>
              <ul className="submenu">
                <li><a href="/food-service/" onClick={closeMenu}>Food Service</a></li>
                <li><a href="/revendedor" onClick={closeMenu}>Seja um revendedor</a></li>
              </ul>
            </li>
            <li className="animate-item" style={{animationDelay: '0.7s'}}><a href="/fale-conosco" onClick={closeMenu}>Fale Conosco</a></li>
          </ul>
          
          <button 
            className="cart-icon-btn animate-item" 
            style={{animationDelay: '0.9s'}}
            onClick={openCart}
            aria-label="Carrinho"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
        </div>
      </nav>
      
      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text animate-item" style={{animationDelay: '0.2s'}}>
              <h1 className="animate-item" style={{animationDelay: '0.4s'}}> PARA QUEM GOSTA E QUER AÇAÍ DE VERDADE</h1>
              <p className="animate-item" style={{animationDelay: '0.6s'}}>Experimente você também e venha sentir o verdadeiro sabor da Amazônia.</p>
            </div>
            <div className="hero-image animate-item" style={{animationDelay: '0.8s'}}>
              <img src="/imagem1.png" alt="Açaí" />
            </div>
          </div>
        </section>

        <Menu cart={cart} setCart={setCart} showCart={showCart} setShowCart={setShowCart} />
      </main>
    </>
  )
}

export default App
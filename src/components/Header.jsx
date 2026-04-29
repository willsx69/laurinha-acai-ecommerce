import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { getCartCount } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo animate-item" style={{animationDelay: '0.2s'}}>
          <img src="/logo_açai.png" alt="Logo Açaí São" />
        </Link>
        
        <div className="navbar-actions">
          <Link to="/carrinho" className="cart-icon-btn animate-item" style={{animationDelay: '0.9s'}} aria-label="Carrinho">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
          </Link>
          
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
        </div>
        
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <div className="menu-close-btn">
            <button onClick={() => setMenuOpen(false)} aria-label="Fechar menu">×</button>
          </div>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Início</Link></li>
          <li><Link to="/produtos" onClick={() => setMenuOpen(false)}>Cardápio</Link></li>
          <li><Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link></li>
        </ul>
      </div>
    </nav>
  )
}
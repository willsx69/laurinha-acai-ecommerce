import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartDropdown.css'

export default function CartDropdown({ isOpen, onClose }) {
  const { 
    cart, 
    removerItem, 
    getTotalCarrinho, 
    getTaxaEntrega
  } = useCart()

  const handleCheckout = () => {
    const taxa = getTaxaEntrega()
    let message = `*Olá, vim pelo site e quero pedir:*\n\n`
    
    cart.forEach((item, index) => {
      const qtd = item.quantidade || 1
      message += `*Item ${index + 1}:* ${item.product?.name || 'Produto'} x${qtd}\n`
      if (item.selections?.açai?.name) {
        message += `*Açaí Mix:* ${item.selections.açai.name}\n`
      }
      if (item.selections?.calda?.name) {
        message += `*Calda:* ${item.selections.calda.name}\n`
      }
      if (item.selections?.acompanhamento?.length > 0) {
        message += `*Acompanhamentos:* ${item.selections.acompanhamento.map(a => a.name).join(', ')}\n`
      }
      if (item.selections?.delivery?.name) {
        message += `*Entrega:* ${item.selections.delivery.name}\n`
      }
      if (item.observation) {
        message += `*Observação:* ${item.observation}\n`
      }
      message += `\n`
    })
    
    message += `*Taxa de Entrega:* R$ ${taxa.toFixed(2)}\n\n`
    message += `*TOTAL DO PEDIDO:* R$ ${(getTotalCarrinho() + taxa).toFixed(2)}`
    
    window.open(`https://wa.me/5592996214595?text=${encodeURIComponent(message)}`, '_self')
  }

  if (!isOpen) return null

  return (
    <div className="cart-dropdown-overlay" onClick={onClose}>
      <div className="cart-dropdown" onClick={e => e.stopPropagation()}>
        <div className="cart-dropdown-header">
          <h3>Seu Carrinho</h3>
          <button className="cart-dropdown-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6"/>
            </svg>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-dropdown-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <p>Seu carrinho está vazio</p>
            <Link to="/produtos" className="btn-browse" onClick={onClose}>
              Ver Cardápio
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-dropdown-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item-mini">
                  <div className="cart-item-info">
                    <span className="item-name">{item.produto?.name || item.product?.name || 'Produto'}</span>
                    <span className="item-details">
                      {item.selections?.calda?.name && `• ${item.selections.calda.name}`}
                    </span>
                  </div>
                  <div className="cart-item-actions">
                    <span className="item-qty">x{item.quantidade || 1}</span>
                    <span className="item-price">R$ {(item.total || 0).toFixed(2)}</span>
                    <button 
                      className="item-remove" 
                      onClick={() => removerItem(item.id)}
                      aria-label="Remover"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 6l12 12M6 18L18 6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-dropdown-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span>R$ {getTotalCarrinho().toFixed(2)}</span>
              </div>
              {getTaxaEntrega() > 0 && (
                <div className="cart-delivery">
                  <span>Entrega</span>
                  <span>R$ {getTaxaEntrega().toFixed(2)}</span>
                </div>
              )}
              <div className="cart-total">
                <span>Total</span>
                <span>R$ {(getTotalCarrinho() + getTaxaEntrega()).toFixed(2)}</span>
              </div>
              
              <button className="btn-checkout-whatsapp" onClick={handleCheckout}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Finalizar Pedido
              </button>
              
              <Link to="/carrinho" className="btn-view-cart" onClick={onClose}>
                Ver Carrinho Completo
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
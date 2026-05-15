import { useCart } from '../context/CartContext'
import './Carrinho.css'

export default function Carrinho() {
  const { 
    cart, 
    removerItem, 
    limparCarrinho, 
    getTotalCarrinho, 
    getTaxaEntrega
  } = useCart()

  const handleCheckout = () => {
    let message = `*Olá, vim pelo site e quero pedir:*%0A%0A`
    
    cart.forEach((item, index) => {
      const qtd = item.quantidade || 1
      message += `*Item ${index + 1}:* ${item.product?.name || 'Produto'} x${qtd}%0A`
      if (item.selections?.açai?.name) {
        message += `*Açaí Mix:* ${item.selections.açai.name}%0A`
      }
      if (item.selections?.calda?.name) {
        message += `*Calda:* ${item.selections.calda.name}%0A`
      }
      if (item.selections?.acompanhamento?.length > 0) {
        message += `*Acompanhamentos:* ${item.selections.acompanhamento.map(a => a.name).join(', ')}%0A`
      }
      if (item.selections?.delivery?.name) {
        message += `*Entrega:* ${item.selections.delivery.name}%0A`
      }
      if (item.observation) {
        message += `*Observação:* ${item.observation}%0A`
      }
      message += `%0A`
    })
    
    const taxa = getTaxaEntrega()
    message += `*Taxa de Entrega:* R$ ${taxa.toFixed(2)}%0A`
    message += `%0A*TOTAL DO PEDIDO:* R$ ${getTotalCarrinho().toFixed(2)}`
    
    const whatsappLink = `https://wa.me/5592996214595?text=${message}`
    window.open(whatsappLink, '_self')
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Seu Carrinho</h1>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Seu carrinho está vazio</p>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-header">
                    <span className="cart-item-name">
                      {item.product?.name || 'Produto'} x{item.quantidade || 1}
                    </span>
                    <button 
                      className="cart-item-remove" 
                      onClick={() => removerItem(item.id)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="cart-item-details">
                    {item.selections?.açai?.name && (
                      <p><strong>Açaí Mix:</strong> {item.selections.açai.name}</p>
                    )}
                    {item.selections?.calda?.name && (
                      <p><strong>Calda:</strong> {item.selections.calda.name}</p>
                    )}
                    {item.selections?.acompanhamento?.length > 0 && (
                      <p><strong>Acompanhamentos:</strong> {item.selections.acompanhamento.map(a => a.name).join(', ')}</p>
                    )}
                    {item.observation && (
                      <p><strong>Obs:</strong> {item.observation}</p>
                    )}
                  </div>
                  
                  <div className="cart-item-price">R$ {(item.total || 0).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="cart-row">
              <span>Taxa de Entrega:</span>
              <span>R$ {getTaxaEntrega().toFixed(2)}</span>
            </div>

            <div className="cart-row total">
              <span>Total do pedido:</span>
              <span>R$ {getTotalCarrinho().toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Finalizar Pedido no WhatsApp
            </button>

            <button className="clear-cart-btn" onClick={limparCarrinho}>
              Limpar Tudo
            </button>
          </>
        )}
      </div>
    </div>
  )
}
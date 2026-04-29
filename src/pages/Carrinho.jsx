import { useCart } from '../context/CartContext'
import './Carrinho.css'

export default function Carrinho() {
  const { cart, removeFromCart, getCartTotal, getCartDeliveryFee } = useCart()

  const handleCheckout = () => {
    let message = `Olá, vim pelo site e quero pedir:%0A%0A`
    
    cart.forEach((item, index) => {
      message += `*Item ${index + 1}:* ${item.product.name} x${item.quantity}%0A`
      message += `*Açaí Mix:* ${item.selections.açai.name}%0A`
      message += `*Calda:* ${item.selections.calda.name}%0A`
      if (item.selections.acompanhamento.length > 0) {
        message += `*Acompanhamentos:* ${item.selections.acompanhamento.map(a => a.name).join(', ')}%0A`
      }
      if (item.observation) {
        message += `*Observação:* ${item.observation}%0A`
      }
      message += `%0A`
    })
    
    if (cart[0]?.selections.delivery) {
      const uniqueDeliveries = [...new Set(cart.map(item => item.selections.delivery?.name).filter(Boolean))]
      
      if (uniqueDeliveries.length > 1) {
        message += `*Atenção:* Entregas para bairros diferentes (%0A`
        uniqueDeliveries.forEach((bairro) => {
          const fee = cart.find(item => item.selections.delivery?.name === bairro)?.selections.delivery?.price || 0
          message += `- ${bairro}: R$ ${fee.toFixed(2)}%0A`
        })
        message += `)taxa total: R$ ${getCartDeliveryFee().toFixed(2)}%0A`
      } else {
        message += `*Entrega:* ${cart[0].selections.delivery.name}%0A`
        message += `*Taxa de Entrega:* R$ ${getCartDeliveryFee().toFixed(2)}%0A`
      }
    }
    
    message += `%0A*Total do pedido:* R$ ${getCartTotal().toFixed(2)}`
    
    const whatsappLink = `https://wa.me/559286320127?text=${message}`
    window.open(whatsappLink, '_blank')
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
                    <span className="cart-item-name">{item.product.name} x{item.quantity}</span>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>×</button>
                  </div>
                  <div className="cart-item-details">
                    <p><strong>Açaí Mix:</strong> {item.selections.açai.name}</p>
                    <p><strong>Calda:</strong> {item.selections.calda.name}</p>
                    {item.selections.acompanhamento.length > 0 && (
                      <p><strong>Acompanhamentos:</strong> {item.selections.acompanhamento.map(a => a.name).join(', ')}</p>
                    )}
                    {item.observation && (
                      <p><strong>Obs:</strong> {item.observation}</p>
                    )}
                  </div>
                  <div className="cart-item-price">R$ {item.total.toFixed(2)}</div>
                </div>
              ))}
            </div>

            {cart.some(item => item.selections.delivery) && (
              <div className="cart-row">
                <span>Taxa de Entrega:</span>
                <span>R$ {getCartDeliveryFee().toFixed(2)}</span>
              </div>
            )}

            <div className="cart-row total">
              <span>Total do pedido:</span>
              <span>R$ {getCartTotal().toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Finalizar Pedido no WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  )
}
import { useState } from 'react'
import './Menu.css'

const products = [
  { id: 1, name: '300ml', price: 12 },
]

const caldaOptions = [
  { id: 1, name: 'Sem calda', price: 0 },
  { id: 2, name: 'Leite condensado', price: 0 },
]

const acompanhamentoOptions = [
  { id: 5, name: 'Gotas de chocolate', price: 0, isNew: true },
  { id: 1, name: 'Amendoim em banda', price: 0 },
  { id: 2, name: 'Amendoim granulado', price: 0 },
  { id: 3, name: 'Flocos de arroz', price: 0 },
  { id: 4, name: 'Disquete', price: 0 },
]

const deliveryAreas = [
  { id: 1, name: 'Areal', price: 3 },
  { id: 2, name: 'Santa Luzia', price: 7 },
  { id: 3, name: 'Nova Aliança', price: 6 },
  { id: 4, name: 'Jatuarana', price: 7 },
  { id: 5, name: 'Cobra', price: 3 },
]

export default function Menu({ cart, setCart, showCart, setShowCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selections, setSelections] = useState({
    açai: '',
    calda: '',
    acompanhamento: [],
    delivery: null,
  })
  const [observation, setObservation] = useState('')

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setSelections({ açai: { id: 1, name: 'Só açaí', price: 0 }, calda: '', acompanhamento: [], delivery: null })
    setObservation('')
  }

  const handleDeliverySelect = (option) => {
    setSelections(prev => ({ ...prev, delivery: option }))
  }

  const handleCaldaSelect = (option) => {
    setSelections(prev => ({ ...prev, calda: option }))
  }

  const handleAcompanhamentoSelect = (option) => {
    setSelections(prev => {
      const current = prev.acompanhamento
      const exists = current.find(o => o.id === option.id)
      
      if (exists) {
        return { ...prev, acompanhamento: current.filter(o => o.id !== option.id) }
      }
      
      if (current.length >= 2) return prev
      
      return { ...prev, acompanhamento: [...current, option] }
    })
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setQuantity(1)
    setSelections({ açai: '', calda: '', acompanhamento: [], delivery: null })
    setObservation('')
  }

  const getSubtotal = () => {
    if (!selectedProduct) return 0
    return selectedProduct.price * quantity
  }

  const getDeliveryFee = () => {
    return selections.delivery ? selections.delivery.price : 0
  }

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee()
  }

  const handleAddToCart = () => {
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2)
    const item = {
      id: uniqueId,
      product: selectedProduct,
      quantidade: quantity,
      selections: { ...selections },
      observation,
      subtotal: getSubtotal(),
      deliveryFee: getDeliveryFee(),
      total: getSubtotal()
    }
    setCart(prev => [...prev, item])
    closeModal()
  }

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId))
  }

  const getCartTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0)
    const deliveryFee = getCartDeliveryFee()
    return subtotal + deliveryFee
  }

  const getCartDeliveryFee = () => {
    const fees = cart.map(item => item.selections.delivery?.price).filter(p => p !== undefined && p !== null)
    const uniqueFees = [...new Set(fees)]
    
    if (fees.length === 0) return 0
    
    if (uniqueFees.length === 1) {
      return uniqueFees[0]
    }
    
    return fees.reduce((sum, fee) => sum + fee, 0)
  }

  const handleCheckout = () => {
    let message = `Olá, vim pelo site e quero pedir:%0A%0A`
    
    cart.forEach((item, index) => {
      message += `*Item ${index + 1}:* ${item.product.name} x${item.quantidade}%0A`
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
        cart.forEach((item) => {
          const bairro = item.selections.delivery?.name
          const fee = item.selections.delivery?.price || 0
          message += `- ${bairro}: R$ ${fee.toFixed(2)}%0A`
        })
        message += `)taxa total: R$ ${getCartDeliveryFee().toFixed(2)}%0A`
      } else {
        message += `*Entrega:* ${cart[0].selections.delivery.name}%0A`
        message += `*Taxa de Entrega:* R$ ${getCartDeliveryFee().toFixed(2)}%0A`
      }
    }
    
    message += `%0A*Total do pedido:* R$ ${getCartTotal().toFixed(2)}`
    
    const whatsappLink = `https://wa.me/5592996214595?text=${message}`
    window.open(whatsappLink, '_self')
  }

  const canAdd = selections.calda && selections.delivery

  return (
    <>
      <section className="menu-section" id="copos-acai">
        <h2 className="menu-title">Copos de Açaí</h2>
        <div className="menu-grid">
          {products.map(product => (
            <div 
              key={product.id} 
              className="menu-item animate-item"
              onClick={() => handleProductSelect(product)}
            >
              <div className="menu-item-icon">
                <img src="/icon_açai.png" alt="Açaí" />
              </div>
              <div className="menu-item-info">
                <h3>{product.name}</h3>
                <p className="menu-item-price">R$ {product.price},00</p>
              </div>
              <button className="menu-item-btn">Personalizar</button>
            </div>
          ))}
        </div>
      </section>

      {cart.length > 0 && (
        <div className="cart-bar" onClick={() => setShowCart(true)}>
          <div className="cart-info">
            <span className="cart-count">{cart.reduce((sum, item) => sum + item.quantidade, 0)} copos</span>
            <span className="cart-total">Ver carrinho • R$ {getCartTotal().toFixed(2)}</span>
          </div>
          <button className="cart-btn">Fechar Pedido</button>
        </div>
      )}

      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="modal-content cart-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCart(false)}>×</button>
            
            <h2 className="modal-title">Seu Pedido</h2>
            
            {cart.length === 0 ? (
              <p className="empty-cart">Seu carrinho está vazio</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-header">
                        <span className="cart-item-product">{item.product.name} x{item.quantidade}</span>
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
                  <div className="cart-total-row">
                    <span>Taxa de Entrega:</span>
                    <span className="cart-subtotal-value">R$ {getCartDeliveryFee().toFixed(2)}</span>
                  </div>
                )}

                <div className="cart-total-row">
                  <span>Total do pedido:</span>
                  <span className="cart-total-value">R$ {getCartTotal().toFixed(2)}</span>
                </div>

                <button className="add-btn checkout-btn" onClick={handleCheckout}>
                  Finalizar Pedido no WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <h2 className="modal-title">{selectedProduct.name}</h2>
            <p className="modal-subtitle">Personalize seu açaí</p>

            <div className="modal-section">
              <h3 className="modal-section-title">Quantidade</h3>
              <div className="quantity-selector">
                <button 
                  className="quantity-btn" 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  className="quantity-btn" 
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title">
                Açaí Mix <span className="required">* Escolha 1</span>
              </h3>
              <div className="option-grid">
                <div 
                  className={`option-card ${selections.açai.name === 'Só açaí' ? 'selected' : ''}`}
                >
                  <span className="option-name">Só açaí</span>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title">
                Calda <span className="required">* Escolha 1</span>
              </h3>
              <div className="option-grid">
                {caldaOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`option-card ${selections.calda.id === option.id ? 'selected' : ''}`}
                    onClick={() => handleCaldaSelect(option)}
                  >
                    <span className="option-name">{option.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title">
                Acompanhamento <span className="optional">Opcional - até 2</span>
              </h3>
              <div className="option-grid">
                {acompanhamentoOptions.map(option => {
                  const isSelected = selections.acompanhamento.some(a => a.id === option.id)
                  const isDisabled = !isSelected && selections.acompanhamento.length >= 2
                  
                  return (
                    <div 
                      key={option.id}
                      className={`option-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                      onClick={() => !isDisabled && handleAcompanhamentoSelect(option)}
                    >
                      <span className="option-name">{option.name}</span>
                      {option.isNew && <span className="novidade-badge">novidade</span>}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title">
                Taxa de Entrega <span className="required">* Escolha 1</span>
              </h3>
              <div className="option-grid">
                {deliveryAreas.map(option => (
                  <div 
                    key={option.id}
                    className={`option-card ${selections.delivery?.id === option.id ? 'selected' : ''}`}
                    onClick={() => handleDeliverySelect(option)}
                  >
                    <span className="option-name">{option.name}</span>
                    <span className="option-price">R$ {option.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title">Observação</h3>
              <textarea 
                className="observation-input"
                placeholder="Alguma observação?"
                value={observation}
                onChange={e => setObservation(e.target.value)}
                maxLength={200}
              />
            </div>

            <div className="modal-footer">
              <div className="total-price">
                <span>Total:</span>
                <span className="price-value">R$ {getTotal().toFixed(2)}</span>
              </div>
              <button 
                className="add-btn" 
                onClick={handleAddToCart}
                disabled={!canAdd}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
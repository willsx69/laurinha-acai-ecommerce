import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './Produtos.css'

const products = [
  { id: 1, name: '300ml', price: 12 },
]

const caldaOptions = [
  { id: 1, name: 'Sem calda', price: 0 },
  { id: 2, name: 'Leite condensado', price: 0 },
]

const acompanhamentoOptions = [
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

export default function Produtos() {
  const { cart, setCart, showCart, setShowCart, nextId, setNextId } = useCart()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantidade, setQuantidade] = useState(1)
  const [selections, setSelections] = useState({
    açai: '',
    calda: '',
    acompanhamento: [],
    delivery: null,
  })
  const [observation, setObservation] = useState('')

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    setQuantidade(1)
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
    setQuantidade(1)
    setSelections({ açai: '', calda: '', acompanhamento: [], delivery: null })
    setObservation('')
  }

  const getSubtotal = () => {
    if (!selectedProduct) return 0
    return selectedProduct.price * quantidade
  }

  const getDeliveryFee = () => {
    return selections.delivery ? selections.delivery.price : 0
  }

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee()
  }

  const handleAddToCart = () => {
    const item = {
      id: nextId,
      product: selectedProduct,
      quantidade: quantidade,
      selections: { ...selections },
      observation,
      subtotal: getSubtotal(),
      deliveryFee: getDeliveryFee(),
      total: getSubtotal()
    }
    setCart(prev => [...prev, item])
    setNextId(prev => prev + 1)
    closeModal()
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

  const canAdd = selections.calda && selections.delivery

  return (
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

      {cart.length > 0 && !showCart && (
        <div className="cart-bar" onClick={() => setShowCart(true)}>
          <div className="cart-info">
            <span className="cart-count">{cart.reduce((sum, item) => sum + item.quantidade, 0)} copos</span>
            <span className="cart-total">Ver carrinho • R$ {getCartTotal().toFixed(2)}</span>
          </div>
          <button className="cart-btn">Fechar Pedido</button>
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
                  onClick={() => setQuantidade(prev => Math.max(1, prev - 1))}
                  disabled={quantidade <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{quantidade}</span>
                <button 
                  className="quantity-btn" 
                  onClick={() => setQuantidade(prev => prev + 1)}
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
                <div className={`option-card ${selections.açai.name === 'Só açaí' ? 'selected' : ''}`}>
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
    </section>
  )
}
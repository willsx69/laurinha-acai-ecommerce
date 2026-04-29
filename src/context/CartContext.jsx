import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, id: Date.now() }])
  }

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0)
  }

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
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

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      showCart,
      setShowCart,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount,
      getCartDeliveryFee
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
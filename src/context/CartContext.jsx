import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()
const STORAGE_KEY = 'acai_cart'

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [notification, setNotification] = useState(null)
  const [nextId, setNextId] = useState(1)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      const savedNextId = localStorage.getItem('acai_next_id')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setCart(parsed)
          const maxId = parsed.reduce((max, item) => item.id > max ? item.id : max, 0)
          setNextId(maxId + 1)
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
      if (savedNextId) {
        setNextId(parseInt(savedNextId, 10) || 1)
      }
    } catch (e) {
      console.error('Erro ao carregar carrinho:', e)
      localStorage.removeItem(STORAGE_KEY)
    }
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
      localStorage.setItem('acai_next_id', nextId.toString())
    }
  }, [cart, nextId, initialized])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const adicionarItem = (produto) => {
    const novoItem = {
      id: nextId,
      produto,
      quantidade: 1,
      preco: produto.price || 0,
      total: produto.price || 0
    }
    setCart(prev => [...prev, novoItem])
    setNextId(prev => prev + 1)
    showNotification(`${produto.name} adicionado ao carrinho!`)
  }

  const removerItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
    showNotification('Item removido do carrinho')
  }

  const limparCarrinho = () => {
    setCart([])
    localStorage.removeItem(STORAGE_KEY)
    showNotification('Carrinho limpo!')
  }

  const aumentarQuantidade = (id) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const novaQtd = (item.quantidade || 1) + 1
        const precoUnitario = item.total / (item.quantidade || 1)
        return { ...item, quantidade: novaQtd, total: precoUnitario * novaQtd }
      }
      return item
    }))
  }

  const diminuiQuantidade = (id) => {
    setCart(prev => {
      const item = prev.find(item => item.id === id)
      if (item && item.quantidade <= 1) {
        return prev.filter(i => i.id !== id)
      }
      return prev.map(item => {
        if (item.id === id) {
          const novaQtd = item.quantidade - 1
          const precoUnitario = item.total / item.quantidade
          return { ...item, quantidade: novaQtd, total: precoUnitario * novaQtd }
        }
        return item
      })
    })
  }

  const getTotalCarrinho = () => cart.reduce((sum, item) => sum + (item.total || 0), 0)

  const getQuantidadeItens = () => cart.reduce((sum, item) => sum + (item.quantidade || 1), 0)

  const getTaxaEntrega = () => {
    if (cart.length === 0) return 0
    return cart[0]?.selections?.delivery?.price || 0
  }

  return (
    <CartContext.Provider value={{
      cart, setCart, showCart, setShowCart,
      adicionarItem, removerItem, limparCarrinho,
      aumentarQuantidade, diminuiQuantidade,
      getTotalCarrinho, getQuantidadeItens, getTaxaEntrega,
      nextId, setNextId,
      notification
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
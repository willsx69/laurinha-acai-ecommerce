import { useCart } from '../context/CartContext'
import './Toast.css'

export default function Toast() {
  const { notification } = useCart()

  if (!notification) return null

  return (
    <div className={`toast ${notification.type}`}>
      <div className="toast-icon">
        {notification.type === 'success' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        )}
      </div>
      <span className="toast-message">{notification.message}</span>
    </div>
  )
}
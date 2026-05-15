export const WHATSAPP_NUMBER = '5592996214595'

export const openWhatsApp = (message = 'Olá, gostaria de pedir um açaí') => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_self')
}

export const formatWhatsAppMessage = (cart, total, deliveryFee = 0) => {
  let message = `Olá, vim pelo site e quero pedir:\n\n`
  
  cart.forEach((item, index) => {
    const qtd = item.quantidade || 1
    message += `Item ${index + 1}: ${item.product?.name || 'Produto'} x${qtd}\n`
    if (item.selections?.açai?.name) {
      message += `Açaí Mix: ${item.selections.açai.name}\n`
    }
    if (item.selections?.calda?.name) {
      message += `Calda: ${item.selections.calda.name}\n`
    }
    if (item.selections?.acompanhamento?.length > 0) {
      message += `Acompanhamentos: ${item.selections.acompanhamento.map(a => a.name).join(', ')}\n`
    }
    if (item.selections?.delivery?.name) {
      message += `Entrega: ${item.selections.delivery.name}\n`
    }
    if (item.observation) {
      message += `Observação: ${item.observation}\n`
    }
    message += `\n`
  })
  
  const taxa = deliveryFee || cart[0]?.selections?.delivery?.price || 0
  message += `Taxa de Entrega: R$ ${taxa.toFixed(2)}\n\n`
  message += `Total do pedido: R$ ${total.toFixed(2)}`
  
  return message
}
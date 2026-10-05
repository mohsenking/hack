import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const Ctx = createContext(null)
const load = (k) => {
  try { return JSON.parse(localStorage.getItem(k)) || [] } catch { return [] }
}

export function StoreProvider({ children }) {
  const [favs, setFavs] = useState(() => load('tz-favs'))
  const [cart, setCart] = useState(() => load('tz-cart'))
  const [cartOpen, setCartOpen] = useState(false)
  useEffect(() => localStorage.setItem('tz-favs', JSON.stringify(favs)), [favs])
  useEffect(() => localStorage.setItem('tz-cart', JSON.stringify(cart)), [cart])

  const toggleFav = useCallback((id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])), [])
  const addToCart = useCallback((id) => {
    setCart((c) => (c.find((i) => i.id === id) ? c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) : [...c, { id, qty: 1 }]))
    setCartOpen(true)
  }, [])
  const setQty = (id, qty) => setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))))

  return (
    <Ctx.Provider value={{ favs, toggleFav, cart, addToCart, setQty, cartOpen, setCartOpen, cartCount: cart.reduce((s, i) => s + i.qty, 0) }}>
      {children}
    </Ctx.Provider>
  )
}
export const useStore = () => useContext(Ctx)

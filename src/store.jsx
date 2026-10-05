import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { currencies, products } from './data.js'

const Ctx = createContext(null)
export const useStore = () => useContext(Ctx)

function usePersisted(key, initial) {
  const [v, setV] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial }
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(v)) }, [key, v])
  return [v, setV]
}

export function StoreProvider({ children }) {
  const [cart, setCart] = usePersisted('tz-cart', [])
  const [wishlist, setWishlist] = usePersisted('tz-wish', [])
  const [currency, setCurrency] = usePersisted('tz-cur', 'USD')
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const addToCart = useCallback((id) => {
    setCart((c) => c.some((i) => i.id === id) ? c.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i) : [...c, { id, qty: 1 }])
    setCartOpen(true)
  }, [setCart])
  const setQty = (id, qty) => setCart((c) => qty < 1 ? c.filter((i) => i.id !== id) : c.map((i) => i.id === id ? { ...i, qty } : i))
  const toggleWish = (id) => setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id])
  const cur = currencies.find((c) => c.code === currency) || currencies[0]
  const money = (usd) => cur.symbol + Math.round(usd * cur.rate).toLocaleString('en-US')
  const count = cart.reduce((n, i) => n + i.qty, 0)
  const total = cart.reduce((n, i) => n + i.qty * (products.find((p) => p.id === i.id)?.price || 0), 0)

  return (
    <Ctx.Provider value={{ cart, addToCart, setQty, wishlist, toggleWish, currency, setCurrency, money, count, total, cartOpen, setCartOpen, searchOpen, setSearchOpen }}>
      {children}
    </Ctx.Provider>
  )
}

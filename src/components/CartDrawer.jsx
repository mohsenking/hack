import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { products } from '../data.js'
import { useStore } from '../store.jsx'

export default function CartDrawer() {
  const { cart, setQty, cartOpen, setCartOpen, money, total } = useStore()
  useEffect(() => {
    if (!cartOpen) return
    const k = (e) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [cartOpen, setCartOpen])
  return (
    <>
      <div className={'scrim' + (cartOpen ? ' is-open' : '')} onClick={() => setCartOpen(false)} />
      <aside className={'drawer' + (cartOpen ? ' is-open' : '')} role="dialog" aria-label="Shopping cart" aria-hidden={!cartOpen}>
        <div className="drawer__head">
          <h2>YOUR CART</h2>
          <button className="icon-btn" aria-label="Close cart" onClick={() => setCartOpen(false)} tabIndex={cartOpen ? 0 : -1}><Icon name="close" /></button>
        </div>
        <ul className="drawer__items">
          {cart.length === 0 && <li className="muted">Your cart is empty.</li>}
          {cart.map((i) => {
            const p = products.find((x) => x.id === i.id)
            return (
              <li key={i.id} className="cart-row">
                <img src={p.image} alt={p.name} />
                <div>
                  <strong>{p.name}</strong>
                  <span>{money(p.price)}</span>
                  <div className="qty">
                    <button aria-label="Decrease quantity" onClick={() => setQty(i.id, i.qty - 1)} tabIndex={cartOpen ? 0 : -1}>−</button>
                    <span>{i.qty}</span>
                    <button aria-label="Increase quantity" onClick={() => setQty(i.id, i.qty + 1)} tabIndex={cartOpen ? 0 : -1}>+</button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="drawer__foot">
          <p><span>Subtotal</span><strong>{money(total)}</strong></p>
          <Link to="/checkout" className="btn btn--block" onClick={() => setCartOpen(false)} tabIndex={cartOpen ? 0 : -1}>CHECKOUT</Link>
        </div>
      </aside>
    </>
  )
}

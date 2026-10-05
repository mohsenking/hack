import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Icon, Button } from './ui'
import WatchArt from './WatchArt'
import { useStore } from '../store'
import { products, getProduct, money } from '../data/products'

const nav = [
  ['/', 'Home'],
  ['/shop', 'Collections'],
  ['/shop?collection=men', 'Men'],
  ['/shop?collection=women', 'Women'],
  ['/#story', 'About'],
  ['/contact', 'Journal & Contact'],
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const { cartCount, setCartOpen, favs } = useStore()
  const loc = useLocation()
  const navigate = useNavigate()
  useEffect(() => { setOpen(false); setSearching(false) }, [loc])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const isActive = (to) => (to === '/' ? loc.pathname === '/' && !loc.hash : to.includes('?') || to.includes('#') ? loc.pathname + loc.search + loc.hash === to : loc.pathname === to && !loc.search)

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="topbar">
        <div className="wrap topbar-in">
          <span><Icon name="truck" size={14} /> Free Worldwide Shipping</span>
          <span><Icon name="shield" size={14} /> 100% Authentic Products</span>
          <span><Icon name="clock" size={14} /> Easy 30-Day Returns</span>
          <span><Icon name="gem" size={14} /> 2-Year International Warranty</span>
        </div>
      </div>
      <div className="wrap navbar">
        <Link to="/" className="logo" aria-label="TIMEZONE home">
          <span>TIMEZONE</span><small>A HIGHER STANDARD</small>
        </Link>
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Primary">
          {nav.map(([to, label]) => (
            <Link key={to} to={to} className={isActive(to) ? 'active' : ''}>{label}</Link>
          ))}
          <a href="tel:+15552467890" className="nav-phone"><Icon name="phone" size={15} /> (555) 246-7890</a>
        </nav>
        <div className="nav-icons">
          <button aria-label="Search" onClick={() => setSearching((s) => !s)}><Icon name="search" /></button>
          <Link to="/shop?favs=1" aria-label="Favorites" className="has-badge"><Icon name="heart" />{favs.length > 0 && <b>{favs.length}</b>}</Link>
          <button aria-label="Open bag" className="has-badge" onClick={() => setCartOpen(true)}><Icon name="bag" />{cartCount > 0 && <b>{cartCount}</b>}</button>
          <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}><Icon name={open ? 'close' : 'menu'} /></button>
        </div>
      </div>
      {searching && (
        <form className="searchbar" onSubmit={(e) => { e.preventDefault(); navigate(`/shop?q=${encodeURIComponent(e.target.q.value)}`) }}>
          <div className="wrap"><input name="q" autoFocus placeholder="Search watches, collections, materials…" aria-label="Search" /></div>
        </form>
      )}
    </header>
  )
}

function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty } = useStore()
  const total = cart.reduce((s, i) => s + getProduct(i.id).price * i.qty, 0)
  return (
    <>
      <div className={`scrim ${cartOpen ? 'on' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`drawer ${cartOpen ? 'on' : ''}`} aria-label="Shopping bag" aria-hidden={!cartOpen}>
        <div className="drawer-head"><h3>Your bag</h3><button onClick={() => setCartOpen(false)} aria-label="Close bag"><Icon name="close" /></button></div>
        <div className="drawer-body">
          {cart.length === 0 && <p className="muted">Your bag is empty. <Link to="/shop" onClick={() => setCartOpen(false)}>Explore collections</Link></p>}
          {cart.map((i) => {
            const p = getProduct(i.id)
            return (
              <div className="line" key={i.id}>
                <div className="line-img"><WatchArt dial={p.dial} metal={p.metal} strap={p.strap} smart={p.smart} skeleton={p.skeleton} title={p.name} /></div>
                <div>
                  <strong>{p.name}</strong>
                  <p className="muted">{money(p.price)}</p>
                  <div className="qty">
                    <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease">−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase">+</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="total"><span>Subtotal</span><strong>{money(total)}</strong></div>
            <Button to="/contact?subject=Order" onClick={() => setCartOpen(false)}>Request secure checkout</Button>
          </div>
        )}
      </aside>
    </>
  )
}

function Footer() {
  const [ok, setOk] = useState(false)
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <div className="logo light"><span>TIMEZONE</span><small>A HIGHER STANDARD</small></div>
          <p>Fine timepieces for those who value precision, design and heritage. Crafted for generations.</p>
          <div className="social">
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer"><Icon name="ig" /></a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer"><Icon name="fb" /></a>
            <a href="https://x.com" aria-label="X" target="_blank" rel="noreferrer"><Icon name="x" /></a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/shop">All collections</Link>
          <Link to="/shop?collection=men">Men</Link>
          <Link to="/shop?collection=women">Women</Link>
          <Link to="/shop?collection=smart">Smart</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="tel:+15552467890">(555) 246-7890</a>
          <a href="mailto:concierge@timezone.com">concierge@timezone.com</a>
          <span>12 Rue du Rhône, 1204 Geneva</span>
        </div>
        <div>
          <h4>Newsletter</h4>
          {ok ? <p role="status">Welcome to TIMEZONE — thank you.</p> : (
            <form className="news" onSubmit={(e) => { e.preventDefault(); setOk(true) }}>
              <input type="email" required placeholder="Your email" aria-label="Email" />
              <button aria-label="Subscribe"><Icon name="arrow" /></button>
            </form>
          )}
        </div>
      </div>
      <div className="wrap copy">© {new Date().getFullYear()} TIMEZONE. All rights reserved.</div>
    </footer>
  )
}

export default function Layout() {
  const loc = useLocation()
  useEffect(() => {
    if (loc.hash) setTimeout(() => document.querySelector(loc.hash)?.scrollIntoView({ behavior: 'smooth' }), 60)
    else window.scrollTo(0, 0)
  }, [loc.pathname, loc.hash])
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <CartDrawer />
    </>
  )
}

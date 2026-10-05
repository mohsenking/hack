import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { nav, currencies } from '../data.js'
import { useStore } from '../store.jsx'

export default function Header() {
  const { count, wishlist, setCartOpen, setSearchOpen, currency, setCurrency } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [curOpen, setCurOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={'header' + (scrolled ? ' header--scrolled' : '')}>
      <div className="header__inner container-wide">
        <button className="icon-btn header__burger" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <Icon name={menu ? 'close' : 'menu'} />
        </button>
        <Link to="/" className="logo" aria-label="TIMEZONE — A Higher Standard">
          <span className="logo__name">TIMEZONE</span>
          <span className="logo__sub">A HIGHER STANDARD</span>
        </Link>
        <nav className={'nav' + (menu ? ' nav--open' : '')} aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.label} to={n.to} end={n.to === '/'} className="nav__link" onClick={() => setMenu(false)}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="header__actions">
          <div className="currency">
            <button className="currency__btn" aria-haspopup="listbox" aria-expanded={curOpen} onClick={() => setCurOpen(!curOpen)}>
              {currency} <Icon name="chevron" size={10} />
            </button>
            {curOpen && (
              <ul className="currency__menu" role="listbox" aria-label="Currency">
                {currencies.map((c) => (
                  <li key={c.code} role="option" aria-selected={c.code === currency}>
                    <button onClick={() => { setCurrency(c.code); setCurOpen(false) }}>{c.code} ({c.symbol})</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}><Icon name="search" /></button>
          <button className="icon-btn" aria-label="Account" onClick={() => navigate('/account')}><Icon name="user" /></button>
          <button className="icon-btn icon-btn--wish" aria-label={`Wishlist (${wishlist.length})`} onClick={() => navigate('/wishlist')}>
            <Icon name="heart" />
          </button>
          <button className="icon-btn icon-btn--cart" aria-label={`Cart, ${count} items`} onClick={() => setCartOpen(true)}>
            <Icon name="bag" />
            <span className="badge">{count}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

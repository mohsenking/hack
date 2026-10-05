import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { products } from '../data.js'
import { useStore } from '../store.jsx'

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, money } = useStore()
  const [q, setQ] = useState('')
  const ref = useRef(null)
  useEffect(() => {
    if (!searchOpen) return
    ref.current?.focus()
    const k = (e) => e.key === 'Escape' && setSearchOpen(false)
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [searchOpen, setSearchOpen])
  if (!searchOpen) return null
  const res = q ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())) : []
  const close = () => { setSearchOpen(false); setQ('') }
  return (
    <div className="search" role="dialog" aria-label="Search">
      <div className="search__bar container">
        <Icon name="search" />
        <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search watches…" aria-label="Search watches" />
        <button className="icon-btn" aria-label="Close search" onClick={close}><Icon name="close" /></button>
      </div>
      <ul className="search__results container">
        {q && res.length === 0 && <li className="muted">No results.</li>}
        {res.map((p) => <li key={p.id}><Link to={`/product/${p.id}`} onClick={close}>{p.name} <span>{money(p.price)}</span></Link></li>)}
      </ul>
    </div>
  )
}

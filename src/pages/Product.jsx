import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import WatchArt from '../components/WatchArt'
import Scene from '../components/Scene'
import ProductCard from '../components/ProductCard'
import ContactForm from '../components/ContactForm'
import { Button, Icon } from '../components/ui'
import { getProduct, money, products } from '../data/products'
import { useStore } from '../store'

const views = [
  { name: 'Front', style: {} },
  { name: 'Angle', style: { transform: 'rotate(-18deg) scale(.95)' } },
  { name: 'Detail', style: { transform: 'scale(2.1) translateY(14%)' } },
]

export default function Product() {
  const { id } = useParams()
  const p = getProduct(id)
  const { favs, toggleFav, addToCart } = useStore()
  const [view, setView] = useState(0)
  const [full, setFull] = useState(false)
  const [book, setBook] = useState(false)
  useEffect(() => setView(0), [id])
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') { setFull(false); setBook(false) }
      if (full && e.key === 'ArrowRight') setView((v) => (v + 1) % views.length)
      if (full && e.key === 'ArrowLeft') setView((v) => (v + views.length - 1) % views.length)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [full])

  if (!p) return <div className="page-top wrap"><h1 className="page-title">Watch not found</h1><Button to="/shop">Back to collections</Button></div>
  const fav = favs.includes(p.id)
  const similar = products.filter((x) => x.id !== p.id && x.collection === p.collection).concat(products.filter((x) => x.id !== p.id && x.collection !== p.collection)).slice(0, 4)
  const art = (v) => (
    <div className="stage-art" style={views[v].style}>
      <WatchArt dial={p.dial} metal={p.metal} strap={p.strap} smart={p.smart} skeleton={p.skeleton} title={`${p.name} — ${views[v].name} view`} />
    </div>
  )
  const specs = [['Case size', `${p.size} mm`], ['Material', p.material], ['Movement', p.movement], ['Water resistance', p.water], ['Warranty', '2 years']]

  return (
    <div className="page-top">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/shop">Collections</Link> / {p.name}</nav>
        <div className="detail">
          <div className="gallery">
            <div className="stage">
              <Scene variant={view} />
              {art(view)}
              <button className="expand" onClick={() => setFull(true)} aria-label="Open fullscreen viewer"><Icon name="expand" /></button>
            </div>
            <div className="thumbs">
              {views.map((v, i) => (
                <button key={v.name} className={i === view ? 'on' : ''} onClick={() => setView(i)} aria-label={`${v.name} view`}>
                  <Scene variant={i} />{art(i)}
                </button>
              ))}
            </div>
          </div>
          <div className="info">
            <p className="eyebrow wide">{p.collection} · {p.material}</p>
            <h1>{p.name}</h1>
            <p className="rating"><Icon name="star" size={15} /> {p.rating.toFixed(1)} · Verified buyers</p>
            <p className="price">{money(p.price)}</p>
            <p>{p.desc}</p>
            <div className="actions">
              <Button onClick={() => addToCart(p.id)}>Add to bag</Button>
              <button className={`round fav-btn ${fav ? 'on' : ''}`} onClick={() => toggleFav(p.id)} aria-pressed={fav} aria-label={fav ? 'Remove from favorites' : 'Save to favorites'}><Icon name="heart" /></button>
            </div>
            <div className="actions">
              <Button variant="ghost" onClick={() => setBook(true)}>Book a private viewing</Button>
              <Button variant="ghost" to={`/contact?subject=${encodeURIComponent(p.name)}`}>Contact concierge</Button>
            </div>
            <h3>Key features</h3>
            <ul className="ticks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <h3>Specifications</h3>
            <dl className="specs">{specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <div className="agent">
              <span className="circle"><Icon name="user" /></span>
              <div><strong>Élise Marchand</strong><span className="muted">Your TIMEZONE concierge · (555) 246-7890</span></div>
            </div>
          </div>
        </div>
        <h2 className="sub-title">You may also like</h2>
        <div className="grid">{similar.map((x) => <ProductCard key={x.id} p={x} />)}</div>
      </div>

      <div className="sticky-cta"><strong>{money(p.price)}</strong><Button onClick={() => addToCart(p.id)}>Add to bag</Button></div>

      {full && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => setFull(false)}>
          <button className="lb-close" aria-label="Close"><Icon name="close" size={24} /></button>
          <button className="lb-nav l" onClick={(e) => { e.stopPropagation(); setView((v) => (v + views.length - 1) % views.length) }} aria-label="Previous"><Icon name="left" /></button>
          <div className="lb-stage" onClick={(e) => e.stopPropagation()}><Scene variant={view} />{art(view)}</div>
          <button className="lb-nav r" onClick={(e) => { e.stopPropagation(); setView((v) => (v + 1) % views.length) }} aria-label="Next"><Icon name="arrow" /></button>
        </div>
      )}
      {book && (
        <div className="lightbox light" role="dialog" aria-modal="true" aria-label="Book a viewing" onClick={() => setBook(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="lb-close dark" onClick={() => setBook(false)} aria-label="Close"><Icon name="close" size={22} /></button>
            <h2>Book a private viewing</h2>
            <p className="muted">{p.name} — in our Geneva salon or by video call.</p>
            <ContactForm subject={`Viewing: ${p.name}`} withDate cta="Request viewing" onDone={() => setBook(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

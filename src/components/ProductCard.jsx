import { Link } from 'react-router-dom'
import WatchArt from './WatchArt'
import { Icon } from './ui'
import { money } from '../data/products'
import { useStore } from '../store'

export default function ProductCard({ p }) {
  const { favs, toggleFav, addToCart } = useStore()
  const fav = favs.includes(p.id)
  return (
    <article className="pcard">
      <div className="pcard-media">
        <Link to={`/product/${p.id}`} aria-label={`View ${p.name}`} draggable="false">
          <WatchArt dial={p.dial} metal={p.metal} strap={p.strap} smart={p.smart} skeleton={p.skeleton} title={p.name} />
        </Link>
        {p.tag && <span className="pcard-tag">{p.tag}</span>}
        <button className={`fav ${fav ? 'on' : ''}`} onClick={() => toggleFav(p.id)} aria-pressed={fav} aria-label={fav ? 'Remove from favorites' : 'Save to favorites'}>
          <Icon name="heart" size={18} />
        </button>
      </div>
      <div className="pcard-body">
        <p className="eyebrow">{p.material} · {p.size} mm</p>
        <h3><Link to={`/product/${p.id}`} draggable="false">{p.name}</Link></h3>
        <div className="pcard-row">
          <strong>{money(p.price)}</strong>
          <button className="mini" onClick={() => addToCart(p.id)}>Add to bag</button>
        </div>
      </div>
    </article>
  )
}

import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useStore } from '../store.jsx'
export default function ProductCard({ p }) {
  const { money, wishlist, toggleWish } = useStore()
  const on = wishlist.includes(p.id)
  return (
    <article className="card product">
      <button className={'product__wish' + (on ? ' is-on' : '')} aria-label={on ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`} aria-pressed={on} onClick={() => toggleWish(p.id)}>
        <Icon name="heart" size={16} fill={on ? 'currentColor' : 'none'} />
      </button>
      <Link to={`/product/${p.id}`} className="product__link">
        <div className="product__img"><img src={p.image} alt={p.name} loading="lazy" width="332" height="264" /></div>
        <h3>{p.name}</h3>
        <p className="product__price">{money(p.price)}</p>
      </Link>
    </article>
  )
}

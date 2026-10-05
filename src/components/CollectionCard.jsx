import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
export default function CollectionCard({ c }) {
  return (
    <Link to={`/collections/${c.slug}`} className="card collection">
      <div className="collection__img"><img src={c.image} alt={c.alt} loading="lazy" width="332" height="264" /></div>
      <h3>{c.title}</h3>
      <span className="collection__cta">DISCOVER <Icon name="arrow" size={11} /></span>
    </Link>
  )
}

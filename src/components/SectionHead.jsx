import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
export default function SectionHead({ title, sub, to, link, id }) {
  return (
    <div className="section-head">
      <div>
        <h2 id={id} className="section-title">{title}</h2>
        <p className="section-sub">{sub}</p>
      </div>
      <Link to={to} className="link-arrow">{link} <Icon name="arrow" size={12} /></Link>
    </div>
  )
}

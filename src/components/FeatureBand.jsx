import Icon from './Icon.jsx'
import { features } from '../data.js'
export default function FeatureBand() {
  return (
    <section className="features" aria-label="Benefits">
      <ul className="features__list container-wide">
        {features.map((f) => (
          <li key={f.title} className="feature">
            <span className="feature__icon"><Icon name={f.icon} size={20} /></span>
            <div><strong>{f.title}</strong><span>{f.sub}</span></div>
          </li>
        ))}
      </ul>
    </section>
  )
}

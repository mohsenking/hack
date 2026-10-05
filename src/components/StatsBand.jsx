import Icon from './Icon.jsx'
import { stats } from '../data.js'
export default function StatsBand() {
  return (
    <section className="stats" aria-label="Our numbers">
      <ul className="stats__list container-wide">
        {stats.map((s) => (
          <li key={s.label}>
            <Icon name={s.icon} size={22} />
            <div><strong>{s.value}</strong><span>{s.label}</span></div>
          </li>
        ))}
      </ul>
    </section>
  )
}

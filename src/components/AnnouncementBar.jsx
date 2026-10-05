import Icon from './Icon.jsx'
import { announcements } from '../data.js'
export default function AnnouncementBar() {
  return (
    <div className="announce">
      <ul className="announce__list container-wide">
        {announcements.map((a) => (
          <li key={a.text}><Icon name={a.icon} size={14} /> <span>{a.text}</span></li>
        ))}
      </ul>
    </div>
  )
}

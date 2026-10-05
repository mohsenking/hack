import { Link } from 'react-router-dom'
import { nav } from '../data.js'
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Link to="/" className="logo"><span className="logo__name">TIMEZONE</span><span className="logo__sub">A HIGHER STANDARD</span></Link>
        <nav aria-label="Footer">{nav.map((n) => <Link key={n.label} to={n.to}>{n.label}</Link>)}</nav>
        <p>© {new Date().getFullYear()} TIMEZONE. All rights reserved.</p>
      </div>
    </footer>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export const Icon = ({ name, size = 18 }) => {
  const p = {
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    left: <path d="M20 12H4m6-6-6 6 6 6" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></>,
    heart: <path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11Z" />,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    close: <path d="M5 5l14 14M19 5 5 19" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
    truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17" r="1.5" /><circle cx="17" cy="17" r="1.5" /></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    shield: <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />,
    box: <path d="M3 8l9-5 9 5v8l-9 5-9-5V8Zm9 5 9-5M12 13v8M3 8l9 5" />,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 20c.5-4 3-6 7-6s6.5 2 7 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2 .7 3.5 2.5 4 6" /></>,
    gem: <path d="M6 4h12l4 5-10 12L2 9l4-5Zm-4 5h20M9 4l3 5 3-5M12 21 9 9m3 12 3-12" />,
    star: <path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.3l1-6.2L3 9.7l6.2-.9L12 3Z" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    wrench: <path d="M14 6a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9a4 4 0 0 0-2-2Z" />,
    gift: <><rect x="3" y="9" width="18" height="4" /><path d="M5 13v8h14v-8M12 9v12M12 9c-3 0-5-1-4-3s4 0 4 3Zm0 0c3 0 5-1 4-3s-4 0-4 3Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
    ig: <><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.5" /></>,
    fb: <path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9Z" />,
    x: <path d="M4 4l16 16M20 4 4 20" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  }[name]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {p}
    </svg>
  )
}

export function Button({ to, onClick, variant = 'primary', children, arrow = true, type = 'button', ...rest }) {
  const cls = `btn btn-${variant}`
  const inner = <>{children}{arrow && <Icon name="arrow" size={16} />}</>
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  return <button type={type} className={cls} onClick={onClick} {...rest}>{inner}</button>
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>
}

export function SectionHead({ title, sub, link, to }) {
  return (
    <Reveal className="section-head">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {link && <Link to={to} className="link-arrow">{link} <Icon name="arrow" size={14} /></Link>}
    </Reveal>
  )
}

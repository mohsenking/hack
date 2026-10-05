import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { slides } from '../data.js'

export default function Hero() {
  const [i, setI] = useState(0)
  const go = (n) => setI((n + slides.length) % slides.length)
  const s = slides[i]
  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Featured">
      <div className="hero__text" key={'t' + i}>
        <p className="eyebrow">{s.label}</p>
        <h1 className="hero__title">{s.title[0]}<br />{s.title[1]}</h1>
        <p className="hero__sub">{s.sub}</p>
        <p className="hero__body">{s.body}</p>
        <Link to="/collections" className="btn">SHOP NOW <Icon name="arrow" size={14} /></Link>
        <ol className="pager" aria-label="Slides">
          {slides.map((x, n) => (
            <li key={x.id}>
              <button className={n === i ? 'is-active' : ''} aria-label={`Go to slide ${n + 1}`} aria-current={n === i} onClick={() => go(n)}>
                {String(n + 1).padStart(2, '0')}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="hero__media" aria-live="polite">
        <img key={'m' + i} src={s.image} alt={s.alt} className="hero__img" width="1078" height="558" />
        <p className="hero__caption">EXCEPTIONAL<br />BY DESIGN</p>
        <div className="hero__arrows">
          <button className="circle circle--light" aria-label="Previous slide" onClick={() => go(i - 1)}><Icon name="left" size={16} /></button>
          <button className="circle circle--dark" aria-label="Next slide" onClick={() => go(i + 1)}><Icon name="arrow" size={16} /></button>
        </div>
      </div>
    </section>
  )
}

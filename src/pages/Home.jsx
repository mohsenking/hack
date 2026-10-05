import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Reveal, SectionHead } from '../components/ui'
import WatchArt from '../components/WatchArt'
import Scene from '../components/Scene'
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import ContactForm from '../components/ContactForm'
import { collections, products } from '../data/products'

const slides = [
  { eyebrow: 'Time lives forever', title: ['More than', 'a watch'], sub: 'A legacy on your wrist', text: 'Precision. Design. Heritage. TIMEZONE crafts exceptional timepieces for those who value a finer tomorrow.', side: ['A more', 'timeless', 'tomorrow'], watch: products[0], to: '/product/meridian-automatic' },
  { eyebrow: 'New season', title: ['Grace in', 'every second'], sub: 'The Aurelia collection', text: 'Mother-of-pearl dials and diamond-set bezels, finished by hand for those who wear time as jewellery.', side: ['Elegance', 'in', 'motion'], watch: products[1], to: '/product/aurelia-diamond' },
  { eyebrow: 'Limited edition', title: ['The art of', 'the open dial'], sub: 'Heritage Skeleton', text: 'A hand-wound calibre on full display. Numbered, limited, and made to be passed down.', side: ['Craft', 'made', 'visible'], watch: products[3], to: '/product/heritage-skeleton' },
]

const stats = [['users', '250K+', 'Trusted Customers'], ['gem', '100%', 'Original Products'], ['star', '4.9/5', 'Average Rating'], ['globe', '50+', 'Countries Worldwide']]
const trust = [['truck', 'Free Worldwide Shipping', 'On all orders'], ['lock', 'Secure Payments', 'Your data is safe'], ['shield', '100% Authentic', 'Guaranteed original'], ['box', 'Easy 30-Day Returns', 'Hassle-free process']]
const services = [
  ['01', 'Concierge consultation', 'One-to-one guidance to find the piece that suits your wrist and your story.'],
  ['02', 'Engraving & personalisation', 'Hand-engraved casebacks, initials and dates, made to be remembered.'],
  ['03', 'Servicing & restoration', 'Certified watchmakers restore and service every movement we sell.'],
  ['04', 'Insured worldwide delivery', 'Fully insured, signature-required shipping to over 50 countries.'],
  ['05', 'Trade-in programme', 'Exchange a previous timepiece towards your next TIMEZONE.'],
  ['06', 'Gift presentation', 'Handcrafted presentation cases and a handwritten card, included.'],
]
const why = [
  ['Swiss-partnered movements', 'Every calibre is tested over 15 days in six positions before it reaches you.'],
  ['Sapphire, always', 'Scratch-resistant sapphire crystal on every watch in the collection.'],
  ['Two-year warranty', 'International coverage, with free servicing in your first year.'],
  ['Honest pricing', 'Direct from atelier to wrist — no inflated retail mark-ups.'],
]
const team = [
  ['Élise Marchand', 'Master Watchmaker', '#1b3a78'],
  ['Julian Voss', 'Creative Director', '#173266'],
  ['Amara Okafor', 'Head of Client Experience', '#f1d9d0'],
  ['Lucas Bernard', 'Heritage Curator', '#16324f'],
]

function Hero() {
  const [i, setI] = useState(0)
  const s = slides[i]
  const go = (d) => setI((x) => (x + d + slides.length) % slides.length)
  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Featured">
      <Scene variant={i} className="hero-bg" key={`bg${i}`} />
      <div className="hero-fade" />
      <div className="wrap hero-in" key={i}>
        <div className="hero-copy">
          <p className="eyebrow wide">{s.eyebrow}</p>
          <h1>{s.title[0]}<br />{s.title[1]}</h1>
          <p className="hero-sub">{s.sub}</p>
          <p className="hero-text">{s.text}</p>
          <Button to={s.to}>Shop now</Button>
          <div className="dots" role="tablist" aria-label="Slides">
            {slides.map((_, n) => (
              <button key={n} role="tab" aria-selected={n === i} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`}>0{n + 1}</button>
            ))}
          </div>
        </div>
        <div className="hero-watch">
          <div className="pedestal" />
          <WatchArt dial={s.watch.dial} metal={s.watch.metal} strap={s.watch.strap} smart={s.watch.smart} skeleton={s.watch.skeleton} title={s.watch.name} />
        </div>
        <p className="hero-side">{s.side.map((t) => <span key={t}>{t}</span>)}</p>
      </div>
      <div className="hero-arrows">
        <button className="round" onClick={() => go(-1)} aria-label="Previous slide"><Icon name="left" /></button>
        <button className="round dark" onClick={() => go(1)} aria-label="Next slide"><Icon name="arrow" /></button>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <section className="wrap stats" aria-label="Highlights">
        {stats.map(([ic, n, l]) => (
          <div key={l}><Icon name={ic} size={26} /><div><strong>{n}</strong><span>{l}</span></div></div>
        ))}
      </section>
      <section className="wrap trust">
        {trust.map(([ic, t, s]) => (
          <div key={t}><span className="circle"><Icon name={ic} size={20} /></span><div><strong>{t}</strong><span>{s}</span></div></div>
        ))}
      </section>

      <section className="wrap section">
        <SectionHead title="Explore our collections" sub="Four worlds. One devotion to time." link="View all collections" to="/shop" />
        <div className="coll-grid">
          {collections.map((c, n) => (
            <Reveal key={c.id} delay={n * 80}>
              <Link to={`/shop?collection=${c.id}`} className="coll-card">
                <div className="coll-media">
                  <Scene variant={n} />
                  <WatchArt dial={c.dial} metal={c.metal} strap={c.strap} smart={c.smart} skeleton={c.skeleton} title={c.name} />
                </div>
                <h3>{c.name}</h3>
                <span className="discover">Discover <Icon name="arrow" size={13} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story" id="story">
        <div className="story-img">
          <div className="story-dial"><WatchArt dial="#1b3a78" title="Close-up of a TIMEZONE dial" /></div>
          <p className="side-label">Heritage<br />lives in<br />every detail</p>
        </div>
        <Reveal className="story-copy">
          <p className="eyebrow wide">Our story</p>
          <h2>Crafted for generations</h2>
          <p>More than timepieces, we create legacies. Inspired by classic horology and driven by modern innovation, TIMEZONE unites tradition and tomorrow.</p>
          <Button to="/contact?subject=Our story">Discover our story</Button>
          <p className="side-label right">Same values.<br />A brighter<br />tomorrow.</p>
        </Reveal>
      </section>

      <section className="wrap section" id="bestsellers">
        <SectionHead title="Bestsellers" sub="The most admired timepieces, chosen by our global community." link="View all products" to="/shop" />
        <Carousel label="Bestsellers">
          {products.map((p) => <div className="slide" key={p.id}><ProductCard p={p} /></div>)}
        </Carousel>
      </section>

      <section className="wrap section">
        <SectionHead title="Services" sub="Care that continues long after the purchase." />
        <div className="services">
          {services.map(([n, t, d], k) => (
            <Reveal key={n} delay={(k % 3) * 70} className="service">
              <span>{n}</span><h3>{t}</h3><p>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="why">
        <div className="wrap why-in">
          <Reveal>
            <p className="eyebrow wide">Why choose us</p>
            <h2>A higher standard,<br />in every detail</h2>
          </Reveal>
          <div className="why-list">
            {why.map(([t, d], k) => (
              <Reveal key={t} delay={k * 80}><h3>{t}</h3><p>{d}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <SectionHead title="The people behind the dial" sub="Watchmakers, designers and curators." />
        <div className="team">
          {team.map(([name, role, c], k) => (
            <Reveal key={name} delay={k * 80} className="member">
              <div className="member-img">
                <svg viewBox="0 0 200 240" role="img" aria-label={`Portrait of ${name}`}>
                  <rect width="200" height="240" fill="#e9f0f8" />
                  <circle cx="100" cy="92" r="40" fill="#c7d4e6" />
                  <path d="M20 240c4-60 40-84 80-84s76 24 80 84Z" fill={c} opacity=".85" />
                </svg>
                <div className="member-links">
                  <a href="mailto:concierge@timezone.com" aria-label={`Email ${name}`}><Icon name="mail" size={16} /></a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label={`${name} on Instagram`}><Icon name="ig" size={16} /></a>
                </div>
              </div>
              <h3>{name}</h3><p className="muted">{role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <Reveal className="cta">
          <span className="circle big"><Icon name="clock" size={28} /></span>
          <div>
            <h2>Find the watch that finds you</h2>
            <p>Speak with a TIMEZONE concierge — we will help you choose, personalise and arrange delivery.</p>
          </div>
          <Button to="/contact">Get in touch</Button>
        </Reveal>
      </section>
    </>
  )
}

export { ContactForm }

import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data.js'
import { useStore } from '../store.jsx'

export function Info({ title, text }) {
  return (
    <section className="section container page">
      <h1 className="section-title">{title.toUpperCase()}</h1>
      <p className="section-sub">{text}</p>
      <Link to="/" className="btn" style={{ marginTop: 24 }}>BACK TO HOME</Link>
    </section>
  )
}
export function Account() {
  return (
    <section className="section container page">
      <h1 className="section-title">SIGN IN</h1>
      <form className="form" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); alert('Signed in (demo).') }}>
        <label>Email<input type="email" required /></label>
        <label>Password<input type="password" required /></label>
        <button className="btn">SIGN IN</button>
      </form>
    </section>
  )
}
export function Wishlist() {
  const { wishlist } = useStore()
  const list = products.filter((p) => wishlist.includes(p.id))
  return (
    <section className="section container page">
      <h1 className="section-title">WISHLIST</h1>
      {list.length === 0 && <p className="section-sub">No favorites yet.</p>}
      <div className="grid-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </section>
  )
}
export function Checkout() {
  const { count, total, money } = useStore()
  return <Info title="Checkout" text={`${count} item(s) — total ${money(total)}. Payment is not connected yet.`} />
}

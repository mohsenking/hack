import { useParams } from 'react-router-dom'
import { products } from '../data.js'
import { useStore } from '../store.jsx'
import { Info } from './Misc.jsx'
export default function Product() {
  const { id } = useParams()
  const { money, addToCart } = useStore()
  const p = products.find((x) => x.id === id)
  if (!p) return <Info title="Product not found" text="This timepiece is unavailable." />
  return (
    <section className="section container page product-detail">
      <div className="card product__img product-detail__img"><img src={p.image} alt={p.name} /></div>
      <div>
        <p className="eyebrow">TIMEZONE</p>
        <h1 className="story__title">{p.name}</h1>
        <p className="product__price product-detail__price">{money(p.price)}</p>
        <p className="story__body">Precision. Design. Heritage. Crafted for those who value a finer tomorrow, with a 2-year international warranty and easy 30-day returns.</p>
        <button className="btn" onClick={() => addToCart(p.id)}>ADD TO CART</button>
      </div>
    </section>
  )
}

import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { products, collections } from '../data.js'
export default function Collection() {
  const { slug } = useParams()
  const c = collections.find((x) => x.slug === slug)
  const list = slug ? products.filter((p) => p.collection === slug) : products
  return (
    <section className="section container page">
      <h1 className="section-title">{c ? c.title.toUpperCase() : 'ALL COLLECTIONS'}</h1>
      <p className="section-sub">{list.length} timepiece{list.length === 1 ? '' : 's'}</p>
      <div className="grid-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </section>
  )
}

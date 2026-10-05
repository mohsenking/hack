import SectionHead from './SectionHead.jsx'
import ProductCard from './ProductCard.jsx'
import { products } from '../data.js'
export default function Bestsellers() {
  return (
    <section className="section container" aria-labelledby="best-h">
      <SectionHead id="best-h" title="BESTSELLERS" sub="The most admired timepieces, chosen by our global community." to="/collections" link="View All Products" />
      <div className="grid-4">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </section>
  )
}

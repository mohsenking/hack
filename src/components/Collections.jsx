import SectionHead from './SectionHead.jsx'
import CollectionCard from './CollectionCard.jsx'
import { collections } from '../data.js'
export default function Collections() {
  return (
    <section className="section container" aria-labelledby="col-h">
      <SectionHead id="col-h" title="EXPLORE OUR COLLECTIONS" sub="Four worlds. One devotion to time." to="/collections" link="View All Collections" />
      <div className="grid-4">{collections.map((c) => <CollectionCard key={c.slug} c={c} />)}</div>
    </section>
  )
}

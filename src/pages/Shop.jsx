import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { collections, products } from '../data/products'
import { useStore } from '../store'
import { Button } from '../components/ui'

export default function Shop() {
  const [sp, setSp] = useSearchParams()
  const { favs } = useStore()
  const q = sp.get('q') || ''
  const collection = sp.get('collection') || ''
  const material = sp.get('material') || ''
  const max = Number(sp.get('max') || 6000)
  const sort = sp.get('sort') || 'featured'
  const onlyFavs = sp.get('favs') === '1'
  const set = (k, v) => {
    const n = new URLSearchParams(sp)
    v ? n.set(k, v) : n.delete(k)
    setSp(n, { replace: true })
  }
  const materials = [...new Set(products.map((p) => p.material))]

  const list = useMemo(() => {
    let r = products.filter((p) =>
      (!collection || p.collection === collection) &&
      (!material || p.material === material) &&
      p.price <= max &&
      (!onlyFavs || favs.includes(p.id)) &&
      (!q || `${p.name} ${p.material} ${p.collection} ${p.movement}`.toLowerCase().includes(q.toLowerCase())))
    if (sort === 'low') r = [...r].sort((a, b) => a.price - b.price)
    if (sort === 'high') r = [...r].sort((a, b) => b.price - a.price)
    if (sort === 'rating') r = [...r].sort((a, b) => b.rating - a.rating)
    return r
  }, [q, collection, material, max, sort, onlyFavs, favs])

  return (
    <div className="page-top">
      <div className="wrap">
        <p className="eyebrow wide">{onlyFavs ? 'Saved' : 'Collections'}</p>
        <h1 className="page-title">{onlyFavs ? 'Your favorites' : collections.find((c) => c.id === collection)?.name || 'All timepieces'}</h1>
        <div className="filters">
          <input type="search" placeholder="Search watches…" value={q} onChange={(e) => set('q', e.target.value)} aria-label="Search" />
          <select value={collection} onChange={(e) => set('collection', e.target.value)} aria-label="Collection">
            <option value="">All collections</option>
            {collections.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={material} onChange={(e) => set('material', e.target.value)} aria-label="Material">
            <option value="">Any material</option>
            {materials.map((m) => <option key={m}>{m}</option>)}
          </select>
          <label className="range">Up to ${max.toLocaleString()}
            <input type="range" min="400" max="6000" step="100" value={max} onChange={(e) => set('max', e.target.value)} />
          </label>
          <select value={sort} onChange={(e) => set('sort', e.target.value)} aria-label="Sort by">
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
        <p className="muted count" aria-live="polite">{list.length} timepiece{list.length !== 1 && 's'}</p>
        {list.length ? (
          <div className="grid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        ) : (
          <div className="empty"><p>No watches match your filters.</p><Button variant="ghost" onClick={() => setSp({})} arrow={false}>Clear filters</Button></div>
        )}
      </div>
    </div>
  )
}

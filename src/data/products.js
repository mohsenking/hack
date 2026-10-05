export const collections = [
  { id: 'men', name: "Men's Watches", dial: '#1b3a78', metal: 'steel', strap: 'bracelet' },
  { id: 'women', name: "Women's Watches", dial: '#f4efe6', metal: 'gold', strap: 'bracelet' },
  { id: 'smart', name: 'Smart Watches', dial: '#0d0f13', metal: 'black', strap: 'rubber', smart: true },
  { id: 'luxury', name: 'Luxury Watches', dial: '#173266', metal: 'gold', strap: 'leather', skeleton: true },
]

const desc =
  'Engineered in our Swiss-partnered atelier and finished by hand, this timepiece pairs precise movement with an architectural case and sapphire crystal.'

export const products = [
  { id: 'meridian-automatic', name: 'Meridian Automatic', collection: 'men', price: 1890, material: 'Steel', dial: '#1b3a78', metal: 'steel', strap: 'bracelet', size: 41, movement: 'Automatic', water: '100 m', rating: 4.9, tag: 'Bestseller', desc, features: ['Sapphire crystal', 'Screw-down crown', '42-hour power reserve', 'Date window'] },
  { id: 'aurelia-diamond', name: 'Aurelia Diamond', collection: 'women', price: 2450, material: 'Gold', dial: '#f4efe6', metal: 'gold', strap: 'bracelet', size: 32, movement: 'Quartz', water: '50 m', rating: 4.8, tag: 'New', desc, features: ['Diamond-set bezel', 'Mother-of-pearl dial', 'Two-tone bracelet', 'Sapphire crystal'] },
  { id: 'vector-smart', name: 'Vector Smart', collection: 'smart', price: 590, material: 'Black', dial: '#0d0f13', metal: 'black', strap: 'rubber', smart: true, size: 44, movement: 'Smart', water: '50 m', rating: 4.6, tag: 'Bestseller', desc, features: ['AMOLED display', '7-day battery', 'Heart-rate & sleep tracking', 'NFC payments'] },
  { id: 'heritage-skeleton', name: 'Heritage Skeleton', collection: 'luxury', price: 5900, material: 'Gold', dial: '#173266', metal: 'gold', strap: 'leather', skeleton: true, size: 42, movement: 'Manual', water: '50 m', rating: 5.0, tag: 'Limited', desc, features: ['Open-worked dial', 'Hand-wound calibre', 'Alligator-grain strap', 'Numbered edition'] },
  { id: 'glacier-chronograph', name: 'Glacier Chronograph', collection: 'men', price: 2290, material: 'Steel', dial: '#e9eef5', metal: 'steel', strap: 'bracelet', size: 43, movement: 'Automatic', water: '200 m', rating: 4.8, tag: '', desc, features: ['Tachymeter bezel', '30-minute counter', 'Ceramic insert', 'Sapphire crystal'] },
  { id: 'lumiere-rose', name: 'Lumière Rose', collection: 'women', price: 1680, material: 'Rose gold', dial: '#f1d9d0', metal: 'rose', strap: 'leather', size: 34, movement: 'Quartz', water: '30 m', rating: 4.7, tag: '', desc, features: ['Rose-gold PVD case', 'Sunray dial', 'Italian leather strap', 'Sapphire crystal'] },
  { id: 'nocturne-black', name: 'Nocturne Black', collection: 'luxury', price: 4200, material: 'Black', dial: '#101216', metal: 'black', strap: 'rubber', size: 42, movement: 'Automatic', water: '300 m', rating: 4.9, tag: 'New', desc, features: ['DLC-coated steel', 'Luminous indices', 'Rubber strap', 'Exhibition caseback'] },
  { id: 'pulse-active', name: 'Pulse Active', collection: 'smart', price: 420, material: 'Steel', dial: '#16324f', metal: 'steel', strap: 'rubber', smart: true, size: 42, movement: 'Smart', water: '100 m', rating: 4.5, tag: '', desc, features: ['GPS tracking', '5-day battery', 'Sapphire glass', 'Swim tracking'] },
]

export const getProduct = (id) => products.find((p) => p.id === id)
export const money = (n) => '$' + n.toLocaleString('en-US')

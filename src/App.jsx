import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import AnnouncementBar from './components/AnnouncementBar.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import SearchOverlay from './components/SearchOverlay.jsx'
import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import Product from './pages/Product.jsx'
import { Account, Wishlist, Checkout, Info } from './pages/Misc.jsx'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/collections/:slug" element={<Collection />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<Info title="About" text="TIMEZONE crafts exceptional timepieces for those who value a finer tomorrow." />} />
          <Route path="/journal" element={<Info title="Journal" text="Stories of horology, heritage and design — coming soon." />} />
          <Route path="*" element={<Info title="Page not found" text="The page you are looking for does not exist." />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
    </>
  )
}

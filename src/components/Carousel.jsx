import { useRef } from 'react'
import { Icon } from './ui'

// Scroll-snap carousel with mouse-drag, touch swipe, arrow buttons and keyboard support.
export default function Carousel({ children, label }) {
  const ref = useRef(null)
  const drag = useRef({ down: false, x: 0, left: 0, moved: false })
  const step = (dir) => {
    const el = ref.current
    el.scrollBy({ left: dir * (el.firstChild?.clientWidth || 300) * 1.05, behavior: 'smooth' })
  }
  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return
    drag.current = { down: true, x: e.clientX, left: ref.current.scrollLeft, moved: false }
  }
  const onMove = (e) => {
    const d = drag.current
    if (!d.down) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 4) { d.moved = true; ref.current.classList.add('dragging') }
    ref.current.scrollLeft = d.left - dx
  }
  const onUp = () => {
    drag.current.down = false
    ref.current.classList.remove('dragging')
  }
  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={ref}
        className="carousel-track"
        tabIndex={0}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false } }}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }}
      >
        {children}
      </div>
      <div className="carousel-ctrl">
        <button className="round" onClick={() => step(-1)} aria-label="Previous"><Icon name="left" /></button>
        <button className="round dark" onClick={() => step(1)} aria-label="Next"><Icon name="arrow" /></button>
      </div>
    </div>
  )
}

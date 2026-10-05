import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
export default function StorySection() {
  return (
    <section className="story" aria-label="Our story">
      <div className="story__img">
        <img src="/img/story.jpg" alt="Close-up of a blue-dial TIMEZONE watch. Heritage lives in every detail." loading="lazy" width="820" height="334" />
      </div>
      <div className="story__text">
        <p className="eyebrow">OUR STORY</p>
        <h2 className="story__title">CRAFTED FOR<br />GENERATIONS</h2>
        <p className="story__body">More than timepieces, we create legacies. Inspired by classic horology and driven by modern innovation, TIMEZONE unites tradition and tomorrow.</p>
        <Link to="/about" className="btn">DISCOVER OUR STORY <Icon name="arrow" size={14} /></Link>
        <div className="story__mountain" aria-hidden="true">
          <img src="/img/mountain.jpg" alt="" loading="lazy" />
          <p>SAME<br />VALUES.<br />A BRIGHTER<br />TOMORROW.</p>
        </div>
      </div>
    </section>
  )
}

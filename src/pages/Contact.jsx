import { useSearchParams } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { Icon } from '../components/ui'

export default function Contact() {
  const [sp] = useSearchParams()
  const subject = sp.get('subject') || 'General enquiry'
  return (
    <div className="page-top">
      <div className="wrap contact">
        <div>
          <p className="eyebrow wide">Get in touch</p>
          <h1 className="page-title">Speak with our concierge</h1>
          <p>Questions about a timepiece, an order, or our story? We reply within one business day.</p>
          <ul className="contact-list">
            <li><Icon name="phone" /> <a href="tel:+15552467890">(555) 246-7890</a></li>
            <li><Icon name="mail" /> <a href="mailto:concierge@timezone.com">concierge@timezone.com</a></li>
            <li><Icon name="globe" /> 12 Rue du Rhône, 1204 Geneva</li>
          </ul>
        </div>
        <div className="modal flat"><h2>{subject}</h2><ContactForm subject={subject} /></div>
      </div>
    </div>
  )
}

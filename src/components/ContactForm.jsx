import { useState } from 'react'
import { Button } from './ui'

export default function ContactForm({ subject = '', cta = 'Send message', withDate = false, onDone }) {
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const all = JSON.parse(localStorage.getItem('tz-inquiries') || '[]')
    localStorage.setItem('tz-inquiries', JSON.stringify([...all, { ...data, subject, at: new Date().toISOString() }]))
    setSent(true)
    onDone && setTimeout(onDone, 2200)
  }
  if (sent) return <p className="form-ok" role="status">Thank you — a TIMEZONE concierge will be in touch within one business day.</p>
  return (
    <form className="form" onSubmit={submit}>
      <label>Full name<input name="name" required autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      {withDate && <label>Preferred date<input name="date" type="date" required /></label>}
      <label>Message<textarea name="message" rows="3" placeholder={subject} /></label>
      <Button type="submit">{cta}</Button>
    </form>
  )
}

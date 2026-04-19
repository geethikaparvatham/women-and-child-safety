import { useState } from 'react'
import { useAuth } from '../context/useAuth'
import { storeComplaint } from '../services/mockApi'

const ComplaintPage = () => {
  const { addComplaint } = useAuth()
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    subject: '',
    type: 'Harassment',
    description: '',
    evidence: null,
  })

  const submit = async (event) => {
    event.preventDefault()
    await storeComplaint(form)
    addComplaint(form)
    setDone(true)
    setForm({ subject: '', type: 'Harassment', description: '', evidence: null })
  }

  return (
    <section className="page-stack">
      <h3>Complaint Registration</h3>
      <form className="inline-form" onSubmit={submit}>
        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
          required
        />
        <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
          <option>Harassment</option>
          <option>Stalking</option>
          <option>Domestic Violence</option>
          <option>Cyber Abuse</option>
        </select>
        <textarea
          placeholder="Describe your complaint"
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          required
        />
        <input type="file" accept="image/*,video/*" onChange={(e) => setForm((p) => ({ ...p, evidence: e.target.files?.[0] }))} />
        <button className="primary-btn">Submit Complaint</button>
      </form>
      {done && <p className="ok-text">Complaint submitted securely. Tracking ID generated.</p>}
    </section>
  )
}

export default ComplaintPage

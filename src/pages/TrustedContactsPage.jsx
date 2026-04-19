import { useState } from 'react'
import { useAuth } from '../context/useAuth'

const TrustedContactsPage = () => {
  const { trustedContacts, addContact, removeContact, toggleContactAlert } = useAuth()
  const [form, setForm] = useState({ name: '', phone: '' })

  const submit = (event) => {
    event.preventDefault()
    if (!form.name || !form.phone) return
    addContact({ ...form, alertEnabled: true })
    setForm({ name: '', phone: '' })
  }

  return (
    <section className="page-stack">
      <h3>Trusted Contacts</h3>
      <form className="inline-form" onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
        />
        <button className="primary-btn">Add Contact</button>
      </form>

      <div className="list-col">
        {trustedContacts.map((contact) => (
          <article className="list-card" key={contact.id}>
            <div>
              <h4>{contact.name}</h4>
              <p>{contact.phone}</p>
            </div>
            <div className="btn-row">
              <button className="secondary-btn" onClick={() => toggleContactAlert(contact.id)}>
                {contact.alertEnabled ? 'Auto Alert ON' : 'Auto Alert OFF'}
              </button>
              <button className="danger-btn" onClick={() => removeContact(contact.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TrustedContactsPage

import { PhoneIncoming } from 'lucide-react'
import { useState } from 'react'

const FakeCallPage = () => {
  const [name, setName] = useState('Mom')
  const [preview, setPreview] = useState(false)

  return (
    <section className="page-stack">
      <h3>Fake Call (Future Feature)</h3>
      <p>Use this screen to simulate an incoming call when you need a safe exit.</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Custom caller name" />
      <button className="primary-btn" onClick={() => setPreview(true)}>
        Preview Incoming Call
      </button>
      {preview && (
        <div className="fake-call">
          <PhoneIncoming />
          <h4>Incoming call...</h4>
          <p>{name}</p>
        </div>
      )}
    </section>
  )
}

export default FakeCallPage

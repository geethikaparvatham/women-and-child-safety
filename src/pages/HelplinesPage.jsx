import { Ambulance, Flame, Phone, ShieldCheck } from 'lucide-react'

const list = [
  { id: '112', label: 'National Emergency', icon: Phone },
  { id: '100', label: 'Police', icon: ShieldCheck },
  { id: '108', label: 'Ambulance', icon: Ambulance },
  { id: '101', label: 'Fire', icon: Flame },
  { id: '1091', label: 'Women Helpline', icon: Phone },
]

const HelplinesPage = () => (
  <section className="page-stack">
    <h3>Helpline Numbers</h3>
    <div className="list-col">
      {list.map((item) => {
        const Icon = item.icon
        return (
          <article key={item.id} className="help-card">
            <div className="help-left">
              <Icon size={20} />
              <div>
                <strong>{item.id}</strong>
                <p>{item.label}</p>
              </div>
            </div>
            <a href={`tel:${item.id}`} className="call-btn">
              Call
            </a>
          </article>
        )
      })}
    </div>
  </section>
)

export default HelplinesPage

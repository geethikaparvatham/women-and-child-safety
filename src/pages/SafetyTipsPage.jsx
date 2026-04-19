import { useAuth } from '../context/useAuth'

const SafetyTipsPage = () => {
  const { tips } = useAuth()
  return (
    <section className="page-stack">
      <h3>Safety Tips</h3>
      <div className="list-col">
        {tips.map((tip) => (
          <article className="list-card" key={tip.id}>
            <h4>{tip.title}</h4>
            <p>{tip.content}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SafetyTipsPage

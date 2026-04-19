import { useAuth } from '../context/useAuth'

const PoliceDashboardPage = () => {
  const { alerts } = useAuth()
  const latest = alerts[0]

  if (!latest) {
    return (
      <section className="page-stack">
        <h3>Police Simulation Dashboard</h3>
        <p>No active alerts. Waiting for SOS events...</p>
      </section>
    )
  }

  return (
    <section className="page-stack">
      <h3>Police Simulation Dashboard</h3>
      <article className="list-card">
        <p>
          <strong>User:</strong> {latest.userName}
        </p>
        <p>
          <strong>Live Location:</strong> {latest.location.lat}, {latest.location.lng}
        </p>
        <p>
          <strong>IP Address:</strong> {latest.location.ip}
        </p>
        <p>
          <strong>Time:</strong> {latest.time}
        </p>
        <a
          className="primary-btn"
          href={`https://maps.google.com/?q=${latest.location.lat},${latest.location.lng}`}
          target="_blank"
          rel="noreferrer"
        >
          Track User
        </a>
      </article>
    </section>
  )
}

export default PoliceDashboardPage

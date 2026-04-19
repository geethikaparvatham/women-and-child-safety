import { useEffect } from 'react'
import { useAuth } from '../context/useAuth'

const LiveTrackingPage = () => {
  const { tracking, setTracking, locationHistory, pushLocationPoint } = useAuth()

  useEffect(() => {
    if (!tracking) return undefined
    const id = setInterval(() => {
      const next = {
        lat: Number((17.385 + (Math.random() - 0.5) * 0.004).toFixed(6)),
        lng: Number((78.4867 + (Math.random() - 0.5) * 0.004).toFixed(6)),
        time: new Date().toLocaleTimeString(),
      }
      pushLocationPoint(next)
    }, 2000)

    return () => clearInterval(id)
  }, [tracking, pushLocationPoint])

  const mapLocation = locationHistory.at(-1) || { lat: 17.385, lng: 78.4867 }

  return (
    <section className="page-stack">
      <h3>Live Location Tracking</h3>
      <p>Google Maps integration point (iframe mock). Replace with Maps API key for production.</p>
      <div className="map-frame">
        <iframe
          title="Live tracking map"
          src={`https://maps.google.com/maps?q=${mapLocation.lat},${mapLocation.lng}&z=15&output=embed`}
          loading="lazy"
        />
      </div>
      <div className="btn-row">
        <button className="primary-btn" onClick={() => setTracking(true)}>
          Start Tracking
        </button>
        <button className="secondary-btn" onClick={() => setTracking(false)}>
          Stop Tracking
        </button>
      </div>
      <div className="mini-card">
        <h4>Route Path Updates</h4>
        {locationHistory.length === 0 ? (
          <p>No tracking points yet.</p>
        ) : (
          <ul className="simple-list">
            {locationHistory.slice(-5).map((point, index) => (
              <li key={`${point.time}-${index}`}>
                {point.time} - {point.lat}, {point.lng}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default LiveTrackingPage

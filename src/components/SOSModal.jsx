import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const SOSModal = () => {
  const { clearSosAlert } = useAuth()
  const [seconds, setSeconds] = useState(3)
  const timerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [])

  const finished = seconds <= 0

  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(timerRef.current)
    }
  }, [seconds])

  const screenText = useMemo(() => {
    if (finished) return 'Help is on the way. Stay calm and move to a safe area.'
    return `SOS will trigger in ${seconds}...`
  }, [finished, seconds])

  const cancelSos = () => {
    clearInterval(timerRef.current)
    clearSosAlert()
  }

  const closeAlert = () => {
    clearSosAlert()
    navigate('/police-dashboard')
  }

  return (
    <div className="sos-overlay">
      <div className={finished ? 'sos-screen active' : 'sos-screen'}>
        <h3>Emergency Alert</h3>
        <p>{screenText}</p>
        {!finished ? (
          <button className="secondary-btn" onClick={cancelSos}>
            Cancel SOS
          </button>
        ) : (
          <button className="primary-btn" onClick={closeAlert}>
            Open Police Monitor
          </button>
        )}
      </div>
    </div>
  )
}

export default SOSModal

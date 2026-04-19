import {
  BellRing,
  FileWarning,
  MapPinned,
  PhoneCall,
  ShieldAlert,
  Siren,
  UsersRound,
} from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { notifyTrustedContacts, sendSosToPolice } from '../services/mockApi'

const cards = [
  { title: 'Live Location Tracking', icon: MapPinned, link: '/tracking' },
  { title: 'SOS Alert', icon: Siren, link: '/' },
  { title: 'Trusted Contacts', icon: UsersRound, link: '/contacts' },
  { title: 'Helpline Numbers', icon: PhoneCall, link: '/helplines' },
  { title: 'Fake Call', icon: BellRing, link: '/fake-call' },
  { title: 'Complaint Registration', icon: FileWarning, link: '/complaints' },
  { title: 'Safety Tips', icon: ShieldAlert, link: '/tips' },
]

const DashboardPage = () => {
  const { triggerSosAlert, trustedContacts } = useAuth()
  const navigate = useNavigate()

  const handleSos = useCallback(async () => {
    const fallbackLocation = {
      lat: 17.385,
      lng: 78.4867,
      source: 'IP fallback',
      ip: '103.24.22.12',
    }

    const location = await new Promise((resolve) => {
      if (!navigator.geolocation) return resolve(fallbackLocation)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: Number(position.coords.latitude.toFixed(6)),
            lng: Number(position.coords.longitude.toFixed(6)),
            source: 'GPS',
            ip: '103.24.22.12',
          })
        },
        () => resolve(fallbackLocation),
        { enableHighAccuracy: true, timeout: 3500 },
      )
    })

    const enabledContacts = trustedContacts.filter((item) => item.alertEnabled)
    await sendSosToPolice({ location, source: location.source })
    await notifyTrustedContacts(enabledContacts)

    triggerSosAlert({
      userName: 'Safe User',
      location,
      contacts: enabledContacts,
      sentToPolice: true,
    })
  }, [triggerSosAlert, trustedContacts])

  useEffect(() => {
    const onDeviceMotion = (event) => {
      const acceleration = event.accelerationIncludingGravity
      if (!acceleration) return
      const force = Math.abs(acceleration.x || 0) + Math.abs(acceleration.y || 0) + Math.abs(acceleration.z || 0)
      if (force > 45) handleSos()
    }

    window.addEventListener('devicemotion', onDeviceMotion)
    return () => window.removeEventListener('devicemotion', onDeviceMotion)
  }, [handleSos])

  const voiceSos = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) return
    const recognition = new Recognition()
    recognition.lang = 'en-US'
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase()
      if (text.includes('help me')) handleSos()
    }
    recognition.start()
  }

  return (
    <section>
      <div className="sos-center">
        <button className="sos-btn" onClick={handleSos}>
          SOS
        </button>
        <button className="text-btn" onClick={voiceSos}>
          Voice Trigger: say "Help me"
        </button>
      </div>

      <div className="card-grid">
        {cards.map((item) => {
          const Icon = item.icon
          return (
            <button key={item.title} className="tile-card" onClick={() => navigate(item.link)}>
              <Icon size={20} />
              <span>{item.title}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default DashboardPage

import { useMemo, useState } from 'react'
import { AppContext } from './AppContext'

const defaultTips = [
  {
    id: 1,
    title: 'Travel Safety',
    content: 'Share your ride details, avoid isolated routes, and keep your phone charged.',
  },
  {
    id: 2,
    title: 'Emergency Awareness',
    content: 'Memorize helpline numbers and keep emergency contacts updated regularly.',
  },
  {
    id: 3,
    title: 'Self-Defense Basics',
    content: 'Focus on awareness, distance, and quick exits. Use voice and confidence.',
  },
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [trustedContacts, setTrustedContacts] = useState([
    { id: 1, name: 'Mother', phone: '+91 90000 11111', alertEnabled: true },
    { id: 2, name: 'Sister', phone: '+91 90000 22222', alertEnabled: true },
  ])
  const [complaints, setComplaints] = useState([])
  const [sosActive, setSosActive] = useState(false)
  const [tracking, setTracking] = useState(false)
  const [locationHistory, setLocationHistory] = useState([])
  const [alerts, setAlerts] = useState([])
  const [tips] = useState(defaultTips)

  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)

  const addContact = (contact) => {
    setTrustedContacts((prev) => [...prev, { ...contact, id: Date.now() }])
  }

  const updateContact = (id, payload) => {
    setTrustedContacts((prev) => prev.map((item) => (item.id === id ? { ...item, ...payload } : item)))
  }

  const toggleContactAlert = (id) => {
    setTrustedContacts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, alertEnabled: !item.alertEnabled } : item)),
    )
  }

  const removeContact = (id) => {
    setTrustedContacts((prev) => prev.filter((item) => item.id !== id))
  }

  const addComplaint = (complaint) => {
    setComplaints((prev) => [{ ...complaint, id: Date.now(), createdAt: new Date().toISOString() }, ...prev])
  }

  const pushLocationPoint = (point) => {
    setLocationHistory((prev) => [...prev.slice(-49), point])
  }

  const triggerSosAlert = (payload) => {
    const newAlert = {
      id: Date.now(),
      ...payload,
      time: new Date().toLocaleString(),
    }
    setAlerts((prev) => [newAlert, ...prev])
    setSosActive(true)
  }

  const clearSosAlert = () => setSosActive(false)

  const value = useMemo(
    () => ({
      user,
      darkMode,
      trustedContacts,
      complaints,
      sosActive,
      tracking,
      locationHistory,
      alerts,
      tips,
      login,
      logout,
      setDarkMode,
      addContact,
      updateContact,
      removeContact,
      toggleContactAlert,
      addComplaint,
      pushLocationPoint,
      setTracking,
      triggerSosAlert,
      clearSosAlert,
    }),
    [user, darkMode, trustedContacts, complaints, sosActive, tracking, locationHistory, alerts, tips],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

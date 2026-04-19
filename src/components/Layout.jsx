import { Bell, LogOut, Moon, Shield, Sun, User } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import SOSModal from './SOSModal'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/tracking', label: 'Tracking' },
  { to: '/contacts', label: 'Contacts' },
  { to: '/helplines', label: 'Helplines' },
  { to: '/complaints', label: 'Complaints' },
  { to: '/tips', label: 'Tips' },
]

const Layout = () => {
  const { user, logout, darkMode, setDarkMode, alerts, sosActive } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={darkMode ? 'app-shell dark' : 'app-shell'}>
      <header className="topbar">
        <div className="brand">
          <Shield size={20} />
          <span>SafeSphere</span>
        </div>
        <div className="top-actions">
          <button className="icon-btn" onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-btn">
            <Bell size={18} />
            {alerts.length > 0 && <span className="badge">{alerts.length}</span>}
          </button>
          <button className="icon-btn">
            <User size={18} />
          </button>
          <button className="icon-btn" onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <nav className="nav-links">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="content-wrap">
        <h2 className="welcome">Welcome back, {user?.name || 'Guardian'}.</h2>
        <Outlet />
      </main>
      {sosActive && <SOSModal />}
    </div>
  )
}

export default Layout

import { Shield, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ identifier: '', password: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const nextErrors = {}
    if (!form.identifier.trim()) nextErrors.identifier = 'Email or phone is required'
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    login({ name: 'Safe User', identifier: form.identifier })
    navigate('/')
  }

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <Shield />
          <h1>SafeSphere</h1>
          <p>Women and Child Safety Platform</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Email / Phone Number</label>
          <input
            value={form.identifier}
            onChange={(e) => setForm((prev) => ({ ...prev, identifier: e.target.value }))}
            placeholder="name@example.com or +91 9XXXXXX"
          />
          {errors.identifier && <span className="error">{errors.identifier}</span>}

          <label>Password</label>
          <input
            value={form.password}
            type="password"
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Enter password"
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <button className="primary-btn" type="submit">
            Login
          </button>
          <button className="text-btn" type="button">
            Forgot Password
          </button>
        </form>

        <div className="social-row">
          <button className="social-btn" type="button">
            Google
          </button>
          <button className="social-btn" type="button">
            Facebook
          </button>
        </div>

        <p className="auth-footer">
          New user? <Link to="/register">Create an account</Link>
        </p>
        <p className="auth-warning">
          <TriangleAlert size={14} />
          For immediate danger, press SOS right after login.
        </p>
      </div>
    </section>
  )
}

export default LoginPage

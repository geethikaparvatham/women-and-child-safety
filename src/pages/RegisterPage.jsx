import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const nextErrors = {}
    if (form.name.trim().length < 3) nextErrors.name = 'Enter full name'
    if (!/^\+?\d{10,14}$/.test(form.phone)) nextErrors.phone = 'Enter valid phone number'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter valid email'
    if (form.password.length < 6) nextErrors.password = 'Password should be at least 6 characters'
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    navigate('/verify-otp', { state: { registrationData: form } })
  }

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Register Securely</h1>
          <p>Create your safety account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          {errors.name && <span className="error">{errors.name}</span>}

          <label>Phone Number</label>
          <input
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            placeholder="+91xxxxxxxxxx"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <label>Email</label>
          <input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          {errors.email && <span className="error">{errors.email}</span>}

          <label>Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
          {errors.password && <span className="error">{errors.password}</span>}

          <label>Confirm Password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

          <button className="primary-btn" type="submit">
            Continue to OTP Verification
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterPage

import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const OtpVerificationPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [otp, setOtp] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const formData = location.state?.registrationData

  const verifyOtp = (event) => {
    event.preventDefault()
    if (otp.length !== 6) return
    setIsSuccess(true)
    setTimeout(() => {
      login({ name: formData?.name || 'New User', email: formData?.email })
      navigate('/')
    }, 1200)
  }

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <h1>OTP Verification</h1>
          <p>Enter 6-digit OTP sent to your phone</p>
        </div>

        {!isSuccess ? (
          <form onSubmit={verifyOtp}>
            <label>One Time Password</label>
            <input maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} />
            <button className="primary-btn" type="submit">
              Verify OTP
            </button>
          </form>
        ) : (
          <div className="success-state">
            <CheckCircle2 size={48} />
            <h3>Registration Successful</h3>
            <p>Redirecting you to safety dashboard...</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default OtpVerificationPage

import React, { useState } from "react"
import BASE_URL from "./api"

const Signup = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [strength, setStrength] = useState({ width: "0%", color: "", label: "", labelColor: "" })

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    setErrors({ ...errors, [name]: "" })
    if (name === "password") calcStrength(value)
  }

  const calcStrength = (v) => {
    let score = 0
    if (v.length >= 8) score++
    if (/[A-Z]/.test(v)) score++
    if (/[0-9]/.test(v)) score++
    if (/[^A-Za-z0-9]/.test(v)) score++
    const map = [
      { width: "0%",   color: "bg-slate-200",   label: "",           labelColor: "text-slate-400" },
      { width: "25%",  color: "bg-rose-400",    label: "Weak",       labelColor: "text-rose-500" },
      { width: "50%",  color: "bg-amber-400",   label: "Fair",       labelColor: "text-amber-500" },
      { width: "75%",  color: "bg-blue-400",    label: "Good",       labelColor: "text-blue-500" },
      { width: "100%", color: "bg-emerald-500", label: "Strong 🎉",  labelColor: "text-emerald-600" },
    ]
    setStrength(map[v.length === 0 ? 0 : score] || map[1])
  }

  const validate = () => {
    const newErrors = {}
    if (data.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters."
    if (!isValidEmail(data.email))   newErrors.email = "Please enter a valid email address."
    if (data.password.length < 6)    newErrors.password = "Password must be at least 6 characters."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      alert(result.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Blobs */}
      <div className="fixed top-[-80px] left-[-80px] w-80 h-80 rounded-full bg-amber-200 opacity-40 blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-80px] right-[-60px] w-72 h-72 rounded-full bg-rose-100 opacity-35 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-3">
          Get started for free
        </p>

        <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 shadow-[8px_8px_0px_#0f172a]">
          <h2 className="font-serif text-4xl text-slate-900 mb-1">Create account</h2>
          <p className="text-slate-400 text-sm mb-8">Fill in the details below to join us today.</p>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-xs font-semibold tracking-wide uppercase text-slate-500 mb-2">
              Full name
            </label>
            <div className={`flex items-center border-2 rounded-xl px-4 py-3 gap-3 transition-colors bg-slate-50 ${
              errors.name ? "border-rose-400" : "border-slate-200 focus-within:border-slate-900"
            }`}>
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                onChange={handleChange}
                className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none"
              />
              {data.name.trim().length >= 2 && (
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            {errors.name && <p className="text-xs text-rose-500 font-medium mt-1.5">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-xs font-semibold tracking-wide uppercase text-slate-500 mb-2">
              Email address
            </label>
            <div className={`flex items-center border-2 rounded-xl px-4 py-3 gap-3 transition-colors bg-slate-50 ${
              errors.email ? "border-rose-400" : "border-slate-200 focus-within:border-slate-900"
            }`}>
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none"
              />
              {isValidEmail(data.email) && (
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            {errors.email && <p className="text-xs text-rose-500 font-medium mt-1.5">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-7">
            <label className="block text-xs font-semibold tracking-wide uppercase text-slate-500 mb-2">
              Password
            </label>
            <div className={`flex items-center border-2 rounded-xl px-4 py-3 gap-3 transition-colors bg-slate-50 ${
              errors.password ? "border-rose-400" : "border-slate-200 focus-within:border-slate-900"
            }`}>
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                onChange={handleChange}
                className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
            {/* Strength bar */}
            {data.password.length > 0 && (
              <div className="mt-2.5">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-400 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
                <p className={`text-xs mt-1 font-medium ${strength.labelColor}`}>{strength.label}</p>
              </div>
            )}
            {errors.password && <p className="text-xs text-rose-500 font-medium mt-1.5">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-slate-900 text-amber-50 font-semibold text-sm py-4 rounded-xl hover:bg-slate-700 active:scale-[0.98] transition-all tracking-wide flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Google */}
          <button type="button"
            className="w-full border-2 border-slate-200 text-slate-700 font-semibold text-sm py-3.5 rounded-xl hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5">
            {/* Google SVG icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-slate-400 text-xs mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-slate-800 font-semibold hover:text-amber-600 transition-colors">
              Sign in
            </a>
          </p>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-4 tracking-wide">
          By signing up, you agree to our{" "}
          <a href="#" className="underline hover:text-slate-600">Terms</a> &{" "}
          <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}

export default Signup
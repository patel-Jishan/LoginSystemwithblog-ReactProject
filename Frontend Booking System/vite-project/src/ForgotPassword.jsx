import React, { useState } from "react"
import BASE_URL from "./api"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }
    setError("")
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const result = await res.json()
      if (result.success) {
        setSent(true)
      } else {
        setError(result.message)
      }
    } finally {
      setLoading(false)
    }
  }

  // ── Success state ──
  if (sent) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-2xl p-8 shadow-[8px_8px_0px_#0f172a] text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl text-slate-900 mb-2">Check your inbox</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            We've sent a password reset link to{" "}
            <span className="font-semibold text-slate-700">{email}</span>
          </p>
          <p className="text-xs text-slate-400">
            Didn't receive it?{" "}
            <button
              onClick={() => setSent(false)}
              className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              Resend email
            </button>
          </p>
        </div>
      </div>
    )
  }

  // ── Form state ──
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Blobs */}
      <div className="fixed top-[-100px] right-[-60px] w-80 h-80 rounded-full bg-amber-200 opacity-35 blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-80px] left-[-60px] w-72 h-72 rounded-full bg-rose-100 opacity-40 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back link */}
        <a href="/login" className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-400 hover:text-slate-700 transition-colors mb-6 group">
          <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to login
        </a>

        <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 shadow-[8px_8px_0px_#0f172a]">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          <h2 className="font-serif text-4xl text-slate-900 mb-1">Forgot password?</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            No worries — enter your email and we'll send you a reset link right away.
          </p>

          {/* Email field */}
          <div className="mb-6">
            <label className="block text-xs font-semibold tracking-wide uppercase text-slate-500 mb-2">
              Email address
            </label>
            <div className={`flex items-center border-2 rounded-xl px-4 py-3 gap-3 transition-colors bg-slate-50 ${
              error ? "border-rose-400" : "border-slate-200 focus-within:border-slate-900"
            }`}>
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError("") }}
                className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none"
              />
              {isValidEmail(email) && (
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            {error && <p className="text-xs text-rose-500 font-medium mt-2">{error}</p>}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-slate-900 text-amber-50 font-semibold text-sm py-4 rounded-xl hover:bg-slate-700 active:scale-[0.98] transition-all tracking-wide flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Send Reset Link
              </>
            )}
          </button>

          <p className="text-center text-slate-400 text-xs mt-5">
            Remembered it?{" "}
            <a href="/login" className="text-slate-800 font-semibold hover:text-amber-600 transition-colors">
              Sign in instead
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
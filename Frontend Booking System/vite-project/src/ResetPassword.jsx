import React, { useState } from "react"
import { useParams } from "react-router-dom"
import BASE_URL from "./api"

const ResetPassword = () => {
  const { token } = useParams()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [strength, setStrength] = useState({ width: "0%", color: "", label: "", labelColor: "" })

  const calcStrength = (v) => {
    let score = 0
    if (v.length >= 8) score++
    if (/[A-Z]/.test(v)) score++
    if (/[0-9]/.test(v)) score++
    if (/[^A-Za-z0-9]/.test(v)) score++
    const map = [
      { width: "0%",   color: "bg-slate-200",   label: "",           labelColor: "text-slate-400"   },
      { width: "25%",  color: "bg-rose-400",    label: "Weak",       labelColor: "text-rose-500"    },
      { width: "50%",  color: "bg-amber-400",   label: "Fair",       labelColor: "text-amber-500"   },
      { width: "75%",  color: "bg-blue-400",    label: "Good",       labelColor: "text-blue-500"    },
      { width: "100%", color: "bg-emerald-500", label: "Strong 🎉",  labelColor: "text-emerald-600" },
    ]
    setStrength(map[v.length === 0 ? 0 : score] || map[1])
  }

  const reqs = [
    { id: "len",   label: "At least 8 characters",  ok: password.length >= 8 },
    { id: "upper", label: "One uppercase letter",    ok: /[A-Z]/.test(password) },
    { id: "num",   label: "One number",              ok: /[0-9]/.test(password) },
    { id: "sym",   label: "One special character",   ok: /[^A-Za-z0-9]/.test(password) },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (password.length < 8) newErrors.password = "Password must be at least 8 characters."
    if (confirm !== password || confirm === "") newErrors.confirm = "Passwords do not match."
    if (Object.keys(newErrors).length) { setErrors(newErrors); return }

    setErrors({})
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const result = await res.json()
      if (result.success) setSuccess(true)
      else setErrors({ api: result.message })
    } finally {
      setLoading(false)
    }
  }

  // ── Success state ──
  if (success) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-2xl p-8 shadow-[8px_8px_0px_#0f172a] text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl text-slate-900 mb-2">Password updated!</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-7">
            Your password has been reset successfully. You can now sign in with your new password.
          </p>
          <a href="/login"
            className="inline-flex items-center justify-center w-full bg-slate-900 text-amber-50 font-semibold text-sm py-4 rounded-xl hover:bg-slate-700 transition-all tracking-wide">
            Go to Sign In →
          </a>
        </div>
      </div>
    )
  }

  // ── Form state ──
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="fixed top-[-80px] right-[-60px] w-80 h-80 rounded-full bg-amber-200 opacity-40 blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-80px] left-[-60px] w-72 h-72 rounded-full bg-rose-100 opacity-35 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-3">
          Security update
        </p>

        <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 shadow-[8px_8px_0px_#0f172a]">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <h2 className="font-serif text-4xl text-slate-900 mb-1">Reset password</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Choose a strong new password. It must differ from your previous one.
          </p>

          {/* New Password */}
          <div className="mb-5">
            <label className="block text-xs font-semibold tracking-wide uppercase text-slate-500 mb-2">
              New password
            </label>
            <div className={`flex items-center border-2 rounded-xl px-4 py-3 gap-3 transition-colors bg-slate-50 ${
              errors.password ? "border-rose-400" : "border-slate-200 focus-within:border-slate-900"
            }`}>
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPw ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => { setPassword(e.target.value); calcStrength(e.target.value); setErrors({ ...errors, password: "" }) }}
                className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="text-slate-400 hover:text-slate-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-2.5">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }} />
                </div>
                <p className={`text-xs mt-1 font-medium ${strength.labelColor}`}>{strength.label}</p>
              </div>
            )}
            {errors.password && <p className="text-xs text-rose-500 font-medium mt-1.5">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-xs font-semibold tracking-wide uppercase text-slate-500 mb-2">
              Confirm password
            </label>
            <div className={`flex items-center border-2 rounded-xl px-4 py-3 gap-3 transition-colors bg-slate-50 ${
              errors.confirm ? "border-rose-400" : "border-slate-200 focus-within:border-slate-900"
            }`}>
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); setErrors({ ...errors, confirm: "" }) }}
                className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-slate-400 hover:text-slate-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
              </button>
              {confirm.length > 0 && confirm === password && (
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            {errors.confirm && <p className="text-xs text-rose-500 font-medium mt-1.5">{errors.confirm}</p>}
          </div>

          {/* Requirements checklist */}
          <div className="mb-7 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Password must include</p>
            {reqs.map((r) => (
              <div key={r.id} className={`flex items-center gap-2 text-xs transition-colors ${r.ok ? "text-emerald-600" : "text-slate-400"}`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${r.ok ? "bg-emerald-500" : "bg-slate-300"}`} />
                {r.label}
              </div>
            ))}
          </div>

          {errors.api && <p className="text-xs text-rose-500 font-medium mb-4">{errors.api}</p>}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-slate-900 text-amber-50 font-semibold text-sm py-4 rounded-xl hover:bg-slate-700 active:scale-[0.98] transition-all tracking-wide flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {loading ? "Updating..." : "Reset Password"}
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

export default ResetPassword
import React, { useState } from "react"
import BASE_URL from "./api"

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.accessToken) {
        localStorage.setItem("token", result.accessToken)
        alert("Login Successful")
      } else {
        alert(result.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      {/* Decorative blobs */}
      <div className="fixed top-[-80px] left-[-80px] w-72 h-72 rounded-full bg-amber-200 opacity-40 blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-60px] right-[-60px] w-64 h-64 rounded-full bg-rose-200 opacity-30 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-3">
          Welcome back
        </p>

        <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 shadow-[8px_8px_0px_#0f172a]">
          <h2 className="font-serif text-4xl text-slate-900 mb-1">Sign in</h2>
          <p className="text-slate-400 text-sm mb-8">Enter your credentials to continue</p>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-xs font-semibold tracking-wide uppercase text-slate-500 mb-2">
              Email address
            </label>
            <div className="flex items-center border-2 border-slate-200 rounded-xl px-4 py-3 gap-3 focus-within:border-slate-900 transition-colors bg-slate-50">
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
            </div>
          </div>

          {/* Password */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold tracking-wide uppercase text-slate-500">
                Password
              </label>
              <a href="/forgot" className="text-xs text-amber-600 font-semibold hover:text-amber-700 transition-colors">
                Forgot?
              </a>
            </div>
            <div className="flex items-center border-2 border-slate-200 rounded-xl px-4 py-3 gap-3 focus-within:border-slate-900 transition-colors bg-slate-50">
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={handleChange}
                className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-slate-900 text-amber-50 font-semibold text-sm py-4 rounded-xl hover:bg-slate-700 active:scale-[0.98] transition-all tracking-wide flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login →"}
          </button>

          <p className="text-center text-slate-400 text-xs mt-5">
            Don't have an account?{" "}
            <a href="/" className="text-slate-800 font-semibold hover:text-amber-600 transition-colors">
              Sign up
            </a>
          </p>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-5 tracking-wide">
          Protected by 256-bit SSL encryption
        </p>
      </div>
    </div>
  )
}

export default Login
import { useEffect } from "react"
import BASE_URL from "./api"
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        alert("No token found")
        return navigate("/login")
      }

      const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const result = await res.json()

      alert(result.message)

      // ✅ token remove
      localStorage.removeItem("token")

      // ✅ redirect
      navigate("/login")
    }

    logoutUser()
  }, [])

  return <h2>Logging out...</h2>
}

export default Logout
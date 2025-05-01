"use client"

/**
 * Login Component
 * Handles user authentication
 */

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Fish } from "lucide-react"

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await axios.post("/api/auth/login", formData)

      // Save token to localStorage
      localStorage.setItem("token", res.data.token)

      // Set auth state
      setAuth(true)

      // Redirect to dashboard
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-ocean-50 to-ocean-100 dark:from-ocean-900 dark:to-ocean-950 p-4">
      <Card className="w-full max-w-md border-ocean-200 dark:border-ocean-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Fish className="h-12 w-12 text-ocean-600 dark:text-ocean-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-ocean-800 dark:text-ocean-100">Welcome Back</CardTitle>
          <CardDescription className="text-ocean-600 dark:text-ocean-300">
            Sign in to your Meenavani account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-ocean-800 dark:text-ocean-100">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                required
                className="border-ocean-200 dark:border-ocean-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-ocean-800 dark:text-ocean-100">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                required
                className="border-ocean-200 dark:border-ocean-700"
              />
            </div>
            <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700 text-white" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-ocean-600 dark:text-ocean-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-ocean-700 dark:text-ocean-400 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login

"use client"

/**
 * Register Component
 * Handles user registration
 */

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Fish } from "lucide-react"

const Register = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "fisher",
    location: "",
    phone: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { name, email, password, password2, role, location, phone } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onRoleChange = (value) => {
    setFormData({ ...formData, role: value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== password2) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        role,
        location,
        phone,
      })

      // Save token to localStorage
      localStorage.setItem("token", res.data.token)

      // Set auth state
      setAuth(true)

      // Redirect to dashboard
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed. Please try again.")
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
          <CardTitle className="text-2xl font-bold text-ocean-800 dark:text-ocean-100">Create Account</CardTitle>
          <CardDescription className="text-ocean-600 dark:text-ocean-300">
            Join Meenavani - Voice of the Fishers
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
              <Label htmlFor="name" className="text-ocean-800 dark:text-ocean-100">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                required
                className="border-ocean-200 dark:border-ocean-700"
              />
            </div>
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
            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="password2" className="text-ocean-800 dark:text-ocean-100">
                  Confirm Password
                </Label>
                <Input
                  id="password2"
                  name="password2"
                  type="password"
                  value={password2}
                  onChange={onChange}
                  required
                  className="border-ocean-200 dark:border-ocean-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-ocean-800 dark:text-ocean-100">
                I am a
              </Label>
              <Select value={role} onValueChange={onRoleChange}>
                <SelectTrigger id="role" className="border-ocean-200 dark:border-ocean-700">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fisher">Fisher</SelectItem>
                  <SelectItem value="buyer">Buyer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-ocean-800 dark:text-ocean-100">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={location}
                onChange={onChange}
                className="border-ocean-200 dark:border-ocean-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-ocean-800 dark:text-ocean-100">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
                className="border-ocean-200 dark:border-ocean-700"
              />
            </div>
            <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700 text-white" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-ocean-600 dark:text-ocean-300">
            Already have an account?{" "}
            <Link to="/login" className="text-ocean-700 dark:text-ocean-400 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register

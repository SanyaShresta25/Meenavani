"use client"

/**
 * Weather Dashboard Component
 * Displays marine weather data and forecasts
 *
 * This component:
 * 1. Fetches weather data from the backend API
 * 2. Displays current conditions, forecasts, and marine data
 * 3. Provides tabs for different types of weather information
 * 4. Visualizes data with appropriate icons and formatting
 */

import { useState, useEffect } from "react"
import axios from "axios"
import { Cloud, Compass, Droplets, Waves, Wind } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { WeatherWidget } from "./WeatherWidget"

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [marineData, setMarineData] = useState(null)
  const [tideData, setTideData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch all weather data on component mount
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      setError("")

      try {
        // Fetch current weather
        const currentRes = await axios.get("/api/weather/current")
        setWeatherData(currentRes.data)

        // Fetch forecast
        const forecastRes = await axios.get("/api/weather/forecast")
        setForecastData(forecastRes.data)

        // Fetch marine conditions
        const marineRes = await axios.get("/api/weather/marine")
        setMarineData(marineRes.data)

        // Fetch tide information
        const tideRes = await axios.get("/api/weather/tides")
        setTideData(tideRes.data)
      } catch (err) {
        console.error("Error fetching weather data:", err)
        setError("Failed to load weather data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  // If loading, show loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-ocean-800 dark:text-ocean-100 mb-6">Marine Weather</h1>
        <div className="text-ocean-600 dark:text-ocean-300">Loading weather data...</div>
      </div>
    )
  }

  // If error, show error message
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-ocean-800 dark:text-ocean-100 mb-6">Marine Weather</h1>
        <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-md">{error}</div>
      </div>
    )
  }

  // If no data yet, return null
  if (!weatherData || !forecastData || !marineData || !tideData) {
    return null
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-ocean-800 dark:text-ocean-100">Marine Weather</h1>
        <div className="text-sm text-ocean-600 dark:text-ocean-300">Last updated: {new Date().toLocaleString()}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-ocean-200 overflow-hidden dark:border-ocean-700">
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-50 to-ocean-100 dark:from-ocean-900 dark:to-ocean-950 opacity-50"></div>
          <CardHeader className="relative">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-ocean-600" />
              <CardTitle className="text-ocean-800 dark:text-ocean-100">Current Conditions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-ocean-800 dark:text-white">{weatherData.current.temp}°C</div>
                <div className="text-ocean-600 dark:text-ocean-300">{weatherData.current.condition}</div>
              </div>
              <Cloud className="h-12 w-12 text-ocean-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-ocean-200 overflow-hidden dark:border-ocean-700">
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-50 to-ocean-100 dark:from-ocean-900 dark:to-ocean-950 opacity-50"></div>
          <CardHeader className="relative">
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-ocean-600" />
              <CardTitle className="text-ocean-800 dark:text-ocean-100">Wind</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-ocean-800 dark:text-white">
                  {weatherData.current.wind.speed} km/h
                </div>
                <div className="text-ocean-600 dark:text-ocean-300">{weatherData.current.wind.direction}</div>
              </div>
              <Compass className="h-12 w-12 text-ocean-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-ocean-200 overflow-hidden dark:border-ocean-700">
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-50 to-ocean-100 dark:from-ocean-900 dark:to-ocean-950 opacity-50"></div>
          <CardHeader className="relative">
            <div className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-ocean-600" />
              <CardTitle className="text-ocean-800 dark:text-ocean-100">Wave Height</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-ocean-800 dark:text-white">
                  {weatherData.current.waves.height} m
                </div>
                <div className="text-ocean-600 dark:text-ocean-300">Period: {weatherData.current.waves.period}s</div>
              </div>
              <Waves className="h-12 w-12 text-ocean-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-ocean-200 overflow-hidden dark:border-ocean-700">
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-50 to-ocean-100 dark:from-ocean-900 dark:to-ocean-950 opacity-50"></div>
          <CardHeader className="relative">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-ocean-600" />
              <CardTitle className="text-ocean-800 dark:text-ocean-100">Humidity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-ocean-800 dark:text-white">{weatherData.current.humidity}%</div>
                <div className="text-ocean-600 dark:text-ocean-300">Visibility: {weatherData.current.visibility}km</div>
              </div>
              <Droplets className="h-12 w-12 text-ocean-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList className="bg-ocean-100 dark:bg-ocean-800">
          <TabsTrigger
            value="forecast"
            className="text-ocean-800 dark:text-ocean-100 data-[state=active]:bg-white dark:data-[state=active]:bg-ocean-700"
          >
            5-Day Forecast
          </TabsTrigger>
          <TabsTrigger
            value="marine"
            className="text-ocean-800 dark:text-ocean-100 data-[state=active]:bg-white dark:data-[state=active]:bg-ocean-700"
          >
            Marine Conditions
          </TabsTrigger>
          <TabsTrigger
            value="tides"
            className="text-ocean-800 dark:text-ocean-100 data-[state=active]:bg-white dark:data-[state=active]:bg-ocean-700"
          >
            Tides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forecast">
          <Card className="border-ocean-200 dark:border-ocean-700">
            <CardHeader>
              <CardTitle className="text-ocean-800 dark:text-ocean-100">5-Day Weather Forecast</CardTitle>
              <CardDescription className="text-ocean-700 dark:text-ocean-300">
                Extended forecast for coastal Karnataka
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherWidget weatherData={weatherData} forecastData={forecastData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marine">
          <Card className="border-ocean-200 dark:border-ocean-700">
            <CardHeader>
              <CardTitle className="text-ocean-800 dark:text-ocean-100">Marine Conditions</CardTitle>
              <CardDescription className="text-ocean-700 dark:text-ocean-300">
                Detailed sea conditions and warnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-ocean-50 dark:bg-ocean-900/50 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white dark:bg-ocean-800 p-3 rounded-md">
                    <Waves className="h-8 w-8 text-ocean-500" />
                    <div>
                      <div className="font-medium text-ocean-800 dark:text-ocean-100">Sea State</div>
                      <div className="text-lg font-bold text-ocean-800 dark:text-white">{marineData.seaState}</div>
                      <div className="text-sm text-ocean-600 dark:text-ocean-300">
                        Wave height {marineData.waveHeight}m
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-ocean-800 p-3 rounded-md">
                    <Compass className="h-8 w-8 text-ocean-500" />
                    <div>
                      <div className="font-medium text-ocean-800 dark:text-ocean-100">Current Direction</div>
                      <div className="text-lg font-bold text-ocean-800 dark:text-white">
                        {marineData.currentDirection}
                      </div>
                      <div className="text-sm text-ocean-600 dark:text-ocean-300">
                        Speed: {marineData.currentSpeed} knots
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-ocean-800 p-3 rounded-md">
                    <Cloud className="h-8 w-8 text-ocean-500" />
                    <div>
                      <div className="font-medium text-ocean-800 dark:text-ocean-100">Visibility</div>
                      <div className="text-lg font-bold text-ocean-800 dark:text-white">{marineData.visibility}</div>
                      <div className="text-sm text-ocean-600 dark:text-ocean-300">8-10 km</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-ocean-800 p-3 rounded-md">
                    <Droplets className="h-8 w-8 text-ocean-500" />
                    <div>
                      <div className="font-medium text-ocean-800 dark:text-ocean-100">Water Temperature</div>
                      <div className="text-lg font-bold text-ocean-800 dark:text-white">{marineData.waterTemp}°C</div>
                      <div className="text-sm text-ocean-600 dark:text-ocean-300">Suitable for fishing</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-ocean-800 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-ocean-800 dark:text-ocean-100 mb-2">Marine Warnings</h3>
                  <p className="text-ocean-700 dark:text-ocean-300">
                    No significant marine warnings in effect. Small craft advisory may be issued tomorrow due to
                    increasing winds.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tides">
          <Card className="border-ocean-200 dark:border-ocean-700">
            <CardHeader>
              <CardTitle className="text-ocean-800 dark:text-ocean-100">Tide Information</CardTitle>
              <CardDescription className="text-ocean-700 dark:text-ocean-300">
                Today's tide schedule for Mangalore Harbor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tideData.tides.map((tide, index) => (
                    <div key={index} className="bg-ocean-50 dark:bg-ocean-900/50 p-4 rounded-lg text-center">
                      <div className="text-sm text-ocean-600 dark:text-ocean-300">{tide.type} Tide</div>
                      <div className="text-xl font-bold text-ocean-800 dark:text-white">{tide.time}</div>
                      <div className="text-sm text-ocean-600 dark:text-ocean-300">{tide.height}m</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white dark:bg-ocean-800 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-ocean-800 dark:text-ocean-100 mb-2">Fishing Advisory</h3>
                  <p className="text-ocean-700 dark:text-ocean-300">
                    Best fishing times today are between 5:00 AM - 9:00 AM and 4:00 PM - 7:00 PM, coinciding with tidal
                    changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default WeatherDashboard

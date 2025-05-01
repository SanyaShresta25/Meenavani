import { Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react"

const WeatherWidget = ({ weatherData, forecastData }) => {
  // Get appropriate weather icon based on condition
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "rainy":
        return <CloudRain className="h-6 w-6 text-ocean-500" />
      case "sunny":
        return <Sun className="h-6 w-6 text-ocean-500" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-ocean-500" />
      case "partly cloudy":
        return <Cloud className="h-6 w-6 text-ocean-500" />
      default:
        return <Cloud className="h-6 w-6 text-ocean-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-ocean-50 dark:bg-ocean-900/50 rounded-lg">
        <div className="flex-1 flex items-center gap-4">
          {getWeatherIcon(weatherData.current.condition)}
          <div>
            <div className="text-3xl font-bold text-ocean-800 dark:text-ocean-100">{weatherData.current.temp}°C</div>
            <div className="text-ocean-600 dark:text-ocean-300">{weatherData.current.condition}</div>
          </div>
        </div>

        <div className="flex flex-1 gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-white/80 dark:bg-ocean-800/80 p-2 rounded-md">
            <Wind className="h-4 w-4 text-ocean-500" />
            <div>
              <div className="font-medium text-ocean-800 dark:text-ocean-100">
                {weatherData.current.wind.speed} km/h
              </div>
              <div className="text-xs text-ocean-600 dark:text-ocean-300">
                Wind ({weatherData.current.wind.direction})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/80 dark:bg-ocean-800/80 p-2 rounded-md">
            <Cloud className="h-4 w-4 text-ocean-500" />
            <div>
              <div className="font-medium text-ocean-800 dark:text-ocean-100">{weatherData.current.waves.height}m</div>
              <div className="text-xs text-ocean-600 dark:text-ocean-300">Wave Height</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/80 dark:bg-ocean-800/80 p-2 rounded-md">
            <Droplets className="h-4 w-4 text-ocean-500" />
            <div>
              <div className="font-medium text-ocean-800 dark:text-ocean-100">{weatherData.current.humidity}%</div>
              <div className="text-xs text-ocean-600 dark:text-ocean-300">Humidity</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {forecastData.forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-2 border border-ocean-200 dark:border-ocean-800 rounded-md bg-white/80 dark:bg-ocean-800/50"
          >
            <div className="font-medium text-ocean-700 dark:text-ocean-200">{day.day}</div>
            {getWeatherIcon(day.condition)}
            <div className="text-lg font-bold text-ocean-800 dark:text-ocean-100">{day.temp}°C</div>
            <div className="text-xs text-ocean-600 dark:text-ocean-300 flex items-center gap-1">
              <Wind className="h-3 w-3" /> {day.wind} km/h
            </div>
            <div className="text-xs text-ocean-600 dark:text-ocean-300 flex items-center gap-1">
              <Cloud className="h-3 w-3" /> {day.waves}m
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherWidget

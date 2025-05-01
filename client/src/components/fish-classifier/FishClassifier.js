"use client"

/**
 * Fish Classifier Component
 * Uses CNN-based model to identify fish from images
 *
 * This component:
 * 1. Allows users to upload or capture fish images
 * 2. Sends images to the backend for classification
 * 3. Displays classification results with confidence scores
 * 4. Shows additional information about the identified fish
 */

import { useState } from "react"
import axios from "axios"
import { Camera, Fish, Upload } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Progress } from "../ui/progress"

const FishClassifier = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState("")

  // Function to analyze the image using the CNN-based classifier
  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setError("")

    try {
      // Create form data to send the image
      const formData = new FormData()

      // If selectedImage is a File object (from upload)
      if (selectedImage instanceof File) {
        formData.append("image", selectedImage)
      } else {
        // If it's a data URL (from camera), convert to blob
        const response = await fetch(selectedImage)
        const blob = await response.blob()
        formData.append("image", blob, "camera-image.jpg")
      }

      // Get the JWT token
      const token = localStorage.getItem("token")

      // Send the image to the backend for classification
      const res = await axios.post("/api/fish/classify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      })

      // Set the results
      setResults(res.data)
    } catch (err) {
      console.error("Error classifying fish:", err)
      setError("Failed to analyze image. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(file)
        setResults(null)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle camera capture
  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    // For now, we'll just use a placeholder
    setSelectedImage("/placeholder.svg?height=300&width=400")
    setResults(null)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-ocean-800 dark:text-ocean-100">Fish Classifier</h1>
        <Button variant="outline" className="border-ocean-300 text-ocean-700 dark:text-ocean-300">
          <Fish className="mr-2 h-4 w-4" />
          View Fish Library
        </Button>
      </div>

      <Card className="border-ocean-200 dark:border-ocean-700">
        <CardHeader>
          <CardTitle className="text-ocean-800 dark:text-ocean-100">Identify Fish Species</CardTitle>
          <CardDescription className="text-ocean-600 dark:text-ocean-300">
            Upload or take a photo of a fish to identify its species and get information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <Tabs defaultValue="upload" className="space-y-4">
            <TabsList className="bg-ocean-100 dark:bg-ocean-800">
              <TabsTrigger
                value="upload"
                className="text-ocean-800 dark:text-ocean-100 data-[state=active]:bg-white dark:data-[state=active]:bg-ocean-700"
              >
                Upload Image
              </TabsTrigger>
              <TabsTrigger
                value="camera"
                className="text-ocean-800 dark:text-ocean-100 data-[state=active]:bg-white dark:data-[state=active]:bg-ocean-700"
              >
                Use Camera
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="flex items-center justify-center border-2 border-dashed border-ocean-200 dark:border-ocean-700 rounded-lg p-6 h-64">
                {selectedImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={selectedImage instanceof File ? URL.createObjectURL(selectedImage) : selectedImage}
                      alt="Selected fish"
                      className="w-full h-full object-contain"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 border-ocean-300 text-ocean-700 dark:text-ocean-300"
                      onClick={() => setSelectedImage(null)}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-10 w-10 text-ocean-500 dark:text-ocean-400" />
                    <p className="text-sm text-ocean-600 dark:text-ocean-300">
                      Drag and drop an image, or click to browse
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-ocean-300 text-ocean-700 dark:text-ocean-300"
                        as="span"
                      >
                        Select Image
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="camera" className="space-y-4">
              <div className="flex items-center justify-center border-2 border-dashed border-ocean-200 dark:border-ocean-700 rounded-lg p-6 h-64">
                {selectedImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Captured fish"
                      className="w-full h-full object-contain"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 border-ocean-300 text-ocean-700 dark:text-ocean-300"
                      onClick={() => setSelectedImage(null)}
                    >
                      Retake
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="h-10 w-10 text-ocean-500 dark:text-ocean-400" />
                    <p className="text-sm text-ocean-600 dark:text-ocean-300">
                      Take a photo of the fish for identification
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-ocean-300 text-ocean-700 dark:text-ocean-300"
                      onClick={handleCameraCapture}
                    >
                      Capture Photo
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={analyzeImage}
            disabled={!selectedImage || isAnalyzing}
            className="bg-ocean-600 hover:bg-ocean-700 text-white"
          >
            {isAnalyzing ? "Analyzing..." : "Identify Fish"}
          </Button>
        </CardFooter>
      </Card>

      {isAnalyzing && (
        <Card className="border-ocean-200 dark:border-ocean-700">
          <CardHeader>
            <CardTitle className="text-ocean-800 dark:text-ocean-100">Analyzing Image</CardTitle>
            <CardDescription className="text-ocean-600 dark:text-ocean-300">
              Our AI is identifying the fish species...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={45} className="h-2 bg-ocean-200 dark:bg-ocean-700" />
          </CardContent>
        </Card>
      )}

      {results && (
        <Card className="border-ocean-200 dark:border-ocean-700">
          <CardHeader>
            <CardTitle className="text-ocean-800 dark:text-ocean-100">Identification Results</CardTitle>
            <CardDescription className="text-ocean-600 dark:text-ocean-300">
              Here's what we found based on the image
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-ocean-800 dark:text-ocean-100 mb-2">{results.species}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Progress value={results.confidence} className="h-2 flex-1 bg-ocean-200 dark:bg-ocean-700" />
                  <span className="text-sm font-medium text-ocean-700 dark:text-ocean-300">
                    {results.confidence}% match
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-ocean-800 dark:text-ocean-100">Other possibilities:</h4>
                  {results.alternatives.map((alt, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Progress value={alt.confidence} className="h-2 flex-1 bg-ocean-200 dark:bg-ocean-700" />
                      <span className="text-sm text-ocean-700 dark:text-ocean-300">
                        {alt.name} ({alt.confidence}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="font-medium text-ocean-800 dark:text-ocean-100">Local Name</h4>
                  <p className="text-ocean-700 dark:text-ocean-300">{results.info.localName}</p>
                </div>
                <div>
                  <h4 className="font-medium text-ocean-800 dark:text-ocean-100">Season</h4>
                  <p className="text-ocean-700 dark:text-ocean-300">{results.info.season}</p>
                </div>
                <div>
                  <h4 className="font-medium text-ocean-800 dark:text-ocean-100">Sustainability</h4>
                  <p className="text-ocean-700 dark:text-ocean-300">{results.info.sustainability}</p>
                </div>
                <div>
                  <h4 className="font-medium text-ocean-800 dark:text-ocean-100">Nutritional Value</h4>
                  <p className="text-ocean-700 dark:text-ocean-300">{results.info.nutritionalValue}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="border-ocean-300 text-ocean-700 dark:text-ocean-300">
              View in Fish Library
            </Button>
            <Button variant="outline" className="border-ocean-300 text-ocean-700 dark:text-ocean-300">
              Share Results
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default FishClassifier

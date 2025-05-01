# Meenavani - Voice of the Fishers

A comprehensive MERN stack application for fishers with weather forecasts, fish identification, market access, and safety alerts.

## Features

- 🐟 **Fish Image Classification**: CNN-based model for identifying fish species from images
- ☁️ **Weather Forecast**: Marine weather data with forecasts, tides, and fishing conditions
- 🛒 **Fish Market**: Platform for fishers to list their catch and buyers to purchase
- ⚠️ **Safety Alerts**: Real-time alerts for weather warnings and marine conditions
- 📚 **Fish Library**: Comprehensive database of fish species with details
- 📊 **Analytics**: Insights on catch trends, market prices, and fishing forecasts
- 🔐 **User Authentication**: Secure login and registration system

## Tech Stack

- **MongoDB**: Database for storing user data, fish information, market listings, and alerts
- **Express**: Backend framework for handling API requests
- **React**: Frontend library for building the user interface
- **Node.js**: Runtime environment for the backend
- **TensorFlow.js**: For the fish classification CNN model
- **JWT**: For secure authentication
- **Tailwind CSS**: For styling with a focus on the ocean/fishing theme

## Project Structure

\`\`\`
meenavani/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # UI components
│       ├── pages/          # Page components
│       ├── context/        # React context
│       └── utils/          # Utility functions
├── models/                 # Mongoose models
├── routes/                 # Express routes
├── middleware/             # Express middleware
├── uploads/                # Uploaded images
├── server.js               # Express server
└── package.json            # Project dependencies
\`\`\`

## Workflow

1. **User Authentication**:
   - Users register/login to access the application
   - JWT tokens are used for secure authentication

2. **Dashboard**:
   - Overview of weather, market, and alerts
   - Quick access to all features

3. **Fish Classification**:
   - Upload or capture fish image
   - CNN model identifies the fish species
   - Displays information about the identified fish

4. **Weather Forecast**:
   - Current marine conditions
   - 5-day forecast
   - Tide information
   - Fishing advisories

5. **Market**:
   - Fishers can list their catch with details
   - Buyers can browse and contact sellers
   - Filter and search functionality

6. **Alerts**:
   - Weather warnings
   - Marine safety alerts
   - Market demand notifications

7. **Fish Library**:
   - Comprehensive database of fish species
   - Details on habitat, season, and cooking methods

8. **Analytics**:
   - Catch trends
   - Market price analysis
   - Forecast accuracy

## Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/meenavani.git
   cd meenavani
   \`\`\`

2. Install server dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Install client dependencies:
   \`\`\`
   cd client
   npm install
   \`\`\`

4. Create a `.env` file in the root directory with:
   \`\`\`
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   \`\`\`

5. Run the development server:
   \`\`\`
   # In the root directory
   npm run dev
   \`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

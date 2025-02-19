# Manas-AI-Assistent

## Overview
Manas-AI-Assistent is a React Native application designed to provide AI-driven chat capabilities. The app leverages various technologies and libraries to deliver a seamless and responsive user experience.

## Features
- AI-powered chat functionality
- Navigation using React Navigation
- Customizable themes with React Native Paper
- Expo support for easy development and deployment

## Installation
To get started with the development of Manas-AI-Assistent, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/mdkulkarni2005/Manas-AI-Assistent.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Manas-AI-Assistent
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

## Configuration
The project uses a `.env` file for configuration. Make sure to set the necessary environment variables in the `.env` file.

Example `.env` file:
```dotenv
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

## Project Structure
The project structure is organized as follows:
```
Manas-AI-Assistent/
│
├── assets/                  # Assets such as icons, images, etc.
│   ├── adaptive-icon.png
│   ├── favicon.png
│   └── icon.png
│
├── src/                     # Source files
│   ├── components/          # React components
│   ├── config/              # Configuration files
│   ├── screens/             # Screen components for navigation
│   │   └── ChatScreen.js
│   └── App.js               # Main application file
│
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── app.json                 # Expo configuration
└── package.json             # NPM package configuration
```

## Contributing
Contributions are welcome! If you have any suggestions or improvements, feel free to create an issue or submit a pull request.

## License
This project is licensed under the MIT License.

## Author
**mdkulkarni2005**

- GitHub: [mdkulkarni2005](https://github.com/mdkulkarni2005)

Feel free to reach out if you have any questions or need further assistance.

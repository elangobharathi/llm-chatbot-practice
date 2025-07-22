# LLM Chatbot Practice

A full-stack LLM chatbot application for practicing with local language models. This project consists of a React TypeScript frontend and an Express.js backend that interfaces with local LLM APIs.

## 🚀 Features

- **Modern Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Proxy Backend**: Express.js server with CORS handling for local LLMs
- **Configurable**: Easy API endpoint and model configuration
- **Responsive UI**: Beautiful, mobile-friendly chat interface
- **Local LLM Support**: Works with Ollama, LocalAI, LM Studio, and other OpenAI-compatible APIs
- **Real-time Chat**: Smooth chat experience with message history
- **Temperature Control**: Adjustable creativity levels
- **Debug Logging**: Comprehensive logging for troubleshooting

## 🏗️ Architecture

```
┌─────────────────┐    HTTP     ┌─────────────────┐    HTTP     ┌─────────────────┐
│                 │ ──────────> │                 │ ──────────> │                 │
│   Frontend      │             │   Backend       │             │   Local LLM     │
│   (React)       │             │   (Express)     │             │   API Server    │
│   Port: 3000    │ <────────── │   Port: 3001    │ <────────── │   Port: 1234    │
│                 │             │                 │             │                 │
└─────────────────┘             └─────────────────┘             └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **TanStack React Query** for API state management
- **Marked** for markdown rendering
- **DOMPurify** for HTML sanitization

### Backend

- **Express.js** web server
- **CORS** middleware for cross-origin requests
- **Axios** for HTTP requests to LLM APIs
- **dotenv** for environment configuration
- **Debug** package for comprehensive logging

## 📋 Prerequisites

- **Node.js** 16 or higher
- **npm** or **yarn**
- A local LLM API server (Ollama, LocalAI, LM Studio, etc.)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd llm-chatbot-practice
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd back-end
npm install

# Install frontend dependencies
cd ../front-end
npm install
```

### 3. Start Your Local LLM Server

Make sure you have a local LLM server running. Common options:

- **Ollama**: `ollama serve` (default port: 11434)
- **LM Studio**: Start local server (default port: 1234)
- **LocalAI**: Start server (default port: 8080)

### 4. Configure Backend (Optional)

Create a `.env` file in the `back-end` directory:

```bash
cd back-end
cp .env.example .env  # If example exists, or create manually
```

Example `.env`:

```bash
PORT=3001
LLM_ENDPOINT=http://localhost:1234/v1/chat/completions
MODELS_ENDPOINT=http://localhost:1234/v1/models
LLM_API_KEY=not-needed
DEFAULT_MODEL=local-model
```

### 5. Start the Application

**Terminal 1 - Backend:**

```bash
cd back-end
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd front-end
npm run dev
```

### 6. Access the Application

Open your browser and navigate to:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 📁 Project Structure

```
llm-chatbot-practice/
├── back-end/                 # Express.js backend server
│   ├── server.js            # Main server file
│   ├── config.js            # Configuration management
│   ├── package.json         # Backend dependencies
│   └── README.md            # Backend-specific documentation
│
├── front-end/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── features/        # Feature-specific components
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   └── App.tsx          # Main app component
│   ├── package.json         # Frontend dependencies
│   └── README.md            # Frontend-specific documentation
│
└── README.md                # This file
```

## 🔧 Development

### Backend Development

```bash
cd back-end
npm run dev      # Start with auto-reload
npm run debug    # Start with debug logging
npm start        # Production mode
```

### Frontend Development

```bash
cd front-end
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Debug Logging

Enable detailed backend logging:

```bash
cd back-end
DEBUG=llm-backend:* npm run dev  # All debug logs
DEBUG=llm-backend:llm npm run dev  # LLM-specific logs only
```

## 📖 Detailed Documentation

For more detailed setup and configuration instructions:

- **Backend**: See [`back-end/README.md`](./back-end/README.md)
- **Frontend**: See [`front-end/README.md`](./front-end/README.md)

## 🔗 API Endpoints

The backend provides these endpoints:

- `GET /api/models` - List available models
- `POST /api/chat` - Chat completions
- `POST /api/completions` - Text completions
- `GET /health` - Health check

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend is running and accessible
2. **LLM Connection**: Verify your local LLM server is running and accessible
3. **Port Conflicts**: Make sure ports 3000 and 3001 are available

### Getting Help

1. Check the individual README files for component-specific issues
2. Enable debug logging in the backend for detailed error information
3. Verify your local LLM API is responding correctly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the individual component LICENSE files for details.

## 🙏 Acknowledgments

- Built for practicing with local LLM APIs
- Inspired by modern chat interfaces
- Uses OpenAI-compatible API format for broad compatibility

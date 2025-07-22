# LLM Chat App

A modern React TypeScript chat application for interacting with your local LLM model API. Built with Vite, Tailwind CSS, and designed with a beautiful, responsive UI.

## Features

- 🚀 **Fast Development**: Built with Vite for lightning-fast hot reload
- 🎨 **Modern UI**: Beautiful interface with Tailwind CSS
- 🔧 **Configurable**: Easy API endpoint configuration
- 💬 **Chat Interface**: Intuitive chat experience with message history
- 🌡️ **Temperature Control**: Adjust creativity levels
- 🔐 **Secure**: Optional API key support
- 📱 **Responsive**: Works great on desktop and mobile

## Prerequisites

- Node.js 16+
- npm or yarn
- A local LLM API server (like Ollama, LocalAI, or similar)

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

4. **Configure your API:**
   Click the "Settings" button and configure your local LLM API endpoint.

## API Configuration

### Default Settings

- **API URL**: `http://localhost:8000/v1/chat/completions`
- **Model**: `gpt-3.5-turbo`
- **Temperature**: `0.7`
- **Max Tokens**: `1000`

### Common Local LLM APIs

#### Ollama

```
API URL: http://localhost:11434/v1/chat/completions
Model: llama2, codellama, etc.
API Key: (leave empty)
```

#### LocalAI

```
API URL: http://localhost:8080/v1/chat/completions
Model: your-model-name
API Key: (optional)
```

#### LM Studio

```
API URL: http://localhost:1234/v1/chat/completions
Model: local-model
API Key: (leave empty)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatHeader.tsx   # Header with controls
│   ├── ChatMessages.tsx # Message display
│   ├── ChatInput.tsx    # Message input
│   └── SettingsModal.tsx# API configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   └── api.ts          # API communication
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## API Format

The app expects your LLM API to follow the OpenAI chat completions format:

**Request:**

```json
{
  "model": "your-model",
  "messages": [{ "role": "user", "content": "Hello!" }],
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**Response:**

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      }
    }
  ]
}
```

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure your LLM API server allows requests from `http://localhost:3000`.

### Connection Refused

- Verify your LLM API server is running
- Check the API URL in settings
- Ensure the port is correct

### Authentication Errors

- Check if your API requires an API key
- Verify the API key format in settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this for your own projects!
# llm-chatbot-practice

# LLM Chat App Backend

A no-CORS Express.js backend server for exposing local LLM models via REST API.

## Features

- 🚀 Express.js server with CORS disabled for all origins
- 💬 Chat completions endpoint (`/api/chat`)
- 📝 Text completions endpoint (`/api/completions`)
- 📋 Models listing endpoint (`/api/models`)
- 🔧 Configurable LLM endpoints
- ⚡ Support for various local LLM servers
- 🐛 Comprehensive debug logging

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment (Optional)

Create a `.env` file with your LLM server settings:

```bash
# Server Configuration
PORT=3001

# LLM Configuration
LLM_ENDPOINT=http://localhost:1234/v1/chat/completions
MODELS_ENDPOINT=http://localhost:1234/v1/models
LLM_API_KEY=not-needed
DEFAULT_MODEL=local-model
```

### 3. Start the Server

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev

# Debug mode (with detailed logging)
npm run debug
```

The server will start on `http://localhost:3001`

## Debugging

The server uses the `debug` package for detailed logging. There are three debug namespaces:

- `llm-backend:server`: Server startup and configuration
- `llm-backend:request`: HTTP request/response logging
- `llm-backend:llm`: LLM-specific operations

### Enable Debug Logging

To enable debug logging, set the DEBUG environment variable:

```bash
# Enable all debug logs
DEBUG=llm-backend:* npm run dev

# Enable specific namespaces
DEBUG=llm-backend:llm npm run dev
DEBUG=llm-backend:request npm run dev

# Enable multiple namespaces
DEBUG=llm-backend:server,llm-backend:llm npm run dev
```

### Debug Output Examples

```
llm-backend:server 🚀 LLM Backend server running on port 3001 +0ms
llm-backend:request POST /api/chat - Request received +123ms
llm-backend:llm Processing chat request { model: 'local-model', temperature: 0.7 } +2ms
llm-backend:llm Sending request to LLM endpoint: http://localhost:1234/v1/chat/completions +1ms
llm-backend:llm LLM response received { model: 'gpt-3.5-turbo', tokens: 150 } +789ms
llm-backend:request POST /api/chat - Response sent (200) - 915ms +0ms
```

## API Endpoints

### Health Check

```

```

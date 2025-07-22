require("dotenv").config();

const config = {
  server: {
    port: process.env.PORT || 3001,
  },
  llm: {
    endpoint:
      process.env.LLM_ENDPOINT || "http://localhost:1234/v1/chat/completions",
    modelsEndpoint:
      process.env.MODELS_ENDPOINT || "http://localhost:1234/v1/models",
    apiKey: process.env.LLM_API_KEY || "not-needed",
    defaultModel: process.env.DEFAULT_MODEL || "local-model",
    timeout: parseInt(process.env.LLM_TIMEOUT) || 30000,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  },
};

module.exports = config;

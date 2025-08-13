const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const debug = require("debug")("llm-backend:server");
const debugRequest = require("debug")("llm-backend:request");
const debugLLM = require("debug")("llm-backend:llm");
require("dotenv").config();

const sendMessageToLLMWithToolsCalling = require("./weather-mcp-client/index");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Request logging middleware
app.use((req, res, next) => {
  debugRequest(`${req.method} ${req.path} - Request received`);
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    debugRequest(
      `${req.method} ${req.path} - Response sent (${res.statusCode}) - ${duration}ms`
    );
  });

  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  debug("Health check requested");
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// LLM completion endpoint with tools calling
app.post("/api/completions-with-tools", async (req, res) => {
  try {
    const {
      userPrompt,
      model,
      temperature = 0.7,
      max_tokens = 1000,
    } = req.body;

    if (!userPrompt) {
      debugRequest("Completion request rejected - missing user prompt");
      return res.status(400).json({ error: "user prompt is required" });
    }

    const response = await sendMessageToLLMWithToolsCalling(userPrompt, {
      apiKey: process.env.OPENAI_API_KEY,
      apiUrl: process.env.OPENAI_BASE_URL,
    });

    res.json({ response });
  } catch (error) {
    debugLLM("Error calling LLM:", error.message);
    console.error("Error calling LLM:", error.message);
    res.status(500).json({
      error: "Failed to process request",
      details: error.response?.data || error.message,
    });
  }
});

// LLM Completion endpoint (for non-chat models)
app.post("/api/completions", async (req, res) => {
  try {
    const {
      userPrompt,
      model,
      temperature = 0.7,
      max_tokens = 1000,
    } = req.body;

    if (!userPrompt) {
      debugRequest("Completion request rejected - missing user prompt");
      return res.status(400).json({ error: "user prompt is required" });
    }

    debugLLM("Processing completion request", {
      model,
      temperature,
      max_tokens,
    });

    // Configure your local LLM endpoint here
    const LLM_ENDPOINT =
      process.env.LLM_ENDPOINT || "http://127.0.0.1:1234/v1/chat/completions";

    debugLLM(`Sending request to LLM endpoint: ${LLM_ENDPOINT}`);

    const requestBody = {
      model: model || "local-model",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: temperature,
      max_tokens: max_tokens,
      stream: false,
    };

    console.log("====> request", requestBody);

    const response = await axios.post(LLM_ENDPOINT, requestBody, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.LLM_API_KEY || "not-needed"}`,
      },
      timeout: 30000, // 30 seconds timeout
    });

    debugLLM("LLM response received", response.data);

    res.json({
      response: response.data,
    });
  } catch (error) {
    debugLLM("Error calling LLM:", error.message);
    console.error("Error calling LLM:", error.message);
    res.status(500).json({
      error: "Failed to process request",
      details: error.response?.data || error.message,
    });
  }
});

// Get available models
app.get("/api/models", async (req, res) => {
  try {
    const MODELS_ENDPOINT =
      process.env.MODELS_ENDPOINT || "http://localhost:1234/v1/models";

    debugLLM(`Fetching models from: ${MODELS_ENDPOINT}`);
    const response = await axios.get(MODELS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${process.env.LLM_API_KEY || "not-needed"}`,
      },
      timeout: 10000,
    });

    debugLLM(
      `Models fetched successfully: ${
        response.data.data?.length || 0
      } models found`
    );
    res.json(response.data);
  } catch (error) {
    debugLLM("Error fetching models:", error.message);
    console.error("Error fetching models:", error.message);
    res.status(500).json({
      error: "Failed to fetch models",
      details: error.response?.data || error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  debug(`🚀 LLM Backend server running on port ${PORT}`);
  debug(`📡 Health check: http://localhost:${PORT}/health`);
  debug(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
  debug(`📝 Completions endpoint: http://localhost:${PORT}/api/completions`);
  debug(`📋 Models endpoint: http://localhost:${PORT}/api/models`);
});

module.exports = app;

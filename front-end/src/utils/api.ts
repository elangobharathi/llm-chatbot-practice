import { ChatSettings, ApiResponse } from "../types";

export async function sendMessageToLLM(
  inputMessage: string,
  settings: ChatSettings
): Promise<string> {
  const requestBody = {
    model: settings.model || "gpt-3.5-turbo",
    userPrompt: inputMessage,
    temperature: settings.temperature || 0.7,
    max_tokens: settings.maxTokens || 1000,
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (settings.apiKey) {
    headers["Authorization"] = `Bearer ${settings.apiKey}`;
  }

  const response = await fetch(settings.apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  const data: ApiResponse = await response.json();

  if (!data.response.choices || data.response.choices.length === 0) {
    throw new Error("No response from API");
  }

  return data.response.choices[0].message.content;
}

export async function sendMessageToLLMWithToolsCalling(
  inputMessage: string,
  settings: ChatSettings
): Promise<string> {
  const requestBody = {
    model: settings.model || "gpt-3.5-turbo",
    userPrompt: inputMessage,
    temperature: settings.temperature || 0.7,
    max_tokens: settings.maxTokens || 1000,
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (settings.apiKey) {
    headers["Authorization"] = `Bearer ${settings.apiKey}`;
  }

  const response = await fetch(settings.apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  return data.response;
}

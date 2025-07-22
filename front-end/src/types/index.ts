export interface ChatSettings {
  apiUrl: string;
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ApiResponse {
  response: {
    choices: Array<{
      message: {
        content: string;
        role: string;
      };
    }>;
  };
}

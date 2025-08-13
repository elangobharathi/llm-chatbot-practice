const OpenAI = require("openai");

// Simple fake weather tool
function getCurrentWeather({ location, unit = "celsius" }) {
  const normalizedLocation = String(location || "").toLowerCase();
  const seed = [...normalizedLocation].reduce(
    (acc, ch) => acc + ch.charCodeAt(0),
    0
  );
  const tempBase = 10 + (seed % 20); // pseudo-random 10..29
  const tempC =
    unit === "fahrenheit" ? Math.round(((tempBase - 32) * 5) / 9) : tempBase;

  return {
    location,
    unit,
    forecast: [
      { day: "Monday", condition: "sunny", temperature: tempC },
      { day: "Tuesday", condition: "cloudy", temperature: tempC - 2 },
      { day: "Wednesday", condition: "rain", temperature: tempC - 3 },
    ],
  };
}

async function sendMessageToLLMWithToolsCalling(inputMessage, settings) {
  // Initialize client against local OpenAI-compatible server
  const client = new OpenAI({
    apiKey: settings.apiKey || "sk-local",
    baseURL: settings.apiUrl || "http://127.0.0.1:1234/v1",
    dangerouslyAllowBrowser: true,
  });

  try {
    const messages = [
      { role: "system", content: "You are a helpful weather assistant." },
      {
        role: "user",
        content: inputMessage,
      },
    ];

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: messages,
      tools: [
        {
          type: "function",
          function: {
            name: "get_current_weather",
            description: "Get the current weather for a given location",
            parameters: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                  description: "City and state, e.g. Boston, MA",
                },
                unit: { type: "string", enum: ["celsius", "fahrenheit"] },
              },
              required: ["location"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    const message = response.choices[0]?.message;
    if (!message) {
      console.error("No message returned");
      return "No message returned";
    }

    // If the model requested a tool call
    const toolCalls = message.tool_calls || [];
    if (toolCalls.length > 0) {
      const toolMessages = [];
      for (const toolCall of toolCalls) {
        if (
          toolCall.type === "function" &&
          toolCall.function?.name === "get_current_weather"
        ) {
          const args = JSON.parse(toolCall.function.arguments || "{}");
          const result = getCurrentWeather(args);
          toolMessages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(result),
          });
        }
      }

      // Send the tool results back to the model to get the final answer
      const followup = await client.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [...messages, message, ...toolMessages],
      });

      const finalText = followup.choices[0]?.message?.content;
      console.log("\nAssistant:\n", finalText);

      return finalText || "No final text";
    } else {
      console.log("\nAssistant:\n", message.content);

      return message.content || "No content";
    }
  } catch (err) {
    console.error("Error:", err);
    return "Error: " + err;
  }
}

module.exports = sendMessageToLLMWithToolsCalling;

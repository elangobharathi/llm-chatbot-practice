import { useState } from "react";
import ChatInput from "./ChatInput";
import DisplayResponse from "./DisplayResponse";
import { useMutation } from "@tanstack/react-query";
import { sendMessageToLLMWithToolsCalling } from "../utils/api";
import { ChatSettings } from "../types";

type ChatProps = {
  settings: ChatSettings;
};

const Chat = ({ settings }: ChatProps) => {
  const [userInput, setUserInput] = useState("");
  const [lastUserMessage, setLastUserMessage] = useState("");

  const {
    mutate: sendUserInput,
    isPending,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (input: string) => {
      return sendMessageToLLMWithToolsCalling(input, settings);
    },
  });

  const handleSubmitUserInput = (input: string) => {
    setLastUserMessage(input); // Store the user's message
    sendUserInput(input);
    setUserInput(""); // Clear the input field
  };

  return (
    <>
      <DisplayResponse
        userMessage={lastUserMessage}
        content={data}
        isLoading={isPending}
        isError={isError}
        error={error}
      />
      <ChatInput
        input={userInput}
        onInputChange={setUserInput}
        onSubmit={handleSubmitUserInput}
        disabled={isPending}
      />
    </>
  );
};

export default Chat;

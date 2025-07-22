import { useState } from "react";
import ChatInput from "./ChatInput";
import DisplayResponse from "./DisplayResponse";
import { useMutation } from "@tanstack/react-query";
import { sendMessageToLLM } from "../utils/api";
import { ChatSettings } from "../types";

type ChatProps = {
  settings: ChatSettings;
};

const Chat = ({ settings }: ChatProps) => {
  const [userInput, setUserInput] = useState("");

  const {
    mutate: sendUserInput,
    isPending,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (input: string) => {
      return sendMessageToLLM(input, settings);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmitUserInput = (input: string) => {
    sendUserInput(input);
    setUserInput("");
  };

  return (
    <>
      <DisplayResponse
        content={data}
        isLoading={isPending}
        isError={isError}
        error={error}
      />
      <ChatInput
        input={userInput}
        onSubmit={handleSubmitUserInput}
        disabled={false}
      />
    </>
  );
};

export default Chat;

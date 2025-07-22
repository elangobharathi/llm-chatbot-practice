import { Cpu } from "lucide-react";
import { useEffect, useState } from "react";

const ThinkingLoader = () => {
  const [currentText, setCurrentText] = useState(0);
  const [dots, setDots] = useState("");

  const thinkingTexts = [
    "Thinking",
    "Processing your request",
    "Analyzing information",
    "Generating response",
    "Almost ready",
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % thinkingTexts.length);
    }, 2000);

    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        {/* Animated Brain/CPU Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping">
            <Cpu className="h-12 w-12 text-blue-400 dark:text-blue-300 mx-auto opacity-75" />
          </div>
          <div className="relative">
            <Cpu className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto animate-pulse" />
          </div>
        </div>

        {/* Thinking Text */}
        <div className="mb-4">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2 transition-all duration-500">
            {thinkingTexts[currentText]}
            <span className="text-blue-500">{dots}</span>
          </h3>
        </div>

        {/* Animated Progress Bars */}
        <div className="space-y-2 max-w-xs mx-auto">
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
          </div>
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse delay-150"></div>
          </div>
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-400 to-blue-500 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>

        {/* Floating Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 animate-pulse">
          AI is processing your message...
        </p>
      </div>
    </div>
  );
};

export default ThinkingLoader;

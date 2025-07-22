import { Bot } from "lucide-react";
import { useMemo } from "react";
import DOMPurify from "dompurify";
import ThinkingLoader from "../components/ThinkingLoader";

type DisplayResponseProps = {
  content: string | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

const DisplayResponse = ({
  content,
  isLoading,
  isError,
  error,
}: DisplayResponseProps) => {
  // Create a function to safely render HTML content
  const createSafeHTML = (htmlContent: string) => {
    return useMemo(() => {
      const sanitized = DOMPurify.sanitize(htmlContent, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "em",
          "b",
          "i",
          "u",
          "code",
          "pre",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "blockquote",
          "a",
          "img",
          "div",
          "span",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id"],
        ADD_ATTR: ["target", "rel"],
      });

      // Add security attributes to external links after sanitization
      return {
        __html: sanitized.replace(
          /<a\s+href="https?:\/\/[^"]*"/g,
          (match) => match + ' target="_blank" rel="noopener noreferrer"'
        ),
      };
    }, [htmlContent]);
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-4xl mx-auto">
          <ThinkingLoader />
        </div>
      </div>
    );
  }

  if (content) {
    return (
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-4xl mx-auto">
          <div
            dangerouslySetInnerHTML={createSafeHTML(content)}
            className="prose prose-sm max-w-none dark:prose-invert"
          />
        </div>
      </div>
    );
  }

  if (!content && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Bot className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Welcome to LLM Chat
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Start a conversation with your local LLM model. Make sure to
            configure your API settings first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          {isError ? (
            <p>Error: {error?.message}</p>
          ) : (
            <p>Something went wrong</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayResponse;

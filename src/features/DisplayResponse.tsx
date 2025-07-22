import { Bot } from "lucide-react";
import { useMemo } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import ThinkingLoader from "../components/ThinkingLoader";

type DisplayResponseProps = {
  userMessage: string;
  content: string | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

// Configure marked options
marked.setOptions({
  breaks: true, // Convert line breaks to <br> tags
  gfm: true, // Enable GitHub Flavored Markdown
});

const DisplayResponse = ({
  userMessage,
  content,
  isLoading,
  isError,
  error,
}: DisplayResponseProps) => {
  // Create a function to safely render markdown content
  const createSafeHTML = (markdownContent: string) => {
    return useMemo(() => {
      // First convert markdown to HTML
      const htmlFromMarkdown = marked.parse(markdownContent) as string;

      // Then sanitize the HTML
      let sanitized = DOMPurify.sanitize(htmlFromMarkdown as string, {
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
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id"],
        ADD_ATTR: ["target", "rel"],
      }) as string;

      // Add security attributes to external links
      sanitized = sanitized.replace(
        /<a\s+href="https?:\/\/[^"]*"/g,
        (match) => match + ' target="_blank" rel="noopener noreferrer"'
      );

      // Enhance code blocks with copy functionality
      sanitized = sanitized.replace(
        /<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
        (match, attrs, code) => {
          const decodedCode = code
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"');

          return `<div class="code-block-wrapper group relative"><pre class="code-block"><code${attrs}>${code}</code></pre><button class="copy-btn" data-code="${encodeURIComponent(
            decodedCode
          )}">Copy</button></div>`;
        }
      );

      return { __html: sanitized };
    }, [markdownContent]);
  };

  // Show welcome message when no conversation has started
  if (!userMessage && !content && !isLoading) {
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
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* User Message */}
        {userMessage && (
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-blue-500 text-white px-4 py-3 rounded-lg rounded-tr-sm">
              <p className="whitespace-pre-wrap break-words">{userMessage}</p>
            </div>
          </div>
        )}

        {/* AI Response */}
        {isLoading ? (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <ThinkingLoader />
            </div>
          </div>
        ) : content ? (
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg rounded-tl-sm">
              <div
                className="ai-response-content"
                dangerouslySetInnerHTML={createSafeHTML(content)}
              />
            </div>
          </div>
        ) : (
          userMessage && (
            <div className="flex justify-start">
              <div className="max-w-[80%] bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg rounded-tl-sm">
                <p className="text-gray-500 dark:text-gray-400">
                  Waiting for response...
                </p>
              </div>
            </div>
          )
        )}

        {/* Error State */}
        {isError && (
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">
                <strong>Error:</strong> {error?.message}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayResponse;

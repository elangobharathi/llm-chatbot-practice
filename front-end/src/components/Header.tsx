import { Settings, MessageSquare, Moon, Sun } from "lucide-react";

interface HeaderProps {
  onOpenSettings: () => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

export default function Header({
  onOpenSettings,
  onToggleDarkMode,
  isDarkMode,
}: HeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary-500" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            LLM Chat
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            {isDarkMode ? "Light" : "Dark"}
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </div>
    </header>
  );
}

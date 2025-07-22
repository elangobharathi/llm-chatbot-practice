import { useState } from "react";
import { X, Save } from "lucide-react";
import { ChatSettings } from "../types";

interface SettingsModalProps {
  settings: ChatSettings;
  onSave: (settings: ChatSettings) => void;
  onClose: () => void;
}

export default function SettingsModal({
  settings,
  onSave,
  onClose,
}: SettingsModalProps) {
  const [formData, setFormData] = useState<ChatSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof ChatSettings, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            API Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="apiUrl"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              API URL *
            </label>
            <input
              type="text"
              id="apiUrl"
              value={formData.apiUrl}
              onChange={(e) => handleChange("apiUrl", e.target.value)}
              placeholder="http://localhost:8000/v1/chat/completions"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              The URL endpoint for your local LLM API
            </p>
          </div>

          <div>
            <label
              htmlFor="apiKey"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              API Key (Optional)
            </label>
            <input
              type="password"
              id="apiKey"
              value={formData.apiKey || ""}
              onChange={(e) => handleChange("apiKey", e.target.value)}
              placeholder="sk-..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Leave empty if your API doesn't require authentication
            </p>
          </div>

          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Model Name
            </label>
            <input
              type="text"
              id="model"
              value={formData.model || ""}
              onChange={(e) => handleChange("model", e.target.value)}
              placeholder="gpt-3.5-turbo"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="temperature"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Temperature: {formData.temperature}
            </label>
            <input
              type="range"
              id="temperature"
              min="0"
              max="2"
              step="0.1"
              value={formData.temperature || 0.7}
              onChange={(e) =>
                handleChange("temperature", parseFloat(e.target.value))
              }
              className="w-full accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Focused (0)</span>
              <span>Balanced (1)</span>
              <span>Creative (2)</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="maxTokens"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Max Tokens
            </label>
            <input
              type="number"
              id="maxTokens"
              min="1"
              max="4000"
              value={formData.maxTokens || 1000}
              onChange={(e) =>
                handleChange("maxTokens", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

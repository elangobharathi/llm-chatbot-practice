import { useState, useEffect } from "react";
import { ChatSettings } from "./types";

import SettingsModal from "./components/SettingsModal";
import Header from "./components/Header";
import { DEFAULT_SETTINGS } from "./constants";
import Chat from "./features/Chat";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [settings, setSettings] = useState<ChatSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const hasConfigured = localStorage.getItem("chat-settings");
    if (!hasConfigured) {
      setShowSettings(true);
    } else {
      const savedSettings = JSON.parse(hasConfigured);
      setSettings(savedSettings);
    }

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem("dark-mode");
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleSettingsUpdate = (newSettings: ChatSettings) => {
    setSettings(newSettings);
    localStorage.setItem("chat-settings", JSON.stringify(newSettings));
    setShowSettings(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      <Header
        onOpenSettings={() => setShowSettings(true)}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <Chat settings={settings} />
      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={handleSettingsUpdate}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;

import React, { createContext, useContext, useState, ReactNode } from "react";

// ---- Types ----
interface AccessibilityContextProps {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontScale: number;
  increaseFont: () => void;
  decreaseFont: () => void;
}

// ---- Context ----
const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined);

// ---- Provider ----
export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);

  const toggleHighContrast = () => setHighContrast((prev) => !prev);
  const increaseFont = () => setFontScale((prev) => Math.min(prev + 0.1, 2));
  const decreaseFont = () => setFontScale((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <AccessibilityContext.Provider
      value={{ highContrast, toggleHighContrast, fontScale, increaseFont, decreaseFont }}
    >
      <div
        style={{
          filter: highContrast ? "contrast(150%)" : undefined,
          fontSize: `${fontScale}em`,
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

// ---- Hook ----
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}

// ---- Panel ----
export function AccessibilityPanel() {
  const { highContrast, toggleHighContrast, increaseFont, decreaseFont } = useAccessibility();

  return (
    <div style={{ padding: "1rem", borderTop: "1px solid #ccc" }}>
      <button onClick={toggleHighContrast} style={{ marginRight: "0.5rem" }}>
        {highContrast ? "Disable High Contrast" : "Enable High Contrast"}
      </button>
      <button onClick={increaseFont} style={{ marginRight: "0.5rem" }}>A+</button>
      <button onClick={decreaseFont}>A-</button>
    </div>
  );
}
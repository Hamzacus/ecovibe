import React from "react";
import { AccessibilityProvider } from "./components/UI/AccessibilityProvider";

function App() {
  return (
    <AccessibilityProvider>
      {/* your app’s existing components */}
    </AccessibilityProvider>
  );
}

export default App;
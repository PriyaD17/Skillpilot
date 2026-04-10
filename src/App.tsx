import React, { useState } from "react";
import Landing from "./components/Landing";
import { Chatbot } from "./components/Chatbot";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [view, setView] = useState<"landing" | "chat">("landing");

  return (
    <main className="min-h-screen bg-black font-sans antialiased">
      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <Landing key="landing" onStart={() => setView("chat")} />
        ) : (
          <Chatbot key="chat" onBack={() => setView("landing")} />
        )}
      </AnimatePresence>
    </main>
  );
}

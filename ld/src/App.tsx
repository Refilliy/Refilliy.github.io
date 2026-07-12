import { useState } from 'react';
import EntryScreen from './components/EntryScreen';
import MainInterface from './components/MainInterface';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-hidden selection:bg-red-900/50 selection:text-white">
      <div className="scanline" />
      <AnimatePresence mode="wait">
        {!isEntered ? (
          <EntryScreen onEnter={() => setIsEntered(true)} />
        ) : (
          <MainInterface />
        )}
      </AnimatePresence>
    </div>
  );
}

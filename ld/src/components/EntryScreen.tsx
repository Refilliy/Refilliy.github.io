import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EntryScreen({ onEnter }: { onEnter: () => void }) {
  const [text, setText] = useState('');
  const fullText = "LOCKDOWN PROTOCOL INITIATED. ALL PERSONNEL REPORT TO DESIGNATED STATION. THIS IS NOT A DRILL.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      key="entry"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4 md:p-6 text-center emergency-flash z-50 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-8 md:h-10 hazard-stripes shadow-[0_0_20px_rgba(250,204,21,0.5)] z-20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-8 md:h-10 hazard-stripes shadow-[0_0_20px_rgba(250,204,21,0.5)] z-20"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto h-full max-h-[80vh]">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mb-6 md:mb-10 text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]"
        >
          <AlertTriangle size={80} className="md:w-[100px] md:h-[100px]" strokeWidth={1.5} />
        </motion.div>

        <div className="h-[180px] md:h-[120px] flex items-center justify-center w-full mb-6">
          <h1 className="text-xl md:text-4xl text-red-500 leading-relaxed md:leading-loose tracking-[0.1em] md:tracking-[0.2em] font-bold drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] font-mono break-words">
            {text}
            <span className="animate-pulse">_</span>
          </h1>
        </div>
        
        <div className="h-[100px] flex items-start justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: text.length >= fullText.length ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="text-red-400 text-sm md:text-xl font-bold tracking-widest bg-red-950/40 px-4 md:px-6 py-2 border border-red-900/50 break-keep"
          >
            폐쇄 프로토콜 가동. 모든 인원은 지정된 구역으로 대피하라. 실제 상황임.
          </motion.div>
        </div>

        <div className="h-[80px] flex items-end justify-center">
          {text.length >= fullText.length && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onClick={onEnter}
              className="relative group px-6 md:px-12 py-4 md:py-6 bg-black border-2 border-red-600 text-red-500 font-bold tracking-[0.2em] md:tracking-[0.4em] transition-all duration-300 overflow-hidden hover:bg-red-600 hover:text-black shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.8)] w-full max-w-[300px] md:max-w-none"
            >
              <span className="relative z-10 text-sm md:text-xl">시스템 접속 / OVERRIDE</span>
              <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

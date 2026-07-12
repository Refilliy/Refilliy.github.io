import { motion } from 'motion/react';
import { AlertOctagon, Map, Skull, Users, Terminal } from 'lucide-react';
import { useState } from 'react';
import StatusTab from './StatusTab';
import ShipMapTab from './ShipMapTab';
import CreatureTab from './CreatureTab';
import CrewTab from './CrewTab';

const tabs = [
  { id: 'status', icon: AlertOctagon, label: '시스템 상태', sub: 'SYS_STATUS' },
  { id: 'map', icon: Map, label: '선내 구조도', sub: 'SHIP_MAP' },
  { id: 'creature', icon: Skull, label: '위협 데이터', sub: 'THREAT_DATA' },
  { id: 'crew', icon: Users, label: '승무원 명부', sub: 'CREW_MANIFEST' },
];

export default function MainInterface() {
  const [activeTab, setActiveTab] = useState('status');

  return (
    <motion.div 
      key="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-[#050505] flex flex-col md:flex-row relative text-gray-300"
    >
      {/* Sidebar */}
      <div className="md:w-80 border-b md:border-b-0 md:border-r border-red-900/30 bg-black/60 p-4 md:p-6 flex flex-col z-10 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4 text-red-600 mb-6 md:mb-10 border-b border-red-900/30 pb-4 md:pb-6">
          <Terminal size={32} className="md:w-9 md:h-9 animate-pulse shrink-0" />
          <div>
            <h2 className="font-black tracking-widest text-lg md:text-xl font-mono">LOCKDOWN PROTOCOLS</h2>
            <p className="text-[10px] md:text-xs text-red-800 tracking-widest font-mono">EMERGENCY_OVERRIDE</p>
          </div>
        </div>

        <nav className="grid grid-cols-2 md:flex md:flex-col gap-2 pb-2 md:pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 text-left transition-all shrink-0 border border-transparent group ${
                activeTab === tab.id 
                  ? 'bg-red-900/20 text-red-500 border-l-4 border-l-red-500 border-y-red-900/20 border-r-red-900/20 shadow-[inset_2px_0_10px_rgba(220,38,38,0.1)]' 
                  : 'text-red-900/70 hover:bg-red-900/10 hover:text-red-600 hover:border-red-900/20'
              }`}
            >
              <tab.icon size={20} className={`md:w-6 md:h-6 ${activeTab === tab.id ? 'drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'group-hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]'}`} />
              <div>
                <div className="tracking-[0.1em] text-sm md:text-lg font-bold">{tab.label}</div>
                <div className="text-[8px] md:text-[10px] tracking-widest font-mono text-red-800/70">{tab.sub}</div>
              </div>
            </button>
          ))}
        </nav>
        
        <div className="mt-auto hidden md:block pt-8 border-t border-red-900/30">
          <div className="text-[10px] text-red-900/50 font-mono tracking-widest text-center leading-relaxed">
            RESTRICTED ACCESS<br/>
            UNAUTHORIZED LOGINS WILL BE TERMINATED
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 md:p-12 overflow-y-auto relative z-10 custom-scrollbar h-[calc(100vh-180px)] md:h-screen">
        <div className="max-w-5xl mx-auto h-full flex flex-col">
          <AnimateTabContent activeTab={activeTab} />
        </div>
      </div>
      
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000_100%)] z-0 opacity-90"></div>
    </motion.div>
  );
}

function AnimateTabContent({ activeTab }: { activeTab: string }) {
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
      transition={{ duration: 0.4 }}
      className="flex-1 pb-20"
    >
      {activeTab === 'status' && <StatusTab />}
      {activeTab === 'map' && <ShipMapTab />}
      {activeTab === 'creature' && <CreatureTab />}
      {activeTab === 'crew' && <CrewTab />}
    </motion.div>
  );
}

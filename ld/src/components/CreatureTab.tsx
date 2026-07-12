import { motion } from 'motion/react';
import { Skull, AlertTriangle, EyeOff, Activity } from 'lucide-react';
import { useState } from 'react';

const creatures = [
  { 
    id: "queen",
    name: "여왕 (QUEEN)", 
    type: "단일 개체",
    desc: "붉은 기생촉수형 생명체. 시각 기관이 퇴화되어 없으며, 피부 청각을 주 감각으로 사용하고 열감지를 보조로 활용한다. 촉수를 통해 인간 입을 통로로 복부에 알을 이식하여 번식한다.", 
    location: "시작 위치: 구역 E (EVA시설 탈출포드 근처)",
    imgs: ["https://ld.e3t.uk/EX/01.webp", "https://ld.e3t.uk/EX/02.webp"] 
  },
  { 
    id: "larva",
    name: "유충 (LARVA)", 
    type: "기생 개체",
    desc: "알 이식 후 정확히 48시간 내에 부화하는 검은 기생물체. 숙주의 얼굴 및 신체 표면에 강하게 부착되며, 입을 통해 뿜어져 나온다. 기생 중 숙주의 신경계를 조종할 수 있으며, 말기에는 숙주를 미라처럼 말라비틀어지게 한 뒤 새로운 숙주를 찾아 이동한다.", 
    location: "위험도: 극도로 높음 (숙주 조종 가능)",
    imgs: ["https://ld.e3t.uk/EX/03.webp", "https://ld.e3t.uk/EX/04.webp"] 
  },
  { 
    id: "adult",
    name: "성체 (ADULT)", 
    type: "독립 개체",
    desc: "검은 액체 및 슬라임 형태를 띠며, 기생과 촉수형이 기괴하게 복합된 개체. 여왕의 통제를 받지 않고 독립적으로 활동하며 사냥한다.", 
    location: "특징: 유동적인 신체로 배기구 이동 용이",
    imgs: ["https://ld.e3t.uk/EX/05.webp", "https://ld.e3t.uk/EX/06.webp"] 
  }
];

export default function CreatureTab() {
  const [selected, setSelected] = useState(creatures[0].id);
  const activeCreature = creatures.find(c => c.id === selected) || creatures[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-2 border-b border-red-900/30 pb-4">
        <h2 className="text-xl md:text-3xl font-bold text-red-500 tracking-[0.1em] md:tracking-[0.2em] font-mono flex items-center gap-2 md:gap-3">
          <Skull size={24} className="md:w-8 md:h-8 shrink-0" /> THREAT_DATABASE // 위협 개체
        </h2>
      </div>
      
      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        {/* Selection Menu */}
        <div className="flex flex-col gap-3">
          {creatures.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`p-4 text-left transition-all border font-mono tracking-widest ${
                selected === c.id 
                  ? 'bg-red-950/40 border-red-500 text-red-500 shadow-[inset_4px_0_0_#ef4444]' 
                  : 'bg-black/60 border-red-900/30 text-gray-500 hover:border-red-500/50 hover:text-red-400'
              }`}
            >
              <div className="font-bold text-lg">{c.name}</div>
              <div className="text-xs opacity-70 mt-1">{c.type}</div>
            </button>
          ))}
          
          <div className="mt-8 p-4 border border-red-900/30 bg-red-950/10 text-xs text-red-500/70 font-mono leading-relaxed">
            <AlertTriangle size={16} className="mb-2 text-red-500" />
            모든 생명체 데이터는 CCTV 및 센서 데이터를 기반으로 자동 생성되었습니다. 직접적인 접촉을 절대 피하십시오.
          </div>
        </div>

        {/* Content Display */}
        <motion.div 
          key={activeCreature.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-black/40 border border-red-900/40 p-6 flex flex-col"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl font-black text-white font-sans">{activeCreature.name}</h3>
              <div className="text-red-500 font-mono tracking-widest mt-2">{activeCreature.type}</div>
            </div>
            {activeCreature.id === 'queen' && (
              <div className="flex items-center gap-2 text-red-500 border border-red-500/30 px-3 py-1 bg-red-950/30">
                <EyeOff size={16} /> <span className="text-xs font-mono font-bold">시각 부재</span>
              </div>
            )}
            {activeCreature.id === 'larva' && (
              <div className="flex items-center gap-2 text-yellow-500 border border-yellow-500/30 px-3 py-1 bg-yellow-950/30">
                <Activity size={16} /> <span className="text-xs font-mono font-bold">숙주 조종</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {activeCreature.imgs.map((img, i) => (
              <div key={i} className="relative aspect-square border border-red-900/30 overflow-hidden bg-black group">
                <div className="absolute inset-0 bg-red-500/10 z-10 pointer-events-none mix-blend-overlay group-hover:bg-transparent transition-colors"></div>
                <img 
                  src={img} 
                  alt={`${activeCreature.name} reference ${i+1}`} 
                  className="w-full h-full object-cover filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-500"
                />
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-red-500/70 z-20 bg-black/80 px-2 py-0.5">
                  REF_IMG_{i+1}
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="text-red-400 font-mono tracking-widest border-b border-red-900/30 pb-2">BIOLOGICAL_ANALYSIS</h4>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg break-words md:break-keep">
              {activeCreature.desc}
            </p>
            <div className="mt-4 inline-block bg-red-950/30 border border-red-900/50 px-4 py-2 text-red-400 font-mono text-sm">
              {activeCreature.location}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

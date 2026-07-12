import { motion } from 'motion/react';

const crew = [
  { name: "전연지", role: "연구원", nat: "KOR", age: 29, gender: "女", traits: "ENFJ + 중립선 + 안정형", img: "https://ld.e3t.uk/A/01.webp" },
  { name: "린 야오", role: "의사", nat: "CHN", age: 27, gender: "女", traits: "ISTJ + 질서중립 + 안정형", img: "https://ld.e3t.uk/B/01.webp" },
  { name: "베아트리스 페레이라", role: "정비공", nat: "BRA", age: 24, gender: "女", traits: "ESFP + 혼돈선 + 안정형", img: "https://ld.e3t.uk/C/01.webp" },
  { name: "알리샤 소르코프", role: "보안요원", nat: "RUS", age: 22, gender: "女", traits: "ISTP + 중립악 + 회피형 (스페츠나츠 출신)", img: "https://ld.e3t.uk/D/01.webp" },
  { name: "에바 퍼거슨", role: "의사", nat: "ENG", age: 26, gender: "女", traits: "ISFJ + 질서선 + 안정형", img: "https://ld.e3t.uk/E/01.webp" },
  { name: "라미로 토스카니", role: "보안요원", nat: "ITA", age: 32, gender: "男", traits: "ESTP + 혼돈중립 + 회피형 (마피아 출신)", img: "https://ld.e3t.uk/F/01.webp" },
  { name: "브라이언 콕스", role: "부기장", nat: "USA", age: 29, gender: "男", traits: "ENTJ + 질서선 + 안정형", img: "https://ld.e3t.uk/G/01.webp" },
  { name: "스미타니 쇼우", role: "연구원", nat: "JPN", age: 25, gender: "男", traits: "INTJ + 질서중립 + 회피형", img: "https://ld.e3t.uk/H/01.webp" },
  { name: "앙투안 르페브르", role: "정비공", nat: "FRA", age: 22, gender: "男", traits: "ENFP + 혼돈선 + 불안형", img: "https://ld.e3t.uk/I/01.webp" },
];

export default function CrewTab() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-2 border-b border-red-900/30 pb-4">
        <h2 className="text-xl md:text-3xl font-bold text-red-500 tracking-[0.1em] md:tracking-[0.2em] font-mono">
          CREW_MANIFEST // 승무원 명부
        </h2>
        <span className="text-red-500/50 font-mono text-sm">SURVIVORS: 9</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crew.map((member, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            key={i} 
            className="group bg-black/60 border border-red-900/30 overflow-hidden hover:border-red-500/50 transition-all flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/9] overflow-hidden border-b border-red-900/30">
              <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply group-hover:bg-transparent transition-colors z-10"></div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.1)_1px,transparent_1px)] bg-[size:100%_4px] z-20 pointer-events-none opacity-30"></div>
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-full h-full object-cover filter contrast-125 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-2 right-2 z-30 bg-black/80 px-2 py-1 border border-red-900/50 text-[10px] text-red-500 font-mono tracking-widest">
                ID: {String(i + 1).padStart(3, '0')}
              </div>
            </div>
            
            {/* Info Container */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-black text-xl text-white tracking-wide">{member.name}</h3>
                <span className="text-xs font-mono px-2 py-1 bg-red-950/30 text-red-400 border border-red-900/30 tracking-widest">
                  {member.nat}
                </span>
              </div>
              
              <div className="text-red-500/80 text-sm font-bold tracking-widest mb-4 border-b border-red-900/20 pb-2">
                {member.role} | {member.age}세 ({member.gender})
              </div>
              
              <div className="mt-auto">
                <div className="text-[10px] text-gray-500 font-mono mb-1">PSYCH_EVALUATION</div>
                <div className="text-gray-300 text-sm bg-black/50 p-2 border border-gray-800 break-keep leading-relaxed">
                  {member.traits}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

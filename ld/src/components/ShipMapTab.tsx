import { motion } from 'motion/react';
import { Target, AlertTriangle } from 'lucide-react';

const sectors = [
  { id: 'A', name: '함교', desc: '항법실 / 통신실 / 착륙제어실', x: 10, y: 50 },
  { id: 'B', name: '생명유지시설', desc: '공기순환 / 온도제어 / 기압제어 / 수원시설', x: 30, y: 20 },
  { id: 'C', name: '중앙엔진·선체', desc: '엔진실 / 전력실 / 냉각실 / 연료실 / 부품창고', x: 30, y: 50 },
  { id: 'D', name: '화물창고 (전방)', desc: '일반화물창고 / 무기창고', x: 30, y: 80 },
  { id: 'E', name: 'EVA시설', desc: '우주복보관실 / 긴급탈출포드(파손)', x: 50, y: 20, alert: true },
  { id: 'F', name: '승무시설', desc: 'CCTV실 / 서버실', x: 50, y: 50 },
  { id: 'G', name: '화물창고 (중앙)', desc: '식량창고 / 탐사장비창고', x: 50, y: 80 },
  { id: 'H', name: '연구실', desc: '연구실 1~4', x: 70, y: 20 },
  { id: 'I', name: '생활구역', desc: '도미토리', x: 70, y: 50 },
  { id: 'J', name: '의무시설', desc: '의무실 / 수술실 / 약재창고', x: 70, y: 80 },
  { id: 'K', name: '선미엔진·선체', desc: '엔진실 / 선체관련시설', x: 90, y: 50 },
];

export default function ShipMapTab() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-2 border-b border-red-900/30 pb-4">
        <h2 className="text-xl md:text-3xl font-bold text-red-500 tracking-[0.1em] md:tracking-[0.2em] font-mono">
          SHIP_SCHEMATICS // 선내 구조도
        </h2>
      </div>

      {/* Map Graphic */}
      <div className="relative w-full min-h-[300px] aspect-[4/3] md:aspect-[16/9] bg-[#050505] border border-red-900/50 p-4 overflow-hidden rounded-lg shadow-inner">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        {/* Connections (Main Axis) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-red-900/40 stroke-2" style={{ strokeDasharray: '4,4' }}>
          {/* Main Corridor */}
          <line x1="10%" y1="50%" x2="90%" y2="50%" />
          {/* Top Branches */}
          <line x1="30%" y1="50%" x2="30%" y2="20%" />
          <line x1="50%" y1="50%" x2="50%" y2="20%" />
          <line x1="70%" y1="50%" x2="70%" y2="20%" />
          {/* Bottom Branches */}
          <line x1="30%" y1="50%" x2="30%" y2="80%" />
          <line x1="50%" y1="50%" x2="50%" y2="80%" />
          <line x1="70%" y1="50%" x2="70%" y2="80%" />
        </svg>

        {/* Nodes */}
        {sectors.map((sector, i) => (
          <motion.div
            key={sector.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className={`absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 group z-10 hover:z-50 cursor-crosshair`}
            style={{ left: `${sector.x}%`, top: `${sector.y}%` }}
          >
            <div className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-sm md:text-lg font-bold font-mono border-2 transition-all ${
              sector.alert 
                ? 'bg-red-950/80 border-red-500 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-pulse' 
                : 'bg-black border-red-900/50 text-red-700 hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_10px_rgba(220,38,38,0.3)]'
            }`}>
              {sector.id}
            </div>
            
            {/* Tooltip */}
            <div className={`absolute ${sector.y > 50 ? 'bottom-10 md:bottom-14' : 'top-10 md:top-14'} ${sector.x > 70 ? 'right-0' : sector.x < 30 ? 'left-0' : 'left-1/2 -translate-x-1/2'} w-40 md:w-48 bg-black/95 border border-red-900/50 p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 backdrop-blur-md`}>
              <div className="font-bold text-red-400 mb-1 border-b border-red-900/30 pb-1 flex justify-between text-xs md:text-sm">
                <span>구역 {sector.id}</span>
                {sector.alert && <AlertTriangle size={14} className="text-red-500 animate-pulse" />}
              </div>
              <div className="text-white text-xs md:text-sm font-bold mb-1">{sector.name}</div>
              <div className="text-gray-400 text-[10px] md:text-xs break-keep">{sector.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-black/60 border border-red-900/30 p-6">
          <h3 className="text-red-500 font-bold mb-4 font-mono text-lg border-b border-red-900/30 pb-2">LOCKDOWN_STATUS</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            현재 모든 구역의 안전 격벽이 폐쇄되어 각 구역 간 이동이 불가능합니다. 특정 구역의 전력을 우회하거나 기장 권한 코드를 입수하는 등의 격벽 해제 수단을 찾으십시오.
          </p>
        </div>
        
        <div className="bg-black/60 border border-yellow-900/30 p-6">
          <h3 className="text-yellow-500 font-bold mb-4 font-mono text-lg border-b border-yellow-900/30 pb-2">WEAPON_INVENTORY</h3>
          <ul className="text-gray-300 text-sm leading-relaxed space-y-2 list-disc list-inside">
            <li>무기고(D구역) 무기 확인됨.</li>
            <li><strong className="text-white">실탄 전량 부재.</strong> 고무탄(비살상용)만 다수 존재함.</li>
            <li className="text-red-400 mt-2">경고: 비살상 무기로는 외계 개체에게 치명상을 입힐 수 없을 것으로 추정됨.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

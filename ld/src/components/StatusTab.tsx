import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

export default function StatusTab() {
  return (
    <div className="space-y-12">
      {/* Critical Alert Banner */}
      <div className="border-2 border-red-900 bg-red-950/20 p-4 md:p-8 relative overflow-hidden backdrop-blur-sm shadow-[0_0_30px_rgba(220,38,38,0.1)]">
        <div className="absolute top-0 left-0 w-full h-1.5 hazard-stripes"></div>
        <div className="absolute bottom-0 left-0 w-full h-1.5 hazard-stripes"></div>
        
        <h2 className="text-2xl md:text-4xl font-bold text-red-500 mb-6 tracking-[0.1em] md:tracking-[0.2em] flex items-center gap-3 md:gap-4">
          <AlertCircle size={32} className="md:w-10 md:h-10 animate-pulse shrink-0" />
          <span className="font-mono">CRITICAL_ALERT</span>
        </h2>
        <div className="mb-6 text-sm md:text-lg text-gray-200 leading-relaxed font-sans space-y-3 md:space-y-2">
          <p className="flex gap-2 md:gap-3 items-start"><span className="text-red-500 font-bold font-mono mt-0.5 md:mt-0">[LOG]</span> <span>다수의 승객 및 승무원 생체 신호 소실.</span></p>
          <p className="flex gap-2 md:gap-3 items-start"><span className="text-red-500 font-bold font-mono mt-0.5 md:mt-0">[LOG]</span> <span>정체불명의 외계 생명체 선내 유입 확인.</span></p>
          <p className="flex gap-2 md:gap-3 items-start"><span className="text-red-500 font-bold font-mono mt-0.5 md:mt-0">[LOG]</span> <span>기장 최종 권한으로 모든 구역 간 안전문 폐쇄. <span className="font-black text-red-500 md:ml-2 block md:inline mt-1 md:mt-0">LOCKDOWN PROTOCOL ACTIVATED</span></span></p>
        </div>
        
        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 font-mono text-sm">
          <div className="p-5 bg-black/80 border border-red-900/50 flex flex-col justify-center items-center text-center group hover:bg-red-950/40 transition-colors">
            <div className="text-red-900 mb-2 tracking-widest text-xs">현재 위치 / LOCATION</div>
            <div className="text-gray-300 text-lg font-bold">달 근방 (LUNAR ORBIT)</div>
          </div>
          <div className="p-5 bg-black/80 border border-red-900/50 flex flex-col justify-center items-center text-center">
            <div className="text-red-900 mb-2 tracking-widest text-xs">지구 귀환까지 / ETA</div>
            <div className="text-red-500 text-2xl font-bold animate-pulse group-hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]">APPROX. 5 DAYS</div>
          </div>
          <div className="p-5 bg-red-950/40 border border-red-600 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
            <div className="text-red-400 mb-2 tracking-widest text-xs relative z-10">프로토콜 상태 / PROTOCOL</div>
            <div className="text-red-500 text-xl font-bold relative z-10">LOCKDOWN (격벽 폐쇄)</div>
          </div>
        </div>
      </div>

      {/* Worldview Text */}
      <div className="space-y-4 md:space-y-6 bg-black/40 p-4 md:p-8 border border-gray-900">
        <h3 className="text-xl md:text-2xl text-red-600 font-bold border-b border-red-900/30 pb-3 md:pb-4 tracking-widest">세계관 개요 / WORLDVIEW</h3>
        <div className="space-y-4 md:space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed md:leading-loose break-words md:break-keep">
          <p>
            <span className="text-red-400 font-bold">서기 2026년.</span> 우주 탐사 및 관광 사업이 궤도에 오른 시대.<br/>
            장기간의 탐사 임무를 마치고 지구로 복귀하던 심우주 탐사선 내에서 끔찍한 사건이 발생한다.
          </p>
          <p>
            알 수 없는 경로로 유입된 <strong className="text-white">정체불명의 외계 생명체</strong>에 의해 수많은 승객과 승무원들이 처참하게 몰살당했다. 사태의 심각성을 인지한 기장은 자신의 목숨을 바쳐 최후의 행동으로 선내 모든 구역의 안전문을 폐쇄하는 <span className="text-red-500 font-mono bg-red-950/50 px-1 md:px-2 py-0.5 border border-red-900/50 mt-1 md:mt-0 inline-block">LOCKDOWN PROTOCOL</span>을 가동했다.
          </p>
          <p className="text-red-200 border-l-4 border-red-700 pl-3 md:pl-4 bg-red-950/10 py-2 md:py-3 pr-2 md:pr-3">
            살아남은 생존자들은 생활구역 수면실 내 고립되었다. 지구로 귀환하기까지 남은 시간은 단 <strong className="text-red-500">5일</strong>. 폐쇄된 우주선 안에서 숨통을 조여오는 외계 생명체를 피해 살아남아야 하는 잔혹한 생존 게임이 시작되었다.
          </p>
          <p className="text-yellow-200 border-l-4 border-yellow-600 pl-3 md:pl-4 bg-yellow-950/10 py-2 md:py-3 pr-2 md:pr-3 mt-4">
            <strong className="text-yellow-500 font-mono block mb-1">[COMMUNICATION_WARNING]</strong> 생존자 그룹은 국적이 모두 달라 공용어(영어) 외에는 원활한 소통이 불가능하다. 의사소통을 위해서는 선내 어딘가에 위치한 <strong className="text-white">자동번역기기</strong>를 반드시 찾아야 한다. (현재 위치 불명)
          </p>
        </div>
      </div>
    </div>
  );
}

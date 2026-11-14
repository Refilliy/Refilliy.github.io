(() => {
  const overlay = document.querySelector('#arrival-intro');
  const broadcast = document.querySelector('#broadcast');
  const glass = document.querySelector('.glass');
  const replay = document.querySelector('.intro-replay');
  const gate = document.querySelector('#gate-main');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let timers = [];
  let running = false;
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const finish = (focus = false) => {
    timers.forEach(clearTimeout); timers = []; running = false;
    overlay.hidden = true; overlay.className = 'arrival-intro'; glass.replaceChildren();
    document.body.classList.remove('intro-running'); gate.inert = false;
    document.body.classList.add('intro-complete'); replay.hidden = false;
    if (focus) gate.querySelector('.primary').focus({preventScroll:true});
  };
  function shatter() {
    // Radial triangular glass shards retain the exact broadcast underneath.
    const rim = [[0,0],[22,0],[48,0],[76,0],[100,0],[100,28],[100,62],[100,100],[72,100],[43,100],[15,100],[0,100],[0,65],[0,30]];
    rim.forEach((a,i) => {
      const b = rim[(i+1)%rim.length], shard = document.createElement('div');
      shard.className = 'glass-shard';
      shard.style.clipPath = `polygon(51% 46%,${a[0]}% ${a[1]}%,${b[0]}% ${b[1]}%)`;
      const dx = (a[0]+b[0])/2-51, dy = (a[1]+b[1])/2-46;
      shard.style.setProperty('--dx',`${dx*2.2}vw`); shard.style.setProperty('--dy',`${dy*2.2+30}vh`);
      shard.style.setProperty('--spin',`${(i%2?1:-1)*(12+i*3)}deg`);
      shard.style.setProperty('--delay',`${(i%4)*23}ms`);
      const copy=broadcast.cloneNode(true); copy.removeAttribute('id'); copy.setAttribute('aria-hidden','true');
      shard.append(copy); glass.append(shard);
    });
    const ns='http://www.w3.org/2000/svg';
    const cracks=document.createElementNS(ns,'svg'); cracks.setAttribute('viewBox','0 0 100 100'); cracks.setAttribute('preserveAspectRatio','none'); cracks.classList.add('cracks');
    rim.forEach(a => { const line=document.createElementNS(ns,'path'); line.setAttribute('d',`M51 46 L${(51+a[0])/2+2} ${(46+a[1])/2-2} L${a[0]} ${a[1]}`); cracks.append(line); });
    glass.append(cracks);
    overlay.classList.add('shattering');
    later(() => overlay.classList.add('falling'),180);
  }
  function start() {
    finish();
    if (reduce.matches) return;
    running=true; replay.hidden=true; gate.inert=true;
    document.body.classList.remove('intro-complete'); document.body.classList.add('intro-running');
    overlay.hidden=false;
    later(() => overlay.classList.add('powered'),80);
    later(() => overlay.classList.add('signal'),1050);
    later(() => overlay.classList.add('fault'),3550);
    later(shatter,4250);
    later(() => finish(),5650);
  }
  overlay.querySelector('button').addEventListener('click',() => finish(true));
  replay.addEventListener('click',start);
  document.addEventListener('keydown',e => {if (running && e.key==='Escape') finish(true);});
  reduce.addEventListener('change',() => {if (reduce.matches) finish();});
  start();
})();

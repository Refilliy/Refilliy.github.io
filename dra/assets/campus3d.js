/* Original procedural campus model. All buildings are real 3D polygon meshes;
   an orthographic software renderer keeps the guide independent of downloads. */
(() => {
  'use strict';
  const TAU = Math.PI * 2;
  const faces = [];
  const anchors = {
    main:[0,29,-14], dormitory:[-51,15,27], flight:[64,6,-12],
    healing:[32,15,35], greenhouse:[-6,10,43], farm:[-50,15,-30], forest:[41,18.2,-44]
  };
  const footprints = {
    main:[0,-9,34,27], dormitory:[-51,27,15,24], flight:[53,-2,24,30],
    healing:[32,35,17,14], greenhouse:[-6,43,20,12], farm:[-50,-30,23,18], forest:[29,-48,34,12]
  };
  const palette = {stone:'#d9cfb6',stoneLight:'#eee5cf',stoneDark:'#aa9b7b',roof:'#3f5b60',slate:'#536b70',window:'#384b4b',gold:'#b89652',grass:'#899b71',path:'#d5c8aa'};
  const light = [-.5,.84,.2];
  function shade(hex, normal, extra=0) {
    const channels = hex.slice(1).match(/../g).map(value=>parseInt(value,16));
    const intensity = .69 + .31 * Math.max(0,normal[0]*light[0]+normal[1]*light[1]+normal[2]*light[2]) + extra;
    return '#' + channels.map(c=>Math.min(255,Math.round(c*intensity)).toString(16).padStart(2,'0')).join('');
  }
  function face(vertices,color,normal=[0,1,0],layer=1,stroke='') {
    faces.push({vertices,color:shade(color,normal),layer,stroke});
  }
  function flat(vertices,color,layer=-1) {face(vertices,color,[0,1,0],layer);}
  function box(x,y,z,w,h,d,color,layer=1) {
    const a=x-w/2,b=x+w/2,c=z-d/2,e=z+d/2,t=y+h;
    face([[a,y,e],[b,y,e],[b,t,e],[a,t,e]],color,[0,0,1],layer);
    face([[b,y,c],[a,y,c],[a,t,c],[b,t,c]],color,[0,0,-1],layer);
    face([[a,y,c],[a,y,e],[a,t,e],[a,t,c]],color,[-1,0,0],layer);
    face([[b,y,e],[b,y,c],[b,t,c],[b,t,e]],color,[1,0,0],layer);
    face([[a,t,c],[a,t,e],[b,t,e],[b,t,c]],color,[0,1,0],layer);
  }
  function cylinder(x,y,z,r,h,color,n=10,topR=r) {
    const top=[];
    for(let i=0;i<n;i++) {
      const a=i*TAU/n,b=(i+1)*TAU/n,m=(a+b)/2;
      face([[x+Math.cos(a)*r,y,z+Math.sin(a)*r],[x+Math.cos(b)*r,y,z+Math.sin(b)*r],[x+Math.cos(b)*topR,y+h,z+Math.sin(b)*topR],[x+Math.cos(a)*topR,y+h,z+Math.sin(a)*topR]],color,[Math.cos(m),0,Math.sin(m)]);
      top.push([x+Math.cos(a)*topR,y+h,z+Math.sin(a)*topR]);
    }
    if(topR) face(top,color);
  }
  function cone(x,y,z,r,h,color,n=8) {
    for(let i=0;i<n;i++) {
      const a=i*TAU/n,b=(i+1)*TAU/n,m=(a+b)/2,len=Math.hypot(h,r);
      face([[x+Math.cos(a)*r,y,z+Math.sin(a)*r],[x+Math.cos(b)*r,y,z+Math.sin(b)*r],[x,y+h,z]],color,[Math.cos(m)*h/len,r/len,Math.sin(m)*h/len]);
    }
  }
  function roof(x,y,z,w,d,h,color) {
    const a=x-w/2,b=x+w/2,c=z-d/2,e=z+d/2;
    if(w>=d) {
      face([[a,y,c],[b,y,c],[b,y+h,z],[a,y+h,z]],color,[0,.72,-.7]);
      face([[b,y,e],[a,y,e],[a,y+h,z],[b,y+h,z]],color,[0,.72,.7]);
      face([[a,y,e],[a,y,c],[a,y+h,z]],palette.stone,[-1,0,0]);
      face([[b,y,c],[b,y,e],[b,y+h,z]],palette.stone,[1,0,0]);
      box(x,y+h,z,w+.6,.35,.4,palette.gold);
    } else {
      face([[a,y,e],[a,y,c],[x,y+h,c],[x,y+h,e]],color,[-.7,.72,0]);
      face([[b,y,c],[b,y,e],[x,y+h,e],[x,y+h,c]],color,[.7,.72,0]);
      face([[a,y,c],[b,y,c],[x,y+h,c]],palette.stone,[0,0,-1]);
      face([[b,y,e],[a,y,e],[x,y+h,e]],palette.stone,[0,0,1]);
      box(x,y+h,z,.4,.35,d+.6,palette.gold);
    }
  }
  function windowFront(x,y,z,w=1.35,h=2.3) {
    const arch=[[x-w/2,y,z],[x+w/2,y,z],[x+w/2,y+h*.72,z],[x,y+h,z],[x-w/2,y+h*.72,z]];
    face(arch,palette.window,[0,0,1]);
    box(x,y-.2,z+.06,w+1,.3,.35,palette.stoneLight);
  }
  function windowSide(x,y,z,w=1.2,h=2.2) {
    face([[x,y,z-w/2],[x,y,z+w/2],[x,y+h*.72,z+w/2],[x,y+h,z],[x,y+h*.72,z-w/2]],palette.window,[-1,0,0]);
  }
  function building(x,z,w,d,h,roofColor=palette.roof,roofHeight=4) {
    box(x,.4,z,w+.7,.8,d+.7,palette.stoneDark);
    box(x,1,z,w,h,d,palette.stone);
    box(x,h+.6,z,w+.8,.6,d+.8,palette.stoneLight);
    roof(x,h+1.2,z,w+1.5,d+1.5,roofHeight,roofColor);
    const rowCount=h>9?2:1;
    for(let row=0;row<rowCount;row++) {
      for(let i=0;i<Math.max(1,Math.floor(w/4));i++) windowFront(x-w/2+2+i*4,2.4+row*4,z+d/2+.08);
      for(let i=0;i<Math.max(1,Math.floor(d/4));i++) windowSide(x-w/2-.08,2.4+row*4,z-d/2+2+i*4);
    }
    for(const side of [-1,1]) for(const depth of [-1,1]) box(x+side*(w/2-.15),1,z+depth*(d/2-.15),.65,h+.1,.65,palette.stoneLight);
  }
  function tower(x,z,r,h,color=palette.roof) {
    cylinder(x,.6,z,r+.35,1,palette.stoneDark,10);
    cylinder(x,1.6,z,r,h,palette.stone,10);
    cylinder(x,h+1,z,r+.5,1,palette.stoneLight,10);
    cone(x,h+2,z,r+1.1,r*2.25,color,10);
    cylinder(x,h+2+r*2.25,z,.13,1.8,palette.gold,6);
    windowFront(x,h-2,z+r+.02,1.1,2.5);
    windowSide(x-r-.02,h-2,z,1.1,2.5);
  }
  function ellipse(x,z,rx,rz,color,y=.18,layer=-1,n=40) {
    flat(Array.from({length:n},(_,i)=>[x+Math.cos(i*TAU/n)*rx,y,z+Math.sin(i*TAU/n)*rz]),color,layer);
  }
  function path(x1,z1,x2,z2,width=3,color=palette.path,y=.17) {
    const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),nx=-dz/len*width/2,nz=dx/len*width/2;
    flat([[x1+nx,y,z1+nz],[x2+nx,y,z2+nz],[x2-nx,y,z2-nz],[x1-nx,y,z1-nz]],color);
  }
  function tree(x,z,size=1,variant=0) {
    cylinder(x,.4,z,.4*size,2*size,'#75664a',5);
    const colors=['#415c43','#536c49','#61794e','#3c5945'];
    cone(x,1.2*size,z,2.8*size,6*size,colors[variant%4],7);
    cone(x,4.2*size,z,2.1*size,5.4*size,colors[(variant+1)%4],7);
  }
  function fence(x1,z1,x2,z2,height=2) {
    const distance=Math.hypot(x2-x1,z2-z1),count=Math.max(1,Math.round(distance/3));
    for(let i=0;i<=count;i++) box(x1+(x2-x1)*i/count,.4,z1+(z2-z1)*i/count,.38,height,.38,'#ad9570');
    const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),nx=-dz/len*.13,nz=dx/len*.13;
    for(const y of [1.1,2]) face([[x1+nx,y,z1+nz],[x2+nx,y,z2+nz],[x2-nx,y+.3,z2-nz],[x1-nx,y+.3,z1-nz]],'#b6a17b',[0,1,0]);
  }
  function flag(x,y,z,color) {
    cylinder(x,y,z,.12,4,palette.gold,5);
    face([[x,y+4,z],[x+2.7,y+3.8,z],[x+2.3,y+2.7,z],[x,y+2.9,z]],color,[0,0,1]);
  }
  // The stone plinth and connected pedestrian paths make the scene a campus guide.
  const ground=[[-78,-61],[59,-61],[82,-43],[82,41],[62,66],[-63,66],[-84,44],[-84,-43]];
  for(let i=0;i<ground.length;i++) {
    const p=ground[i],q=ground[(i+1)%ground.length];
    face([[p[0],-6,p[1]],[q[0],-6,q[1]],[q[0],0,q[1]],[p[0],0,p[1]]],'#a8936b',[0,0,1],-3);
  }
  flat(ground.map(p=>[p[0],0,p[1]]),palette.grass,-2);
  ellipse(26,-47,43,17,'#6f845d',.08,-1);
  path(0,64,0,13,6); path(0,24,-51,24,4); path(0,23,32,35,4); path(0,20,53,-2,4);
  path(-24,-4,-50,-29,3); path(-6,28,-6,46,3); path(7,-27,22,-45,3);
  path(-67,-30,-67,40,3); path(53,24,53,-29,3);
  // Main ㅁ-shaped teaching block, open courtyard, cloister and clock tower.
  flat([[-27,.2,-29],[27,.2,-29],[27,.2,13],[-27,.2,13]],'#c6bc9d');
  building(0,-25,48,8,10,palette.roof,4);
  building(-22,-8,8,28,10,palette.roof,4);
  building(22,-8,8,28,10,palette.roof,4);
  building(-16,9,17,8,8,palette.roof,4);
  building(16,9,17,8,8,palette.roof,4);
  box(-5,1,9,2.5,7,8,palette.stone); box(5,1,9,2.5,7,8,palette.stone);
  box(0,7,9,12.5,3,8,palette.stone); roof(0,10,9,14,10,4,palette.roof);
  for(let step=0;step<4;step++) box(0,.1+step*.22,16-step*.8,10-step*.3,.23,1.2,palette.stoneLight);
  for(const x of [-27,27]) for(const z of [-28,12]) tower(x,z,3.3,z<0?15:12);
  tower(0,-25,4.6,25,palette.slate);
  // Clock face / slim buttresses, garden courtyard and fountain.
  face([[-1.4,19.2,-20.28],[1.4,19.2,-20.28],[1.4,22,-20.28],[-1.4,22,-20.28]],'#e5d3a0',[0,0,1]);
  box(0,19.8,-20.15,.18,1.1,.1,'#5c5847'); box(.35,20.7,-20.1,.8,.18,.1,'#5c5847');
  ellipse(0,-8,5,5,'#b2ad8c',.24,-1);
  cylinder(0,.35,-8,3.5,.8,palette.stoneLight,16);
  cylinder(0,1.15,-8,2.8,.12,'#8caeaa',16);
  cylinder(0,1.2,-8,.5,2,palette.stoneLight,8);
  cylinder(0,3,-8,1.3,.35,palette.stoneLight,10);
  for(const x of [-14,14]) for(const z of [-15,0]) {ellipse(x,z,2.8,2.8,'#6d855b',.3,-1);tree(x,z,.55,2);}
  flag(0,38,-25,'#a8864e');
  // Three residence houses, roof colours follow the heraldry.
  const dormColors=['#963f37','#3f6584','#50754d'];
  [12,28,44].forEach((z,i)=>{
    building(-51,z,23,10,7,dormColors[i],4.5);
    tower(-63,z+3,2.2,9,dormColors[i]);
    flag(-51,12.8,z,dormColors[i]);
    path(-39,z,-34,z,2);
    face([[-52,3,z+5.2],[-50,3,z+5.2],[-50,6.5,z+5.2],[-52,6.5,z+5.2]],dormColors[i],[0,0,1]);
  });
  // Flight practice oval: inset track, landing field and freestanding sky gates.
  ellipse(53,-2,24,31,'#b4aa82',.2,-1);
  ellipse(53,-2,21.7,28.5,'#e0d0a6',.23,-1);
  ellipse(53,-2,18.5,25,'#879a6b',.26,-1);
  ellipse(53,-2,1.2,1.2,'#d7d4ae',.3,-1);
  path(53,-25,53,21,.35,'#c6cea0',.3);
  for(const z of [-24,20]) {
    box(48,.4,z,.65,9,.65,palette.stoneLight);box(58,.4,z,.65,9,.65,palette.stoneLight);
    box(53,8.7,z,11,.7,.7,palette.gold);
    flag(48,9.3,z,'#8f7950'); flag(58,9.3,z,'#8f7950');
  }
  for(let i=0;i<3;i++) box(76+i*1.2,.4+i*.65,-1,1.2,.6+i*.65,25,'#baaa8a');
  // Healing hall with a pale copper roof and unmistakable cross on its porch.
  building(32,36,22,13,8,'#648777',4);
  building(32,45,8,8,5,'#648777',3);
  box(32,5.3,49.12,.65,2.2,.16,'#e6dfbf');box(32,6,49.18,2.2,.65,.18,'#e6dfbf');
  for(const x of [21,43]) tree(x,49,.8,1);
  // Botanical glasshouse. Glass facets and pale ribs have no external textures.
  box(-6,.4,44,32,.8,14,palette.stoneLight);
  for(const x of [-16,-6,4]) {
    box(x,1.2,44,9.2,4.2,12,'#a0c1b8');
    roof(x,5.4,44,9.6,12.3,4,'#b1cfc1');
    for(let z=38;z<=50;z+=3) {
      box(x-4.65,1.2,z,.22,4.5,.25,'#dce0c6');box(x+4.65,1.2,z,.22,4.5,.25,'#dce0c6');
      face([[x-4.8,5.4,z],[x,9.4,z],[x,9.4,z+.22],[x-4.8,5.4,z+.22]],'#e0e4cf',[-.7,.7,0]);
      face([[x,9.4,z],[x+4.8,5.4,z],[x+4.8,5.4,z+.22],[x,9.4,z+.22]],'#e0e4cf',[.7,.7,0]);
    }
  }
  // Husbandry farm, paddock, feed silo and ordered growing beds.
  building(-52,-34,31,13,7,'#9a7350',5);
  cylinder(-70,.4,-38,3.4,9,'#c4b795',10);cone(-70,9.4,-38,3.8,4,'#7b7770',10);
  flat([[-69,.22,-23],[-35,.22,-23],[-35,.22,-9],[-69,.22,-9]],'#a6a273');
  fence(-69,-23,-35,-23);fence(-69,-23,-69,-9);fence(-35,-23,-35,-9);fence(-69,-9,-35,-9);
  for(let i=0;i<3;i++) box(-62+i*7,.35,-16,4,.55,6,'#8c8661');
  for(const x of [-63,-59,-55]) cylinder(x,.4,-25,1.3,1.8,'#d0b96f',8);
  // A deterministic grove leaves the back of the castle readable.
  let seed=7321;
  const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<53;i++) {
    const x=-8+random()*71,z=-57+random()*23;
    if(x<10 && z>-43)continue;
    tree(x,z,.8+random()*.65,i);
  }
  [[-76,10],[-75,28],[-34,49],[62,43],[67,34],[-36,-49],[-68,-53],[9,58],[16,57]].forEach(([x,z],i)=>tree(x,z,.8,i));
  // Front gate and short boundary wall segments frame the model like a maquette.
  for(const x of [-8,8]) tower(x,61,2.3,7,'#59665d');
  box(-20,.3,62,18,2,1.6,palette.stoneDark);box(20,.3,62,18,2,1.6,palette.stoneDark);
  for(const x of [-27,-23,-19,-15,15,19,23,27])box(x,2.3,62,1.5,.8,1.8,palette.stoneLight);

  function mount(canvas,options={}) {
    if(!canvas || !canvas.getContext) return null;
    const ctx=canvas.getContext('2d',{alpha:true});
    if(!ctx)return null;
    let width=800,height=540,yaw=-.35,pitch=.83,zoom=1,selected='main',destroyed=false,frame=0,pointer=null,projection=null;
    let rendered=[];
    const activeFaces=()=>{
      const [x,z,rx,rz]=footprints[selected] || footprints.main;
      const mark={vertices:Array.from({length:40},(_,i)=>[x+Math.cos(i*TAU/40)*rx,.31,z+Math.sin(i*TAU/40)*rz]),color:'#b6b67d',layer:-.5,stroke:'#e3d89d'};
      return [...faces,mark];
    };
    const rotate=point=>{
      const x=point[0]*Math.cos(yaw)-point[2]*Math.sin(yaw),z=point[0]*Math.sin(yaw)+point[2]*Math.cos(yaw);
      return [x,z*Math.sin(pitch)-point[1]*Math.cos(pitch),z*Math.cos(pitch)+point[1]*Math.sin(pitch)];
    };
    function projectScene() {
      let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
      const transformed=activeFaces().map(item=>{
        const vertices=item.vertices.map(point=>{const p=rotate(point);minX=Math.min(minX,p[0]);maxX=Math.max(maxX,p[0]);minY=Math.min(minY,p[1]);maxY=Math.max(maxY,p[1]);return p;});
        return {...item,vertices,depth:vertices.reduce((sum,p)=>sum+p[2],0)/vertices.length};
      });
      const scale=Math.min((width-36)/(maxX-minX),(height-44)/(maxY-minY))*zoom;
      const centerX=(minX+maxX)/2,centerY=(minY+maxY)/2;
      projection=point=>{const p=rotate(point);return [(p[0]-centerX)*scale+width/2,(p[1]-centerY)*scale+height/2];};
      transformed.forEach(item=>{item.points=item.vertices.map(p=>[(p[0]-centerX)*scale+width/2,(p[1]-centerY)*scale+height/2]);});
      transformed.sort((a,b)=>a.layer-b.layer || a.depth-b.depth);
      return transformed;
    }
    function draw() {
      frame=0;if(destroyed)return;
      rendered=projectScene();
      ctx.clearRect(0,0,width,height);
      ctx.lineJoin='round';ctx.lineWidth=.35;
      for(const item of rendered) {
        ctx.beginPath();item.points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();
        ctx.fillStyle=item.color;ctx.fill();
        if(item.stroke){ctx.strokeStyle=item.stroke;ctx.lineWidth=1.6;ctx.stroke();ctx.lineWidth=.35;}
      }
      if(options.onProjection)options.onProjection(Object.entries(anchors).map(([id,point])=>{const p=projection(point);return {id,x:p[0]/width*100,y:p[1]/height*100,visible:p[0]>12&&p[0]<width-12&&p[1]>12&&p[1]<height-12};}));
    }
    function requestDraw(){if(!frame&&!destroyed)frame=requestAnimationFrame(draw);}
    function resize(){
      const rect=canvas.getBoundingClientRect();width=Math.max(1,rect.width||800);height=Math.max(1,rect.height||540);
      const dpr=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);requestDraw();
    }
    function down(event){
      if(pointer)return;
      if(event.button!==undefined && event.button!==0)return;
      pointer={id:event.pointerId,x:event.clientX,y:event.clientY,type:event.pointerType};
      canvas.setPointerCapture?.(event.pointerId);canvas.style.cursor='grabbing';
    }
    function move(event){
      if(!pointer||event.pointerId!==pointer.id)return;
      const dx=event.clientX-pointer.x,dy=event.clientY-pointer.y;
      yaw+=dx*.007;
      if(pointer.type!=='touch')pitch=Math.max(.48,Math.min(1.1,pitch-dy*.004));
      pointer.x=event.clientX;pointer.y=event.clientY;requestDraw();
    }
    function up(event){if(pointer?.id===event.pointerId){pointer=null;canvas.style.cursor='grab';}}
    canvas.style.touchAction='pan-y';canvas.style.cursor='grab';
    canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
    const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;
    if(observer)observer.observe(canvas);else window.addEventListener('resize',resize);
    resize();
    options.onReady?.(true);
    return {
      select(id){if(anchors[id]){selected=id;requestDraw();}},
      reset(){yaw=-.35;pitch=.83;zoom=1;requestDraw();},
      zoomBy(factor){if(Number.isFinite(factor)&&factor>0){zoom=Math.max(.85,Math.min(1.8,zoom*factor));requestDraw();}},
      rotateBy(degrees){if(Number.isFinite(degrees)){yaw+=degrees*Math.PI/180;requestDraw();}},
      resize,
      snapshotSvg(){
        const items=projectScene();
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><title>드라고니움 아카데미아 3D 시설 조감도</title><rect width="100%" height="100%" fill="#efe5ce"/>${items.map(item=>`<polygon points="${item.points.map(p=>p.map(n=>n.toFixed(2)).join(',')).join(' ')}" fill="${item.color}"${item.stroke?` stroke="${item.stroke}" stroke-width="1.6"`:''}/>`).join('')}</svg>`;
      },
      destroy(){destroyed=true;if(frame)cancelAnimationFrame(frame);observer?.disconnect();window.removeEventListener('resize',resize);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);},
      getStats(){return {faces:faces.length,selected,yaw,pitch,zoom,width,height};}
    };
  }
  window.CampusMap3D={mount};
})();

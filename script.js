const button=document.getElementById('language');
let language='ko';
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
function applyLanguage(next){
  language=next; document.documentElement.lang=language;
  document.querySelectorAll('[data-ko]').forEach(el=>el.innerHTML=el.dataset[language]);
  button.textContent=language==='ko'?'EN ↗':'KO ↗';
  button.setAttribute('aria-label',language==='ko'?'Switch to English':'한국어로 변경');
}
if(new URLSearchParams(location.search).get('lang')==='en')applyLanguage('en');
button.addEventListener('click',()=>{
  const update=()=>{applyLanguage(language==='ko'?'en':'ko'); const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);};
  if(document.startViewTransition&&!reduceMotion.matches)document.startViewTransition(update);else update();
});
// Content remains visible if animation, intersection observers or WebGL are unavailable.
if('IntersectionObserver' in window&&!reduceMotion.matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');observer.unobserve(entry.target);}
  }),{threshold:0.08});
  document.querySelectorAll('.section-head,.game,.about-detail,.ai-heading,.ai-intro,.ai-workstreams article,.ai-boundary').forEach(el=>{
    el.classList.add('reveal-pending');observer.observe(el);
  });
}
const art=document.querySelector('.hero-art');
const canvas=document.createElement('canvas');canvas.className='light-field';canvas.setAttribute('aria-hidden','true');
const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false,depth:false});
if(gl&&!reduceMotion.matches){
  const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))return null;return s;};
  const vs=compile(gl.VERTEX_SHADER,'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}');
  const fs=compile(gl.FRAGMENT_SHADER,`precision mediump float;uniform vec2 resolution;uniform vec2 pointer;uniform float time;void main(){vec2 uv=gl_FragCoord.xy/resolution;vec2 d=uv-pointer;d.x*=resolution.x/resolution.y;float halo=exp(-dot(d,d)*9.);float wave=.5+.5*sin(uv.x*9.+uv.y*7.+time*.35);vec3 color=mix(vec3(.68,.82,.35),vec3(.28,.69,.78),uv.x);gl_FragColor=vec4(color,halo*(.10+.025*wave));}`);
  if(vs&&fs){
    const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
    if(gl.getProgramParameter(program,gl.LINK_STATUS)){
      art.append(canvas);gl.useProgram(program);
      const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const loc=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
      const res=gl.getUniformLocation(program,'resolution'),pointer=gl.getUniformLocation(program,'pointer'),time=gl.getUniformLocation(program,'time');
      let x=.5,y=.55,inView=true,frame=0;
      const resize=()=>{const rect=art.getBoundingClientRect();canvas.width=Math.round(rect.width*Math.min(devicePixelRatio,1.5));canvas.height=Math.round(rect.height*Math.min(devicePixelRatio,1.5));gl.viewport(0,0,canvas.width,canvas.height);};
      new ResizeObserver(resize).observe(art);resize();
      art.addEventListener('pointermove',event=>{const r=art.getBoundingClientRect();x=(event.clientX-r.left)/r.width;y=1-(event.clientY-r.top)/r.height;});
      const render=stamp=>{frame=0;if(!inView||document.hidden||reduceMotion.matches)return;gl.uniform2f(res,canvas.width,canvas.height);gl.uniform2f(pointer,x,y);gl.uniform1f(time,stamp/1000);gl.drawArrays(gl.TRIANGLES,0,6);frame=requestAnimationFrame(render);};
      const start=()=>{if(!frame&&inView&&!document.hidden&&!reduceMotion.matches)frame=requestAnimationFrame(render);};
      new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(!inView&&frame){cancelAnimationFrame(frame);frame=0;}else start();}).observe(art);
      document.addEventListener('visibilitychange',start);
      reduceMotion.addEventListener('change',()=>{canvas.hidden=reduceMotion.matches;start();});start();
    }
  }
}

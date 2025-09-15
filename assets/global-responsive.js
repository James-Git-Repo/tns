/* assets/global-responsive.js */
(function(){
  const html = document.documentElement;
  function setDeviceClasses(){
    const w = window.innerWidth;
    html.classList.toggle('mobile', w < 640);
    html.classList.toggle('tablet', w >= 640 && w < 1024);
    html.classList.toggle('desktop', w >= 1024);
  }
  const throttle = (fn, ms) => { let t=0; return (...a)=>{ const n=Date.now(); if(n-t>ms){ t=n; fn(...a); } }; };
  setDeviceClasses();
  window.addEventListener('resize', throttle(setDeviceClasses, 120), { passive:true });

  function setupNav(){
    let panel = document.querySelector('[data-nav-panel]') || document.getElementById('primaryNav') || document.querySelector('nav');
    if (!panel) return;
    if (!panel.id) panel.id = 'primaryNav';
    if (!panel.hasAttribute('data-nav-panel')) panel.setAttribute('data-nav-panel','');
    let btn = document.querySelector('[data-nav-toggle]');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'nav-toggle';
      btn.setAttribute('data-nav-toggle','');
      btn.setAttribute('aria-controls', panel.id);
      btn.setAttribute('aria-expanded','false');
      btn.type = 'button';
      btn.textContent = 'Menu';
      (document.querySelector('.navbar, header .wrap, header') || panel.parentElement).insertBefore(btn, panel);
    }
    const isSmall = () => window.innerWidth < 1024;
    const isOpen  = () => btn.getAttribute('aria-expanded') === 'true';
    const open = () => { btn.setAttribute('aria-expanded','true'); panel.removeAttribute('hidden'); panel.classList.add('is-open'); setTimeout(()=>document.addEventListener('click', onDoc),0); };
    const close= () => { btn.setAttribute('aria-expanded','false'); panel.setAttribute('hidden',''); panel.classList.remove('is-open'); document.removeEventListener('click', onDoc); };
    const onDoc = (e)=>{ if (!panel.contains(e.target) && e.target !== btn) close(); };
    if (isSmall()) close(); else panel.removeAttribute('hidden');
    btn.addEventListener('click',(e)=>{ e.stopPropagation(); isOpen()?close():open(); });
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape' && isOpen()) close(); });
    panel.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{ if(isSmall()) close(); }));
    window.addEventListener('resize', throttle(()=>{
      if(!isSmall()){ panel.removeAttribute('hidden'); btn.setAttribute('aria-expanded','false'); panel.classList.remove('is-open'); }
      else if(!isOpen()) panel.setAttribute('hidden','');
    }, 120), { passive:true });
  }
  if (document.readyState!=='loading') setupNav();
  else document.addEventListener('DOMContentLoaded', setupNav);
})();
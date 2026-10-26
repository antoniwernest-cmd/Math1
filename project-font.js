/* Share Andika and the current mascot portraits with every offline activity. */
(()=>{
 'use strict';
 const stylesheet=new URL('assets/fonts/andika.css',location.href).href,safeURL=stylesheet.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
 const readyScript=`(()=>{const redraw=async()=>{try{await Promise.all([document.fonts.load('400 16px Andika'),document.fonts.load('700 16px Andika')]);await document.fonts.ready;await new Promise(requestAnimationFrame);window.dispatchEvent(new Event('resize'));await new Promise(requestAnimationFrame);}catch{}};window.ML_PROJECT_FONT_READY=new Promise(resolve=>{const start=()=>redraw().then(resolve);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();});})();`;
 for(const [name,source]of Object.entries(window.ML_ENGINES||{})){
  let html=source.replace(/@font-face\s*\{[^}]*\}/gi,'').replace(/Nunito|Century Gothic|Trebuchet MS|Comic Sans MS/g,'Andika');
  for(const mascot of ['rocky','luna']){const current=new URL(window.ML_MASCOTS[mascot],location.href).href;html=html.replaceAll(new URL('assets/'+mascot+'.png',location.href).href,current).replaceAll('assets/'+mascot+'.png',current);}
  if(name==='reading')html=html.replace(/<\/head>/i,'<style>.reading-question{box-sizing:border-box}</style></head>');
  html=html.replace(/<\/head>/i,'<link rel="stylesheet" data-ml-project-font href="'+safeURL+'"><script data-ml-font-ready>'+readyScript+'</script></head>');
  window.ML_ENGINES[name]=html;
 }
 window.ML_PROJECT_FONT={name:'Andika',stylesheet};
})();

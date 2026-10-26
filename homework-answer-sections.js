/* Local answer windows and distinct section colours for October 26–30 homework. */
(()=>{
const week=ML_HOMEWORK_WEEKS['2026-10-26'];
const homeworkIds=Object.values(week.grades).flatMap(days=>days.flatMap(day=>day.questions.map(q=>q.id)));
const css=String.raw`
[data-answer-section-tone="pumpkin"]{--section-panel:rgb(255,244,234);--section-fill:rgb(250,214,182);--section-edge:rgb(165,89,41);--section-chosen:rgb(237,182,140)}
[data-answer-section-tone="gold"]{--section-panel:rgb(255,248,220);--section-fill:rgb(255,232,154);--section-edge:rgb(153,114,32);--section-chosen:rgb(244,209,109)}
[data-answer-section-tone="sage"]{--section-panel:rgb(240,247,235);--section-fill:rgb(212,232,199);--section-edge:rgb(88,126,66);--section-chosen:rgb(181,213,161)}
[data-answer-section-tone="plum"]{--section-panel:rgb(246,238,249);--section-fill:rgb(229,211,239);--section-edge:rgb(130,88,151);--section-chosen:rgb(204,177,218)}
[data-answer-section-tone="rose"]{--section-panel:rgb(255,240,243);--section-fill:rgb(247,211,219);--section-edge:rgb(163,75,98);--section-chosen:rgb(232,177,192)}
body :is(.mc-bank,.ml-answer-options,.rv-answers,.skills-part>div,.skills-round-answers)[data-answer-section-tone] > button{background:var(--section-fill)!important;border-color:var(--section-edge)!important;color:rgb(68,46,36)!important}
body :is(.mc-bank,.ml-answer-options,.rv-answers,.skills-part>div,.skills-round-answers)[data-answer-section-tone] > button[aria-pressed="true"]{background:var(--section-chosen)!important;border-color:var(--section-edge)!important;color:rgb(68,46,36)!important;outline:3px solid var(--section-edge)!important;outline-offset:-3px!important;filter:none!important}
body :is(.mc-bank,.ml-answer-options,.rv-answers,.skills-part>div,.skills-round-answers)[data-answer-section-tone] > button[data-ml-result="correct"]{box-shadow:inset 0 0 0 2px rgb(45,112,60),0 5px 0 rgb(143,101,68)!important}
body :is(.mc-bank,.ml-answer-options,.rv-answers,.skills-part>div,.skills-round-answers)[data-answer-section-tone] > button[data-ml-result="retry"]{outline:3px solid rgb(170,60,48)!important;outline-offset:-3px!important}
label.cb-field[data-answer-section-tone],label.im-field[data-answer-section-tone]{position:relative!important;background:var(--section-panel)!important;border-radius:8px!important;box-shadow:0 0 0 5px var(--section-panel)!important}
.rv-answers[data-answer-section-tone]{background:var(--section-panel)!important}
body.ml-homework-answer-sections .cb-fields>.cb-field[data-answer-section-tone]+.cb-field[data-answer-section-tone]::before,body.ml-homework-answer-sections .expanded-equation>.cb-field[data-place-value-field=tens]::before,body.ml-homework-answer-sections .expanded-equation>.cb-field[data-place-value-field=ones]::before{content:"";position:absolute;left:-7px;top:0;bottom:0;border-left:2px dotted rgb(196,196,196);pointer-events:none}
body.ml-homework-answer-sections .rv-place{position:relative}
body.ml-homework-answer-sections .rv-place+.rv-place::before{content:"";position:absolute;left:-4px;top:0;bottom:0;border-left:2px dotted rgb(196,196,196);pointer-events:none}
.skills-part>b.ml-answer-field-heading{flex-direction:column!important;align-items:flex-start!important;justify-content:center!important;gap:3px!important}
.ml-answer-field-heading{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:6px!important;min-width:0!important;width:100%!important;line-height:1.12!important}
.ml-answer-field-heading > span{min-width:0!important;font-size:inherit!important;line-height:1.12!important}
.ml-answer-value{display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 auto!important;min-width:46px!important;max-width:100%!important;min-height:29px!important;padding:2px 6px!important;box-sizing:border-box!important;border:2px solid var(--section-edge)!important;border-radius:8px!important;background:rgb(255,253,247)!important;color:rgb(68,46,36)!important;font:800 22px/1.05 Andika,sans-serif!important;box-shadow:inset 0 2px 3px rgb(87 57 35 / 10%);overflow-wrap:anywhere}
.mc-value[data-answer-section-tone]{border-color:var(--section-edge)!important}
.ml-answer-value[data-result="correct"]{outline:2px solid rgb(45,112,60);outline-offset:1px}
.ml-answer-value[data-result="retry"]{outline:2px solid rgb(170,60,48);outline-offset:1px}
.ml-answer-value.ml-answer-word{font-size:15px!important;min-width:46px!important;max-width:48%!important}
.rv-answers > strong.ml-answer-field-heading{font-size:inherit!important}
@media(max-height:460px){.ml-answer-value{min-height:25px!important;font-size:20px!important}.ml-answer-value.ml-answer-word{font-size:13px!important}}
@media print{.ml-answer-value{box-shadow:none!important}}
`;
function answerSections(ids){
 if(!ids.includes(window.ML_CONFIG?.id))return;document.body.classList.add('ml-homework-answer-sections');
 const tones=['pumpkin','gold','sage','plum','rose'];
 let queued=false;
 function tone(label,index){if(/hundred/i.test(label))return'pumpkin';if(/\btens?\b/i.test(label))return'gold';if(/\bones?\b|\bunits?\b/i.test(label))return'sage';if(/whole|number name|standard/i.test(label))return'plum';if(/round|estimate/i.test(label))return'rose';return tones[index%tones.length]}
 function labelFor(bank,native){const label=native?.closest('label')||bank.closest('label')||bank.closest('.skills-part,.skills-round'),title=label?.querySelector('span:not(.mc-value)')||bank.querySelector(':scope>strong')||label?.querySelector(':scope>b,:scope>h2');return{label,title,text:title?.dataset.answerSectionLabel||title?.textContent?.trim()||bank.getAttribute('aria-label')||'Your answer'}}
 function windowFor(bank,native,info,t){
  if(bank.classList.contains('mc-bank')&&bank.parentElement.querySelector('.mc-value')){bank.parentElement.querySelector('.mc-value').dataset.answerSectionTone=t;return;}
  let heading=info.title,output;
  if(bank.classList.contains('rv-answers')||info.label?.matches('.skills-part,.skills-round')){if(!heading)return;heading.classList.add('ml-answer-field-heading');output=heading.querySelector(':scope>.ml-answer-value');}
  else{if(!info.label||!heading)return;let holder=heading.closest('.ml-answer-field-heading');if(!holder){holder=document.createElement('div');holder.className='ml-answer-field-heading';heading.before(holder);holder.append(heading);}heading=holder;output=holder.querySelector(':scope>.ml-answer-value');}
  heading.dataset.answerSectionTone=t;
  if(!output){output=document.createElement('output');output.className='ml-answer-value';output.setAttribute('aria-live','polite');output.setAttribute('aria-atomic','true');output.setAttribute('aria-label','Selected '+info.text);heading.append(output);}
  const chosen=bank.querySelector('button[aria-pressed="true"]'),value=native?native.value:chosen?.textContent.trim()||'',text=value===''?'—':String(value);
  if(output.textContent!==text)output.textContent=text;
  output.classList.toggle('ml-answer-word',text.length>7);
  const result=chosen?.dataset.mlResult||'';
  if(output.dataset.result!==result)output.dataset.result=result;
 }
 function letters(){const parents=new Set([...document.querySelectorAll('button[data-local-field],button[data-machine-view],button[data-word-view],button[data-skill-view]')].map(b=>b.parentElement));for(const parent of parents){[...parent.querySelectorAll(':scope>button')].forEach((b,i)=>{const text=b.textContent.trim();if(/^(?:\d+|[A-Z])\s*·\s*/.test(text)){const next=String.fromCharCode(65+i)+' · '+text.replace(/^(?:\d+|[A-Z])\s*·\s*/,'');if(b.textContent!==next)b.textContent=next;}})}}
 function dividers(){for(const svg of document.querySelectorAll('svg.oa-block-picture')){if(svg.dataset.placeValueDividers)return;const groups=[100,10,1].map(value=>{const blocks=[...svg.querySelectorAll('rect[data-block-value=\"'+value+'\"]')];if(!blocks.length)return null;const bounds=blocks.map(b=>b.getBBox());return{left:Math.min(...bounds.map(b=>b.x)),right:Math.max(...bounds.map(b=>b.x+b.width))}}).filter(Boolean);const box=svg.viewBox.baseVal;for(let i=1;i<groups.length;i++){const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',(groups[i-1].right+groups[i].left)/2);line.setAttribute('x2',line.getAttribute('x1'));line.setAttribute('y1',box.y+4);line.setAttribute('y2',box.y+box.height-4);line.setAttribute('stroke','rgb(196,196,196)');line.setAttribute('stroke-width','2');line.setAttribute('stroke-dasharray','2 5');line.setAttribute('vector-effect','non-scaling-stroke');line.setAttribute('pointer-events','none');line.dataset.placeValueDivider='true';svg.prepend(line)}svg.dataset.placeValueDividers='true'}}
 function update(){queued=false;letters();dividers();const banks=[...document.querySelectorAll('.mc-bank,.ml-answer-options,.rv-answers,.skills-part>div,.skills-round-answers')];banks.forEach((bank,i)=>{if(!bank.querySelector(':scope>button'))return;const native=bank.previousElementSibling?.matches('select,input,textarea')?bank.previousElementSibling:bank.closest('label')?.querySelector('select,input:not([type=checkbox]),textarea');const info=labelFor(bank,native);if(info.title&&!info.title.dataset.answerSectionLabel)info.title.dataset.answerSectionLabel=info.text;const t=tone(info.text,i);if(bank.dataset.answerSectionTone!==t)bank.dataset.answerSectionTone=t;if(info.label){info.label.dataset.answerSectionTone=t;if(/hundred/i.test(info.text))info.label.dataset.placeValueField='hundreds';else if(/\btens?\b/i.test(info.text))info.label.dataset.placeValueField='tens';else if(/\bones?\b/i.test(info.text))info.label.dataset.placeValueField='ones';}windowFor(bank,native,info,t);});}
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['aria-pressed','data-ml-result','selected','hidden']});
 document.addEventListener('input',schedule);document.addEventListener('change',schedule);document.addEventListener('click',schedule);
 window.ML_ANSWER_SECTIONS={refresh:schedule};update();
}
for(const[name,h]of Object.entries(ML_ENGINES))ML_ENGINES[name]=h.replace('</head>','<style>'+css+'</style><script>document.addEventListener("DOMContentLoaded",()=>requestAnimationFrame(()=>('+answerSections.toString()+')('+JSON.stringify(homeworkIds)+')),{once:true});</'+'script></head>');
window.ML_HOMEWORK_ANSWER_SECTIONS={week:'2026-10-26',ids:homeworkIds};
})();

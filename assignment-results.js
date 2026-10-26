window.ML_ASSIGNMENT_RESULTS=(()=>{
 'use strict';
 const $=id=>document.getElementById(id),safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let api;
 function scope(){const s=api?.scope();return s?.questions.length>0&&s.index===s.questions.length-1?s:null;}
 function ready(s=scope()){
  if(!s)return false;const record=api.record(s.questions.at(-1)),a=api.snapshot()?.assessment;
  if(!record.done||!a?.signature)return false;
  const result=window.ML_LEARNER_ASSESSMENT.result(record),checked=record.lastCheck?.signature===a.signature||a.checked===true;
  return result.override==='correct'||checked&&a.complete===true;
 }
 function update(){
  if(!api)return;const s=scope(),button=$('checkResults'),enabled=ready(s);
  button.hidden=!s;button.disabled=!enabled;button.classList.toggle('is-ready',enabled);
  const total=s?.questions.length;
  $('resultsReady').textContent=enabled?'See these '+total+' questions':'Finish this page and check your work first';
  button.title=enabled?'Show results for these '+total+' questions':'Finish this page, check your work, and tick Finished';
  $('assignmentFinishActions').hidden=button.hidden&&$('callTeacher').hidden;
 }
 function summary(s){
  const rows=s.questions.map((q,index)=>{const record=api.record(q),r=window.ML_LEARNER_ASSESSMENT.result(record),status=r.override?(r.override==='correct'?'correct':'review'):r.automatic==='Correct'?'correct':r.automatic==='Not checked'?'unchecked':'review';return{q,index,status,done:!!record.done};});
  return{rows,total:rows.length,correct:rows.filter(r=>r.status==='correct').length,review:rows.filter(r=>r.status==='review').length,unchecked:rows.filter(r=>r.status==='unchecked').length,finished:rows.filter(r=>r.done).length};
 }
 function speak(text){api.stop();if(!api.audio()){api.toast('Turn audio on to hear the results.');return}if(window.speechSynthesis&&window.SpeechSynthesisUtterance){const speech=new SpeechSynthesisUtterance(text);speech.lang='en-CA';speech.rate=.88;speechSynthesis.speak(speech);}}
 function show(){
  api.save();const s=scope();if(!ready(s)){api.toast('Finish this last page, check your work, and tick Finished first.');update();return;}
  api.stop();const result=summary(s),labels={correct:'Correct',review:'Try again',unchecked:'Not checked'},icons={correct:'✓',review:'↻',unchecked:'–'},name=s.kind==='classwork'?'Classwork':'Homework',mascot=s.grade===2?'rocky':'luna';
  api.modal('Your results',
   '<p class="assignment-results-scope">'+safe(name+' · '+s.label)+'<br>'+safe(s.studentLabel)+' · '+(s.grade===2?'Excite · Grade 2':'Inspire · Grade 3')+'</p>'+
   '<div class="assignment-results-hero"><img src="'+safe(window.ML_MASCOTS[mascot])+'" alt="'+(s.grade===2?'Rocky':'Luna')+'"><div><strong>'+result.correct+' / '+result.total+'</strong><span>checked and correct</span></div></div>'+
   '<div class="assignment-results-counts"><span>✓ '+result.correct+' correct</span><span>↻ '+result.review+' try again</span><span>– '+result.unchecked+' not checked</span></div>'+
   '<p class="assignment-results-note">'+result.finished+' of '+result.total+' marked Finished. Tap a question to review it.</p>'+
   '<div class="assignment-results-grid" aria-label="Results for these '+result.total+' questions">'+result.rows.map(row=>'<button class="result-'+row.status+'" data-result-question="'+row.index+'" aria-label="Question '+(row.index+1)+': '+labels[row.status]+'"><b>'+(row.index+1)+'</b><span>'+icons[row.status]+'</span><small>'+labels[row.status]+' · '+safe(row.q.pageCode||'')+'</small></button>').join('')+'</div>',
   '<button id="hearResults">▶ Hear results</button><button id="stopResults">■ Stop voice</button>'+(s.kind==='classwork'?'<button id="resultsCallTeacher">Call my teacher</button>':'')+'<button id="resultsStay" class="primary">Stay on page '+result.total+'</button>');
  $('modal').dataset.results='true';
  $('modalBody').querySelectorAll('[data-result-question]').forEach(button=>button.onclick=()=>{api.stop();$('modal').close();api.visit(s.questions[+button.dataset.resultQuestion]);});
  $('hearResults').onclick=()=>speak(name+'. '+s.label+'. '+result.correct+' out of '+result.total+' checked and correct. '+result.review+' to try again. '+result.unchecked+' not checked. '+result.finished+' marked finished. Tap a question to review it.');
  $('stopResults').onclick=api.stop;$('resultsStay').onclick=()=>{api.stop();$('modal').close();$('checkResults').focus();};
  if(s.kind==='classwork')$('resultsCallTeacher').onclick=()=>{api.stop();$('modal').close();api.callTeacher();};
 }
 function init(options){
  api=options;const actions=document.createElement('div');actions.id='assignmentFinishActions';actions.className='assignment-finish-actions';actions.hidden=true;
  const teacher=$('callTeacher');teacher.before(actions);const button=document.createElement('button');button.id='checkResults';button.className='check-results-button';button.hidden=true;button.disabled=true;button.setAttribute('aria-haspopup','dialog');button.innerHTML='<strong>Check my results</strong><small id="resultsReady">Finish this page and check your work first</small>';button.onclick=show;actions.append(button,teacher);update();
 }
 return{init,update};
})();

/* Restore saved calendar activities as the first page of each homework day. */
(()=>{'use strict';
 const week='2026-10-26',plan=ML_HOMEWORK_WEEKS[week],pages=[...new Set([...ML_CATALOG,...ML_HOMEWORK_PAGES])],byId=new Map(pages.map(q=>[q.id,q])),restored=[];
 if(!plan)return;
 for(const grade of[2,3])for(const[dayIndex,day]of plan.grades[grade].entries()){
  const id='hw-'+week+'-g'+grade+'-calendar-v1-'+(dayIndex+1),q=byId.get(id);
  if(!q)throw Error('Daily calendar activity missing: '+id);
  const goal='I can count forward or backward on a calendar to solve an addition or subtraction problem.';
  q.learningGoal=goal;q.curriculumAlignment={grade,codes:[...q.codes],goal,evidence:'Count intervals between dates or find a date after adding or subtracting days.'};
  q.config.curriculumAlignment={...q.curriculumAlignment,details:structuredClone(q.details)};
  q.config.calendar.assignmentDate=day.date;
  const existing=day.questions.find(e=>e.id===id);
  const entry={...existing,id,title:q.title,section:'Calendar warm-up',sectionId:'number:homework-calendar',codes:[...q.codes],calendar:true,groupNumber:0,number:1,learningGoal:goal,curriculumAlignment:q.curriculumAlignment};
  day.questions=[entry,...day.questions.filter(e=>e.id!==id)];
  day.questions.forEach((e,i)=>e.number=i+1);
  restored.push(id);
 }
 plan.allowAdditionalQuestions=true;
 plan.questionCountsByDay=Object.fromEntries(Object.entries(plan.grades).map(([g,days])=>[g,days.map(d=>d.questions.length)]));
 delete plan.questionsPerDay;
 ML_EXTRA_PRACTICE.counts=ML_EXTRA_PRACTICE.reconcile(week);
 ML_HOMEWORK_CURRICULUM.specifications=Object.fromEntries(Object.values(plan.grades).flatMap(ds=>ds.flatMap(d=>d.questions.map(e=>[e.id,byId.get(e.id).curriculumAlignment]))));
 ML_HOMEWORK_CURRICULUM.reviewed=Object.keys(ML_HOMEWORK_CURRICULUM.specifications).length;
 window.ML_DAILY_CALENDARS={week,firstPage:true,ids:restored,counts:plan.questionCountsByDay};
})();

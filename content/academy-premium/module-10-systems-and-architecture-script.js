/* ── DISCOVERY QUESTIONS WIDGET ── */
function generateDiscovery(){
  const answers=[1,2,3,4,5].map(i=>document.getElementById('dq'+i).value.trim());
  if(answers.some(a=>!a)){document.getElementById('discoveryResult').innerHTML='<strong>Please fill in all 5 questions.</strong>';document.getElementById('discoveryResult').classList.add('show');return;}
  const a=answers.map(esc);
  const html=`<strong>Your starting point</strong><br><br>
Your top priority is <strong>${a[0]}</strong>. The operational problem on your mind is <strong>${a[1]}</strong>. You know you should be doing <strong>${a[2]}</strong> but haven't had the time. You're currently using <strong>${a[3]}</strong>. In 90 days, success looks like: <strong>${a[4]}</strong>.<br><br>
<strong>Recommended path:</strong> start with Claude on the work you haven't had time for: draft the SOPs, plans and analyses behind ${a[2]}. Build your knowledge system (Module 6) so each session builds on the last. When you're ready to automate the repetitive parts of ${a[0]} and take on ${a[1]}, that's where we can help.<br><br>
Save this summary to your AI-System/ folder as <code>my-starting-point.md</code>.`;
  const el=document.getElementById('discoveryResult');
  el.innerHTML=html;el.classList.add('show');
}

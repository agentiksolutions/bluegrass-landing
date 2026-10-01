/* ═══════════════════════════════════════════════════
   SESSIONS
   ═══════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════
   SESSION ESTIMATOR
   ═══════════════════════════════════════════════════ */
function runEstimator() {
  const input = document.getElementById('estimator-input').value.trim();
  if (!input) { toast('Describe what you want to build'); return; }

  const lower = input.toLowerCase();
  const wordCount = input.split(/\s+/).length;
  let score = 0; // complexity points

  // Factor 1: Number of distinct outputs/deliverables
  const outputSignals = (input.match(/\b(dashboard|page|form|report|email|api|endpoint|chart|graph|component|workflow|automation|database|table|schema|template|integration|webhook|notification|alert|pdf|document|export|import|migration|script|function|module|feature|tool|app|site|bot|agent)\b/gi) || []);
  const uniqueOutputs = new Set(outputSignals.map(o => o.toLowerCase())).size;
  score += Math.min(uniqueOutputs * 2, 10);

  // Factor 2: Research vs building
  const isResearch = /\b(research|investigate|analyze|compare|evaluate|find out|learn about|understand|study|assess|audit|review existing|competitive analysis|market research|deep dive)\b/i.test(input);
  const isBuilding = /\b(build|create|implement|deploy|set up|configure|connect|integrate|design|code|develop|write|wire|add|install)\b/i.test(input);
  if (isResearch && isBuilding) score += 3;
  else if (isBuilding) score += 2;

  // Factor 3: Multiple interconnected systems
  const systemWords = (input.match(/\b(api|database|supabase|vercel|github|n8n|docker|postgres|webhook|stripe|slack|telegram|toast|pos|crm|erp|zapier|google sheets?|notion|airtable|excel|csv|json|rest|graphql|oauth|smtp|twilio|sendgrid|cloudflare)\b/gi) || []);
  const uniqueSystems = new Set(systemWords.map(s => s.toLowerCase())).size;
  if (uniqueSystems >= 3) score += 5;
  else if (uniqueSystems >= 2) score += 3;
  else if (uniqueSystems >= 1) score += 1;

  // Factor 4: Decisions needed mid-build
  const decisionSignals = /\b(decide|choose|either|or should|which (approach|method|tool|framework)|trade.?off|option|alternative|architecture|schema design|data model)\b/i.test(input);
  if (decisionSignals) score += 2;

  // Factor 5: Scale / file size expectations
  const scaleSignals = /\b(large|complex|entire|full|complete|comprehensive|all \d+|every|multi.?(page|step|part|phase)|end.to.end|from scratch|overhaul|rewrite|redesign|migration)\b/i.test(input);
  if (scaleSignals) score += 3;

  // Factor 6: Word count of description (more detail = more complex task)
  if (wordCount > 80) score += 2;
  else if (wordCount > 40) score += 1;

  // Factor 7: Multi-step / sequencing
  const hasSequencing = /\b(first.{0,20}then|step \d|phase \d|after.{0,10}(that|this|building)|once.{0,15}(done|complete|set up|working)|before.{0,10}(we|I) can)\b/i.test(input);
  if (hasSequencing) score += 2;

  // Determine session type and complexity
  let sessionType, duration, complexity, reasoning, prereqs, strategy;

  if (score <= 4) {
    sessionType = 'Light';
    duration = '20-45 min';
    complexity = 'Simple';
    reasoning = 'This is a focused, single-output task. One clear deliverable, no system integrations, no architectural decisions. Claude can handle this in a single pass with the right prompt.';
    prereqs = 'Your prompt (use the Builder to structure it). Any reference files or examples you want the output to match.';
    strategy = 'Single session, single prompt. Watch it run and iterate once if needed. No need to break this up.';
  } else if (score <= 8) {
    sessionType = 'Research or light';
    duration = '45-90 min';
    complexity = 'Moderate';
    reasoning = 'This involves ' + (uniqueOutputs > 1 ? uniqueOutputs + ' deliverables' : 'meaningful depth') + (uniqueSystems >= 2 ? ' across ' + uniqueSystems + ' systems' : '') + '. It\'s doable in one session but needs clear structure upfront to avoid scope drift.';
    prereqs = 'Clear acceptance criteria for each output. ' + (uniqueSystems >= 2 ? 'API docs or credentials for ' + systemWords.slice(0, 3).join(', ') + '. ' : '') + 'Any existing code or files to build on.';
    strategy = isResearch ? 'Start with research, then build. Two distinct prompts: don\'t combine discovery with production.' : 'One structured session. Front-load the hardest piece. Save polish for a follow-up if needed.';
  } else if (score <= 14) {
    sessionType = 'Heavy';
    duration = '1-3 hours';
    complexity = 'Complex';
    reasoning = 'This is a multi-output build' + (uniqueSystems >= 2 ? ' spanning ' + uniqueSystems + ' systems' : '') + (decisionSignals ? ' with architectural decisions that need to be made mid-build' : '') + '. Expect iteration. Things will change as you build. Budget time for debugging and refinement.';
    prereqs = 'Architecture decisions made in advance (don\'t discover your data model mid-build). ' + (uniqueSystems >= 2 ? 'All API keys, credentials, and system access verified working. ' : '') + 'A clear priority order: what ships first if time runs short.';
    strategy = 'Break into 2-3 sequential prompts. Build the foundation first, then layer features. Save cosmetic work for last. Consider committing working checkpoints every 30 minutes.';
  } else {
    sessionType = 'Overnight';
    duration = '3-8 hours';
    complexity = 'Architectural';
    reasoning = 'This is a major build: ' + uniqueOutputs + ' distinct outputs, ' + (uniqueSystems >= 3 ? uniqueSystems + ' interconnected systems, ' : '') + 'and significant complexity. It will require multiple passes, debugging, and likely some mid-course corrections. This is not a "watch it run" session.';
    prereqs = 'Full architecture plan documented before starting. All system access and credentials tested. Data models and schemas designed. A prioritized feature list: what\'s MVP vs nice-to-have. Fallback plan if a system integration fails.';
    strategy = 'Multi-session approach recommended. Session 1: architecture + foundation. Session 2: core features + integrations. Session 3: polish + edge cases. Set an overnight direction and review the morning briefing before continuing.';
  }

  // Render results
  document.getElementById('est-type').innerHTML = sessionType;
  document.getElementById('est-time').textContent = duration;
  document.getElementById('est-complexity').textContent = complexity;
  document.getElementById('est-reasoning').textContent = reasoning;
  document.getElementById('est-prereqs').textContent = prereqs;
  document.getElementById('est-strategy').textContent = strategy;
  document.getElementById('estimator-result').style.display = 'block';
}

function selectSessionType(type) {
  sessionType = type;
  document.querySelectorAll('.session-type-btn').forEach(b => b.classList.toggle('active', b.dataset.stype === type));
  document.getElementById('autonomous-setup').classList.toggle('visible', type === 'overnight');
}

function setRating(n) {
  sessionRating = n;
  document.querySelectorAll('#session-rating button').forEach((b, i) => {
    b.classList.toggle('filled', i < n);
  });
}

function saveSession() {
  const direction = document.getElementById('session-direction').value.trim();
  if (!direction) { toast('Direction required'); return; }

  state.sessions.unshift({
    id: uid(),
    type: sessionType,
    date: Date.now(),
    direction,
    outputs: document.getElementById('session-outputs').value.trim(),
    decisions: document.getElementById('session-decisions').value.trim(),
    openLoops: document.getElementById('session-loops').value.trim(),
    ideas: document.getElementById('session-ideas').value.trim(),
    rating: sessionRating
  });
  saveState();

  // Clear form
  ['session-direction', 'session-outputs', 'session-decisions', 'session-loops', 'session-ideas'].forEach(id => {
    document.getElementById(id).value = '';
  });
  setRating(0);

  renderSessions();
  toast('Session logged');
}

function renderSessions() {
  const listEl = document.getElementById('session-list');
  const typeLabels = { light: 'Light', heavy: 'Heavy', research: 'Research', overnight: 'Overnight' };

  let html = '<h3>Session timeline</h3>';
  if (state.sessions.length === 0) {
    html += '<div style="text-align:center;padding:20px;color:var(--stone);">No sessions logged yet</div>';
  } else {
    html += state.sessions.map(s => {
      const date = new Date(s.date);
      const stars = s.rating ? 'Rated ' + s.rating + ' of 5' : 'Not rated';
      return `<div class="session-entry" onclick="this.querySelector('.session-entry-details').classList.toggle('visible')">
        <div class="session-entry-header">
          <span class="session-entry-type">${escHtml(typeLabels[s.type] || s.type)}</span>
          <span class="session-entry-date">${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span>
        </div>
        <div class="session-entry-direction">${escHtml(s.direction)}</div>
        <div style="font-size:12px;color:var(--stone);margin-top:4px;">${stars}</div>
        <div class="session-entry-details">
          ${s.outputs ? '<strong>Outputs:</strong> ' + escHtml(s.outputs) + '<br><br>' : ''}
          ${s.decisions ? '<strong>Decisions:</strong> ' + escHtml(s.decisions) + '<br><br>' : ''}
          ${s.openLoops ? '<strong>Open Loops:</strong> ' + escHtml(s.openLoops) + '<br><br>' : ''}
          ${s.ideas ? '<strong>Ideas:</strong> ' + escHtml(s.ideas) : ''}
        </div>
      </div>`;
    }).join('');
  }
  listEl.innerHTML = html;

  // Update stats
  document.getElementById('stat-total').textContent = state.sessions.length;
  const ratings = state.sessions.filter(s => s.rating > 0).map(s => s.rating);
  document.getElementById('stat-avg-rating').textContent = ratings.length > 0 ? (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(1) : '-';

  const loops = state.sessions.filter(s => s.openLoops).map(s => s.openLoops);
  document.getElementById('stat-open-loops').textContent = loops.length;
  const ideas = state.sessions.filter(s => s.ideas).map(s => s.ideas);
  document.getElementById('stat-ideas').textContent = ideas.length;

  // Insights: open loops
  const loopsEl = document.getElementById('insights-loops');
  if (loops.length > 0) {
    loopsEl.innerHTML = loops.slice(0, 5).map(l =>
      `<div class="open-loop-item"><span>${escHtml(l.substring(0, 80))}</span></div>`
    ).join('');
  } else {
    loopsEl.innerHTML = '<span style="font-size:12px;color:var(--stone);">No open loops</span>';
  }

  // Insights: ideas
  const ideasEl = document.getElementById('insights-ideas');
  if (ideas.length > 0) {
    ideasEl.innerHTML = ideas.slice(0, 5).map(i =>
      `<div class="idea-item"><div class="idea-item-text">${escHtml(i.substring(0, 100))}</div></div>`
    ).join('');
  } else {
    ideasEl.innerHTML = '<span style="font-size:12px;color:var(--stone);">No ideas logged</span>';
  }
}

function generateBriefing() {
  const focus = document.getElementById('auto-focus').value.trim();
  const loops = document.getElementById('auto-loops').value.trim();
  const questions = document.getElementById('auto-questions').value.trim();
  const challenge = document.getElementById('auto-challenge').value.trim();

  // Pull from sessions
  const recentSession = state.sessions[0];
  const allLoops = state.sessions.filter(s => s.openLoops).map(s => s.openLoops).slice(0, 3);
  const allIdeas = state.sessions.filter(s => s.ideas).map(s => s.ideas).slice(0, 3);

  let briefing = `You are my research assistant. I have set you a direction and stepped away. Work through it on your own and produce a morning briefing.\n\n`;
  briefing += `═══ DIRECTION ═══\n`;
  if (focus) briefing += `Priority: ${focus}\n`;
  if (loops) briefing += `Open loops to address: ${loops}\n`;
  if (questions) briefing += `Questions needing answers: ${questions}\n`;
  if (challenge) briefing += `Challenge/reconsider: ${challenge}\n`;

  if (recentSession) {
    briefing += `\n═══ LAST SESSION CONTEXT ═══\n`;
    briefing += `Direction: ${recentSession.direction}\n`;
    if (recentSession.outputs) briefing += `Outputs: ${recentSession.outputs}\n`;
    if (recentSession.openLoops) briefing += `Unfinished: ${recentSession.openLoops}\n`;
  }

  if (allLoops.length > 0) {
    briefing += `\n═══ ACCUMULATED OPEN LOOPS ═══\n`;
    allLoops.forEach(l => briefing += `- ${l}\n`);
  }
  if (allIdeas.length > 0) {
    briefing += `\n═══ IDEAS BANK ═══\n`;
    allIdeas.forEach(i => briefing += `- ${i}\n`);
  }

  briefing += `\n═══ INSTRUCTIONS ═══\n`;
  briefing += `1. Work through the priority direction above\n`;
  briefing += `2. Address any open loops you can\n`;
  briefing += `3. Generate ideas proactively\n`;
  briefing += `4. Challenge at least one assumption or direction\n`;
  briefing += `5. Produce a morning briefing in this format:\n\n`;
  briefing += `WHAT I WORKED ON:\nWHAT I BUILT:\nWHAT I FOUND:\nWHAT I CHALLENGED:\nNEW IDEAS:\nWHAT NEEDS YOUR DECISION:\nRECOMMENDED NEXT STEP:`;

  document.getElementById('briefing-result').textContent = briefing;
  document.getElementById('gen-briefing-output').classList.add('visible');
}

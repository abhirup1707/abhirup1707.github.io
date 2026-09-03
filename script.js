/* ==========================================================================
   CyberPhone & DevOS - Abhirup Chakrabarti's Dynamic Portfolio Script
   ========================================================================== */

(function () {
  'use strict';

  // State Management
  const state = {
    isUnlocked: false,
    activeApp: null,
    soundEnabled: true,
    theme: 'cyber',
    matrixMode: false,
    terminalHistory: [],
    terminalHistoryIndex: -1,
    isWorkstationMode: false
  };

  const data = window.PORTFOLIO_DATA;

  // ==========================================================================
  // Web Audio Synthesizer for Interactive Sound Effects
  // ==========================================================================
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  function playSound(type) {
    if (!state.soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'tap') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'open') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.12);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'unlock') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'key') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      }
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // ==========================================================================
  // Clock & Status Bar Updates
  // ==========================================================================
  function updateClocks() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateStr = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

    const statusTimeEl = document.getElementById('status-time');
    const lockTimeEl = document.getElementById('lock-time');
    const lockDateEl = document.getElementById('lock-date');

    if (statusTimeEl) statusTimeEl.textContent = timeStr;
    if (lockTimeEl) lockTimeEl.textContent = timeStr;
    if (lockDateEl) lockDateEl.textContent = dateStr;
  }

  // ==========================================================================
  // Lockscreen & App Navigation
  // ==========================================================================
  function unlockPhone() {
    if (state.isUnlocked) return;
    state.isUnlocked = true;
    playSound('unlock');
    const lockscreen = document.getElementById('lockscreen');
    if (lockscreen) {
      lockscreen.classList.add('unlocked');
    }
  }

  function openApp(appId) {
    playSound('open');
    if (state.activeApp) {
      const prev = document.getElementById(`app-${state.activeApp}`);
      if (prev) prev.classList.remove('active');
    }
    const target = document.getElementById(`app-${appId}`);
    if (target) {
      target.classList.add('active');
      state.activeApp = appId;
      
      // Auto focus terminal or bot input if opened
      if (appId === 'terminal') {
        const input = document.getElementById('terminal-input');
        if (input) setTimeout(() => input.focus(), 300);
      } else if (appId === 'bot') {
        const input = document.getElementById('bot-input');
        if (input) setTimeout(() => input.focus(), 300);
      }
    }
  }

  function closeActiveApp() {
    playSound('tap');
    const folderModal = document.getElementById('phone-folder-modal');
    if (folderModal && folderModal.classList.contains('open')) {
      folderModal.classList.remove('open');
    }
    if (state.activeApp) {
      const activeEl = document.getElementById(`app-${state.activeApp}`);
      if (activeEl) activeEl.classList.remove('active');
      if (state.activeApp === 'browser') {
        const iframe = document.getElementById('browser-iframe');
        if (iframe) iframe.src = 'about:blank'; // stop background game loops & audio
      }
      state.activeApp = null;
    }
  }

  // ==========================================================================
  // App Folder Modal ("Project Demos")
  // ==========================================================================
  function openFolder() {
    playSound('open');
    const folderModal = document.getElementById('phone-folder-modal');
    if (folderModal) folderModal.classList.add('open');
  }

  function closeFolder() {
    playSound('tap');
    const folderModal = document.getElementById('phone-folder-modal');
    if (folderModal) folderModal.classList.remove('open');
  }

  window.openCyberFolder = openFolder;
  window.closeCyberFolder = closeFolder;

  // ==========================================================================
  // In-Phone Web Browser & Interactive Game Player
  // ==========================================================================
  function openInPhoneBrowser(url, title = 'Web App') {
    playSound('open');
    if (state.activeApp) {
      const prev = document.getElementById(`app-${state.activeApp}`);
      if (prev) prev.classList.remove('active');
    }
    const browserView = document.getElementById('app-browser');
    const iframe = document.getElementById('browser-iframe');
    const urlText = document.getElementById('browser-url-text');
    const popoutBtn = document.getElementById('browser-popout-btn');
    const fullscreenBtn = document.getElementById('browser-fullscreen-btn');
    const loader = document.getElementById('browser-loader');

    if (!browserView || !iframe) return;

    let displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (urlText) urlText.textContent = displayUrl;

    if (popoutBtn) popoutBtn.href = url;
    if (fullscreenBtn) fullscreenBtn.href = url;

    if (loader) loader.classList.remove('hidden');

    iframe.onload = () => {
      if (loader) loader.classList.add('hidden');
    };

    iframe.src = url;
    browserView.classList.add('active');
    state.activeApp = 'browser';
  }

  function reloadBrowserIframe() {
    playSound('tap');
    const iframe = document.getElementById('browser-iframe');
    const loader = document.getElementById('browser-loader');
    if (iframe && iframe.src) {
      if (loader) loader.classList.remove('hidden');
      iframe.src = iframe.src;
    }
  }

  window.openInPhoneBrowser = openInPhoneBrowser;
  window.reloadBrowserIframe = reloadBrowserIframe;

  // ==========================================================================
  // Dynamic Projects Renderer
  // ==========================================================================
  function renderProjects(category = 'all') {
    const container = document.getElementById('projects-list');
    if (!container) return;

    const filtered = category === 'all' 
      ? data.projects 
      : data.projects.filter(p => p.category === category);

    container.innerHTML = filtered.map(proj => {
      const techTags = proj.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');
      const highlights = proj.highlights.map(h => `<li>${h}</li>`).join('');
      
      return `
        <div class="project-card" data-category="${proj.category}">
          <span class="project-badge">${proj.period}</span>
          <h3>${proj.title}</h3>
          <p class="project-tagline">${proj.tagline}</p>
          <div class="project-tech-pills">${techTags}</div>
          <ul class="timeline-bullets" style="margin-bottom: 14px;">
            ${highlights}
          </ul>
          <div class="project-action-row" style="flex-wrap:wrap;gap:8px;">
            ${proj.demoUrl ? `
              <button class="btn-play-phone" onclick="window.openInPhoneBrowser('${proj.demoUrl}', '${escapeHtml(proj.title)}')">
                <i data-lucide="play" style="width:13px;height:13px;"></i> Play in Phone
              </button>
              <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-demo" onclick="window.cyberSynthTap()">
                <i data-lucide="external-link" style="width:14px;height:14px;"></i> Live Demo
              </a>
            ` : ''}
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-github" onclick="window.cyberSynthTap()">
              <i class="fa-brands fa-github"></i> GitHub
            </a>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================================================
  // Interactive Terminal Engine
  // ==========================================================================
  function initTerminal() {
    const input = document.getElementById('terminal-input');
    const historyContainer = document.getElementById('terminal-history');
    if (!input || !historyContainer) return;

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (cmd) {
          executeTerminalCommand(cmd);
          state.terminalHistory.push(cmd);
          state.terminalHistoryIndex = state.terminalHistory.length;
        }
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        if (state.terminalHistoryIndex > 0) {
          state.terminalHistoryIndex--;
          input.value = state.terminalHistory[state.terminalHistoryIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (state.terminalHistoryIndex < state.terminalHistory.length - 1) {
          state.terminalHistoryIndex++;
          input.value = state.terminalHistory[state.terminalHistoryIndex] || '';
        } else {
          state.terminalHistoryIndex = state.terminalHistory.length;
          input.value = '';
        }
      } else {
        playSound('key');
      }
    });
  }

  function executeTerminalCommand(cmd) {
    playSound('tap');
    const historyContainer = document.getElementById('terminal-history');
    if (!historyContainer) return;

    const lower = cmd.toLowerCase().trim();
    let output = '';

    switch (lower) {
      case 'help':
        output = `Available DevOS Commands:
  • <strong style="color:var(--accent-cyan)">about</strong>       : Abhirup's bio and background
  • <strong style="color:var(--accent-cyan)">skills</strong>      : Technical languages, frameworks & tools
  • <strong style="color:var(--accent-cyan)">projects</strong>    : List all key projects & live links
  • <strong style="color:var(--accent-cyan)">exp</strong>         : Internship & work experience
  • <strong style="color:var(--accent-cyan)">edu</strong>         : Education & certifications
  • <strong style="color:var(--accent-cyan)">contact</strong>     : Email, WhatsApp, Call & Social links
  • <strong style="color:var(--accent-cyan)">matrix</strong>      : Toggle canvas matrix digital rain
  • <strong style="color:var(--accent-cyan)">clear</strong>       : Clear console terminal
  • <strong style="color:var(--accent-cyan)">sudo hire</strong>   : Fast-track recruitment contact link`;
        break;

      case 'about':
        output = `${data.profile.name} — ${data.profile.title}
Location: ${data.profile.location}
${data.profile.bio}`;
        break;

      case 'skills':
        output = `[LANGUAGES]: ${data.skills.languages.map(l => l.name).join(', ')}
[FRAMEWORKS]: ${data.skills.frameworks.map(f => f.name).join(', ')}
[TOOLS & CLOUD]: ${data.skills.tools.join(', ')}
[CORE CS]: ${data.skills.concepts.join(', ')}`;
        break;

      case 'projects':
        output = data.projects.map(p => 
          `• <strong>${p.title}</strong> [${p.period}]
  ${p.tagline}
  Demo: <a href="${p.demoUrl}" target="_blank">${p.demoUrl}</a>`
        ).join('\n\n');
        break;

      case 'exp':
      case 'experience':
        output = data.experience.map(exp => 
          `• <strong>${exp.role} @ ${exp.company}</strong> (${exp.period})
  ${exp.points.join('\n  ')}`
        ).join('\n\n');
        break;

      case 'edu':
      case 'education':
        output = data.education.map(e => 
          `• <strong>${e.degree}</strong>
  ${e.institution} (${e.period})
  ${e.highlight}`
        ).join('\n\n');
        break;

      case 'contact':
        output = `Direct Contact Channels:
• WhatsApp: <a href="${data.socials.whatsapp.url}" target="_blank">${data.socials.whatsapp.display}</a>
• Phone: <a href="${data.socials.phone.url}">${data.socials.phone.display}</a>
• Email: <a href="${data.socials.email.url}">${data.socials.email.display}</a>
• GitHub: <a href="${data.socials.github.url}" target="_blank">${data.socials.github.display}</a>
• LinkedIn: <a href="${data.socials.linkedin.url}" target="_blank">${data.socials.linkedin.display}</a>
• Instagram: <a href="${data.socials.instagram.url}" target="_blank">${data.socials.instagram.display}</a>`;
        break;

      case 'matrix':
        state.matrixMode = !state.matrixMode;
        output = state.matrixMode 
          ? "🟢 Matrix digital rain mode ENABLED on background canvas." 
          : "⚪ Matrix mode DISABLED. Restored constellation particle mesh.";
        break;

      case 'clear':
        historyContainer.innerHTML = '';
        return;

      case 'sudo hire':
        output = `Access Granted! Launching direct WhatsApp transmission to Abhirup...`;
        setTimeout(() => {
          window.open(data.socials.whatsapp.url, '_blank');
        }, 600);
        break;

      default:
        output = `Command not recognized: '${cmd}'. Type '<strong style="color:var(--accent-cyan)">help</strong>' for available commands.`;
    }

    const entry = document.createElement('div');
    entry.className = 'terminal-line';
    entry.innerHTML = `
      <div><span class="term-user">visitor@devOS:~$</span> <span class="term-cmd">${escapeHtml(cmd)}</span></div>
      <div class="term-output">${output}</div>
    `;
    historyContainer.appendChild(entry);
    historyContainer.scrollTop = historyContainer.scrollHeight;
  }

  // ==========================================================================
  // AI Bot ("Abhi-Bot") Assistant Engine
  // ==========================================================================
  function initBot() {
    const input = document.getElementById('bot-input');
    const sendBtn = document.getElementById('bot-send');
    if (!input || !sendBtn) return;

    function handleSend() {
      const q = input.value.trim();
      if (!q) return;
      input.value = '';
      sendBotMessage(q);
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  function sendBotMessage(query) {
    playSound('tap');
    const container = document.getElementById('bot-messages');
    if (!container) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg-bubble msg-user';
    userMsg.textContent = query;
    container.appendChild(userMsg);
    container.scrollTop = container.scrollHeight;

    // Typing simulation
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'msg-bubble msg-bot';
    typingIndicator.innerHTML = `<em>Abhi-Bot is thinking...</em>`;
    container.appendChild(typingIndicator);
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const answer = generateBotResponse(query);
      const botMsg = document.createElement('div');
      botMsg.className = 'msg-bubble msg-bot';
      botMsg.innerHTML = formatBotAnswer(answer);
      container.appendChild(botMsg);
      container.scrollTop = container.scrollHeight;
      playSound('tap');
    }, 450);
  }

  function generateBotResponse(query) {
    const q = query.toLowerCase();
    for (const item of data.botKnowledge) {
      if (item.triggers.some(t => q.includes(t))) {
        return item.response;
      }
    }
    return `I can assist you with Abhirup's projects, technical skills, internship experiences at CodSoft and AI Wallah, academic credentials at Jadavpur University, or provide direct WhatsApp & email contact info!`;
  }

  function formatBotAnswer(text) {
    return text.replace(/\n/g, '<br/>')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color:var(--accent-cyan);text-decoration:underline;">$1</a>');
  }

  // ==========================================================================
  // Workstation / Desktop IDE Switcher
  // ==========================================================================
  function toggleWorkstationMode() {
    state.isWorkstationMode = !state.isWorkstationMode;
    playSound('tap');
    const toggleBtn = document.getElementById('toggle-mode-btn');
    const mobileBtn = document.getElementById('mobile-mode-btn');

    if (state.isWorkstationMode) {
      document.body.classList.add('workstation-mode');
      if (toggleBtn) toggleBtn.innerHTML = `<i data-lucide="smartphone"></i> Phone View`;
      if (mobileBtn) mobileBtn.innerHTML = `<i class="fa-solid fa-mobile-screen"></i> Phone`;
      loadIdeFile('projects');
    } else {
      document.body.classList.remove('workstation-mode');
      if (toggleBtn) toggleBtn.innerHTML = `<i data-lucide="monitor"></i> Workstation Mode`;
      if (mobileBtn) mobileBtn.innerHTML = `<i class="fa-solid fa-code"></i> IDE`;
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function loadIdeFile(fileKey) {
    const editorContent = document.getElementById('ide-editor-content');
    const activeFileTitle = document.getElementById('ide-active-file');
    const tabs = document.querySelectorAll('.ide-file-item');
    
    tabs.forEach(t => t.classList.remove('active'));
    const selectedTab = document.querySelector(`.ide-file-item[data-file="${fileKey}"]`);
    if (selectedTab) selectedTab.classList.add('active');

    if (activeFileTitle) activeFileTitle.textContent = `${fileKey}.tsx`;

    if (!editorContent) return;

    if (fileKey === 'projects') {
      editorContent.innerHTML = `
        <h2 style="color:var(--accent-cyan);margin-bottom:12px;">📁 Projects Showcase (TypeScript / React)</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(360px, 1fr));gap:16px;">
          ${data.projects.map(p => `
            <div class="project-card">
              <span class="project-badge">${p.period}</span>
              <h3>${p.title}</h3>
              <p class="project-tagline">${p.tagline}</p>
              <div class="project-tech-pills">${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
              <ul class="timeline-bullets" style="margin-bottom: 12px;">
                ${p.highlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
              <div class="project-action-row" style="flex-wrap:wrap;gap:8px;">
                ${p.demoUrl ? `
                  <button class="btn-play-phone" onclick="window.openInPhoneBrowser('${p.demoUrl}', '${escapeHtml(p.title)}')">
                    <i data-lucide="play" style="width:13px;height:13px;"></i> Play in Phone
                  </button>
                  <a href="${p.demoUrl}" target="_blank" class="btn-demo"><i data-lucide="external-link" style="width:14px;height:14px;"></i> Live Demo</a>
                ` : ''}
                <a href="${p.githubUrl}" target="_blank" class="btn-github"><i class="fa-brands fa-github"></i> GitHub</a>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (fileKey === 'experience') {
      editorContent.innerHTML = `
        <h2 style="color:var(--accent-cyan);margin-bottom:16px;">💼 Professional Work Experience</h2>
        ${data.experience.map(e => `
          <div class="timeline-card">
            <div class="timeline-dot"></div>
            <div class="timeline-role">${e.role} @ <span style="color:var(--accent-cyan);">${e.company}</span></div>
            <div class="timeline-meta">${e.location} | ${e.period}</div>
            <ul class="timeline-bullets">
              ${e.points.map(pt => `<li>${pt}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      `;
    } else if (fileKey === 'skills') {
      editorContent.innerHTML = `
        <h2 style="color:var(--accent-cyan);margin-bottom:16px;">⚡ Technical Skills & Competencies</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
          <div>
            <h4 class="skill-category-title">Programming Languages</h4>
            ${data.skills.languages.map(l => `
              <div class="skill-bar-row">
                <div class="skill-bar-header"><span>${l.name}</span><span>${l.level}%</span></div>
                <div class="skill-track"><div class="skill-progress" style="width:${l.level}%"></div></div>
              </div>
            `).join('')}
          </div>
          <div>
            <h4 class="skill-category-title">Frameworks & Web Architecture</h4>
            ${data.skills.frameworks.map(f => `
              <div class="skill-bar-row">
                <div class="skill-bar-header"><span>${f.name} (${f.category})</span><span>${f.level}%</span></div>
                <div class="skill-track"><div class="skill-progress" style="width:${f.level}%"></div></div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (fileKey === 'contact') {
      editorContent.innerHTML = `
        <h2 style="color:var(--accent-cyan);margin-bottom:16px;">📞 Direct Contact Hub</h2>
        <div class="quick-connect-grid" style="max-width:600px;">
          <a href="${data.socials.whatsapp.url}" target="_blank" class="connect-tile">
            <div class="tile-icon tile-wa"><i class="fa-brands fa-whatsapp"></i></div>
            <span>WhatsApp</span>
            <small>${data.socials.whatsapp.display}</small>
          </a>
          <a href="${data.socials.phone.url}" class="connect-tile">
            <div class="tile-icon tile-call"><i class="fa-solid fa-phone"></i></div>
            <span>Call</span>
            <small>${data.socials.phone.display}</small>
          </a>
          <a href="${data.socials.email.url}" class="connect-tile">
            <div class="tile-icon tile-mail"><i class="fa-solid fa-envelope"></i></div>
            <span>Email</span>
            <small>${data.socials.email.display}</small>
          </a>
          <a href="${data.socials.linkedin.url}" target="_blank" class="connect-tile">
            <div class="tile-icon tile-linkedin"><i class="fa-brands fa-linkedin-in"></i></div>
            <span>LinkedIn</span>
            <small>abhirupchakrabarti</small>
          </a>
          <a href="${data.socials.github.url}" target="_blank" class="connect-tile">
            <div class="tile-icon tile-github"><i class="fa-brands fa-github"></i></div>
            <span>GitHub</span>
            <small>abhirup1707</small>
          </a>
          <a href="${data.socials.instagram.url}" target="_blank" class="connect-tile">
            <div class="tile-icon tile-insta"><i class="fa-brands fa-instagram"></i></div>
            <span>Instagram</span>
            <small>belle_abhi_2005</small>
          </a>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================================================
  // Canvas Ambient Particle & Matrix Rain System
  // ==========================================================================
  function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Particle Constellation
    const particles = [];
    const numParticles = Math.min(65, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 0.8
      });
    }

    // Matrix Drops
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    const chars = '0123456789ABCDEFHIJKLMNOPQRSTUVWXYZ+-*/=λπΩΨ';

    function animate() {
      if (state.matrixMode) {
        ctx.fillStyle = 'rgba(2, 6, 4, 0.12)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00ff66';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      } else {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // ==========================================================================
  // Global Helpers & Listeners
  // ==========================================================================
  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  window.cyberSynthTap = () => playSound('tap');
  window.openCyberApp = (id) => openApp(id);
  window.closeCyberApp = () => closeActiveApp();

  // Initialization on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    updateClocks();
    setInterval(updateClocks, 1000);
    initCanvas();
    renderProjects('all');
    initTerminal();
    initBot();

    // Unlock listeners
    const swipeBtn = document.getElementById('swipe-unlock-btn');
    const lockNotif = document.getElementById('lock-notif');
    if (swipeBtn) swipeBtn.addEventListener('click', unlockPhone);
    if (lockNotif) lockNotif.addEventListener('click', () => {
      unlockPhone();
      setTimeout(() => openApp('projects'), 300);
    });

    // Home indicator
    const homeIndicator = document.getElementById('home-indicator');
    if (homeIndicator) homeIndicator.addEventListener('click', closeActiveApp);

    // Folder open/close listeners
    const folderBtn = document.getElementById('open-folder-btn');
    const folderCloseBtn = document.getElementById('folder-close-btn');
    const folderBackdrop = document.getElementById('folder-backdrop');

    if (folderBtn) folderBtn.addEventListener('click', openFolder);
    if (folderCloseBtn) folderCloseBtn.addEventListener('click', closeFolder);
    if (folderBackdrop) folderBackdrop.addEventListener('click', closeFolder);

    // Folder app items click delegation
    document.querySelectorAll('.folder-app-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        closeFolder();
        const url = item.getAttribute('data-url');
        const title = item.getAttribute('data-title') || 'Project Demo';
        if (url) {
          setTimeout(() => openInPhoneBrowser(url, title), 180);
        }
      });
    });

    // App icons click delegation
    document.querySelectorAll('.app-icon-item').forEach(item => {
      item.addEventListener('click', () => {
        const appId = item.getAttribute('data-app');
        if (appId) {
          openApp(appId);
        } else if (item.classList.contains('app-browser-trigger')) {
          const url = item.getAttribute('data-url');
          const title = item.getAttribute('data-title') || 'App';
          if (url) openInPhoneBrowser(url, title);
        }
      });
    });

    // Project category filters
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        playSound('tap');
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderProjects(pill.getAttribute('data-filter'));
      });
    });

    // Quick bot prompt buttons
    document.querySelectorAll('.quick-prompt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-prompt');
        if (text) sendBotMessage(text);
      });
    });

    // Terminal quick chips
    document.querySelectorAll('.term-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) executeTerminalCommand(cmd);
      });
    });

    // Workstation toggle buttons (Desktop topbar, mobile profile pill, settings, and IDE return)
    const modeBtn = document.getElementById('toggle-mode-btn');
    const mobileModeBtn = document.getElementById('mobile-mode-btn');
    const settingsModeBtn = document.getElementById('settings-mode-btn');
    const ideReturnBtn = document.getElementById('ide-return-btn');

    if (modeBtn) modeBtn.addEventListener('click', toggleWorkstationMode);
    if (mobileModeBtn) mobileModeBtn.addEventListener('click', toggleWorkstationMode);
    if (settingsModeBtn) settingsModeBtn.addEventListener('click', toggleWorkstationMode);
    if (ideReturnBtn) ideReturnBtn.addEventListener('click', toggleWorkstationMode);

    // IDE file item clicks
    document.querySelectorAll('.ide-file-item').forEach(item => {
      item.addEventListener('click', () => {
        playSound('tap');
        const file = item.getAttribute('data-file');
        if (file) loadIdeFile(file);
      });
    });

    // Sound toggle button
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        soundBtn.innerHTML = state.soundEnabled 
          ? `<i data-lucide="volume-2"></i> Sound ON` 
          : `<i data-lucide="volume-x"></i> Sound OFF`;
        if (window.lucide) window.lucide.createIcons();
      });
    }

    // Theme selector buttons
    document.querySelectorAll('.theme-picker-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playSound('tap');
        const theme = btn.getAttribute('data-theme');
        document.body.className = '';
        if (theme !== 'cyber') {
          document.body.classList.add(`theme-${theme}`);
        }
        if (state.isWorkstationMode) {
          document.body.classList.add('workstation-mode');
        }
      });
    });

    // Render lucide icons
    if (window.lucide) window.lucide.createIcons();
  });

})();

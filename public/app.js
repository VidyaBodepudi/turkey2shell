/* ==========================================================================
   TURKEY4SHELL (CVE-2026-1126) — Interactive Advisory Logic
   Zero dependencies • Vanilla ES2020+ • Ready for Cloudflare Pages
   ========================================================================== */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. Toast Notification Helper
     ------------------------------------------------------------------------ */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, variant = 'default') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast${variant !== 'default' ? ` toast--${variant}` : ''}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    window.setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      window.setTimeout(() => toast.remove(), 220);
    }, 3200);
  }

  /* ------------------------------------------------------------------------
     2. Clipboard Helper with [ Copy ] -> [ Copied! ] feedback
     ------------------------------------------------------------------------ */
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }

  function flashCopyButton(btn, copiedLabel = '[ Copied! ]') {
    const original = btn.dataset.originalLabel || btn.textContent;
    btn.dataset.originalLabel = original;
    btn.textContent = copiedLabel;
    btn.classList.add('is-copied');
    window.clearTimeout(Number(btn.dataset.copyTimer || 0));
    const timer = window.setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('is-copied');
    }, 1800);
    btn.dataset.copyTimer = String(timer);
  }

  document.addEventListener('click', async (event) => {
    const copyBtn = event.target.closest('[data-copy-target]');
    if (copyBtn) {
      const targetEl = document.querySelector(copyBtn.getAttribute('data-copy-target'));
      if (!targetEl) return;
      try {
        await copyText(targetEl.textContent.trim());
        flashCopyButton(copyBtn);
      } catch {
        showToast('Clipboard blocked by browser permissions.', 'warn');
      }
      return;
    }

    const hashBtn = event.target.closest('[data-copy-hash]');
    if (hashBtn) {
      const row = hashBtn.closest('tr');
      const hashCode = row?.querySelector('.hash-val');
      if (!hashCode) return;
      try {
        await copyText(hashCode.textContent.trim());
        flashCopyButton(hashBtn);
      } catch {
        showToast('Clipboard blocked by browser permissions.', 'warn');
      }
    }
  });

  /* ------------------------------------------------------------------------
     3. Ambient Wide-Screen Side Telemetry Logs
     ------------------------------------------------------------------------ */
  function populateSideLogs() {
    const leftEl = document.getElementById('side-log-left');
    const rightEl = document.getElementById('side-log-right');
    if (!leftEl || !rightEl) return;

    const leftLines = [
      '0x443000a0 [+] INIT turkey4j v2.14.1',
      '0x443000b4 [*] SCAN /dining_room/table',
      '0x443000c8 [!] GRAVY_VISCOSITY=CRITICAL',
      '0x443000dc [+] JNDI -> pie://kitchen.lan',
      '0x443000f0 [!] HEAP_LOAD /plate/log +124%',
      '0x44300104 [*] BELT_NOTCH=3/5 -> 2/5',
      '0x44300118 [!] KILL clear_the_table.svc',
      '0x4430012c [+] SPAWN eyelid_suspend.sh',
      '0x44300140 [*] TARGET=/living_room/recliner',
      '0x44300154 [!] AUDIO_LOOP: 78dB SNORE',
      '0x44300168 [*] ALERT:GRAVY-RED // STUFFCON-1',
      '0x4430017c [+] UNC-GRAVY: LADLE_INJECT'
    ];

    const rightLines = [
      'CVE-2026-1126 :: CVSS 10.0/10.0',
      'SERVING_SIZE=2.3_PLATES [EXCEEDED]',
      'TRYPT_HEAP: 0x0000COUCH [LOCKED]',
      'REMOTE_GRIP: ACQUIRED (UNCLE_BOB)',
      'JVM_FLAG: formatMsgNoGravy=false',
      'WAIST_HOTFIX: EXPANDABLE +35%',
      'TOUCH_FOOTBALL: ERR_DARK_AT_445PM',
      'GRAVY_BOAT_RADAR: 1.2M PROXIMITY',
      'THERMOSTAT_SENSOR: 74.2F [WARN]',
      'Q3_BLOWOUT: 35-7 [RECLINE_TRIGGER]',
      'EMBARGO_BREACH: KEVIN_4K_STREAM',
      'PATCH_STATUS: WONT_FIX (DELICIOUS)'
    ];

    leftEl.textContent = Array.from({ length: 4 }, () => leftLines.join('\n')).join('\n');
    rightEl.textContent = Array.from({ length: 4 }, () => rightLines.join('\n')).join('\n');
  }

  /* ------------------------------------------------------------------------
     4. Mobile Navigation & GitHub Star Counter
     ------------------------------------------------------------------------ */
  const menuBtn = document.getElementById('nav-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mobileNav.hidden = expanded;
    });

    mobileNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      }
    });
  }

  const starBtn = document.getElementById('star-btn');
  const starCount = document.getElementById('star-count');
  let starred = false;

  if (starBtn && starCount) {
    starBtn.addEventListener('click', () => {
      starred = !starred;
      starBtn.setAttribute('aria-pressed', String(starred));
      if (starred) {
        starCount.textContent = '12,501';
        showToast('★ Starred! The carving station salutes you.');
      } else {
        starCount.textContent = '12.5k';
        showToast('Unstarred. UNC-GRAVY added an extra scoop of stuffing.', 'warn');
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Section 1: Interactive Exploit Payload Tabs
     ------------------------------------------------------------------------ */
  const PAYLOADS = {
    gravy: '${turkey:gravy://carving-station.local:80/second_helping?extra_stuffing=true}',
    dessert: '${jndi:pie://kitchen.lan:443/${lower:p}ecan_${upper:w}hipped_cream}',
    phishing: '${family:techsupport://dining.internal/can_you_fix_my_printer?redirect=/couch}',
    sliver: '${carb:mashed://table.local/just_a_tiny_bit?multiplier=4.5&butter=max}'
  };

  const payloadCodeEl = document.getElementById('active-payload-code');
  const pillTabs = document.querySelectorAll('.pill-tab[data-payload]');

  pillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.payload;
      if (!key || !PAYLOADS[key] || !payloadCodeEl) return;

      pillTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      payloadCodeEl.textContent = PAYLOADS[key];
    });
  });

  /* ------------------------------------------------------------------------
     6. Section 2: Interactive Terminal PoC Runner
     ------------------------------------------------------------------------ */
  const POC_PROFILES = {
    uncle: [
      { cls: 'term-cmd', text: '$ python3 turkey4shell_exploit.py --target "Unsuspecting_Uncle" --gravy-force' },
      { cls: 'term-warn', text: '[!] Initializing Turkey4Shell JNDI chain (CVE-2026-1126)...' },
      { cls: 'term-ok', text: '[+] Target identified: Uncle Bob (Turkey4j v2.14.1 | Belt-Notch: 3/5)' },
      { cls: 'term-ok', text: '[+] Bypassing willpower WAF via social_lure("Have one more scoop before it gets cold!")' },
      { cls: 'term-info', text: '[*] Injecting: ${turkey:gravy://carving-station.local:80/second_helping?extra_stuffing=true}' },
      { cls: 'term-ok', text: '[+] POST /plate/log HTTP/1.1 -> 200 OK (Serving-Size: 2.3 plates)' },
      { cls: 'term-crit', text: '[!] EXCEPTION: GravyLookupInjectionException — Tryptophan heap at 124%!' },
      { cls: 'term-warn', text: '[!] Hardware Interrupt: Belt shifted back one notch under napkin cover.' },
      { cls: 'term-ok', text: '[+] Suspending unit: clear_the_table.service -> redirected to /dev/null' },
      { cls: 'term-crit', text: '[!] Spawning persistent daemon: eyelid_suspend.sh (PID 4430)' },
      { cls: 'term-info', text: '[*] Target pivoted to /living_room/recliner (Recline-Angle: 145deg)' },
      { cls: 'term-ok', text: '[*] Couch-shell established. Audio loop active: "Don\'t change the channel, I\'m watching this."' }
    ],
    host: [
      { cls: 'term-cmd', text: '$ python3 turkey4shell_exploit.py --target "Chef_Dad" --oven-uptime=0500AM' },
      { cls: 'term-warn', text: '[!] Initializing Turkey4Shell JNDI chain (CVE-2026-1126)...' },
      { cls: 'term-ok', text: '[+] Target identified: Chef Dad (Oven OS 2026 | EOL Alert: Basting since 5:00 AM)' },
      { cls: 'term-ok', text: '[+] Bypassing willpower WAF via social_lure("Sit down, you cooked all day!")' },
      { cls: 'term-info', text: '[*] Injecting: ${carb:mashed://table.local/just_a_tiny_bit?multiplier=4.5&butter=max}' },
      { cls: 'term-ok', text: '[+] POST /plate/log HTTP/1.1 -> 200 OK (Serving-Size: 1.9 plates + 22lb carving fatigue)' },
      { cls: 'term-crit', text: '[!] EXCEPTION: Adrenaline cache exhausted (0%) — Tryptophan heap at 118%!' },
      { cls: 'term-warn', text: '[!] Hardware Interrupt: Kitchen apron unmounted cleanly.' },
      { cls: 'term-ok', text: '[+] Suspending unit: pack_leftover_containers.service -> deferred to 20:00' },
      { cls: 'term-crit', text: '[!] Spawning persistent daemon: eyelid_suspend.sh (PID 4431)' },
      { cls: 'term-info', text: '[*] Target pivoted to /living_room/sofa_corner (Throw-Blanket: ENGAGED)' },
      { cls: 'term-ok', text: '[*] Couch-shell established. Audio loop active: "Just five minutes before I carve the rest..."' }
    ],
    cousin: [
      { cls: 'term-cmd', text: '$ python3 turkey4shell_exploit.py --target "Cousin_Kevin" --tight-denim-exploit' },
      { cls: 'term-warn', text: '[!] Initializing Turkey4Shell JNDI chain (CVE-2026-1126)...' },
      { cls: 'term-ok', text: '[+] Target identified: Cousin Kevin (Slim-Denim v2.4 | Belt-Notch: 5/5 MAX)' },
      { cls: 'term-ok', text: '[+] Bypassing willpower WAF via social_lure("Can you fix my printer before dessert?")' },
      { cls: 'term-info', text: '[*] Injecting: ${family:techsupport://dining.internal/can_you_fix_my_printer?redirect=/couch}' },
      { cls: 'term-ok', text: '[+] POST /plate/log HTTP/1.1 -> 200 OK (Serving-Size: 2.7 plates + defensive dinner rolls)' },
      { cls: 'term-crit', text: '[!] EXCEPTION: GravyLookupInjectionException — Tryptophan heap at 136%!' },
      { cls: 'term-warn', text: '[!] Hardware Interrupt: Top denim button disengaged under tablecloth.' },
      { cls: 'term-ok', text: '[+] Suspending unit: printer_troubleshooting.service -> tactical retreat to basement' },
      { cls: 'term-crit', text: '[!] Spawning persistent daemon: eyelid_suspend.sh (PID 4432)' },
      { cls: 'term-info', text: '[*] Target pivoted to /basement/futon (Phone-Battery: 19%)' },
      { cls: 'term-ok', text: '[*] Couch-shell established. Audio loop active: "Nah, I\'m just checking my fantasy football scores."' }
    ],
    self: [
      { cls: 'term-cmd', text: '$ python3 turkey4shell_exploit.py --target "127.0.0.1" --quarter=3 --elastic-hotfix' },
      { cls: 'term-warn', text: '[!] Initializing Turkey4Shell loopback exploit (CVE-2026-1126)...' },
      { cls: 'term-ok', text: '[+] Target identified: Self (Halftime Host | -Dwaist.expandable=true detected)' },
      { cls: 'term-ok', text: '[+] Bypassing willpower WAF via social_lure("Just cut me a thin sliver of pecan pie")' },
      { cls: 'term-info', text: '[*] Injecting: ${jndi:pie://kitchen.lan:443/${lower:p}ecan_${upper:w}hipped_cream}' },
      { cls: 'term-ok', text: '[+] POST /plate/log HTTP/1.1 -> 200 OK (Serving-Size: 3.1 plates | Whipped-Cream: MAX)' },
      { cls: 'term-crit', text: '[!] EXCEPTION: Elastic hotfix added +35% headroom, JNDI root cause UNPATCHED (141%)!' },
      { cls: 'term-warn', text: '[!] Hardware Interrupt: Eyelid refresh rate dropped to 0.2 Hz.' },
      { cls: 'term-ok', text: '[+] Suspending unit: touch_football_drill.service -> aborted (ERR_DARK_AT_445PM)' },
      { cls: 'term-crit', text: '[!] Spawning persistent daemon: eyelid_suspend.sh (PID 4433)' },
      { cls: 'term-info', text: '[*] Target pivoted to /living_room/sectional (Scoreboard: 35-7 Blowout)' },
      { cls: 'term-ok', text: '[*] Couch-shell established. Audio loop active: "Wake me up before the fourth quarter starts..."' }
    ]
  };

  const pocOutputEl = document.getElementById('poc-output');
  const pocSelectEl = document.getElementById('poc-target-select');
  const pocRunBtn = document.getElementById('poc-run-btn');
  const pocResetBtn = document.getElementById('poc-reset-btn');
  const pocCopyBtn = document.getElementById('poc-copy-btn');
  const heroRunPocBtn = document.getElementById('hero-run-poc');

  let pocTimers = [];
  let pocPlainText = '';

  function clearPocTimers() {
    pocTimers.forEach((id) => window.clearTimeout(id));
    pocTimers = [];
  }

  function appendTermLine(lineObj, withCursor = false) {
    if (!pocOutputEl) return;
    const oldCursor = pocOutputEl.querySelector('.term-cursor');
    if (oldCursor) oldCursor.remove();

    const p = document.createElement('p');
    p.className = `term-line ${lineObj.cls}`;
    p.textContent = lineObj.text;

    if (withCursor) {
      const cursor = document.createElement('span');
      cursor.className = 'term-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      p.appendChild(cursor);
    }

    pocOutputEl.appendChild(p);
    pocOutputEl.scrollTop = pocOutputEl.scrollHeight;
  }

  function renderPocInstant(profileKey) {
    if (!pocOutputEl) return;
    clearPocTimers();
    const lines = POC_PROFILES[profileKey] || POC_PROFILES.uncle;
    pocOutputEl.innerHTML = '';
    lines.forEach((line, idx) => appendTermLine(line, idx === lines.length - 1));
    pocPlainText = lines.map((l) => l.text).join('\n');
  }

  function runPocAnimated(profileKey) {
    if (!pocOutputEl) return;
    clearPocTimers();
    const lines = POC_PROFILES[profileKey] || POC_PROFILES.uncle;
    pocOutputEl.innerHTML = '';
    pocPlainText = lines.map((l) => l.text).join('\n');

    if (prefersReducedMotion) {
      renderPocInstant(profileKey);
      return;
    }

    let elapsed = 60;
    lines.forEach((line, idx) => {
      const delay = idx === 0 ? 120 : idx === 6 || idx === 9 ? 340 : 210;
      const timerId = window.setTimeout(() => {
        appendTermLine(line, true);
      }, elapsed);
      pocTimers.push(timerId);
      elapsed += delay;
    });
  }

  function resetPocTerminal() {
    if (!pocOutputEl) return;
    clearPocTimers();
    pocOutputEl.innerHTML = '';
    pocPlainText = '$ # Ready. Select a target and click "Run Exploit" to execute CVE-2026-1126.';
    appendTermLine(
      { cls: 'term-muted', text: '$ # Terminal reset. Select a target above and click "▶ Run Exploit".' },
      true
    );
  }

  if (pocRunBtn && pocSelectEl) {
    pocRunBtn.addEventListener('click', () => runPocAnimated(pocSelectEl.value));
    pocSelectEl.addEventListener('change', () => runPocAnimated(pocSelectEl.value));
  }

  if (pocResetBtn) {
    pocResetBtn.addEventListener('click', resetPocTerminal);
  }

  if (pocCopyBtn) {
    pocCopyBtn.addEventListener('click', async () => {
      try {
        await copyText(pocPlainText);
        flashCopyButton(pocCopyBtn);
      } catch {
        showToast('Clipboard blocked by browser permissions.', 'warn');
      }
    });
  }

  if (heroRunPocBtn && pocSelectEl) {
    heroRunPocBtn.addEventListener('click', () => {
      const pocSection = document.getElementById('poc');
      pocSection?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      window.setTimeout(() => runPocAnimated(pocSelectEl.value), 350);
    });
  }

  renderPocInstant('uncle');

  /* ------------------------------------------------------------------------
     7. Section 3: Interactive "Is My Uncle Vulnerable?" Live Scanner
     ------------------------------------------------------------------------ */
  const targetNameInput = document.getElementById('target-name');
  const platesSlider = document.getElementById('plates-slider');
  const platesValue = document.getElementById('plates-value');
  const pieButtons = document.querySelectorAll('.seg-btn[data-pie]');
  const waistbandRadios = document.querySelectorAll('input[name="waistband"]');

  const envLadle = document.getElementById('env-ladle');
  const envBlowout = document.getElementById('env-blowout');
  const envThermostat = document.getElementById('env-thermostat');
  const envQuestions = document.getElementById('env-questions');
  const envDrill = document.getElementById('env-football-drill');
  const envSeltzer = document.getElementById('env-seltzer');
  const drillNote = document.getElementById('drill-note');
  const seltzerNote = document.getElementById('seltzer-note');

  const outTargetName = document.getElementById('out-target-name');
  const outStatusBadge = document.getElementById('out-status-badge');
  const outStatusDesc = document.getElementById('out-status-desc');
  const outScoreText = document.getElementById('out-score-text');
  const outMeterBar = document.getElementById('out-meter-bar');
  const outMeterFill = document.getElementById('out-meter-fill');
  const outTtn = document.getElementById('out-ttn');
  const outAction = document.getElementById('out-action');
  const outIocList = document.getElementById('out-ioc-list');
  const dialArc = document.getElementById('dial-arc');
  const dialPctText = document.getElementById('dial-pct-text');
  const copyReportBtn = document.getElementById('copy-report-btn');

  let selectedPie = 1;
  let selectedPieLabel = '1 slice';
  let latestReportText = '';

  function formatTTR(score) {
    if (score >= 115) return '0 minutes, 00 seconds (ALREADY HORIZONTAL)';
    if (score >= 100) {
      const secs = Math.max(12, Math.round((115 - score) * 18));
      const m = Math.floor(secs / 60);
      const s = String(secs % 60).padStart(2, '0');
      return `${m} minute${m === 1 ? '' : 's'}, ${s} seconds`;
    }
    const totalSeconds = Math.max(240, Math.round(Math.pow(105 - score, 1.38) * 16));
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = String(totalSeconds % 60).padStart(2, '0');
    if (hours > 0) {
      return `${hours} hour${hours === 1 ? '' : 's'}, ${mins} minutes`;
    }
    return `${mins} minutes, ${secs} seconds`;
  }

  function updateScanner() {
    if (!platesSlider) return;

    const rawName = (targetNameInput?.value || '').trim();
    const displayName = rawName || 'Uncle Bob';
    const plates = parseFloat(platesSlider.value);
    const waistband = document.querySelector('input[name="waistband"]:checked')?.value || 'khakis';

    if (platesValue) {
      platesValue.textContent = `${plates.toFixed(1)} ${plates === 1 ? 'plate' : 'plates'}`;
    }

    let score = Math.round(plates * 16) + Math.round(selectedPie * 14);

    if (waistband === 'denim') score += 25;
    else if (waistband === 'khakis') score += 15;
    else if (waistband === 'elastic') score -= 5;

    if (envLadle?.checked) score += 20;
    if (envBlowout?.checked) score += 15;
    if (envThermostat?.checked) score += 15;
    if (envQuestions?.checked) score += 20;
    // Touch-football drill deliberately yields 0% reduction
    if (envSeltzer?.checked) score -= 15;

    score = Math.max(0, Math.min(120, score));

    if (drillNote) drillNote.hidden = !envDrill?.checked;
    if (seltzerNote) seltzerNote.hidden = !envSeltzer?.checked;

    let tierLabel = '';
    let tierClass = '';
    let tierDesc = '';
    let actionText = '';
    let dialColor = '#ef4444';

    if (score <= 35) {
      tierLabel = 'LOW (SUSPICIOUSLY ALERT)';
      tierClass = 'level-low';
      tierDesc = 'Verify whether target only parsed leafy greens.';
      actionText = 'Keep observing. Target may voluntarily stack dessert plates.';
      dialColor = '#22c55e';
    } else if (score <= 70) {
      tierLabel = 'HIGH (RECLINER PIVOT IMMINENT)';
      tierClass = 'level-high';
      tierDesc = 'Living room couch perimeter is actively being scanned.';
      actionText = 'Confiscate throw blankets and hide the footrest lever immediately.';
      dialColor = '#f59e0b';
    } else if (score <= 99) {
      tierLabel = 'CRITICAL (COMPROMISED)';
      tierClass = 'level-critical';
      tierDesc = 'Table-clearing daemon suspended. Channel-lock vocal loop active.';
      actionText = 'Revoke gravy boat access and secure the TV remote before kickoff resumes.';
      dialColor = '#ef4444';
    } else {
      tierLabel = 'STUFFCON-1 (FULL COUCH TAKEOVER)';
      tierClass = 'level-stuffcon';
      tierDesc = 'eyelid_suspend.sh has achieved ring-0 recliner persistence.';
      actionText = 'Abandon cleanup expectations. Lower the TV volume two notches and step away slowly.';
      dialColor = '#ff2a55';
    }

    const iocs = [];
    if (waistband === 'denim') {
      iocs.push({ text: 'Top-Button Hardware Interrupt', style: '' });
    } else if (score >= 75 && waistband === 'khakis') {
      iocs.push({ text: 'Belt Tension Breach (≥1 Notch)', style: '' });
    }
    if (waistband === 'elastic') {
      iocs.push({ text: 'Waistband +35% Headroom (JNDI Unpatched)', style: 'ioc-pill--amber' });
    }
    if (score >= 71) {
      iocs.push({ text: 'Mouth Breathing (78dB)', style: '' });
      iocs.push({ text: 'clear_the_table.service SIGKILL', style: '' });
    }
    if (envBlowout?.checked || score >= 60) {
      iocs.push({ text: 'TV Remote Grip Lock', style: 'ioc-pill--amber' });
    }
    if (envLadle?.checked) {
      iocs.push({ text: 'UNC-GRAVY Ladle Proximity Alert', style: '' });
    }
    if (envQuestions?.checked) {
      iocs.push({ text: 'Tactical Couch Evasion Triggered', style: '' });
    }
    if (envThermostat?.checked) {
      iocs.push({ text: 'Fireplace Thermal Amplification (>73°F)', style: 'ioc-pill--amber' });
    }
    if (envDrill?.checked) {
      iocs.push({ text: 'Touch-Football Drill Aborted (Sunset)', style: 'ioc-pill--amber' });
    }
    if (envSeltzer?.checked) {
      iocs.push({ text: 'Side-Effect: 20-Min Air Fryer Monologue', style: 'ioc-pill--green' });
    }
    if (score >= 100) {
      iocs.push({ text: 'Ring-0 Persistence: eyelid_suspend.sh', style: '' });
    }
    if (iocs.length === 0) {
      iocs.push({ text: 'Suspiciously Alert — Check for Salad', style: 'ioc-pill--green' });
    }

    const ttrText = formatTTR(score);

    if (outTargetName) outTargetName.textContent = displayName.toUpperCase();
    if (outStatusBadge) {
      outStatusBadge.textContent = tierLabel;
      outStatusBadge.className = `status-badge ${tierClass}`;
    }
    if (outStatusDesc) outStatusDesc.textContent = tierDesc;
    if (outScoreText) outScoreText.textContent = `${score}% / 120% MAX`;
    if (outMeterBar) outMeterBar.setAttribute('aria-valuenow', String(score));
    if (outMeterFill) outMeterFill.style.width = `${(score / 120) * 100}%`;
    if (outTtn) outTtn.textContent = ttrText;
    if (outAction) outAction.textContent = actionText;

    if (dialArc && dialPctText) {
      const arcLen = 144.5;
      const offset = arcLen - (score / 120) * arcLen;
      dialArc.style.strokeDashoffset = offset.toFixed(1);
      dialArc.style.stroke = dialColor;
      dialPctText.textContent = `${score}%`;
    }

    if (outIocList) {
      outIocList.innerHTML = '';
      iocs.forEach((ioc) => {
        const li = document.createElement('li');
        li.textContent = ioc.text;
        if (ioc.style) li.className = ioc.style;
        outIocList.appendChild(li);
      });
    }

    const waistbandLabels = {
      denim: 'Rigid Denim + Leather Belt',
      khakis: 'Pleated Chinos',
      elastic: 'Elastic Waistband Hotfix (-Dwaist.expandable=true)'
    };

    latestReportText = [
      '🚨 DIRT TURKEY4SHELL INCIDENT REPORT (CVE-2026-1126) 🚨',
      'Classification: ALERT: GRAVY-RED',
      `Target: ${displayName}`,
      `Vulnerability Score: ${score}% / 120%`,
      `Status: ${tierLabel}`,
      `Estimated Time-To-Recline (TTR): ${ttrText}`,
      `Payload: ${plates.toFixed(1)} plates + ${selectedPieLabel} pie | Runtime: ${waistbandLabels[waistband]}`,
      `Detected IoCs: ${iocs.map((i) => i.text).join(', ')}`,
      `Recommended Action: ${actionText}`,
      '— Issued via turkey4shell.org (Dining Room Incident Response Team)'
    ].join('\n');
  }

  pieButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      pieButtons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-checked', 'true');
      selectedPie = parseFloat(btn.dataset.pie || '0');
      selectedPieLabel = selectedPie === 1.5
        ? '"Just a sliver" (1.5 slices)'
        : `${selectedPie} ${selectedPie === 1 ? 'slice' : 'slices'}`;
      updateScanner();
    });
  });

  [targetNameInput, platesSlider, envLadle, envBlowout, envThermostat, envQuestions, envDrill, envSeltzer]
    .filter(Boolean)
    .forEach((el) => {
      el.addEventListener('input', updateScanner);
      el.addEventListener('change', updateScanner);
    });

  waistbandRadios.forEach((r) => r.addEventListener('change', updateScanner));

  if (copyReportBtn) {
    copyReportBtn.addEventListener('click', async () => {
      try {
        await copyText(latestReportText);
        flashCopyButton(copyReportBtn, '[ Copied Incident Report! ]');
        showToast('Incident Report copied! Paste straight into the family group chat.');
      } catch {
        showToast('Clipboard blocked by browser permissions.', 'warn');
      }
    });
  }

  updateScanner();

  /* ------------------------------------------------------------------------
     8. Live Web Crypto SHA-256 Verification
     ------------------------------------------------------------------------ */
  async function verifyHashesLive() {
    const statusEl = document.getElementById('crypto-status');
    const nodes = document.querySelectorAll('.hash-val[data-hash-source]');
    if (!nodes.length) return;

    if (!window.crypto?.subtle) {
      if (statusEl) statusEl.textContent = 'Pre-verified SHA-256';
      return;
    }

    try {
      const encoder = new TextEncoder();
      for (const node of nodes) {
        const source = node.getAttribute('data-hash-source') || '';
        const digestBuffer = await window.crypto.subtle.digest('SHA-256', encoder.encode(source));
        const hex = Array.from(new Uint8Array(digestBuffer))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        node.textContent = hex;
      }
      if (statusEl) statusEl.textContent = 'Verified Live via Web Crypto API';
    } catch {
      if (statusEl) statusEl.textContent = 'Pre-verified SHA-256';
    }
  }

  verifyHashesLive();

  /* ------------------------------------------------------------------------
     9. STUFFCON-1 Easter Egg (Header Button OR Clicking Pixel Turkey 5x)
     ------------------------------------------------------------------------ */
  const stuffconToggleBtn = document.getElementById('stuffcon-toggle');
  const stuffconDialog = document.getElementById('stuffcon-dialog');
  const wakeUpBtn = document.getElementById('wake-up-btn');
  const staySleepyBtn = document.getElementById('stay-sleepy-btn');
  const stuffconCanvas = document.getElementById('stuffcon-canvas');
  const navTurkeyTrigger = document.getElementById('nav-turkey-trigger');
  const mascotTurkeyTrigger = document.getElementById('mascot-turkey-trigger');
  const mascotClickHint = document.getElementById('mascot-click-hint');

  let stuffconActive = false;
  let turkeyClicks = 0;
  let animFrameId = null;
  let particles = [];

  function resizeCanvas() {
    if (!stuffconCanvas) return;
    stuffconCanvas.width = window.innerWidth;
    stuffconCanvas.height = window.innerHeight;
  }

  function createParticle(startBottom = false) {
    const glyphs = ['z', 'Z', 'zZz', '${jndi}', '0xCOUCH'];
    const colors = ['rgba(34, 197, 94, 0.55)', 'rgba(245, 158, 11, 0.5)', 'rgba(239, 68, 68, 0.5)'];
    const w = stuffconCanvas?.width || window.innerWidth;
    const h = stuffconCanvas?.height || window.innerHeight;
    return {
      x: Math.random() * w,
      y: startBottom ? h + Math.random() * 60 : Math.random() * h,
      vy: 0.45 + Math.random() * 0.95,
      vx: (Math.random() - 0.5) * 0.35,
      swayPhase: Math.random() * Math.PI * 2,
      size: 13 + Math.floor(Math.random() * 14),
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  function startStuffconCanvas() {
    if (!stuffconCanvas || prefersReducedMotion) return;
    resizeCanvas();
    const ctx = stuffconCanvas.getContext('2d');
    if (!ctx) return;

    particles = Array.from({ length: 34 }, () => createParticle(false));

    function draw() {
      if (!stuffconActive) return;
      ctx.clearRect(0, 0, stuffconCanvas.width, stuffconCanvas.height);

      for (const p of particles) {
        p.y -= p.vy;
        p.swayPhase += 0.02;
        p.x += Math.sin(p.swayPhase) * 0.45 + p.vx;

        if (p.y < -30) {
          Object.assign(p, createParticle(true));
        }

        ctx.font = `700 ${p.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = p.color;
        ctx.fillText(p.glyph, p.x, p.y);
      }

      animFrameId = window.requestAnimationFrame(draw);
    }

    window.cancelAnimationFrame(animFrameId);
    animFrameId = window.requestAnimationFrame(draw);
  }

  function stopStuffconCanvas() {
    if (animFrameId) {
      window.cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    if (stuffconCanvas) {
      const ctx = stuffconCanvas.getContext('2d');
      ctx?.clearRect(0, 0, stuffconCanvas.width, stuffconCanvas.height);
    }
  }

  function activateStuffcon(showKernelPanic = true) {
    stuffconActive = true;
    document.body.classList.add('stuffcon-active');
    stuffconToggleBtn?.setAttribute('aria-pressed', 'true');
    startStuffconCanvas();

    if (showKernelPanic && stuffconDialog && !stuffconDialog.open) {
      if (typeof stuffconDialog.showModal === 'function') {
        stuffconDialog.showModal();
      } else {
        stuffconDialog.setAttribute('open', '');
      }
    }
  }

  function deactivateStuffcon(toastMessage = 'STUFFCON status reset. Cold water splash successful!') {
    stuffconActive = false;
    turkeyClicks = 0;
    if (mascotClickHint) mascotClickHint.textContent = 'Click 5× to inspect kernel';
    document.body.classList.remove('stuffcon-active');
    stuffconToggleBtn?.setAttribute('aria-pressed', 'false');
    stopStuffconCanvas();
    if (stuffconDialog?.open) stuffconDialog.close();
    if (toastMessage) showToast(toastMessage);
  }

  if (stuffconToggleBtn) {
    stuffconToggleBtn.addEventListener('click', () => {
      if (stuffconActive) {
        deactivateStuffcon('⚡ STUFFCON-1 disengaged. Welcome back to consciousness.');
      } else {
        activateStuffcon(true);
      }
    });
  }

  if (wakeUpBtn) {
    wakeUpBtn.addEventListener('click', () => {
      deactivateStuffcon('⚡ Cold water splash deployed! Heartbeat & cleanup awareness restored.');
    });
  }

  if (staySleepyBtn) {
    staySleepyBtn.addEventListener('click', () => {
      if (stuffconDialog?.open) stuffconDialog.close();
      showToast('Sleep Mode active (zZz). Click STUFFCON-1 in header to wake up.', 'danger');
    });
  }

  function handleTurkeyClick(e) {
    if (e.currentTarget === navTurkeyTrigger) {
      e.preventDefault();
      e.stopPropagation();
    }
    turkeyClicks += 1;
    const remaining = 5 - turkeyClicks;

    if (remaining > 0) {
      if (mascotClickHint) {
        mascotClickHint.textContent = `Tryptophan trigger: ${turkeyClicks}/5 clicks...`;
      }
      if (turkeyClicks >= 2) {
        showToast(`Turkey poked (${turkeyClicks}/5) — ${remaining} more to trigger STUFFCON-1!`, 'warn');
      }
    } else {
      turkeyClicks = 0;
      if (mascotClickHint) mascotClickHint.textContent = 'STUFFCON-1 TRIGGERED!';
      activateStuffcon(true);
    }
  }

  if (navTurkeyTrigger) {
    navTurkeyTrigger.addEventListener('click', handleTurkeyClick);
    navTurkeyTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') handleTurkeyClick(e);
    });
  }

  if (mascotTurkeyTrigger) {
    mascotTurkeyTrigger.addEventListener('click', handleTurkeyClick);
  }

  window.addEventListener('resize', () => {
    if (stuffconActive) resizeCanvas();
  });

  /* ------------------------------------------------------------------------
     10. Footer Links & Dialogs
     ------------------------------------------------------------------------ */
  const sourceDialog = document.getElementById('source-dialog');
  const footerSourceBtn = document.getElementById('footer-source-btn');
  const footerReportBtn = document.getElementById('footer-report-btn');
  const footerResetStuffconBtn = document.getElementById('footer-reset-stuffcon');

  if (footerSourceBtn && sourceDialog) {
    footerSourceBtn.addEventListener('click', () => {
      if (typeof sourceDialog.showModal === 'function') {
        sourceDialog.showModal();
      } else {
        sourceDialog.setAttribute('open', '');
      }
    });
  }

  document.querySelectorAll('[data-close-dialog]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dlg = document.getElementById(btn.getAttribute('data-close-dialog'));
      dlg?.close();
    });
  });

  [sourceDialog, stuffconDialog].filter(Boolean).forEach((dlg) => {
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) dlg.close();
    });
  });

  if (footerReportBtn) {
    footerReportBtn.addEventListener('click', () => {
      document.getElementById('scanner')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      window.setTimeout(() => {
        targetNameInput?.focus();
        showToast('DIRT Intake Ready: Enter the sleeping uncle\'s details below.', 'warn');
      }, 400);
    });
  }

  if (footerResetStuffconBtn) {
    footerResetStuffconBtn.addEventListener('click', () => {
      if (stuffconActive) {
        deactivateStuffcon('STUFFCON-1 cleared. Dining room alert level lowered to NORMAL.');
      } else {
        turkeyClicks = 0;
        if (mascotClickHint) mascotClickHint.textContent = 'Click 5× to inspect kernel';
        showToast('STUFFCON status is already nominal. Stay vigilant near the gravy.');
      }
    });
  }

  /* ------------------------------------------------------------------------
     11. Scroll Reveal Animations
     ------------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  populateSideLogs();
})();

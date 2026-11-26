# Project Specification: Turkey4Shell (`turkey4shell.org`)

## 1. Project Overview
**Turkey4Shell** (`CVE-2026-1126` / `CVE-2026-T4RKEY`) is a humorous, parody cybersecurity vulnerability disclosure website styled after iconic zero-day advisory sites (such as Log4Shell, Heartbleed, and Spring4Shell).

The site documents a catastrophic, unauthenticated **Remote Couch Execution (RCE)** vulnerability in the *Thanksgiving Digest Runtime (v1621–2026)*, where unchecked Tryptophan and Carbohydrate lookups trigger a `StomachBufferOverflowError`, bypass the `"go help with the dishes"` thread, and spawn a persistent `resting_my_eyes.exe` daemon in `/living_room/recliner`.

### Reference Assets
Inspect the following reference mockups if present in the workspace (e.g., `docs/` or `assets/`):
* `turkey4shell-mockup.jpg` — Primary web layout, dark grid aesthetic, red alert framing, terminal PoC, and pixel-art turkey mascot.
* `nnsa-infographic.jpg` — Supplementary lore (National Nap Security Agency, `TLP: CRANBERRY`, `NAPCON-1`, Grandma APTA social engineering vectors, and Indicators of Compromise).

---

## 2. Tech Stack & Architecture
Keep the build lightweight, fast, and trivially deployable to static hosting (GitHub Pages, Cloudflare Pages, Netlify, or Vercel):
* **Stack:** Zero-dependency static web app (`index.html`, `styles.css`, `app.js`) — OR a single-page Vite project if preferred, with no backend required.
* **Fonts (Google Fonts):**
  * Headings, Terminal, Badges, Code: `JetBrains Mono` (weights 400, 700, 800)
  * Body Copy: `Inter` (weights 400, 500, 600)
* **Icons / Graphics:** Inline SVG for crispness (including a custom pixel-art turkey + skull/warning emblem inspired by the mockup).
* **Responsiveness:** Mobile-first responsive layout so family members can run the "Is My Uncle Vulnerable?" scanner on their phones from the couch.

---

## 3. Visual Design System

### Color Palette
* **Background (Base):** `#07080c` (Deep terminal black)
* **Grid Overlay:** Subtle `24px x 24px` CSS background grid in `rgba(34, 197, 94, 0.06)` with faint peripheral red vignette.
* **Card Surface:** `#0f1117` with `1px solid #262b36` borders (or `#7f1d1d` for critical alert panels).
* **Primary Alert Red:** `#ef4444` (Borders, Critical badges, active warnings)
* **Cranberry Accent:** `#991b1b` (`TLP: CRANBERRY` tags, secondary headers)
* **Terminal Phosphor Green:** `#22c55e` (PoC output, payload syntax, success markers)
* **Warning Amber:** `#f59e0b` (Buffer overflow alerts, medium-risk badges)
* **Primary Text:** `#f3f4f6`
* **Muted Text:** `#9ca3af`

### Visual Details
* **Scanline / CRT Feel (Subtle):** Very light CSS scanline or grid texture—never heavy enough to hurt readability.
* **Alert Banner:** Top sticky ticker or badge bar showing `TLP: CRANBERRY • NAPCON-1 • ACTIVE EXPLOITATION OBSERVED IN DINING ROOMS WORLDWIDE`.
* **Copy-to-Clipboard Feedback:** Every code block / exploit string / hash includes a working `[ Copy ]` button that flips to `[ Copied! ]`.

---

## 4. Page Structure & Copy

### A. Navigation Bar (Sticky)
* **Left:** Pixel-art Turkey + Skull icon + `TURKEY4SHELL (CVE-2026-1126)`
* **Center/Right Links:** `Exploit` | `Live PoC` | `Uncle Scanner` | `Timeline` | `Mitigations` | `FAQ`
* **Action Buttons:**
  * `GitHub ★ 12.5k` (Opens a fun modal or increments a local star counter with toast: *"Starred! Grandma is proud of you."*)
  * `NAPCON-1` (Red alert toggle button—see Easter Eggs in Section 6).

---

### B. Hero Section
* **Classification Tag:** `NATIONAL NAP SECURITY AGENCY (NNSA) • CRITICAL SECURITY ADVISORY • TLP: CRANBERRY`
* **Main Headline:** `TURKEY4SHELL`
* **Subtitle:** `Critical Zero-Day Remote Couch Execution (RCE) in the Thanksgiving Digest Runtime`
* **Severity Badges Row:**
  * `CVSS 4.0: 11.0 / 10.0 (Grandma Override)` — pulsing red dot
  * `Vector: Unauthenticated / Zero-Click`
  * `Attack Complexity: Low (Second Helping)`
  * `Patch Status: Won't Fix`
* **Primary CTA Buttons:**
  1. `Is My Uncle Vulnerable?` (Scrolls smoothly to the Interactive Scanner)
  2. `Run Terminal PoC` (Scrolls to Terminal PoC and triggers animation)
  3. `Download Mitigations` (Scrolls to Mitigations / WAF Rules)

---

### C. Section 1: The Exploit (Tryptophan Remote Execution)
* **Layout:** Two-column card (left: explanation + mascot graphic on right on desktop).
* **Advisory Summary Copy:**
  > A catastrophic unauthenticated Remote Couch Execution (RCE) vulnerability allows remote attackers (typically relatives operating as an Advanced Persistent Threat Aunt/Grandma, or **APTA**) to inject arbitrary tryptophan and carbohydrate payloads into a target host's `/mouth` buffer.
  >
  > When `Serving-Size` exceeds `1.5` plates, the Thanksgiving Digest Runtime performs an unchecked **JNDI** (*Just Need Dessert Immediately*) lookup. This triggers a `StomachBufferOverflowError`, hijacking active foreground threads (such as `"go help with the dishes"`) and yielding root-level sleep access to the `/living_room/recliner` subsystem.

* **Interactive Exploit String Selector (Log4Shell Style):**
  Provide pill tabs so visitors can switch between exploit strings and copy them:
  1. **Standard Gravy Payload:**
     ```text
     ${turkey:gravy://grandma.local:80/second_helping?extra_stuffing=true}
     ```
  2. **Dessert WAF Bypass (Obfuscated):**
     ```text
     ${jndi:pie://kitchen.lan:443/${lower:p}umpkin_${upper:w}hipped_cream}
     ```
  3. **Social Engineering / Phishing Vector:**
     ```text
     ${family:guilt://aunt-linda.internal/are_you_dating_anyone?redirect=/couch}
     ```
  4. **The "Just a Sliver" Heap Spray:**
     ```text
     ${carb:mashed://table.local/just_a_tiny_bit?multiplier=4.5&butter=max}
     ```
* **Caption:** *"Simply pass any string above in the dinner payload to bypass human willpower firewalls."*

---

### D. Section 2: Interactive Terminal Proof-of-Concept (PoC)
A sleek macOS/Linux-style terminal window (`turkey4shell_exploit.py`) with interactive controls at the top:
* **Target Selector Dropdown:**
  * `Unsuspecting Uncle (Uncle Bob — Human v5.11)`
  * `Exhausted Host (Mom — Kitchen OS 2026)`
  * `Visiting Cousin (Cousin Greg — Wearing Tight Jeans)`
  * `Self (Third Quarter Football Target)`
* **Buttons:** `[ ▶ Run Exploit ]` and `[ ↺ Reset ]`
* **Animated Line-by-Line Output (Example for Uncle Bob):**
  ```text
  $ python3 turkey4shell_exploit.py --target "Unsuspecting_Uncle" --gravy-force
  [!] Initializing Turkey4Shell attack chain (CVE-2026-1126)...
  [+] Target identified: Uncle Bob (Human v5.11 | Belt-Notch: 3/5)
  [+] Bypassing personal firewall via social_pressure_vector("I made this pie for you!")
  [*] Injecting: ${turkey:gravy://grandma.local:80/second_helping?extra_stuffing=true}
  [+] POST /mouth HTTP/1.1 -> 200 OK (Serving-Size: 2.3 plates)
  [!] WARNING: Stomach Buffer Capacity exceeded (124%)!
  [!] Hardware Interrupt: Top pants button disengaged.
  [+] Hijacking process: help_with_dishes.sh -> redirected to /dev/null
  [!] Spawning persistent daemon: resting_my_eyes.exe (PID 1621)
  [*] Target migrated to /living_room/recliner (Recline-Angle: 145deg)
  [*] Rest-shell established. Audio loop active: "Don't change it, I was watching that."
  ```
* Adjust the target name, belt notch, and final status line dynamically based on the selected dropdown target.

---

### E. Section 3: Interactive "Is My Uncle Vulnerable?" Live Scanner
An interactive risk assessment tool that calculates a real-time **Turkey4Shell Vulnerability Score**, **Estimated Time-To-Nap (TTN)**, and **Recommended Emergency Actions**.

#### Scanner Inputs
1. **Target Name (Optional text input):** Placeholder `"Uncle Bob"`
2. **Plates Consumed (Slider: `0.5` to `4.0` in `0.5` increments):** Default `2.0`
3. **Pie Slices Ingested (Buttons: `0`, `1`, `2`, `"Just a sliver" (counts as 1.5)`):** Default `1`
4. **Waistband Configuration (Select/Radio):**
   * `Rigid Denim + Leather Belt` (+25 risk, triggers Hardware Structural Failure IoC)
   * `Standard Khakis` (+15 risk)
   * `Stretchy Pants v8.5.12` (-5 immediate crash risk, note: *"Expands buffer, does not patch root cause"*)
5. **Environmental Threat Factors (Checkboxes):**
   * `[x]` Grandma is within line-of-sight holding Tupperware (+20 risk)
   * `[x]` Football game is in a 3rd-quarter blowout (+15 risk)
   * `[ ]` Thermostat set above 72°F (+15 risk)
   * `[ ]` Relative just asked *"So, are you dating anyone?"* (Triggers tactical couch retreat: +20 risk)
   * `[ ]` Attempted "10-Minute Walk" mitigation (0 risk reduction — displays tooltip: *"Mitigation failed: Gravity & couch interference"*)
   * `[ ]` Deployed Double Espresso Hotfix (-15 risk, adds side-effect: *"Overly aggressive during Monopoly"*)

#### Dynamic Output Panel
* **Risk Gauge / Meter:** Smooth animated bar from `0%` to `120%` (Yes, it can overflow past 100%).
* **Status Classification:**
  * `0–35%`: `LOW (SUSPICIOUSLY ALERT)` — *"Check if target only ate salad."*
  * `36–70%`: `HIGH (COUCH MIGRATION IMMINENT)` — *"Recliner perimeter is actively being probed."*
  * `71–99%`: `CRITICAL (COMPROMISED)` — *"Dish duty protocol killed. Vocal loop detected."*
  * `100%+`: `NAPCON-1 (TOTAL SYSTEM SHUTDOWN)` — *"`resting_my_eyes.exe` has achieved ring-0 kernel persistence."*
* **Estimated Time-To-Nap (TTN):** Dynamically calculated (e.g., `14 minutes, 22 seconds`).
* **Detected IoCs:** Dynamically lists triggered IoCs (e.g., `Top Button Undone`, `Mouth Breathing 78dB`, `Remote Control Grip Lock`).
* **Button:** `[ Copy Incident Report ]` — Copies a formatted, funny text summary to clipboard so the user can paste it straight into their family group chat.

---

### F. Section 4: Indicators of Compromise (IoCs) & Hashes
* **Behavioral IoCs (3-card grid):**
  1. **Structural Failure:** Belt loosened by ≥1 notch or top button quietly unfastened under the tablecloth.
  2. **Unauthorized Couch Migration:** Host disappears from the dining room 4.2 seconds before dish clearing begins.
  3. **Vocal Loop (`resting_my_eyes.exe`):** Host insists *"I'm just resting my eyes"* while emitting 75dB snoring packets.
* **Known Malicious SHA-256 Signatures (Table with Copy buttons):**
  * `"I'm just resting my eyes"` — `e3b0c44298fc1c149afbf4c8996fb924...` *(compute real SHA-256 hashes in JS or precompute exact valid SHA-256 strings!)*
  * `"Just a tiny sliver of pumpkin pie"` — *(valid SHA-256)*
  * `"I was watching that"` — *(valid SHA-256)*
  * `"Wait, is this the right chat?"` — *(valid SHA-256)*

---

### G. Section 5: Incident & Disclosure Timeline
Display as a clean vertical monospace log timeline for **November 26, 2026**:
* **12:30 PM** — Host arrives at residence. Perimeter breached; appetizers scanned.
* **13:15 PM** — Family social engineering attack detected (*"When are you giving me grandkids?"*). Personal firewall degraded.
* **14:00 PM** — Mass payload deployment (Plate 1). Gravy viscosity exceeds baseline thresholds.
* **14:12 PM** — Zero-day triggered: `"Just a small second helping"` loop executed.
* **14:25 PM** — Hardware alert: Belt buckle structural integrity compromised.
* **14:32 PM** — Embargo broken prematurely when Aunt Linda posts a PoC video of Uncle Bob snoring to the family group chat, followed 11 seconds later by *"Wait, is this the right chat?"*
* **14:35 PM** — Full system shutdown. `help_with_dishes.sh` killed with `SIGKILL`. Host achieves root sleep in `/living_room/recliner`.
* **15:00 PM** — NNSA assigns `CVE-2026-1126`. Grandma manually overrides CVSS score from `10.0` to `11.0` after target declines taking home three gallons of stuffing.

---

### H. Section 6: Affected Systems & Mitigations

#### Affected Versions
* All digestive subsystems running **Thanksgiving Dinner v1621 through v2026**.
* **End-of-Life (EOL) Systems** (tired hosts, grandpas, anyone who woke up at 5:00 AM to baste a 22-pound bird) are catastrophically susceptible.

#### Workarounds & Patches (Status Cards)
1. **Stretchy Pants `v8.5.12`** — `PARTIAL WORKAROUND`
   * Expands abdominal buffer capacity by 35% to prevent hardware button failure, but **does not fix the underlying sleep vulnerability**.
2. **10-Minute Post-Dinner Walk** — `MITIGATION FAILED`
   * Frequently proposed by security architects; consistently blocked by gravity, cold weather, and *"Wait, let's see this next drive."*
3. **Dish Duty Firewall** — `BYPASSED`
   * Easily evaded by entering `/bathroom` for 25 minutes or initiating `resting_my_eyes.exe` prematurely.
4. **WAF Rule (Block Second Plate & Pie)** — `NOT RECOMMENDED`
   * Includes a copyable Nginx / ModSecurity rule block:
     ```nginx
     # Turkey4Shell Emergency WAF Rule (Use at your own risk)
     SecRule ARGS:plate_count "@gt 1" \
       "id:16211126,phase:2,deny,status:403,msg:'Turkey4Shell Blocked - WARNING: Grandma Will Notice'"
     SecRule REQUEST_BODY "@rx (pumpkin|pecan)_pie" \
       "id:16211127,phase:2,deny,msg:'Dessert Payload Blocked - Expect Immediate Guilt Escalation'"
     ```
   * **Warning Callout:** *"Not recommended in production households. Grandma will notice and escalate privileges."*

---

### I. Section 7: FAQ (Accordion)
1. **Am I vulnerable if I'm vegetarian / only eat side dishes?**
   * *Yes.* While turkey receives the media blame, researchers confirmed that the Mashed Potato + Stuffing + Mac & Cheese carbohydrate chain independently triggers the exact same `StomachBufferOverflowError`.
2. **Does `Turkey4Shell` affect Black Friday shopping uptime?**
   * Only if left unpatched with leftover turkey sandwiches after midnight.
3. **Can I disable JNDI (*Just Need Dessert Immediately*) lookups?**
   * You can set `-Dturkey.skipPie=true`, though Aunt Linda's APTA toolkit routinely overrides environment variables at runtime.
4. **Is this a real vulnerability?**
   * Technically no, biologically yes. This is a parody site built in the spirit of classic cybersecurity disclosure pages. No actual turkeys or Java loggers were harmed.

---

## 5. Footer
* Disclaimer: *"Issued by the National Nap Security Agency (NNSA) • Advisory ID: T4S-2026-1126 • Not affiliated with Apache, Log4j, or any actual turkey."*
* Quick links: `View Source`, `Report a Sleeping Uncle`, `Reset NAPCON Status`.

---

## 6. Interactive Polish & Easter Eggs
1. **NAPCON-1 Mode (Header Toggle or Clicking the Pixel Turkey 5x):**
   * Triggers a dramatic visual toggle: screen dims slightly into "Sleep Mode," floating monospace `z`, `Z`, `zZz` particles drift upward across the canvas, and a dismissible mock kernel panic overlay appears:
     `KERNEL PANIC: RESTING_MY_EYES_EXCEPTION at 0x0000COUCH` with a `[ Wake Up (Drink Coffee) ]` button.
2. **Live SHA-256 Generator:** Precompute or use Web Crypto API (`crypto.subtle.digest`) to ensure the funny IoC strings display 100% genuine SHA-256 hashes.
3. **Smooth Animations:** Subtle fade-in on scroll, blinking terminal cursor (`_`), and smooth progress meter transitions in the Uncle Scanner.

---

## 7. Agent Execution Checklist (For Antigravity)
When scaffolding this project in the workspace:
1. Check `assets/` or `docs/` for the reference mockup images (`turkey4shell-mockup.jpg` and `nnsa-infographic.jpg`) to align visual styling, spacing, and color accents.
2. Scaffold clean, semantic, zero-dependency `index.html`, `styles.css`, and `app.js` files (unless a framework is already initialized in the repo).
3. Create an inline SVG pixel-art Turkey + Skull logo so the site works offline with zero broken image paths.
4. Implement all interactive features completely (Payload Tabs + Copy, Animated Terminal PoC with target switcher, Live Uncle Vulnerability Scanner + Copyable Incident Report, Accordion FAQ, and NAPCON-1 Easter Egg).
5. Verify layout across desktop (`1440px`) and mobile (`390px`) viewports and confirm zero console errors.
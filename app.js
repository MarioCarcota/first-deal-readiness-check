(() => {
  const main = document.querySelector("#main");
  const groups = window.READINESS_GROUPS;
  const questions = groups.flatMap(group => group.questions.map(question => ({ ...question, group: group.title })));
  const total = questions.length;
  const storageKey = "first-deal-readiness-v1";
  let answers = {};
  let currentGroup = 0;
  let screen = "welcome";

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    answers = saved.answers || {};
    currentGroup = Math.min(Math.max(saved.currentGroup || 0, 0), groups.length - 1);
  } catch (_) {
    answers = {};
  }

  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify({ answers, currentGroup })); } catch (_) {}
  }

  function answeredCount() {
    return questions.filter(question => answers[question.id]).length;
  }

  function progressMarkup() {
    const answered = answeredCount();
    const percent = Math.round((answered / total) * 100);
    return `<div class="progress-wrap" aria-label="${answered} of ${total} answered">
      <div class="progress-copy"><span>YOUR PROGRESS</span><span><b>${answered}</b> / ${total}</span></div>
      <div class="progress-track"><span style="width:${percent}%"></span></div>
    </div>`;
  }

  function renderWelcome() {
    screen = "welcome";
    const resumed = answeredCount() > 0;
    main.innerHTML = `<section class="welcome-grid">
      <div class="welcome-copy">
        <p class="eyebrow"><span class="eyebrow-line"></span> A FIELD GUIDE FOR YOUR FIRST ENTERPRISE DEAL</p>
        <h1>Security questions,<br><em>without the 90-page spiral.</em></h1>
        <p class="welcome-lede">A practical check for the questions a buyer is likely to ask first. Find what is in place, what needs work, and what you can do this week.</p>
        <div class="welcome-meta"><span>30 questions</span><span>About 5 minutes</span><span>Answers stay in this browser</span></div>
        <button class="button button-dark" id="start-check">${resumed ? "Continue your check" : "Start the check"}<span aria-hidden="true">↗</span></button>
        ${resumed ? `<button class="text-button" id="clear-saved">Clear saved answers</button>` : ""}
        <p class="privacy-note"><span aria-hidden="true">◉</span> Nothing is sent to a server. No sign-up, no email gate.</p>
      </div>
      <aside class="welcome-side" aria-label="The seven areas covered">
        <div class="side-heading"><span>IN FIVE MINUTES</span><span>01 / 07</span></div>
        <ol class="topic-list">${groups.map((group, index) => `<li><span class="topic-number">0${index + 1}</span><span>${escapeHtml(group.title)}</span><span class="topic-arrow" aria-hidden="true">↗</span></li>`).join("")}</ol>
        <p class="side-caption">Built for a small team answering its first buyer review. Not a certification score.</p>
      </aside>
    </section>
    <section class="method-strip"><p>THE POINT</p><p>Know what you can show a buyer today, and what deserves attention before the next call.</p><details><summary>Sources & limits</summary><p>Question themes draw on the CSA CCM/CAIQ v4.1.0 workbook, AICPA Trust Services Criteria, NIST CSF 2.0, and public SaaS trust-center material. This is a practical first pass, not a reproduced questionnaire, audit, legal opinion, or promise of approval. Your buyer’s actual questions take priority.</p><p><a href="https://cloudsecurityalliance.org/research/cloud-controls-matrix" target="_blank" rel="noreferrer">CSA CCM & CAIQ</a> · <a href="https://cloudsecurityalliance.org/artifacts/cloud-controls-matrix-v4-1" target="_blank" rel="noreferrer">CAIQ v4.1.0 download</a> · <a href="https://www.aicpa-cima.com/resources/landing/trust-services-criteria" target="_blank" rel="noreferrer">AICPA Trust Services Criteria</a> · <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noreferrer">NIST CSF 2.0</a> · <a href="https://www.atlassian.com/trust" target="_blank" rel="noreferrer">Atlassian Trust Center</a> · <a href="https://sharedassessments.org/sig/" target="_blank" rel="noreferrer">Shared Assessments SIG</a></p></details></section>`;
    document.querySelector("#start-check").addEventListener("click", () => renderGroup(currentGroup));
    const clear = document.querySelector("#clear-saved");
    if (clear) clear.addEventListener("click", () => {
      answers = {};
      currentGroup = 0;
      save();
      renderWelcome();
    });
  }

  function renderGroup(index, focus = true) {
    screen = "questions";
    currentGroup = index;
    save();
    const group = groups[index];
    const firstNumber = groups.slice(0, index).reduce((sum, item) => sum + item.questions.length, 0) + 1;
    const lastNumber = firstNumber + group.questions.length - 1;
    const finalGroup = index === groups.length - 1;
    main.innerHTML = `${progressMarkup()}
      <section class="question-screen">
        <div class="section-kicker"><span>SECTION 0${index + 1} OF 0${groups.length}</span><span>QUESTIONS ${String(firstNumber).padStart(2, "0")}–${String(lastNumber).padStart(2, "0")}</span></div>
        <h1 tabindex="-1">${escapeHtml(group.title)}<span class="title-period">.</span></h1>
        <p class="section-intro">${escapeHtml(group.intro)} <span>Choose “Partly” if the process exists but is inconsistent, informal, or not written down.</span></p>
        <div class="question-list">${group.questions.map((question, offset) => {
          const number = String(firstNumber + offset).padStart(2, "0");
          const selected = answers[question.id] || "";
          const options = [["yes", "Yes"], ["partly", "Partly"], ["no", "No"]];
          return `<fieldset class="question-row" data-question="${question.id}">
            <legend><span class="question-number">${number}</span><span class="question-text">${escapeHtml(question.text)}</span></legend>
            <div class="answer-options">${options.map(([value, label]) => `<label class="answer-option ${selected === value ? "selected" : ""}">
              <input type="radio" name="${question.id}" value="${value}" ${selected === value ? "checked" : ""} />
              <span>${label}</span>
            </label>`).join("")}</div>
          </fieldset>`;
        }).join("")}</div>
        <div class="question-nav">
          <button class="button button-quiet" id="back-button" ${index === 0 ? "disabled" : ""}><span aria-hidden="true">←</span> Back</button>
          <button class="button button-dark" id="next-button">${finalGroup ? "See my score" : "Next section"}<span aria-hidden="true">${finalGroup ? "↗" : "→"}</span></button>
        </div>
        <p class="nav-hint" id="nav-hint" aria-live="polite"></p>
      </section>`;
    main.querySelectorAll("input[type=radio]").forEach(input => input.addEventListener("change", event => {
      answers[event.target.name] = event.target.value;
      save();
      const row = event.target.closest(".question-row");
      row.querySelectorAll(".answer-option").forEach(label => label.classList.toggle("selected", label.contains(event.target)));
      const progress = main.querySelector(".progress-wrap");
      if (progress) progress.outerHTML = progressMarkup();
    }));
    document.querySelector("#back-button").addEventListener("click", () => renderGroup(Math.max(index - 1, 0)));
    document.querySelector("#next-button").addEventListener("click", () => {
      if (!finalGroup) {
        renderGroup(index + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const missing = questions.find(question => !answers[question.id]);
      if (missing) {
        const missingGroup = groups.findIndex(item => item.questions.some(question => question.id === missing.id));
        if (missingGroup !== index) {
          renderGroup(missingGroup);
          document.querySelector(`[data-question="${missing.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          document.querySelector(`[data-question="${missing.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
          document.querySelector(`[data-question="${missing.id}"] input`)?.focus({ preventScroll: true });
        }
        const hint = document.querySelector("#nav-hint");
        if (hint) hint.textContent = `Answer the remaining ${total - answeredCount()} question${total - answeredCount() === 1 ? "" : "s"} to see your score.`;
        return;
      }
      renderResults();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    if (focus) main.querySelector("h1")?.focus({ preventScroll: true });
  }

  function renderResults() {
    screen = "results";
    const values = { yes: 2, partly: 1, no: 0 };
    const points = questions.reduce((sum, question) => sum + values[answers[question.id]], 0);
    const percent = Math.round((points / (total * 2)) * 100);
    const gaps = questions
      .filter(question => answers[question.id] !== "yes")
      .sort((a, b) => {
        const riskA = a.priority * (answers[a.id] === "no" ? 1 : 0.68);
        const riskB = b.priority * (answers[b.id] === "no" ? 1 : 0.68);
        return riskB - riskA;
      })
      .slice(0, 3);
    const gapHeading = gaps.length === 0
      ? "No open gaps in these 30 checks."
      : gaps.length === 1
        ? "The one gap I would close first."
        : gaps.length === 2
          ? "The two gaps I would address first."
          : "The three gaps most likely to slow a deal.";
    let band, summary;
    if (percent >= 85) {
      band = "Good shape for a first pass";
      summary = "You have many of the basics in place. Keep evidence close, and check the buyer’s actual wording before you promise anything.";
    } else if (percent >= 65) {
      band = "A few answers need backup";
      summary = "You have a workable base. These are the first gaps I would close or explain before the questionnaire lands.";
    } else if (percent >= 40) {
      band = "Some basics need an owner";
      summary = "A buyer may find unanswered basics. Start with the three items below, then use the remaining questions as your short work plan.";
    } else {
      band = "Start with the foundations";
      summary = "This is a useful place to start, not a verdict on the company. Pick one owner and close the highest-risk basics first.";
    }

    const gapMarkup = gaps.length ? gaps.map((question, index) => {
      const status = answers[question.id] === "no" ? "Not in place yet" : "Partly in place";
      return `<article class="gap-row">
        <div class="gap-index">0${index + 1}</div>
        <div class="gap-content">
          <div class="gap-meta"><span>${escapeHtml(question.group)}</span><span class="gap-status">${status}</span></div>
          <h3>${escapeHtml(question.text)}</h3>
          <p>${escapeHtml(question.fix)}</p>
          <div class="fix-details"><span><b>TIME</b>${escapeHtml(question.effort)}</span><span><b>START WITH</b>${escapeHtml(question.tools)}</span></div>
        </div>
      </article>`;
    }).join("") : `<div class="all-clear"><span aria-hidden="true">✓</span><div><h3>No open gaps in these 30 checks.</h3><p>Keep your evidence current and review the buyer’s own requirements when they arrive.</p></div></div>`;

    main.innerHTML = `<section class="results-screen">
      <div class="results-topline"><span>YOUR FIRST-DEAL SNAPSHOT</span><span>${total} ANSWERS · ${groups.length} AREAS</span></div>
      <div class="score-layout">
        <div class="score-ring" style="--score:${percent}%"><div><strong>${percent}<small>%</small></strong><span>READINESS</span></div></div>
        <div class="score-copy"><p class="eyebrow"><span class="eyebrow-line"></span> A SCORE, NOT A CERTIFICATE</p><h1>${escapeHtml(band)}<span class="title-period">.</span></h1><p>${escapeHtml(summary)}</p><p class="score-method">Yes = 2 · Partly = 1 · No = 0. Score is based on your answers only.</p></div>
      </div>
      <div class="gaps-heading"><div><p class="eyebrow"><span class="eyebrow-line"></span> START HERE</p><h2>${escapeHtml(gapHeading)}</h2></div><p>Each one has a first step, a rough effort, and tools you can start with.</p></div>
      <div class="gap-list">${gapMarkup}</div>
      <div class="results-actions"><button class="button button-dark" id="print-plan">Print this action plan <span aria-hidden="true">↗</span></button><button class="button button-quiet" id="review-answers">Review answers</button><button class="text-button" id="start-over">Start over</button></div>
      <section class="honesty-note"><span class="honesty-mark" aria-hidden="true">i</span><div><h3>Keep the score in context.</h3><p>This is a self-check against common early procurement questions. It does not test evidence, determine SOC 2 readiness, or guarantee that a buyer will approve you. Give the buyer’s actual questionnaire priority, and do not claim a control you cannot show.</p></div></section>
      <section class="source-note"><details><summary>What this check draws on</summary><p>Public assessment themes from the CSA CAIQ v4.1.0 workbook, AICPA Trust Services Criteria, NIST Cybersecurity Framework 2.0, and SaaS trust-center disclosures. The Shared Assessments SIG page was not accessible during source review, so this check does not claim to reproduce SIG Lite.</p><p><a href="https://cloudsecurityalliance.org/research/cloud-controls-matrix" target="_blank" rel="noreferrer">CSA CCM & CAIQ</a> · <a href="https://cloudsecurityalliance.org/artifacts/cloud-controls-matrix-v4-1" target="_blank" rel="noreferrer">CAIQ v4.1.0</a> · <a href="https://www.aicpa-cima.com/resources/landing/trust-services-criteria" target="_blank" rel="noreferrer">AICPA TSC</a> · <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noreferrer">NIST CSF 2.0</a> · <a href="https://www.atlassian.com/trust" target="_blank" rel="noreferrer">Atlassian Trust Center</a> · <a href="https://sharedassessments.org/sig/" target="_blank" rel="noreferrer">Shared Assessments SIG</a></p></details></section>
    </section>`;
    document.querySelector("#print-plan").addEventListener("click", () => window.print());
    document.querySelector("#review-answers").addEventListener("click", () => renderGroup(0));
    document.querySelector("#start-over").addEventListener("click", () => {
      answers = {};
      currentGroup = 0;
      save();
      renderWelcome();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  renderWelcome();
})();

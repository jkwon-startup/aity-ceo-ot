// AITY OT Site - shared helpers
// Note: All injected content originates from author-controlled JSON files (curriculum.json, instructors.json)
// committed to this repo. No user input is rendered. innerHTML is acceptable here.
(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("aity-theme");
  if (stored === "dark") root.setAttribute("data-theme", "dark");

  function bindThemeToggle() {
    const btn = document.querySelector(".site-nav__theme");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("aity-theme", "light");
        btn.textContent = "🌙";
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("aity-theme", "dark");
        btn.textContent = "☀️";
      }
    });
    btn.textContent = root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
  }

  function basePath() {
    return document.body.dataset.base || "";
  }

  async function fetchJson(rel) {
    const r = await fetch(basePath() + rel);
    return r.json();
  }

  async function loadCurriculum() {
    const target = document.querySelector("[data-curriculum]");
    if (!target) return;
    const [curr, instr] = await Promise.all([
      fetchJson("content/curriculum.json"),
      fetchJson("content/instructors.json"),
    ]);
    const instrMap = Object.fromEntries(instr.instructors.map((i) => [i.id, i]));
    const html = curr.sessions
      .map((s) => {
        const i = instrMap[s.instructor] || { name: "—", role: "—" };
        const tag =
          s.format === "online"
            ? '<span class="card__tag tag-on">💻 온라인 2H</span>'
            : '<span class="card__tag tag-off">📕 오프라인 4H</span>';
        const roles = s.aiRoles.map((r) => `<span class="role-chip">${r}</span>`).join("");
        const outputs = s.outputs.map((o) => `• ${o}`).join("<br>");
        const handoff = s.handoffNext
          ? `<div class="card__handoff"><strong>다음 회차로의 핸드오프</strong>${s.handoffNext}</div>`
          : "";
        return `<article class="card" id="session-${s.no}">
            <div class="card__head">
              <span class="card__no">${s.week}주차 · ${s.no}회차</span>
              ${tag}
            </div>
            <h3 class="card__title">${s.title}</h3>
            <div class="card__meta">📅 ${s.date} (${s.weekday}) · 👨‍🏫 ${i.name} (${i.role})</div>
            <div class="card__roles">${roles}</div>
            <div class="card__outputs"><strong>수업 중 산출물</strong>${outputs}</div>
            ${handoff}
          </article>`;
      })
      .join("");
    target.innerHTML = html;
  }

  async function loadInstructors() {
    const target = document.querySelector("[data-instructors]");
    if (!target) return;
    const data = await fetchJson("content/instructors.json");
    const html = data.instructors
      .map((i) => {
        const sessionLabel = i.sessions.map((n) => `${n}회차`).join(" · ");
        const initial = i.name.slice(-2);
        const imgPath = basePath() + "assets/images/instructors/" + i.id + ".jpg";
        return `<div class="avatar" id="${i.id}">
            <div class="avatar__circle" data-bg="${imgPath}">${initial}</div>
            <div class="avatar__name">${i.name}</div>
            <div class="avatar__role">${i.role}</div>
            <div class="avatar__sessions">${sessionLabel}</div>
            <p style="font-size:0.78rem;color:var(--aity-text-muted);margin:0.5rem 0 0;line-height:1.55">${i.bio}</p>
          </div>`;
      })
      .join("");
    target.innerHTML = html;
    target.querySelectorAll("[data-bg]").forEach((el) => {
      const url = el.getAttribute("data-bg");
      const probe = new Image();
      probe.onload = () => {
        el.style.backgroundImage = "url('" + url + "')";
        el.textContent = "";
      };
      probe.src = url;
    });
  }

  async function loadAiMatrix() {
    const target = document.querySelector("[data-matrix]");
    if (!target) return;
    const data = await fetchJson("content/curriculum.json");
    const rows = data.aiRoleMatrix
      .map((m) => `<tr><td><strong>${m.role}</strong></td><td>${m.what}</td></tr>`)
      .join("");
    target.innerHTML = `<table class="matrix"><thead><tr><th style="width:32%">AI 역할</th><th>실제로 도와주는 일</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindThemeToggle();
    loadCurriculum();
    loadInstructors();
    loadAiMatrix();
  });
})();

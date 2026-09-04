const page = document.body.dataset.page || "home";

const navItems = [
  ["company", "COMPANY", "회사소개", "company.html?v=20260904-18"],
  ["services", "SERVICES", "사업분야", "services.html?v=20260904-18"],
  ["capabilities", "CAPABILITIES", "설계역량", "capabilities.html?v=20260904-18"],
  ["projects", "PROJECTS", "프로젝트", "projects.html?v=20260904-18"],
  ["contact", "CONTACT", "문의", "contact.html?v=20260904-18"]
];

const brand = `
  <a class="brand" href="index.html?v=20260904-18" aria-label="XYZTECH 홈">
    <span class="brand-logo" aria-hidden="true"><strong><span>X</span><span>Y</span><span>Z</span></strong><small><span>T</span><span>E</span><span>C</span><span>H</span></small></span>
  </a>`;

const header = document.querySelector("[data-site-header]");
if (header) {
  header.innerHTML = `
    <a class="skip-link" href="#main">본문 바로가기</a>
    <header class="site-header">
      <div class="container header-inner">
        ${brand}
        <nav class="desktop-nav" aria-label="주 메뉴">
          ${navItems.map(([key, en, ko, href]) => `<a class="nav-link ${page === key ? "active" : ""}" href="${href}">${en}<span>${ko}</span></a>`).join("")}
        </nav>
        <a class="header-cta" href="contact.html?v=20260904-18">프로젝트·작업 문의</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="메뉴 열기"><span></span></button>
      </div>
    </header>
    <nav class="mobile-nav" id="mobile-nav" aria-label="모바일 메뉴">
      ${navItems.map(([key, en, ko, href]) => `<a href="${href}">${en}<span>${ko}</span></a>`).join("")}
    </nav>`;
}

const footer = document.querySelector("[data-site-footer]");
if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-main">
        <div class="footer-brand">
          ${brand}
          <p>생산공정과 작업환경을 이해하는 설계 엔지니어링과 샌드블라스팅 표면처리 작업을 제공합니다.</p>
        </div>
        <nav class="footer-nav" aria-label="하단 메뉴">
          ${navItems.map(([, en, ko, href]) => `<a href="${href}">${en} · ${ko}</a>`).join("")}
          <a href="mailto:ceo@xyztech.co.kr">ceo@xyztech.co.kr</a>
        </nav>
      </div>
      <div class="container footer-meta">
        <p>상호 엑스와이지(xyz)테크 · 대표 박재훈 · 사업자등록번호 498-52-00813</p>
        <p>설계사무소 · 경기도 안산시 단원구 풍전로 37-9, 301동 235호</p>
        <p>샌드블라스팅 작업장 · 경기도 안산시 단원구 산단로 326, 20동 117호 · E-mail ceo@xyztech.co.kr</p>
        <p>© <span data-year></span> XYZTECH. All rights reserved.</p>
      </div>
    </footer>`;
}

document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
if (toggle && mobileNav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    mobileNav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(item => item.classList.toggle("active", item === button));
    document.querySelectorAll("[data-project]").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.project !== filter;
    });
  });
});

const inquiryForm = document.querySelector("#inquiry-form");
if (inquiryForm) {
  inquiryForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;
    const data = new FormData(inquiryForm);
    const subject = `[XYZTECH 사업문의] ${data.get("company")} / ${data.get("service")}`;
    const body = [
      `회사명: ${data.get("company")}`,
      `담당자: ${data.get("name")}`,
      `연락처: ${data.get("phone")}`,
      `회신 이메일: ${data.get("email")}`,
      `문의 분야: ${data.get("service")}`,
      `희망 일정: ${data.get("schedule") || "미정"}`,
      `보유 자료·대상물 정보: ${data.get("data") || "미정"}`,
      "",
      "문의 내용:",
      data.get("message")
    ].join("\n");
    document.querySelector(".form-status").textContent = "메일 프로그램을 열고 있습니다. 첨부파일은 열린 메일에 추가해주세요.";
    window.location.href = `mailto:ceo@xyztech.co.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

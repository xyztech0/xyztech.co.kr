const page = document.body.dataset.page || "home";

const navItems = [
  ["company", "COMPANY", "회사소개", "company.html?v=20260903-8"],
  ["services", "SERVICES", "사업분야", "services.html?v=20260903-8"],
  ["capabilities", "CAPABILITIES", "설계역량", "capabilities.html?v=20260903-8"],
  ["projects", "PROJECTS", "프로젝트", "projects.html?v=20260903-8"],
  ["contact", "CONTACT", "문의", "contact.html?v=20260903-8"]
];

const brand = `
  <a class="brand" href="index.html?v=20260903-8" aria-label="XYZTECH 홈">
    <span class="brand-logo" aria-hidden="true"><strong>XYZ</strong><small>TECH</small></span>
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
        <a class="header-cta" href="contact.html?v=20260903-8">설계 프로젝트 문의</a>
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
          <p>생산공정과 작업환경을 이해하고, 제작성과 정밀도를 고려한 자동화설비 및 차체 용접지그를 설계합니다.</p>
        </div>
        <nav class="footer-nav" aria-label="하단 메뉴">
          ${navItems.map(([, en, ko, href]) => `<a href="${href}">${en} · ${ko}</a>`).join("")}
          <a href="mailto:ceo@xyztech.co.kr">ceo@xyztech.co.kr</a>
        </nav>
      </div>
      <div class="container footer-meta">
        <p>상호 엑스와이지(xyz)테크 · 대표 박재훈 · 사업자등록번호 498-52-00813</p>
        <p>경기도 안산시 단원구 풍전로 37-9, 301동 235호 · E-mail ceo@xyztech.co.kr</p>
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
    const subject = `[XYZTECH 설계문의] ${data.get("company")} / ${data.get("service")}`;
    const body = [
      `회사명: ${data.get("company")}`,
      `담당자: ${data.get("name")}`,
      `연락처: ${data.get("phone")}`,
      `회신 이메일: ${data.get("email")}`,
      `문의 분야: ${data.get("service")}`,
      `희망 일정: ${data.get("schedule") || "미정"}`,
      `CAD/데이터: ${data.get("data") || "미정"}`,
      "",
      "프로젝트 내용:",
      data.get("message")
    ].join("\n");
    document.querySelector(".form-status").textContent = "메일 프로그램을 열고 있습니다. 첨부파일은 열린 메일에 추가해주세요.";
    window.location.href = `mailto:ceo@xyztech.co.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

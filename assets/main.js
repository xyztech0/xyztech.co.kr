// Preserve previously shared section URLs after splitting category pages.
const legacySectionPages = {"greeting":"company.html","certifications":"certifications.html","organization":"organization.html","location":"location.html","overview":"company-profile.html","jig":"services.html","factory":"automation.html","blasting":"sandblasting.html","mechanical":"automation.html#mechanical","welding":"automation.html#welding","robot":"automation.html#robot"};
const legacyFile = location.pathname.split("/").pop();
if (["company.html", "services.html"].includes(legacyFile)) {
  const destination = legacySectionPages[location.hash.slice(1)];
  if (destination && destination.split("#")[0] !== legacyFile) location.replace(destination);
}
const page = document.body.dataset.page || "home";

const siteVersion = "20260907-36";
const navItems = [
  { key: "company", en: "COMPANY", ko: "회사소개", href: `company.html?v=${siteVersion}`, children: [["인사말", `company.html?v=${siteVersion}`], ["인증서", `certifications.html?v=${siteVersion}`], ["조직도", `organization.html?v=${siteVersion}`], ["오시는 길", `location.html?v=${siteVersion}`]] },
  { key: "services", en: "BUSINESS", ko: "사업분야", href: `services.html?v=${siteVersion}`, children: [["지그", `services.html?v=${siteVersion}`], ["자동화설비", `automation.html?v=${siteVersion}`]] },
  { key: "contact", en: "CONTACT", ko: "문의", href: `contact.html?v=${siteVersion}`, children: [["문의", `contact.html?v=${siteVersion}`], ["공지사항", `notices.html?v=${siteVersion}`]] }
];

const brand = `
  <a class="brand" href="index.html?v=${siteVersion}" aria-label="XYZTECH 홈">
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
          ${navItems.map(item => `<div class="nav-item"><a href="${item.href}" class="nav-link ${page === item.key || (page === "notices" && item.key === "contact") ? "active" : ""}" aria-expanded="false" aria-controls="mega-all">${item.en}<span>${item.ko}</span></a></div>`).join("")}
          <div class="mega-menu mega-all" id="mega-all"><div class="container all-menu-inner">${navItems.map(item => `<section class="all-menu-column" aria-label="${item.ko}"><h2><a href="${item.href}"><small>${item.en}</small>${item.ko}</a></h2><ul>${item.children.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul></section>`).join("")}</div></div>
        </nav>
        <a class="header-cta" href="contact.html?v=${siteVersion}">견적·프로젝트 문의</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="메뉴 열기"><span></span></button>
      </div>
    </header>
    <nav class="mobile-nav" id="mobile-nav" aria-label="모바일 메뉴">
      ${navItems.map(item => `<div class="mobile-nav-group"><div class="mobile-nav-heading"><a class="mobile-category-link" href="${item.href}"><span><b>${item.en}</b>${item.ko}</span></a><button type="button" class="mobile-submenu-toggle" aria-label="${item.ko} 하위 메뉴 펼치기" aria-expanded="false" aria-controls="mobile-${item.key}"><i aria-hidden="true">＋</i></button></div><div class="mobile-submenu" id="mobile-${item.key}">${item.children.map(([label, href]) => `<a href="${href}">${label}<span>→</span></a>`).join("")}</div></div>`).join("")}
    </nav>`;
}

const footer = document.querySelector("[data-site-footer]");
if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-main">
        <div class="footer-brand">
          ${brand}
          <p>생산공정과 작업환경을 이해하고, 산업 자동화설비와 용접지그를 설계부터 제작까지 수행합니다.</p>
        </div>
        <nav class="footer-nav" aria-label="하단 메뉴">
          ${navItems.map(item => `<a href="${item.href}">${item.en} · ${item.ko}</a>`).join("")}
          <a href="capabilities.html?v=${siteVersion}">CAPABILITIES · 기술역량</a>
          <a href="projects.html?v=${siteVersion}">PROJECTS · 프로젝트</a>
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

document.querySelectorAll(".mobile-submenu-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".mobile-submenu-toggle").forEach(item => {
      item.setAttribute("aria-expanded", "false");
      item.closest(".mobile-nav-group").classList.remove("open");
    });
    if (!open) {
      button.setAttribute("aria-expanded", "true");
      button.closest(".mobile-nav-group").classList.add("open");
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: "0px 0px -25px 0px" });
  document.documentElement.classList.add("motion-ready");
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


// Shared disclosure navigation: pointer, keyboard and touch.
const desktopItems = [...document.querySelectorAll(".nav-item")];
const desktopNav = document.querySelector(".desktop-nav");
const desktopPanel = document.querySelector("#mega-all");
function closeDesktopMenus() {
  if (desktopNav) desktopNav.classList.remove("all-open");
  desktopItems.forEach(item => {
    item.classList.remove("is-open");
    item.querySelector(".nav-link").setAttribute("aria-expanded", "false");
  });
}
function openDesktopMenu(item) {
  if (!desktopNav) return;
  desktopNav.classList.add("all-open");
  desktopItems.forEach(other => {
    other.classList.toggle("is-open", other === item);
    other.querySelector(".nav-link").setAttribute("aria-expanded", "true");
  });
}
desktopItems.forEach(item => {
  const button = item.querySelector(".nav-link");
  button.addEventListener("click", closeDesktopMenus);
  button.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse") openDesktopMenu(item);
  });
  button.addEventListener("keydown", event => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openDesktopMenu(item);
      const index = desktopItems.indexOf(item);
      desktopPanel.querySelectorAll(".all-menu-column")[index].querySelector("li a").focus();
    }
  });
});
if (desktopNav) {
  desktopNav.addEventListener("focusout", event => {
    if (!desktopNav.contains(event.relatedTarget)) closeDesktopMenus();
  });
  desktopNav.querySelectorAll(".all-menu-column a").forEach(link => link.addEventListener("click", closeDesktopMenus));
}
const siteHeader = document.querySelector(".site-header");
if (siteHeader) siteHeader.addEventListener("pointerleave", event => {
  if (event.pointerType === "mouse" && !desktopPanel.contains(document.activeElement)) closeDesktopMenus();
});
document.addEventListener("click", event => {
  if (!event.target.closest(".desktop-nav")) closeDesktopMenus();
});
function closeMobileMenu() {
  if (!toggle || !mobileNav) return;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "메뉴 열기");
  mobileNav.classList.remove("open");
  document.body.classList.remove("menu-open");
}
document.querySelectorAll(".mobile-submenu a, .mobile-category-link").forEach(link => link.addEventListener("click", closeMobileMenu));
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  const openItem = document.querySelector(".nav-item.is-open");
  if (openItem) openItem.querySelector(".nav-link").focus();
  closeDesktopMenus();
  if (mobileNav && mobileNav.classList.contains("open")) {
    closeMobileMenu();
    toggle.focus();
  }
});
window.matchMedia("(min-width: 901px)").addEventListener("change", () => {
  closeMobileMenu();
  closeDesktopMenus();
});
document.querySelectorAll('.detail-nav a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll('.detail-nav a[href^="#"]').forEach(item => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "location");
  });
});

// Mark current section and make deep links into scope disclosures usable.
function revealHashTarget() {
  const hash = location.hash.slice(1);
  if (!hash) return;
  const target = document.getElementById(hash);
  if (target && target.matches("details")) target.open = true;
}
revealHashTarget();
window.addEventListener("hashchange", revealHashTarget);
const sectionLinks = [...document.querySelectorAll(".detail-nav a[href^='#']")];
if ("IntersectionObserver" in window && sectionLinks.length) {
  const activeObserver = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
      sectionLinks.forEach(link => {
        if (link.hash === "#" + entry.target.id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-145px 0px -55% 0px", threshold: 0 });
  sectionLinks.forEach(link => {
    const target = document.querySelector(link.hash);
    if (target) activeObserver.observe(target);
  });
}
document.addEventListener("keydown", event => {
  if (event.key !== "Tab" || !mobileNav || !mobileNav.classList.contains("open")) return;
  const focusable = [toggle, ...mobileNav.querySelectorAll("button, a")].filter(el => el.getClientRects().length);
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});


// Home-only restrained motion, with explicit pause and reduced-motion support.
const homeSlider = document.querySelector(".hp-banner-slider");
if (homeSlider) {
  const track = homeSlider.querySelector(".hp-banner-track");
  const slides = [...track.children];
  const clone = slides[0].cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  track.appendChild(clone);
  const dots = [...homeSlider.querySelectorAll("[data-slide]")];
  const pause = homeSlider.querySelector(".hp-slide-pause");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0, timer = null, resetTimer = null, paused = motionPreference.matches, hovering = false, inView = true, moving = false;
  function label() { pause.textContent = paused ? "자동 재생 시작" : "자동 재생 정지"; }
  function normalize() {
    clearTimeout(resetTimer);
    if (current === slides.length) {
      track.style.transition = "none";
      current = 0;
      track.style.transform = "translateX(0)";
    }
    moving = false;
  }
  function show(index) {
    if (moving) normalize();
    current = index;
    track.style.transition = motionPreference.matches ? "none" : "transform 850ms cubic-bezier(.22,.61,.36,1)";
    void track.offsetWidth;
    track.style.transform = "translateX(-" + current * 100 + "%)";
    const logical = current % slides.length;
    slides.forEach((slide, i) => slide.setAttribute("aria-hidden", String(i !== logical)));
    dots.forEach((dot, i) => dot.setAttribute("aria-pressed", String(i === logical)));
    homeSlider.querySelector(".hp-slide-count").textContent = String(logical + 1).padStart(2, "0") + " / 04";
    moving = true;
    resetTimer = setTimeout(normalize, motionPreference.matches ? 0 : 870);
  }
  function schedule() {
    clearTimeout(timer);
    if (paused || hovering || !inView || document.hidden || homeSlider.contains(document.activeElement)) return;
    timer = setTimeout(() => { show(current + 1); schedule(); }, 5000);
  }
  homeSlider.querySelector(".hp-slider-controls").hidden = false;
  dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); paused = true; label(); schedule(); }));
  pause.addEventListener("click", () => { paused = !paused; label(); schedule(); });
  homeSlider.addEventListener("pointerenter", () => { hovering = true; schedule(); });
  homeSlider.addEventListener("pointerleave", () => { hovering = false; schedule(); });
  homeSlider.addEventListener("focusin", schedule);
  homeSlider.addEventListener("focusout", () => setTimeout(schedule, 0));
  document.addEventListener("visibilitychange", schedule);
  motionPreference.addEventListener("change", () => { paused = motionPreference.matches; label(); schedule(); });
  if ("IntersectionObserver" in window) new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }, {threshold: .15}).observe(homeSlider);
  label();
  schedule();
}
const homeMotionTargets = document.querySelectorAll(".home-premium .hp-section-head, .home-premium .hp-business-card, .home-premium .hp-engineering-intro, .home-premium .hp-steps li, .home-premium .hp-cert-grid article, .home-premium .hp-contact-inner");
const homeReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !homeReducedMotion.matches) {
  const entranceObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove("hp-awaiting"); entranceObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  homeMotionTargets.forEach(el => { el.classList.add("hp-motion", "hp-awaiting"); entranceObserver.observe(el); });
  homeReducedMotion.addEventListener("change", event => {
    if (event.matches) { homeMotionTargets.forEach(el => el.classList.remove("hp-awaiting")); entranceObserver.disconnect(); }
  });
}

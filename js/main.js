(() => {
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const yearEl = document.getElementById("year");
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Sticky header border
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "메뉴 열기");
      });
    });
  }

  // Reveal on scroll
  const revealTargets = document.querySelectorAll(
    ".feature-card, .game-card, .member-card, .news-item, .contact-form, .section-head"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("visible"));
  }

  // Contact form demo handler
  if (contactForm && formNote) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      formNote.classList.remove("error");

      const data = new FormData(contactForm);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !email || !message) {
        formNote.textContent = "이름, 이메일, 메시지를 모두 입력해 주세요.";
        formNote.classList.add("error");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formNote.textContent = "올바른 이메일 형식을 입력해 주세요.";
        formNote.classList.add("error");
        return;
      }

      // Template demo: no backend. Replace with Formspree / API endpoint.
      formNote.textContent =
        "데모 모드: 메시지가 전송된 것처럼 표시됩니다. 실제 연동 시 이 핸들러를 교체하세요.";
      contactForm.reset();
    });
  }
})();

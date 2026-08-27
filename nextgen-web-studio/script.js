document.addEventListener("DOMContentLoaded", () => {
  // PRELOADER
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.style.display = "none";
  }, 1200);

  // CATEGORY FILTER TABS
  const tabs = document.querySelectorAll(".tab-btn");
  const cards = document.querySelectorAll(".portfolio-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((btn) => btn.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-category");

      cards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // STATS NUMBER COUNTUP ANIMATION
  const counters = document.querySelectorAll(".counter");
  let hasAnimated = false;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 1500;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.innerText = target;
          clearInterval(timer);
        } else {
          counter.innerText = Math.ceil(current);
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector(".stats-bar");
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        animateCounters();
        hasAnimated = true;
      }
    }, { threshold: 0.4 });
    observer.observe(statsSection);
  }

  // FAQ ACCORDION TOGGLE
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // CONTACT FORM WHATSAPP REDIRECT
  const form = document.getElementById("inquiryForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("name").value.trim();
      const business = document.getElementById("business").value.trim();
      const countryCode = document.getElementById("countryCode").value;
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const text = `Name: ${name}%0ABusiness: ${business}%0APhone: ${countryCode} ${phone}%0AEmail: ${email}%0AMessage: ${message ? message : 'N/A'}`;
      
      window.open(`https://wa.me/918879344857?text=${text}`, "_blank");
    });
  }
});
const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("site-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Hero Image Slideshow
(function initHeroSlideshow() {
  const slideshow = document.getElementById("hero-slideshow");
  if (!slideshow) return;

  // ============================================
  // IMAGE LIST - Edit this array when adding/removing images
  // ============================================
  const heroImages = [
    "zebra_header_1.jpg",
    "zebra_header_3.jpg",
    "zebra_header_6.jpg",
    "zebra_header_7.jpg",
    "zebra_header_11.jpg"
  ];
  // ============================================

  const imagePath = "images/hero-banner-images/";
  const slideInterval = 10000; // 10 seconds

  // Generate slide elements
  heroImages.forEach((img, index) => {
    const slide = document.createElement("div");
    slide.className = "hero-slide" + (index === 0 ? " active" : "");
    slide.style.backgroundImage = `url('${imagePath}${img}')`;
    slideshow.appendChild(slide);
  });

  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  if (slides.length === 0) return;

  // Shuffle function (Fisher-Yates)
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Create randomized order
  let slideOrder = shuffle([...Array(slides.length).keys()]);
  let currentIndex = 0;

  // Set first random slide as active
  slides.forEach(slide => slide.classList.remove("active"));
  slides[slideOrder[0]].classList.add("active");

  function nextSlide() {
    slides[slideOrder[currentIndex]].classList.remove("active");
    currentIndex = (currentIndex + 1) % slideOrder.length;
    
    // Reshuffle when we've shown all slides
    if (currentIndex === 0) {
      slideOrder = shuffle([...Array(slides.length).keys()]);
    }
    
    slides[slideOrder[currentIndex]].classList.add("active");
  }

  // Start the slideshow
  setInterval(nextSlide, slideInterval);
})();

// Back to Top Button
(function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  let lastScrollY = window.scrollY;
  let scrollingUp = false;
  const scrollThreshold = 300; // Show button after scrolling this far down

  function handleScroll() {
    const currentScrollY = window.scrollY;
    scrollingUp = currentScrollY < lastScrollY;
    
    // Show button when scrolled down past threshold AND scrolling up
    if (currentScrollY > scrollThreshold && scrollingUp) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
    
    lastScrollY = currentScrollY;
  }

  // Throttle scroll events for performance
  let ticking = false;
  window.addEventListener("scroll", function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll to top when clicked
  backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
})();

// Cookie Consent Banner
const cookieBanner = document.getElementById("cookie-banner");
const cookieAccept = document.getElementById("cookie-accept");
const cookieDecline = document.getElementById("cookie-decline");

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

function hideCookieBanner() {
  if (cookieBanner) {
    cookieBanner.classList.add("hidden");
  }
}

function showCookieBanner() {
  if (cookieBanner) {
    cookieBanner.classList.remove("hidden");
  }
}

// Check if user has already made a choice
if (getCookie("cookie_consent")) {
  hideCookieBanner();
} else {
  showCookieBanner();
}

// Accept cookies
if (cookieAccept) {
  cookieAccept.addEventListener("click", () => {
    setCookie("cookie_consent", "accepted", 365);
    hideCookieBanner();
  });
}

// Decline cookies
if (cookieDecline) {
  cookieDecline.addEventListener("click", () => {
    setCookie("cookie_consent", "declined", 365);
    hideCookieBanner();
  });
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-in"
  );

  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));
}

// Auto-add animation classes to common elements
function autoAddAnimations() {
  // Service photos/cards (main page)
  document.querySelectorAll(".service-photo, .service-tile").forEach((el, i) => {
    el.classList.add("animate-scale-in");
    el.classList.add(`animate-delay-${(i % 4) + 1}`);
  });

  // Services page - service rows (alternating animations)
  document.querySelectorAll(".service-row").forEach((el, i) => {
    const image = el.querySelector(".service-image");
    const content = el.querySelector(".service-content");
    if (image) {
      image.classList.add(i % 2 === 0 ? "animate-slide-left" : "animate-slide-right");
    }
    if (content) {
      content.classList.add(i % 2 === 0 ? "animate-slide-right" : "animate-slide-left");
      content.classList.add("animate-delay-2");
    }
  });

  // Services page hero
  document.querySelectorAll(".services-hero h1").forEach((el) => {
    el.classList.add("animate-fade-in");
  });

  // Team cards
  document.querySelectorAll(".team-card").forEach((el, i) => {
    el.classList.add("animate-on-scroll");
    el.classList.add(`animate-delay-${(i % 5) + 1}`);
  });

  // Value cards
  document.querySelectorAll(".value-card").forEach((el, i) => {
    el.classList.add("animate-on-scroll");
    el.classList.add(`animate-delay-${(i % 6) + 1}`);
  });

  // Section headings
  document.querySelectorAll(".center-header h2, .section h2:not(.service-content h2)").forEach((el) => {
    el.classList.add("animate-fade-in");
  });

  // Quote hero
  document.querySelectorAll(".quote-hero").forEach((el) => {
    el.classList.add("animate-fade-in");
  });

  // Focus grid items
  document.querySelectorAll(".focus-grid > *").forEach((el, i) => {
    el.classList.add(i % 2 === 0 ? "animate-slide-left" : "animate-slide-right");
  });

  // Innovation text
  document.querySelectorAll(".innovation-text").forEach((el) => {
    el.classList.add("animate-slide-left");
  });

  // Stats
  document.querySelectorAll(".stat-card").forEach((el, i) => {
    el.classList.add("animate-on-scroll");
    el.classList.add(`animate-delay-${(i % 3) + 1}`);
  });

  // Partner logos
  document.querySelectorAll(".partner-link").forEach((el, i) => {
    el.classList.add("animate-on-scroll");
    el.classList.add(`animate-delay-${(i % 6) + 1}`);
  });

  // Profile highlights on team pages
  document.querySelectorAll(".profile-highlight").forEach((el, i) => {
    el.classList.add("animate-on-scroll");
    el.classList.add(`animate-delay-${i + 1}`);
  });

  // Contact section
  document.querySelectorAll(".contact-content").forEach((el) => {
    el.classList.add("animate-slide-left");
  });

  // Profile stats section
  document.querySelectorAll(".profile-stats").forEach((el) => {
    el.classList.add("animate-on-scroll");
  });

  // Team member pages - profile card (photo)
  document.querySelectorAll(".team-profile .profile-card").forEach((el) => {
    el.classList.add("animate-slide-left");
  });

  // Team member pages - profile details
  document.querySelectorAll(".team-profile .profile-details").forEach((el) => {
    el.classList.add("animate-slide-right");
    el.classList.add("animate-delay-2");
  });

  // Team member pages - profile name
  document.querySelectorAll(".profile-details h1").forEach((el) => {
    el.classList.add("animate-fade-in");
  });

  // Team member pages - profile bio
  document.querySelectorAll(".profile-bio").forEach((el) => {
    el.classList.add("animate-on-scroll");
  });

  // Team member contact CTA section
  document.querySelectorAll(".section.alt .contact-grid").forEach((el) => {
    el.classList.add("animate-on-scroll");
  });
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  autoAddAnimations();
  initScrollAnimations();
});

const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("site-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a nav link is clicked
  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    });
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

  const imagePath = "/images/hero-banner-images/";
  const slideInterval = 10000; // 10 seconds

  // Generate slide elements (lazy-load: only first gets backgroundImage, others load on demand)
  heroImages.forEach((img) => {
    const slide = document.createElement("div");
    slide.className = "hero-slide";
    slide.dataset.bg = `url('${imagePath}${img}')`;
    slide.dataset.src = imagePath + img;
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

  function loadSlideBg(slide) {
    if (!slide.dataset.src || slide.dataset.loaded) return;
    const src = slide.dataset.src;
    const img = new Image();
    img.onload = function () {
      slide.style.backgroundImage = slide.dataset.bg;
      slide.dataset.loaded = "1";
    };
    img.onerror = function () {
      if (!slide.dataset.retried) {
        slide.dataset.retried = "1";
        setTimeout(function () { loadSlideBg(slide); }, 1000);
      } else {
        slide.dataset.loaded = "1";
      }
    };
    img.src = src;
  }

  // Create randomized order
  let slideOrder = shuffle([...Array(slides.length).keys()]);
  let currentIndex = 0;

  // Set first random slide as active and load only its image
  slides.forEach(slide => slide.classList.remove("active"));
  loadSlideBg(slides[slideOrder[0]]);
  slides[slideOrder[0]].classList.add("active");

  function nextSlide() {
    slides[slideOrder[currentIndex]].classList.remove("active");
    currentIndex = (currentIndex + 1) % slideOrder.length;

    // Reshuffle when we've shown all slides
    if (currentIndex === 0) {
      slideOrder = shuffle([...Array(slides.length).keys()]);
    }

    const nextSlideEl = slides[slideOrder[currentIndex]];
    loadSlideBg(nextSlideEl);
    nextSlideEl.classList.add("active");
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
const cookieNecessary = document.getElementById("cookie-necessary");
const cookieReject = document.getElementById("cookie-reject");

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

// Accept all cookies
if (cookieAccept) {
  cookieAccept.addEventListener("click", () => {
    setCookie("cookie_consent", "accepted", 365);
    hideCookieBanner();
  });
}

// Necessary cookies only
if (cookieNecessary) {
  cookieNecessary.addEventListener("click", () => {
    setCookie("cookie_consent", "necessary", 365);
    hideCookieBanner();
  });
}

// Reject all non-essential cookies
if (cookieReject) {
  cookieReject.addEventListener("click", () => {
    setCookie("cookie_consent", "rejected", 365);
    hideCookieBanner();
  });
}

// News Category Filters
const newsFilters = document.querySelectorAll(".news-filter");
const newsCards = document.querySelectorAll(".news-box[data-category]");

if (newsFilters.length > 0) {
  newsFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;

      // Update active filter
      newsFilters.forEach((f) => f.classList.remove("active"));
      filter.classList.add("active");

      // Filter cards
      newsCards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1,
  };

  // Team cards: observe the section so all 7 animate together when section enters view
  // (avoids last 2 cards animating later when user scrolls horizontally)
  const teamSection = document.querySelector(".team-section");
  const teamCards = teamSection ? teamSection.querySelectorAll(".team-card") : [];
  if (teamSection && teamCards.length > 0) {
    const teamObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          teamCards.forEach((card) => card.classList.add("animate-visible"));
          teamObserver.unobserve(teamSection);
        }
      });
    }, observerOptions);
    teamObserver.observe(teamSection);
  }

  // All other animated elements (exclude team cards - they use team-section observer)
  const animatedElements = document.querySelectorAll(
    ".animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-in"
  );
  const teamCardSet = new Set(teamCards || []);
  const otherElements = Array.from(animatedElements).filter((el) => !teamCardSet.has(el));

  if (otherElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    otherElements.forEach((el) => observer.observe(el));
  }
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

  // Team cards (7 cards: use unique delays 1–7 for smooth cascade)
  document.querySelectorAll(".team-card").forEach((el, i) => {
    el.classList.add("animate-on-scroll");
    el.classList.add(`animate-delay-${(i % 7) + 1}`);
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

// Mobile two-tap service tiles: first tap reveals overlay, second tap navigates
function initMobileServiceTiles() {
  if (window.matchMedia("(hover: none)").matches === false) return;

  let activeTile = null;

  document.querySelectorAll(".service-tile").forEach((tile) => {
    tile.addEventListener("click", function (e) {
      if (activeTile === this) return;

      e.preventDefault();
      if (activeTile) {
        activeTile.classList.remove("touch-active");
      }
      this.classList.add("touch-active");
      activeTile = this;
    });
  });

  document.addEventListener("click", function (e) {
    if (activeTile && !activeTile.contains(e.target)) {
      activeTile.classList.remove("touch-active");
      activeTile = null;
    }
  });
}

function initTeamPhotoLoad() {
  document.querySelectorAll(".team-photo img").forEach((img) => {
    if (img.complete) {
      img.classList.add("img-loaded");
    } else {
      img.addEventListener("load", () => img.classList.add("img-loaded"));
    }
  });
}

function initImageRetry() {
  document.querySelectorAll("img[src]").forEach((img) => {
    img.addEventListener("error", function () {
      if (!this.dataset.retried && this.src) {
        this.dataset.retried = "1";
        const src = this.src;
        setTimeout(() => {
          this.src = "";
          this.src = src;
        }, 500);
      }
    });
  });
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  autoAddAnimations();
  initScrollAnimations();
  initMobileServiceTiles();
  initTeamPhotoLoad();
  initImageRetry();
});

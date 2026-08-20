gsap.registerPlugin(ScrollTrigger);

// Hero video-like parallax
gsap.to(".hero-bg", {
  scale: 1.18,
  y: 80,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-scene",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(".hero-content", {
  y: -120,
  opacity: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-scene",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(".food-1", {
  y: 220,
  x: -70,
  rotate: 25,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-scene",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(".food-2", {
  y: -160,
  x: 70,
  rotate: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-scene",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(".food-3", {
  y: 160,
  x: 80,
  rotate: 18,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-scene",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});


// Storytelling pinned section
gsap.set(".story-step", { autoAlpha: 0, y: 40 });
gsap.set(".step-1", { autoAlpha: 1, y: 0 });

const story = gsap.timeline({
  scrollTrigger: {
    trigger: ".story-wrap",
    start: "top top",
    end: "+=2400",
    scrub: true,
    pin: ".story-pin",
    anticipatePin: 1
  }
});

story
  .fromTo(".plate",
    { scale: 0.75, y: 80, rotate: -8, autoAlpha: 0 },
    { scale: 1, y: 0, rotate: 0, autoAlpha: 1, duration: 0.8 }
  )
  .to(".story-bg", { scale: 1.15, duration: 2.6 }, 0)

  .to(".step-1", { autoAlpha: 0, y: -50, duration: 0.5 }, 0.9)
  .fromTo(".step-2",
    { autoAlpha: 0, y: 50 },
    { autoAlpha: 1, y: 0, duration: 0.5 },
    1.0
  )
  .to(".plate", { x: 120, rotate: 8, scale: 1.06, duration: 1 }, 1.0)

  .to(".step-2", { autoAlpha: 0, y: -50, duration: 0.5 }, 1.9)
  .fromTo(".step-3",
    { autoAlpha: 0, y: 50 },
    { autoAlpha: 1, y: 0, duration: 0.5 },
    2.0
  )
  .to(".plate", { x: -80, y: -20, rotate: -7, scale: 0.95, duration: 1 }, 2.0);


// Menu cards animation
gsap.from(".food-card", {
  y: 90,
  opacity: 0,
  rotateX: 15,
  stagger: 0.15,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".menu-grid",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});


// clearSearch
const filterButtons = document.querySelectorAll(".filter-btn");
const allMenuCards = document.querySelectorAll(".menu-grid .food-card");
const menuSearch = document.getElementById("menuSearch");
const clearSearch = document.getElementById("clearSearch");
const searchResult = document.getElementById("searchResult");

const activeButton = document.querySelector(".filter-btn.active");
let activeFilter = activeButton ? activeButton.getAttribute("data-filter") : "all";

function getCardSearchText(card) {
  const img = card.querySelector("img");
  const imgAlt = img ? img.getAttribute("alt") : "";

  return (
    (card.getAttribute("data-search") || "") +
    " " +
    card.innerText +
    " " +
    imgAlt
  ).toLowerCase();
}

function updateMenuList() {
  const keyword = menuSearch ? menuSearch.value.trim().toLowerCase() : "";
  const visibleCards = [];

  allMenuCards.forEach(function (card) {
    const categories = (card.getAttribute("data-category") || "")
      .toLowerCase()
      .split(/\s+/);

    const cardText = getCardSearchText(card);

    const matchCategory =
      activeFilter === "all" || categories.includes(activeFilter);

    const matchSearch =
      keyword === "" || cardText.includes(keyword);

    if (matchCategory && matchSearch) {
      card.classList.remove("is-hidden");
      visibleCards.push(card);
    } else {
      card.classList.add("is-hidden");
    }
  });

  if (searchResult) {
    if (keyword !== "" || activeFilter !== "all") {
      if (visibleCards.length > 0) {
        searchResult.textContent = visibleCards.length + "টি খাবার পাওয়া গেছে";
      } else {
        searchResult.textContent = "কোন খাবার পাওয়া যায়নি";
      }
    } else {
      searchResult.textContent = "";
    }
  }

  // smooth animation after search/filter
  if (window.gsap && visibleCards.length > 0) {
    gsap.killTweensOf(visibleCards);

    gsap.fromTo(
      visibleCards,
      {
        opacity: 0,
        y: 30,
        scale: 0.96
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
        clearProps: "transform"
      }
    );
  }

  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    activeFilter = button.getAttribute("data-filter") || "all";

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    updateMenuList();
  });
});

if (menuSearch) {
  menuSearch.addEventListener("input", updateMenuList);

  menuSearch.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      menuSearch.value = "";
      updateMenuList();
    }
  });
}

if (clearSearch) {
  clearSearch.addEventListener("click", function () {
    if (menuSearch) {
      menuSearch.value = "";
      menuSearch.focus();
    }

    updateMenuList();
  });
}
// প্রথম লোডেই all items show করার জন্য
updateMenuList();


// Actual video scroll effect
const scrollVideo = document.querySelector(".scroll-video");

function initVideoScroll() {
  if (!scrollVideo || scrollVideo.dataset.gsapInit === "true") return;

  scrollVideo.dataset.gsapInit = "true";

  gsap.set(".v-step", { autoAlpha: 0, y: 50 });

  const videoTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".video-scroll",
      start: "top top",
      end: "+=3000",
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  videoTimeline.to(scrollVideo, {
    currentTime: scrollVideo.duration,
    ease: "none",
    duration: 1
  }, 0);

  videoTimeline
    .fromTo(".v-step-1",
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 0.2 },
      0.05
    )
    .to(".v-step-1",
      { autoAlpha: 0, y: -50, duration: 0.2 },
      0.30
    )

    .fromTo(".v-step-2",
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 0.2 },
      0.40
    )
    .to(".v-step-2",
      { autoAlpha: 0, y: -50, duration: 0.2 },
      0.62
    )

    .fromTo(".v-step-3",
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 0.25 },
      0.72
    );

  ScrollTrigger.refresh();
}

if (scrollVideo) {
  scrollVideo.addEventListener("loadedmetadata", initVideoScroll, { once: true });
  scrollVideo.load();

  if (scrollVideo.readyState >= 1) {
    initVideoScroll();
  }
}


// Offer section parallax
gsap.to(".offer-bg", {
  scale: 1.18,
  ease: "none",
  scrollTrigger: {
    trigger: ".offer-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

gsap.from(".offer-content", {
  y: 70,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".offer-section",
    start: "top 70%"
  }
});


// Scroll progress bar
const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", function () {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = progress + "%";
  }
});


// Back to top button
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", function () {
  if (!backTop) return;

  if (window.scrollY > 700) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});

if (backTop) {
  backTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

window.addEventListener("load", function () {
  ScrollTrigger.refresh();
});
// WhatsApp Order Form
const waOrderForm = document.getElementById("waOrderForm");

if (waOrderForm) {
  waOrderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("waName").value.trim();
    const phone = document.getElementById("waPhone").value.trim();
    const address = document.getElementById("waAddress").value.trim();
    const item = document.getElementById("waItem").value.trim();
    const qty = document.getElementById("waQty").value.trim();
    const note = document.getElementById("waNote").value.trim();

    if (!name || !phone || !address || !item || !qty) {
      alert("সব তথ্য দিন, তারপর Order করুন।");
      return;
    }

    const message =
      "New Order%0A" +
      "Name: " + name + "%0A" +
      "Phone: " + phone + "%0A" +
      "Address: " + address + "%0A" +
      "Item: " + item + "%0A" +
      "Qty: " + qty + "%0A" +
      (note ? ("Note: " + note + "%0A") : "");

    // আপনার WhatsApp number
    const waNumber = "8801700936141";

    const url = "https://wa.me/" + waNumber + "?text=" + message;
    window.open(url, "_blank");
  });
}
// Menu card -> Order form auto select
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".js-pick-item");
  if (!btn) return;

  e.preventDefault();

  const itemName = (btn.dataset.item || "").trim();
  const itemSelect = document.getElementById("waItem");
  if (!itemSelect || !itemName) return;

  // select-এর option match করে value set
  const options = Array.from(itemSelect.options);
  const matched = options.find(o => o.text.trim() === itemName);

  if (matched) {
    itemSelect.value = matched.value || matched.text;
  } else {
    // option না থাকলে add করে দেবে
    const opt = document.createElement("option");
    opt.value = itemName;
    opt.text = itemName;
    itemSelect.add(opt);
    itemSelect.value = itemName;
  }

  // qty default 1
  const qty = document.getElementById("waQty");
  if (qty) qty.value = 1;

  // smooth scroll to contact/order form
  const contact = document.getElementById("contact");
  if (contact) contact.scrollIntoView({ behavior: "smooth" });

  // focus
  const name = document.getElementById("waName");
  if (name && !name.value) name.focus();
});
// Gallery lightbox
if (window.GLightbox) {
  GLightbox({ selector: ".glightbox" });
}
// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", function () {
    mainNav.classList.toggle("active");
  });

  // nav link এ click করলে menu close হবে
  mainNav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      mainNav.classList.remove("active");
    }
  });
}



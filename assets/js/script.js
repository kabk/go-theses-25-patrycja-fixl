// filepath: /Users/patrycjafixl/Library/Mobile Documents/com~apple~CloudDocs/Documents/GDY4/Digital Publishing /DP_Digital-Publishing_Thesis/thesis-website-github/boilerplate-without-css/assets/js/script.js
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    // Deactivate any currently active accordion
    for (var j = 0; j < acc.length; j++) {
      if (acc[j] !== this && acc[j].classList.contains("active")) {
        acc[j].classList.remove("active");
        var panel = acc[j].nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        }
      }
    }

    // Toggle the clicked accordion
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });

}

function onDocumentReady(callback) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(callback, 1);
  } else {
    document.addEventListener("DOMContentLoaded", callback); // Execute function when DOM is fully loaded
  }
}

onDocumentReady(function () {
  // Button click handler to toggle the 'terms' section visibility
  const toggleBtn = document.getElementById("toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTermsSection);
  } else {
    console.error("Button not found: #toggle-btn");
  }

  function toggleTermsSection() {
    const termsSection = document.getElementById("terms");

    for(j=0;j<acc.length;j++){
      acc[j].classList.remove("active");
      var panel = acc[j].nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        }
    }

    if (termsSection.classList.contains("active")) {
      termsSection.classList.remove("transition");
      setTimeout(() => termsSection.classList.remove("active"), 250);
    } else {
      termsSection.classList.add("active");
      setTimeout(() => termsSection.classList.add("transition"), 1);
    }
  }

  // Section links and content to unblur
  const sectionsData = [
    { link: 'a[href="#abstract"]', title: 'abstract-title', text: 'abstract-text' },
    { link: 'a[href="#intro"]', title: 'intro-title', text: 'intro-text' },
    { link: 'a[href="#chapter-1"]', title: 'chapter-1-title', text: 'chapter-1-text' },
    { link: 'a[href="#chapter-2"]', title: 'chapter-2-title', text: 'chapter-2-text' },
    { link: 'a[href="#chapter-3"]', title: 'chapter-3-title', text: 'chapter-3-text' },
    { link: 'a[href="#chapter-4"]', title: 'chapter-4-title', text: 'chapter-4-text' },
    { link: 'a[href="#epilogue"]', title: 'epilogue-title', text: 'epilogue-text' },
  ];

  // Unblur function for sections
  function unBlurSection(event, titleElement, textElement) {
    event.preventDefault();
    titleElement.style.filter = "none";
    textElement.style.filter = "none";
    titleElement.scrollIntoView({ behavior: "smooth" });
  }

  // Add event listeners to unblur sections on click
  sectionsData.forEach((section) => {
    const sectionLink = document.querySelector(section.link);
    const sectionTitle = document.getElementById(section.title);
    const sectionText = document.getElementById(section.text);

    sectionLink.addEventListener("click", function (event) {
      unBlurSection(event, sectionTitle, sectionText);
    });
  });

  // Handle active navigation link highlight based on scroll position
  const sections = document.querySelectorAll("main > div[id]");
  const navLinks = document.querySelectorAll(".index a");
  const circle = document.querySelector(".circle");

  function updateActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove("active"));
    if (navLinks[index]) {
      navLinks[index].classList.add("active");
      const activeLink = navLinks[index];
      const linkRect = activeLink.getBoundingClientRect();
      const circleTop = linkRect.top + window.scrollY;
      const circleLeft = linkRect.left + window.scrollY;

      // Adjust circle position based on window width
      if (window.innerWidth <= 768) {
        circle.style.left = `${circleLeft}px`;
      } else {
        circle.style.top = `${circleTop}px`;
      }
    }
  }

  // Initial active link setup and scroll listener
  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink);

  // Handle click on navigation links to update circle position
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");

      const linkRect = this.getBoundingClientRect();
      const circleTop = linkRect.top + window.scrollY;
      circle.style.top = `${circleTop}px`;
    });
  });

  // Handle window resize and adjust the circle position
  window.addEventListener("resize", function () {
    document.body.classList.add("resize-animation-stopper");
    const linkRect = navLinks[navLinks.length - 1].getBoundingClientRect();
    const circleTop = linkRect.top + window.scrollY;
    circle.style.top = `${circleTop}px`;

    setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");
    }, 250);
  });

  // Observing sections to remove blur when they are in view
  observeUnblurOnView(sectionsData);
});

// Function to unblur elements when they come into view
function observeUnblurOnView(targets) {
  const options = { rootMargin: "0px 0px -70%", threshold: 0 };

  const intersectionCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.filter = "none";
      } else {
        entry.target.removeAttribute("style");
      }
    });
  };

  const observer = new IntersectionObserver(intersectionCallback, options);

  document.querySelectorAll('section.chapter h2, section.chapter p, section.chapter figure, section.chapter figcaption')
    .forEach((target) => observer.observe(target));
}


window.addEventListener('scroll', () => {
  console.log(window.scrollY);
});
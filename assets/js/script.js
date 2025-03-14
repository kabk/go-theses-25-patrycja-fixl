// filepath: /Users/patrycjafixl/Library/Mobile Documents/com~apple~CloudDocs/Documents/GDY4/Digital Publishing /DP_Digital-Publishing_Thesis/thesis-website-github/boilerplate-without-css/assets/js/script.js

function docReady(fn) {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", fn); // Calls function when DOM is fully loaded
    }
  }
  
  docReady(function () {
    var dictionaryToggleBtn = document.getElementById("toggle-btn");
  
    if (dictionaryToggleBtn) {
      dictionaryToggleBtn.addEventListener("click", toggleDictionary);
    } else {
      console.error("Button not found: #toggle-btn");
    }
  
    function toggleDictionary() {
      var terms = document.getElementById("terms");
  
      if (terms.classList.contains("active")) {
        // disable all accordions
        const activeAccordions = terms.querySelectorAll(".active.accordion");
        for (const accordion of activeAccordions) {
          accordion.classList.remove("active");
          const panel = accordion.parentElement.querySelector(".panel");
          if (panel) {
            panel.style.maxHeight = "";
          }
        }
  
        terms.classList.remove("transition");
  
        setTimeout(function (e) {
          terms.classList.remove("active");
        }, 250);
      } else {
        terms.classList.add("active");
  
        setTimeout(function (e) {
          terms.classList.add("transition");
        }, 1);
      }
    }
  
    const abstractLink = document.querySelector('a[href="#abstract"]');
    const introLink = document.querySelector('a[href="#intro"]');
    const impulseLink = document.querySelector('a[href="#chapter-1"]');
    const prepLink = document.querySelector('a[href="#chapter-2"]');
    const travelLink = document.querySelector('a[href="#chapter-3"]');
    const exploreLink = document.querySelector('a[href="#chapter-4"]');
    const epilogueLink = document.querySelector('a[href="#epilogue"]');
  
    // Get both the elements that need the blur effect removed
    const abstractTitle = document.getElementById("abstract-title");
    const abstractText = document.getElementById("abstract-text");
    const introTitle = document.getElementById("intro-title");
    const introText = document.getElementById("intro-text");
    const impulseTitle = document.getElementById("chapter-1-title");
    const impulseText = document.getElementById("chapter-1-text");
    const prepTitle = document.getElementById("chapter-2-title");
    const prepText = document.getElementById("chapter-2-text");
    const travelTitle = document.getElementById("chapter-3-title");
    const travelText = document.getElementById("chapter-3-text");
    const exploreTitle = document.getElementById("chapter-4-title");
    const exploreText = document.getElementById("chapter-4-text");
    const epilogueTitle = document.getElementById("epilogue-title");
    const epilogueText = document.getElementById("epilogue-text");
  
    const unBlurSections = [
      {
        link: abstractLink,
        title: abstractTitle,
        text: abstractText,
      },
      {
        link: introLink,
        title: introTitle,
        text: introText,
      },
      {
        link: impulseLink,
        title: impulseTitle,
        text: impulseText,
      },
      {
        link: prepLink,
        title: prepTitle,
        text: prepText,
      },
      {
        link: travelLink,
        title: travelTitle,
        text: travelText,
      },
      {
        link: exploreLink,
        title: exploreTitle,
        text: exploreText,
      },
      {
        link: epilogueLink,
        title: epilogueTitle,
        text: epilogueText,
      },
    ];
  
    function unBlurSection(event, title, text) {
      event.preventDefault();
      title.style.filter = "none";
      text.style.filter = "none";
  
      title.scrollIntoView({
        behavior: "smooth",
      });
    }
  
    unBlurSections.forEach((section) => {
      section.link.addEventListener("click", function (event) {
        unBlurSection(event, section.title, section.text);
      });
    });
  
    const sections = document.querySelectorAll(
      "main #abstract-title, main section.chapter"
    );
    const navLinks = document.querySelectorAll(".index a");
    const circle = document.querySelector(".circle");
  
    /**
     * @type {HTMLElement}
     */
    const mainElement = document.querySelector("main");
  
    function setActiveLink() {
      let index = sections.length;
  
      const scrollY =
        window.innerWidth <= 768 ? window.scrollY : mainElement.scrollTop;
      while (--index && scrollY + 100 < sections[index].offsetTop) {}
  
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLinks[index]) {
        navLinks[index].classList.add("active");
  
        const activeLink = navLinks[index];
        const linkRect = activeLink.getBoundingClientRect();
        const circleTop = linkRect.top;
        const circleLeft = linkRect.left;
        // console.log(activeLink);
  
        if (window.innerWidth <= 768) {
          // console.log('left updated');
          console.log(circleLeft);
  
          circle.style.left = `${circleLeft}px`;
          circle.style.top = `${circleTop}px`;
          circle.style.marginLeft = "5px";
          circle.style.marginTop = "10px";
        } else {
          // console.log('top updated');
          circle.style.top = `${circleTop}px`;
          circle.style.left = "0px";
          circle.style.marginLeft = "28px";
          circle.style.marginTop = "10px";
        }
      }
    }
  
    setActiveLink();
  
    window.addEventListener("scroll", setActiveLink);
  
    mainElement.addEventListener("scroll", setActiveLink);
  
    let thisActiveMenuItem = "";
    let linkRect = "";
    let circleTop = "";
  
  
    window.addEventListener("resize", function () {
      document.body.classList.add("resize-animation-stopper");
      linkRect = thisActiveMenuItem.getBoundingClientRect();
      circleTop = linkRect.top + window.scrollY;
      circle.style.top = `${circleTop}px`;
      setTimeout(function (e) {
        document.body.classList.remove("resize-animation-stopper");
      }, 250);
    });
  
    // window.addEventListener("scroll", unBlurOnView);
    unBlurOnView(unBlurSections);
  });
  
  function unBlurOnView(targets) {
    const options = {
      rootMargin: "0px 0px -70%",
      threshold: 0,
    };
  
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


    const checkItemVisibility = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add( 'visible' );
          } else {
            entry.target.classList.remove( 'visible' );
          }
        });
      };
    const visiblityObserver = new IntersectionObserver( checkItemVisibility, { rootMargin: "0px", threshold: 0 } );

  
    // targets.forEach((target) => {
    //   observer.observe(target.title);
    //   observer.observe(target.text);
    // });
  
    document
      .querySelectorAll(
        "section.chapter h2, section.chapter p, section.chapter figure, section.chapter figcaption"
      )
      .forEach((target) => {
        // if ( target.parentNode.classList.contains('littlefoot--print') ) {
        //     target.style.color = 'red';
        // }
            

        observer.observe(target);
        visiblityObserver.observe(target);
      });
  }
  
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
  
  window.addEventListener("scroll", () => {
    console.log(window.scrollY);
  });
  
"use strict";

/**
 * Shared behavior for all pages:
 * - Mobile sidebar toggle
 * - Active "On This Page" section highlighting as readers scroll
 */
(function initQuantShell() {
  var sidebar = document.getElementById("sidebar");
  var toggleButton = document.getElementById("menuToggle");
  var sectionLinks = Array.prototype.slice.call(
    document.querySelectorAll(".section-nav a[href^='#']")
  );

  if (toggleButton && sidebar) {
    toggleButton.addEventListener("click", function () {
      var isOpen = sidebar.classList.toggle("is-open");
      toggleButton.setAttribute("aria-expanded", String(isOpen));
    });

    // Close mobile sidebar after selecting an internal section link.
    sectionLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        sidebar.classList.remove("is-open");
        toggleButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (!sectionLinks.length || !("IntersectionObserver" in window)) {
    return;
  }

  var observedSections = sectionLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      return id ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  var activeById = function (id) {
    sectionLinks.forEach(function (link) {
      var isMatch = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", isMatch);
    });
  };

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          activeById(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.1
    }
  );

  observedSections.forEach(function (section) {
    observer.observe(section);
  });
})();

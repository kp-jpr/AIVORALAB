(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  var links = nav.querySelectorAll("a");
  var year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.querySelectorAll('a[href="#top"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  });

  var sections = Array.prototype.map.call(links, function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  function markActive() {
    var current = null;
    var line = window.scrollY + 140;
    sections.forEach(function (section) {
      if (section.offsetTop <= line) {
        current = section;
      }
    });
    links.forEach(function (link) {
      var active = current && link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("is-active", Boolean(active));
    });
  }

  markActive();
  window.addEventListener("scroll", markActive, { passive: true });
})();

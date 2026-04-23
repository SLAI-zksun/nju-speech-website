(function () {
  function initAboutScrollspy() {
    var root = document.getElementById("about-lab");
    var sidebar = document.getElementById("about-sidebar");
    if (!root || !sidebar) return;

    var links = Array.prototype.slice.call(sidebar.querySelectorAll('a[href*="#"]'));
    if (!links.length) return;

    var idToLink = {};
    links.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      var hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      var id = href.slice(hashIndex + 1);
      if (!id) return;
      idToLink[id] = a;
    });

    var sectionIds = Object.keys(idToLink);
    if (!sectionIds.length) return;

    var sections = sectionIds
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!sections.length) return;

    function setActive(id) {
      links.forEach(function (a) {
        a.classList.remove("active");
      });
      var link = idToLink[id];
      if (link) link.classList.add("active");
    }

    function pickActiveId() {
      var focusY = window.innerHeight * 0.28;
      var bestId = sectionIds[0];
      var bestDist = Infinity;

      for (var i = 0; i < sections.length; i++) {
        var el = sections[i];
        if (!el || !el.id) continue;
        var rect = el.getBoundingClientRect();
        var top = rect.top;
        var dist = Math.abs(top - focusY);
        if (top <= focusY + 1 && dist < bestDist) {
          bestDist = dist;
          bestId = el.id;
        }
      }

      // If we're below the last section, keep the last one highlighted.
      var last = sections[sections.length - 1];
      if (last) {
        var lastRect = last.getBoundingClientRect();
        if (lastRect.top < focusY && lastRect.bottom < window.innerHeight * 0.55) {
          bestId = last.id;
        }
      }

      return bestId;
    }

    function syncFromHash() {
      var hash = (window.location.hash || "").replace("#", "");
      if (hash && idToLink[hash]) {
        setActive(hash);
        return;
      }
      setActive(pickActiveId());
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        syncFromHash();
      });
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function () {
          syncFromHash();
        },
        {
          root: null,
          threshold: [0, 0.08, 0.2, 0.35, 0.55, 0.75, 1],
          rootMargin: "-18% 0px -55% 0px",
        }
      );
      sections.forEach(function (el) {
        observer.observe(el);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", syncFromHash);

    syncFromHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAboutScrollspy);
  } else {
    initAboutScrollspy();
  }
})();

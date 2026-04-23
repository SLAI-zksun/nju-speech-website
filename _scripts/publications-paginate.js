(function () {
  const PAGE_SIZE = 20;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function safeHref(u) {
    var s = String(u || "").trim();
    if (!/^https?:\/\//i.test(s)) return "#";
    return s.replace(/"/g, "%22");
  }

  function cardHtml(item) {
    const title = escapeHtml(item.title || "");
    const authors = escapeHtml(item.authors || "");
    const keywordsZh = escapeHtml(item.keywords || "");
    const keywordsEn = escapeHtml(item.keywords_en || item.keywords || "");
    const venue = escapeHtml(item.venue || "");
    const date = escapeHtml(item.date || "");
    const link = safeHref(item.link);
    return (
      '<article class="publication-card">' +
      '<div class="publication-main">' +
      "<h3>" +
      title +
      "</h3>" +
      '<p><strong><span class="lang-zh">作者</span><span class="lang-en">Authors</span>:</strong> ' +
      authors +
      "</p>" +
      '<p><strong><span class="lang-zh">关键词</span><span class="lang-en">Keywords</span>:</strong> ' +
      '<span class="lang-zh">' +
      keywordsZh +
      '</span><span class="lang-en">' +
      keywordsEn +
      "</span>" +
      "</p>" +
      '<p><strong><span class="lang-zh">发表会议/期刊</span><span class="lang-en">Venue</span>:</strong> ' +
      venue +
      "</p>" +
      "</div>" +
      '<div class="publication-meta">' +
      '<p><strong><span class="lang-zh">时间</span><span class="lang-en">Date</span>:</strong><br>' +
      date +
      "</p>" +
      '<p><a href="' +
      link +
      '" target="_blank" rel="noopener noreferrer"><span class="lang-zh">论文链接</span><span class="lang-en">Paper Link</span></a></p>' +
      "</div>" +
      "</article>"
    );
  }

  function init() {
    const root = document.getElementById("pub-app");
    const snap = document.getElementById("pub-snapshot");
    if (!root || !snap) return;

    let all = [];
    try {
      all = JSON.parse(snap.textContent || "[]");
    } catch (e) {
      return;
    }

    all.sort(function (a, b) {
      const ka = Number(a.sort_key) || 0;
      const kb = Number(b.sort_key) || 0;
      if (kb !== ka) return kb - ka;
      return String(a.title || "").localeCompare(String(b.title || ""));
    });

    const years = [];
    const seen = {};
    for (let i = 0; i < all.length; i++) {
      const y = all[i].year;
      if (y != null && !seen[y]) {
        seen[y] = true;
        years.push(y);
      }
    }
    years.sort(function (a, b) {
      return b - a;
    });

    let yearFilter = "";
    let query = "";
    let page = 1;

    const listEl = root.querySelector("#pub-list");
    const pagEl = root.querySelector("#pub-pag");
    const countEl = root.querySelector("#pub-count");
    const yearSel = root.querySelector("#pub-year-filter");
    const searchInp = root.querySelector("#pub-search");

    if (!listEl || !pagEl || !yearSel || !searchInp) return;

    function syncSearchPlaceholder() {
      const lang = document.documentElement.getAttribute("data-lang") || "zh";
      var ph =
        lang === "en"
          ? searchInp.getAttribute("data-placeholder-en")
          : searchInp.getAttribute("data-placeholder-zh");
      if (ph) searchInp.setAttribute("placeholder", ph);
    }

    syncSearchPlaceholder();
    try {
      new MutationObserver(syncSearchPlaceholder).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-lang"],
      });
    } catch (e) {
      /* ignore */
    }

    for (let y = 0; y < years.length; y++) {
      const opt = document.createElement("option");
      opt.value = String(years[y]);
      opt.textContent = String(years[y]);
      yearSel.appendChild(opt);
    }

    function filtered() {
      const q = query.trim().toLowerCase();
      return all.filter(function (item) {
        if (yearFilter && String(item.year) !== yearFilter) return false;
        if (!q) return true;
        const hay = [item.title, item.authors, item.keywords, item.keywords_en, item.venue, item.date]
          .join(" ")
          .toLowerCase();
        return hay.indexOf(q) !== -1;
      });
    }

    function render() {
      const items = filtered();
      const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
      if (page > totalPages) page = totalPages;
      if (page < 1) page = 1;
      const start = (page - 1) * PAGE_SIZE;
      const slice = items.slice(start, start + PAGE_SIZE);

      const frag = document.createDocumentFragment();
      for (let i = 0; i < slice.length; i++) {
        const wrap = document.createElement("div");
        wrap.innerHTML = cardHtml(slice[i]);
        frag.appendChild(wrap.firstElementChild);
      }
      listEl.innerHTML = "";
      listEl.appendChild(frag);

      if (countEl) {
        countEl.innerHTML =
          '<span class="lang-zh">共 ' +
          items.length +
          " 篇，当前第 " +
          page +
          " / " +
          totalPages +
          " 页</span>" +
          '<span class="lang-en">' +
          items.length +
          " papers · page " +
          page +
          " of " +
          totalPages +
          "</span>";
      }

      pagEl.innerHTML = "";
      if (totalPages <= 1) return;

      function addBtn(labelZh, labelEn, targetPage, disabled, primary) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "pub-page-btn" + (primary ? " pub-page-btn--primary" : "");
        b.disabled = !!disabled;
        b.innerHTML =
          '<span class="lang-zh">' + labelZh + '</span><span class="lang-en">' + labelEn + "</span>";
        b.addEventListener("click", function () {
          page = targetPage;
          render();
          root.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        pagEl.appendChild(b);
      }

      addBtn("上一页", "Previous", page - 1, page <= 1, false);

      const maxShown = 7;
      let lo = 1;
      let hi = totalPages;
      if (totalPages > maxShown) {
        lo = Math.max(1, page - 3);
        hi = Math.min(totalPages, lo + maxShown - 1);
        if (hi - lo < maxShown - 1) lo = Math.max(1, hi - maxShown + 1);
      }
      for (let p = lo; p <= hi; p++) {
        addBtn(String(p), String(p), p, p === page, p === page);
      }

      addBtn("下一页", "Next", page + 1, page >= totalPages, false);
    }

    yearSel.addEventListener("change", function () {
      yearFilter = yearSel.value;
      page = 1;
      render();
    });

    searchInp.addEventListener("input", function () {
      query = searchInp.value;
      page = 1;
      render();
    });

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

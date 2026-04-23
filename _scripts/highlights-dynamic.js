(function () {
  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function safeHref(u) {
    var s = String(u || "").trim();
    if (!s) return "#";
    if (/^https?:\/\//i.test(s) || /^mailto:/i.test(s)) return s.replace(/"/g, "%22");
    return "#";
  }

  function parseDateKey(v) {
    var s = String(v || "").trim();
    var m = s.match(/^(\d{2,4})-(\d{1,2})-(\d{1,2})$/);
    if (!m) return 0;
    var y = Number(m[1]);
    var mm = Number(m[2]);
    var dd = Number(m[3]);
    if (y < 100) y += 2000;
    if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return 0;
    return y * 10000 + mm * 100 + dd;
  }

  function linkOpenAttrs(url) {
    var safe = safeHref(url);
    if (/^mailto:/i.test(safe)) {
      return 'href="' + safe + '"';
    }
    return 'href="' + safe + '" target="_blank" rel="noopener noreferrer"';
  }

  function homeRowHtml(item) {
    var titleZh = escapeHtml(item.title_zh);
    var titleEn = escapeHtml(item.title_en || item.title_zh);
    var date = escapeHtml(item.date || "");
    var url = item.url || "";
    return (
      '<li class="home-highlights-item">' +
      '<span class="home-highlights-date">' +
      date +
      "</span>" +
      "<a class=\"home-highlights-link\" " +
      linkOpenAttrs(url) +
      ">" +
      '<span class="lang-zh">' +
      titleZh +
      "</span>" +
      '<span class="lang-en">' +
      titleEn +
      "</span></a></li>"
    );
  }

  function cardHtml(item) {
    var titleZh = escapeHtml(item.title_zh);
    var titleEn = escapeHtml(item.title_en || item.title_zh);
    var keywordsZh = escapeHtml(item.keywords_zh || "");
    var keywordsEn = escapeHtml(item.keywords_en || item.keywords_zh || "");
    var summaryZh = escapeHtml(item.summary_zh || "");
    var summaryEn = escapeHtml(item.summary_en || item.summary_zh || "");
    var date = escapeHtml(item.date || "");
    var url = safeHref(item.url);

    var summary = "";
    if (summaryZh || summaryEn) {
      summary =
        '<p class="news-card-summary"><span class="lang-zh">' +
        summaryZh +
        '</span><span class="lang-en">' +
        summaryEn +
        "</span></p>";
    }

    return (
      '<article class="news-card">' +
      '<div class="news-card-head"><div class="news-card-titles">' +
      "<h3><a href=\"" +
      url +
      '" target="_blank" rel="noopener noreferrer"><span class="lang-zh">' +
      titleZh +
      '</span><span class="lang-en">' +
      titleEn +
      "</span></a></h3>" +
      '<div class="news-card-meta"><span class="news-card-date">' +
      date +
      '</span><span class="news-card-keywords"><span class="lang-zh">' +
      keywordsZh +
      '</span><span class="lang-en">' +
      keywordsEn +
      "</span></span></div></div></div>" +
      summary +
      "</article>"
    );
  }

  function loadMergedHighlights(newsNode, annNode) {
    var news = [];
    var ann = [];
    try {
      news = JSON.parse(newsNode.textContent || "[]");
      ann = JSON.parse(annNode.textContent || "[]");
    } catch (e) {
      return [];
    }
    var merged = news.concat(ann);
    merged.sort(function (a, b) {
      var ka = parseDateKey(a.date);
      var kb = parseDateKey(b.date);
      if (kb !== ka) return kb - ka;
      return Number(b.sort_key || 0) - Number(a.sort_key || 0);
    });
    return merged;
  }

  function initBlogHighlights() {
    var list = document.getElementById("highlights-list");
    var newsNode = document.getElementById("highlights-news-data");
    var annNode = document.getElementById("highlights-ann-data");
    if (!list || !newsNode || !annNode) return;

    var merged = loadMergedHighlights(newsNode, annNode);
    var top = merged.slice(0, 5);
    list.innerHTML = top.map(cardHtml).join("");
  }

  function initHomeHighlights() {
    var list = document.getElementById("home-highlights-list");
    var newsNode = document.getElementById("home-highlights-news-data");
    var annNode = document.getElementById("home-highlights-ann-data");
    if (!list || !newsNode || !annNode) return;

    var merged = loadMergedHighlights(newsNode, annNode);
    var top = merged.slice(0, 5);
    if (!top.length) {
      list.innerHTML =
        '<li class="home-highlights-item home-highlights-empty"><span class="lang-zh">暂无条目</span><span class="lang-en">No items yet</span></li>';
      return;
    }
    list.innerHTML = top.map(homeRowHtml).join("");
  }

  function initHighlights() {
    initBlogHighlights();
    initHomeHighlights();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHighlights);
  } else {
    initHighlights();
  }
})();

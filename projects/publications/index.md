---
title: 论文发表
---

<div class="people-layout">
  {% include results-sidebar.html active="publications" %}
  <div class="people-content">
    <section>
      <h2><span class="lang-zh">论文发表</span><span class="lang-en">Publications</span></h2>
      <div id="pub-app" class="pub-app">
        <div class="pub-toolbar">
          <div class="pub-field">
            <label class="pub-label" for="pub-year-filter"><span class="lang-zh">年份</span><span class="lang-en">Year</span></label>
            <select id="pub-year-filter" class="pub-select" aria-label="Filter by year">
              <option value="">全部 · All years</option>
            </select>
          </div>
          <div class="pub-field pub-field--grow">
            <label class="pub-label" for="pub-search"><span class="lang-zh">关键词</span><span class="lang-en">Keyword</span></label>
            <input id="pub-search" class="pub-search" type="search" autocomplete="off" data-placeholder-zh="标题 / 作者 / 关键词 / 会议期刊" data-placeholder-en="Title, authors, keywords, venue…" />
          </div>
        </div>
        <p id="pub-count" class="pub-count" aria-live="polite"></p>
        <div id="pub-list" class="result-grid"></div>
        <nav id="pub-pag" class="pub-pagination" aria-label="Publication pages"></nav>
      </div>
      <script type="application/json" id="pub-snapshot">{{ site.data.publications_cards | jsonify | replace: "<", "\u003c" }}</script>
    </section>
  </div>
</div>

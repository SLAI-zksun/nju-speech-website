---
title: 新闻公告
nav:
  order: 3
  label_zh: 新闻公告
  label_en: News
  tooltip_zh: 新闻公告
  tooltip_en: News
---

<div class="people-layout">
  {% include blog-sidebar.html active="highlights" %}
  <div class="people-content">
    <section>
      <h2><span class="lang-zh">近期要事</span><span class="lang-en">Highlights</span></h2>
      <div id="highlights-list" class="news-card-grid"></div>
      <script type="application/json" id="highlights-news-data">{{ site.data.lab_news | jsonify | replace: "<", "\u003c" }}</script>
      <script type="application/json" id="highlights-ann-data">{{ site.data.lab_announcements | jsonify | replace: "<", "\u003c" }}</script>
    </section>
  </div>
</div>

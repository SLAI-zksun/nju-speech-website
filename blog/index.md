---
<<<<<<< HEAD
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
=======
title: Blog
nav:
  order: 4
  tooltip: Musings and miscellany
---

# {% include icon.html icon="fa-solid fa-feather-pointed" %}Blog

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

{% include section.html %}

{% include search-box.html %}

{% include tags.html tags=site.tags %}

{% include search-info.html %}

{% include list.html data="posts" component="post-excerpt" %}
>>>>>>> d918d4afcce502f2ccbff1fea67cd340873e3154

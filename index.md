---
<<<<<<< HEAD
title: 首页
show_footer_wechat: true
wechat_qr_image: requirements/v1/figs/QRcode.png
wechat_official_url: "https://mp.weixin.qq.com/s/KWmW7NiwyTv1qSsIF7mtYA"
nav:
  order: 1
  label_zh: 首页
  label_en: Home
  tooltip_zh: 实验室首页
  tooltip_en: Home
---

# <span class="lang-zh">nju-speech 实验室</span><span class="lang-en">nju-speech Lab</span>

<div class="hero-card">
<p class="lang-zh"><strong>nju-speech（Smart Group）</strong> 是南京大学智能科学与技术学院语音、音乐与音频技术研究团队，负责人为王帅副教授（NJU 与 SLAI 联合招生）。实验室围绕说话人建模、目标说话人处理、语音/音乐生成与语音大模型开展系统性研究。</p>
<p class="lang-en"><strong>nju-speech (Smart Group)</strong> is a speech, music, and audio technology research group at Nanjing University, led by Associate Professor Shuai Wang (joint recruitment with SLAI). We focus on speaker modeling, target speaker processing, speech/music generation, and speech large language models.</p>
</div>

{% include section.html %}

## <span class="lang-zh">重点信息</span><span class="lang-en">Highlights</span>

<div class="info-grid">
  <div class="info-box">
    <h3><span class="lang-zh">实验室定位</span><span class="lang-en">Mission</span></h3>
    <p class="lang-zh">建设面向真实应用场景的语音智能技术体系，兼顾学术前沿与工程落地。</p>
    <p class="lang-en">Build speech intelligence that bridges frontier research and real-world deployment.</p>
  </div>
  <div class="info-box">
    <h3><span class="lang-zh">联合招生</span><span class="lang-en">Joint Recruitment</span></h3>
    <p class="lang-zh">团队由王帅老师负责，在 NJU 与 SLAI 开展联合指导与项目合作。</p>
    <p class="lang-en">The lab is led by Shuai Wang with joint mentoring and collaborations across NJU and SLAI.</p>
  </div>
  <div class="info-box">
    <h3><span class="lang-zh">研究范围</span><span class="lang-en">Scope</span></h3>
    <p class="lang-zh">覆盖语音理解、语音生成、音乐生成、目标说话人提取、多模态融合等方向。</p>
    <p class="lang-en">Our scope includes speech understanding and generation, music generation, target speaker extraction, and multimodal learning.</p>
  </div>
</div>

{% include section.html %}

## <span class="lang-zh">近期新闻</span><span class="lang-en">Recent News</span>

<ul id="home-highlights-list" class="home-highlights-list"></ul>
<p class="home-highlights-more">
  <a href="{{ '/blog/' | relative_url }}"><span class="lang-zh">查看全部</span><span class="lang-en">View all</span></a>
</p>
<script type="application/json" id="home-highlights-news-data">{{ site.data.lab_news | jsonify | replace: "<", "\u003c" }}</script>
<script type="application/json" id="home-highlights-ann-data">{{ site.data.lab_announcements | jsonify | replace: "<", "\u003c" }}</script>

{% include section.html %}

## <span class="lang-zh">快速入口</span><span class="lang-en">Quick Links</span>

<div class="lang-zh">
{% include button.html link="contact" text="实验室简介" icon="fa-solid fa-circle-info" %}
{% include button.html link="blog" text="新闻公告" icon="fa-regular fa-newspaper" %}
{% include button.html link="team" text="实验室人员" icon="fa-solid fa-users" %}
{% include button.html link="research" text="研究方向" icon="fa-solid fa-compass" %}
{% include button.html link="projects" text="研究成果" icon="fa-solid fa-book-open" %}
{% include button.html link="contact-us" text="联系我们" icon="fa-solid fa-address-card" %}
</div>

<div class="lang-en">
{% include button.html link="contact" text="About" icon="fa-solid fa-circle-info" %}
{% include button.html link="blog" text="News" icon="fa-regular fa-newspaper" %}
{% include button.html link="team" text="People" icon="fa-solid fa-users" %}
{% include button.html link="research" text="Research Directions" icon="fa-solid fa-compass" %}
{% include button.html link="projects" text="Publications" icon="fa-solid fa-book-open" %}
{% include button.html link="contact-us" text="Contact" icon="fa-solid fa-address-card" %}
</div>
=======
---

# SLAI-zksun's Website

An engaging 1-3 sentence description of your lab.

{% include section.html %}

## Highlights

{% capture text %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{%
  include button.html
  link="research"
  text="See our publications"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/photo.jpg"
  link="research"
  title="Our Research"
  text=text
%}

{% capture text %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{%
  include button.html
  link="projects"
  text="Browse our projects"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/photo.jpg"
  link="projects"
  title="Our Projects"
  flip=true
  style="bare"
  text=text
%}

{% capture text %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{%
  include button.html
  link="team"
  text="Meet our team"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/photo.jpg"
  link="team"
  title="Our Team"
  text=text
%}
>>>>>>> d918d4afcce502f2ccbff1fea67cd340873e3154

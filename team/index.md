---
<<<<<<< HEAD
title: 实验室人员
nav:
  order: 4
  label_zh: 实验室人员
  label_en: People
  tooltip_zh: 实验室人员
  tooltip_en: People
---
<div class="people-layout">
  {% include people-sidebar.html active="faculty" %}

  <div class="people-content">
    <section>
      <h2><span class="lang-zh">教师</span><span class="lang-en">Faculty</span></h2>
      <div class="member-grid">
        <article class="member-card">
          <div class="member-card-media"><span class="lang-zh">照片占位符</span><span class="lang-en">Photo Placeholder</span></div>
          <div class="member-card-body">
            <div class="member-card-heading">
              <h3><span class="lang-zh">王帅</span><span class="lang-en">Shuai Wang</span></h3>
              <a class="member-homepage" href="https://shuaiwang-nju.github.io/" target="_blank" rel="noopener noreferrer"><span class="lang-zh">个人主页</span><span class="lang-en">Homepage</span></a>
            </div>
            <p><span class="lang-zh">王帅，南京大学智能科学与技术学院准聘副教授，博士生导师，CCF语音对话及听觉专业委员会执行委员。专注于智能音频信号处理研究，涵盖语音、音频事件及音乐等多模态声学信号。2014年本科毕业于西北工业大学，2020年于上海交通大学获博士学位。曾任深圳市大数据研究院副研究员与李海洲教授联合培养博士生；亦曾任腾讯光子工作室高级研究员，领导团队负责面向游戏场景的语音技术的研发与应用。以第一作者或通讯作者在ICASSP、Interspeech等顶级会议期刊发表论文四十余篇，获授权专利十余项。荣获VoxSRC2019、DIHARD2019等国际竞赛冠军及ISCSLP2024最佳论文、最佳学生论文奖。发起开源工具WeSpeaker与WeSep，提供的预训练模型在HuggingFace平台下载量月均超千万次，在学术界与工业界获得广泛应用。目前主持国家自然科学基金青年项目、长三角科技创新共同体联合攻关项目子课题、人工智能教育部重点实验室开放课题及CCF-网易雷火创新基金等多项科研项目。与国内外知名企业及科研院所保持密切合作与交流，积极推荐学生赴腾讯、字节跳动、网易、Meta FAIR等业界头部企业实习，部分学生成功入选腾讯犀牛鸟、字节跳动TopSeed等精英人才计划。</span><span class="lang-en">Shuai Wang is a Tenure-Track Associate Professor at the School of Intelligence Science and Technology, Nanjing University, and the lead of this lab, with ongoing adjunct research collaboration at the Shenzhen Research Institute of Big Data. His research focuses on speaker modeling, target speaker processing, speech synthesis, voice conversion, and music generation. He has continuously published in top-tier speech venues and leads the team to bridge frontier research with practical deployment.</span></p>
          </div>
        </article>
      </div>
    </section>
  </div>
</div>
=======
title: Team
nav:
  order: 3
  tooltip: About our team
---

# {% include icon.html icon="fa-solid fa-users" %}Team

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

{% include section.html %}

{% include list.html data="members" component="portrait" filter="role == 'pi'" %}
{% include list.html data="members" component="portrait" filter="role != 'pi'" %}

{% include section.html background="images/background.jpg" dark=true %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

{% include section.html %}

{% capture content %}

{% include figure.html image="images/photo.jpg" %}
{% include figure.html image="images/photo.jpg" %}
{% include figure.html image="images/photo.jpg" %}

{% endcapture %}

{% include grid.html style="square" content=content %}
>>>>>>> d918d4afcce502f2ccbff1fea67cd340873e3154

(function () {
  function initWechatDialog() {
    var dlg = document.getElementById("lab-wechat-dialog");
    var openBtn = document.querySelector("[data-wechat-dialog-open]");
    if (!dlg || !openBtn || typeof dlg.showModal !== "function") return;

    openBtn.addEventListener("click", function () {
      dlg.showModal();
    });

    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) dlg.close();
    });

    dlg.querySelectorAll("[data-wechat-dialog-close]").forEach(function (el) {
      el.addEventListener("click", function () {
        dlg.close();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWechatDialog);
  } else {
    initWechatDialog();
  }
})();

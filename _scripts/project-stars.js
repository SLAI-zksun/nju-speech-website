(function () {
  function formatCount(n) {
    if (!Number.isFinite(n)) return "--";
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return String(n);
  }

  function fillStars() {
    var nodes = document.querySelectorAll(".project-stars[data-repo]");
    if (!nodes.length) return;

    nodes.forEach(function (node) {
      var repo = node.getAttribute("data-repo");
      var countNode = node.querySelector(".project-stars-count");
      if (!repo || !countNode) return;

      fetch("https://api.github.com/repos/" + repo, { headers: { Accept: "application/vnd.github+json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("request failed");
          return res.json();
        })
        .then(function (json) {
          countNode.textContent = formatCount(Number(json.stargazers_count));
        })
        .catch(function () {
          countNode.textContent = "--";
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fillStars);
  } else {
    fillStars();
  }
})();

(function () {
  try {
    var mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", function (e) {
      var persisted = localStorage.getItem("theme");
      if (persisted === "light" || persisted === "dark") return; // user override
      var root = document.documentElement;
      if (e.matches) root.classList.add("dark");
      else root.classList.remove("dark");
      root.style.colorScheme = e.matches ? "dark" : "light";
    });
    // Optional: expose a tiny API to toggle theme manually
    window.__setTheme = function (mode) {
      var root = document.documentElement;
      if (mode === "system") {
        localStorage.removeItem("theme");
        mode = mql.matches ? "dark" : "light";
      }
      if (mode === "dark") {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
        root.style.colorScheme = "light";
      }
    };
  } catch (_) {
    /* no-op */
  }
})();

(function () {
  var STYLE_ID = "page-transition-style";
  var OVERLAY_ID = "page-transition-overlay";

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = ""
      + "#" + OVERLAY_ID + " {"
      + "position: fixed;"
      + "inset: 0;"
      + "z-index: 99999;"
      + "display: flex;"
      + "align-items: center;"
      + "justify-content: center;"
      + "background: #0a0a0b;"
      + "opacity: 1;"
      + "visibility: visible;"
      + "transition: opacity 320ms ease, visibility 320ms ease;"
      + "}"
      + "#" + OVERLAY_ID + ".is-hidden {"
      + "opacity: 0;"
      + "visibility: hidden;"
      + "pointer-events: none;"
      + "}"
      + "#" + OVERLAY_ID + " .pt-spinner {"
      + "width: 34px;"
      + "height: 34px;"
      + "border-radius: 50%;"
      + "border: 3px solid rgba(255,255,255,0.2);"
      + "border-top-color: #ffffff;"
      + "animation: pt-spin 0.8s linear infinite;"
      + "}"
      + "@keyframes pt-spin {"
      + "to { transform: rotate(360deg); }"
      + "}"
      + "body.pt-leaving { overflow: hidden; }";

    document.head.appendChild(style);
  }

  function buildOverlay() {
    var existing = document.getElementById(OVERLAY_ID);
    if (existing) {
      return existing;
    }

    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.setAttribute("aria-hidden", "true");

    var spinner = document.createElement("div");
    spinner.className = "pt-spinner";

    overlay.appendChild(spinner);
    document.body.appendChild(overlay);

    return overlay;
  }

  function hideOverlay(overlay) {
    window.requestAnimationFrame(function () {
      overlay.classList.add("is-hidden");
    });
  }

  function shouldHandleLink(link, event) {
    if (!link || event.defaultPrevented) {
      return false;
    }

    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return false;
    }

    if (link.target && link.target !== "_self") {
      return false;
    }

    if (link.hasAttribute("download")) {
      return false;
    }

    var href = link.getAttribute("href");
    if (!href || href.indexOf("#") === 0 || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0 || href.indexOf("javascript:") === 0) {
      return false;
    }

    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (error) {
      return false;
    }

    if (url.origin !== window.location.origin) {
      return false;
    }

    if (url.href === window.location.href) {
      return false;
    }

    return true;
  }

  function initTransitions(overlay) {
    document.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (!shouldHandleLink(link, event)) {
        return;
      }

      event.preventDefault();
      document.body.classList.add("pt-leaving");
      overlay.classList.remove("is-hidden");

      window.setTimeout(function () {
        window.location.href = link.href;
      }, 260);
    });
  }

  function init() {
    injectStyle();
    var overlay = buildOverlay();

    window.addEventListener("load", function () {
      hideOverlay(overlay);
    });

    window.addEventListener("pageshow", function () {
      hideOverlay(overlay);
      document.body.classList.remove("pt-leaving");
    });

    initTransitions(overlay);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());

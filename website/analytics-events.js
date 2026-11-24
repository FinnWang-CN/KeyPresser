/* Optional website event bridge. No storage, network calls or trackers by default.
 * A site owner may explicitly register a consent-aware analytics adapter.
 * Never pass recording contents, account details, full URLs or query strings. */
(function () {
  "use strict";
  document.addEventListener("click", function (event) {
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!link) return;
    const href = link.getAttribute("href");
    let name;
    if (/github\.com\/FinnWang-CN\/KeyPresser\/releases\/download\//i.test(href) ||
        (link.classList.contains("download-btn") && /feijipan\.com|pan\.baidu\.com/i.test(href))) name = "download_click";
    else if (/^(?:\.\/)?pricing\.html(?:#.*)?$/.test(href)) name = "pricing_click";
    else if (/#download$/.test(href)) name = "download_section_click";
    if (name) document.dispatchEvent(new CustomEvent("keypresser:analytics", {detail: {name: name, language: document.documentElement.lang === "en" ? "en" : "zh-CN"}}));
  });
}());

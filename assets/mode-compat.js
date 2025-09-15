/* assets/mode-compat.js */
(function(){
  var ROOT = document.documentElement;
  var K1 = "tsn:mode";
  var K2 = "tsn_mode"; // legacy
  function norm(v){
    v = String(v || "").toLowerCase();
    if (v === "editor" || v === "edit") return "editor";
    if (v === "viewer" || v === "view" || v === "user") return "viewer";
    return "viewer";
  }
  try {
    var fromLS = localStorage.getItem(K1) || localStorage.getItem(K2);
    var fromAttr = ROOT.getAttribute("data-mode");
    var mode = norm(fromLS || fromAttr || "viewer");
    ROOT.setAttribute("data-mode", mode);
    localStorage.setItem(K1, mode);
    if (localStorage.getItem(K2)) localStorage.removeItem(K2);
  } catch(_) {
    var mode = norm(ROOT.getAttribute("data-mode") || "viewer");
    ROOT.setAttribute("data-mode", mode);
  }
})();
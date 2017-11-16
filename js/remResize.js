!function(c) {
    function b() {
        var e = d.clientWidth,
        f = "}"; ! navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && e > 1024 && (e = 640, f = ";max-width:" + e + "px;margin-right:auto!important;margin-left:auto!important;}"),
        c.rem = e / 10,
        /ZTE U930_TD/.test(navigator.userAgent) && (c.rem = 1.13 * c.rem),
        /Android\s+4\.4\.4;\s+M351\s/.test(navigator.userAgent) && (c.rem = c.rem / 1.05),
        a.innerHTML = "html{font-size:" + c.rem + "px!important;}body{font-size:" + 12 * (e / 320) + "px" + f
    }
    var d = document.documentElement,
    a = document.createElement("style");
    d.firstElementChild.appendChild(a),
    c.addEventListener("resize",function() {
        b()
    },!1),
    c.addEventListener("pageshow", function(f) {
        f.persisted && b()
    },!1),
    b()
} (window);
!function() {
    if (window.devicePixelRatio && devicePixelRatio >= 2) {
        var c = document.documentElement,
        b = document.createElement("div"),
        a = document.createElement("body"),
        f = c.firstElementChild || c.firstChild;
        b.style.border = ".5px solid transparent",
        a.appendChild(b),
        c.insertBefore(a, f),
        1 == b.offsetHeight && document.querySelector("html").classList.add("hairlines"),
        c.removeChild(a)
    }
}();
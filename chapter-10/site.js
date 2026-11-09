// District 214 Accounting, Chapter 10: sidebar, mobile menu and text size for the Bond Desk Solo page.
// Matches the sidebar on the rest of the Accounting site. To add a page to the menu, add it to NAV below. The page's <body data-page="..."> marks it as current.
(function () {
  var NAV = [
    { group: "Live Class Games" },
    { href: "/chapter-10/join", ch: "10", label: "The Bond Desk", page: "bond-desk-join" },
    { href: "/paper-airplane", ch: "9", label: "Paper Airplane Inc." },
    { href: "/credit-desk", ch: "7", label: "The Credit Desk" },
    { href: "/receivables-live", ch: "7", label: "Receivables Live" },
    { href: "/note-desk", ch: "7", label: "The Note Desk" },
    { href: "/notes-live", ch: "7", label: "Notes Live" },
    { href: "/review-live", ch: "6", label: "Review Live" },
    { href: "/bank-rec-live", ch: "6", label: "Bank Rec Live" },
    { href: "/controls-live", ch: "6", label: "Controls Live" },
    { href: "/inside-job", ch: "6", label: "Inside Job" },
    { href: "/two-books-live", ch: "4", label: "Two Books Live" },
    { group: "Review Games" },
    { href: "/chapter-9", ch: "9", label: "Repair or Replace" },
    { href: "/chapter-7", ch: "7", label: "Collect or Write Off" },
    { href: "/chapter-7-notes", ch: "7", label: "Principal Plus Interest" },
    { href: "/chapter-6", ch: "6", label: "Make It Match" },
    { href: "/chapter-5", ch: "5", label: "Same Goods, Three Costs" },
    { href: "/chapter-4", ch: "4", label: "Same Deal, Two Books" },
    { group: "Interactive Practices" },
    { sub: "Chapter 10" },
    { href: "/chapter-10/practice-bond-desk", ch: "10", label: "Bond Desk Solo", page: "practice-bond-desk" },
    { sub: "Chapter 9" },
    { href: "/practice-ch9-warranty-sim", ch: "9", label: "Warranty Simulation" },
    { href: "/practice-ch9-warranties", ch: "9", label: "Warranty Practice" },
    { sub: "Chapter 7" },
    { href: "/practice-ch7-sim", ch: "7", label: "Receivables Simulation" },
    { href: "/practice-ch7-bad-debts", ch: "7", label: "Bad Debts Practice" },
    { href: "/practice-ch7-notes", ch: "7", label: "Notes Receivable Practice" },
    { sub: "Chapter 6" },
    { href: "/practice-ch6-bank-rec", ch: "6", label: "Bank Rec Practice" },
    { href: "/practice-ch6-side-by-side", ch: "6", label: "Side-by-Side Recs" },
    { sub: "Chapter 5" },
    { href: "/practice-ch5-set-1", ch: "5", label: "Practice Problem Set 1" },
    { href: "/practice-ch5-weighted-average", ch: "5", label: "Weighted Average" },
    { sub: "Chapter 4" },
    { href: "/practice-ch4-round-1", ch: "4", label: "Problem Set Round 1" },
    { href: "/practice-ch4-round-2", ch: "4", label: "Problem Set Round 2" },
    { sub: "Chapter 3" },
    { href: "/practice-ch3-adjusting", ch: "3", label: "Adjusting Entries" },
    { href: "/practice-ch3-depr-closing", ch: "3", label: "Depreciation and Closing Entries" }
  ];
  var cur = document.body.getAttribute("data-page") || "";
  var links = NAV.map(function (n) {
    if (n.group) return '<div class="ng">' + n.group + "</div>";
    if (n.sub) return '<div class="nch">' + n.sub + "</div>";
    return '<a href="' + n.href + '"' + (n.page && n.page === cur ? ' aria-current="page"' : "") + '><span class="ch">' + n.ch + "</span>" + n.label + "</a>";
  }).join("");
  var shell = document.querySelector(".shell");
  if (shell) {
    shell.insertAdjacentHTML("afterbegin",
      '<div class="mbar"><a href="/"><img src="/logo-214.png" alt="High School District 214"></a><button id="menuBtn" aria-expanded="false" aria-controls="side">Menu</button></div>' +
      '<aside class="side" id="side"><a class="brandlink" href="/"><img src="/logo-214.png" alt="High School District 214"></a>' +
      '<div class="sitename">Accounting</div><nav aria-label="Site"><a class="home" href="/"' + (cur === "home" ? ' aria-current="page"' : "") + '><span class="ch">⌂</span>Home</a>' + links + "</nav>" +
      '<div class="sidefoot">High School District 214 | Accounting</div></aside><div class="scrim" id="scrim"></div>');
    var s = document.getElementById("side"), b = document.getElementById("menuBtn"), c = document.getElementById("scrim");
    var set = function (o) { s.classList.toggle("open", o); c.classList.toggle("on", o); b.setAttribute("aria-expanded", o); b.textContent = o ? "Close" : "Menu"; };
    b.addEventListener("click", function () { set(!s.classList.contains("open")); });
    c.addEventListener("click", function () { set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }
  // Text size: scales the main content, remembered across pages
  document.body.insertAdjacentHTML("beforeend",
    '<div id="tsz" role="group" aria-label="Text size"><button type="button" data-d="-1" aria-label="Smaller text">A−</button><button type="button" data-d="0" class="pct" aria-label="Reset text size">100%</button><button type="button" data-d="1" class="big" aria-label="Bigger text">A+</button></div>');
  var STEPS = [0.8, 0.9, 1, 1.1, 1.25, 1.4, 1.6, 1.8, 2], KEY = "d214-text-size", box = document.getElementById("tsz");
  var target = document.querySelector("main") || document.body, i = 2;
  try { var j = STEPS.indexOf(parseFloat(localStorage.getItem(KEY))); if (j >= 0) i = j; } catch (e) {}
  function apply() {
    var z = STEPS[i]; target.style.zoom = z;
    box.children[1].textContent = Math.round(z * 100) + "%";
    box.children[0].disabled = i === 0; box.children[2].disabled = i === STEPS.length - 1;
    try { localStorage.setItem(KEY, z); } catch (e) {}
  }
  box.addEventListener("click", function (e) { var t = e.target.closest("button"); if (!t) return; var d = +t.dataset.d; i = d === 0 ? 2 : Math.max(0, Math.min(STEPS.length - 1, i + d)); apply(); t.blur(); });
  apply();
})();

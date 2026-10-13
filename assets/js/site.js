/* Shared code for every Damye page: header, footer, icons,
   restaurant cards, accounts (Firebase) and favorites. */
(function () {
  var C = window.DAMYE_CONFIG || {};
  var D = (window.Damye = {});

  /* ---------- Icons (Lucide, MIT) ---------- */
  var ICONS = {
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    soup: '<path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M7 21h10"/><path d="M19.5 12 22 6"/><path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/><path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"/><path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"/>',
    sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    reset: '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    arrow: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    utensils: '<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>'
  };
  D.icon = function (name, cls) {
    return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  };

  /* ---------- Filters ---------- */
  D.FILTERS = [
    { key: "mustVisit", icon: "star", label: "Places you have to visit at least once" },
    { key: "local", icon: "check", label: "Local-approved favorites" },
    { key: "warm", icon: "soup", label: "Warm, home-style meals made with care and comfort" },
    { key: "cool", icon: "sparkles", label: "Go out somewhere cool tonight" },
    { key: "hot", icon: "flame", label: "The hottest spots right now" },
    { key: "insta", icon: "instagram", label: "Perfect for your Instagram feed" },
    { key: "wallet", icon: "wallet", label: "Light on your wallet, full on your stomach" },
    { key: "solo", icon: "user", label: "Quiet spots perfect for solo dining" },
    { key: "late", icon: "moon", label: "Open late for night cravings" },
    { key: "date", icon: "heart", label: "Perfect places for a date" },
    { key: "music", icon: "music", label: "Places where the music sets the mood" },
    { key: "korean", icon: "pin", label: "Where can you taste real Korean food" }
  ];
  D.filterByKey = function (k) {
    for (var i = 0; i < D.FILTERS.length; i++) if (D.FILTERS[i].key === k) return D.FILTERS[i];
    return null;
  };
  /* Quiz result → filters that get switched on (restaurants.html?animal=pig) */
  D.ANIMAL_FILTERS = {
    pig: ["wallet", "late", "mustVisit"],
    bear: ["warm", "korean", "local"],
    cat: ["insta", "date", "cool"],
    fox: ["hot", "cool", "music"],
    owl: ["late", "solo", "music"],
    dog: ["mustVisit", "local", "warm"]
  };

  /* ---------- Helpers ---------- */
  D.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  D.param = function (name) { return new URLSearchParams(location.search).get(name); };
  D.restaurants = window.DAMYE_RESTAURANTS || [];
  D.byId = function (id) {
    for (var i = 0; i < D.restaurants.length; i++) if (D.restaurants[i].id === id) return D.restaurants[i];
    return null;
  };
  D.name = function (r) { return r.nameKo + (r.nameEn ? " (" + r.nameEn + ")" : ""); };
  D.price = function (r) { return new Array((r.price || 1) + 1).join("₩"); };
  D.mapsLink = function (r) {
    return r.mapsUrl || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(r.nameKo + " " + (r.nameEn || ""));
  };
  D.imageHTML = function (r) {
    return r.image
      ? '<img src="' + D.esc(r.image) + '" alt="' + D.esc(D.name(r)) + '" loading="lazy" onerror="Damye.imgFail(this)">'
      : '<div class="img-placeholder">' + D.icon("utensils") + "</div>";
  };
  /* Share a quiz result: phone share sheet → copy to clipboard → a text box to copy by hand */
  D.share = function (btn, title, text, link) {
    var full = text + " " + link;
    function flash(msg) {
      var label = btn.getAttribute("data-label") || btn.textContent;
      btn.setAttribute("data-label", label);
      btn.textContent = msg;
      clearTimeout(btn._t);
      btn._t = setTimeout(function () { btn.textContent = label; }, 2200);
    }
    function manual() {
      var host = btn.closest(".dq-actions, .db-actions") || btn.parentNode;
      var box = host.querySelector(".share-fallback");
      if (!box) {
        box = document.createElement("div");
        box.className = "share-fallback";
        box.innerHTML = '<label>Copy this message and share it:</label><textarea readonly rows="3"></textarea>';
        host.appendChild(box);
      }
      var ta = box.querySelector("textarea");
      ta.value = full; ta.focus(); ta.select();
      flash("Copy the text below");
    }
    function copy() {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(full).then(function () { flash("Link copied"); }).catch(manual);
      } else manual();
    }
    if (navigator.share) {
      navigator.share({ title: title, text: text, url: link }).catch(function (e) {
        if (e && e.name === "AbortError") return; // they closed the share sheet
        copy();
      });
    } else copy();
  };

  /* A photo that can't load is swapped for the placeholder */
  D.imgFail = function (img) {
    var d = document.createElement("div");
    d.className = "img-placeholder";
    d.innerHTML = D.icon("utensils");
    img.replaceWith(d);
  };
  /* Only allow going back to a page on this site after login */
  D.safeNext = function (next, fallback) {
    if (!next || /[:\\]|^\/\//.test(next)) return fallback;
    return next;
  };
  D.currentPageRef = function () {
    return (location.pathname.split("/").pop() || "index.html") + location.search;
  };

  /* ---------- Accounts (Firebase) ---------- */
  var fb = C.firebase || {};
  D.accountsOn = !!(window.firebase && fb.apiKey && fb.apiKey.indexOf("PASTE") !== 0 && fb.projectId);
  var currentUser = null, userKnown = false, listeners = [], favCache = null;

  if (D.accountsOn) {
    firebase.initializeApp(fb);
    D.auth = firebase.auth();
    D.db = firebase.firestore();
    D.auth.onAuthStateChanged(function (u) {
      currentUser = u; userKnown = true; favCache = null;
      try { localStorage.setItem("damye_signed_in", u ? "1" : "0"); } catch (e) {}
      updateAccountLink();
      listeners.forEach(function (f) { f(u); });
    });
  } else {
    userKnown = true;
  }
  D.user = function () { return currentUser; };
  D.onUser = function (cb) { listeners.push(cb); if (userKnown) cb(currentUser); };
  D.userDoc = function (uid) { return D.db.collection("users").doc(uid); };

  D.getFavorites = function () {
    if (!currentUser || !D.db) return Promise.resolve([]);
    if (favCache) return Promise.resolve(favCache.slice());
    return D.userDoc(currentUser.uid).get().then(function (s) {
      favCache = (s.exists && s.data().favorites) || [];
      return favCache.slice();
    }).catch(function () { return []; });
  };

  D.toggleFavorite = function (id) {
    if (!currentUser) {
      location.href = "login.html?next=" + encodeURIComponent(D.currentPageRef());
      return Promise.resolve(null);
    }
    return D.getFavorites().then(function (list) {
      var has = list.indexOf(id) > -1;
      var FV = firebase.firestore.FieldValue;
      return D.userDoc(currentUser.uid)
        .set({ favorites: has ? FV.arrayRemove(id) : FV.arrayUnion(id) }, { merge: true })
        .then(function () {
          favCache = has ? list.filter(function (x) { return x !== id; }) : list.concat([id]);
          return !has;
        });
    });
  };

  /* ---------- Hearts ---------- */
  D.heartButton = function (id) {
    return '<button type="button" class="heart" data-fav="' + D.esc(id) + '" aria-label="Save to favorites" aria-pressed="false">' + D.icon("heart") + "</button>";
  };
  D.paintHearts = function (list) {
    document.querySelectorAll(".heart[data-fav]").forEach(function (b) {
      var on = list.indexOf(b.getAttribute("data-fav")) > -1;
      b.classList.toggle("is-fav", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  };
  D.refreshHearts = function () { D.getFavorites().then(D.paintHearts); };
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".heart[data-fav]");
    if (!b) return;
    e.preventDefault();
    if (!D.accountsOn) { location.href = "login.html"; return; }
    var id = b.getAttribute("data-fav");
    b.disabled = true;
    D.toggleFavorite(id).then(function () {
      b.disabled = false;
      D.refreshHearts();
      document.dispatchEvent(new CustomEvent("damye:favorites"));
    }).catch(function () { b.disabled = false; });
  });
  D.onUser(function () { D.refreshHearts(); });

  /* ---------- Restaurant card ---------- */
  D.cardHTML = function (r) {
    var href = "restaurant.html?id=" + encodeURIComponent(r.id);
    return '<article class="r-card">' +
      '<a class="r-card-img" href="' + href + '" tabindex="-1">' + D.imageHTML(r) + "</a>" +
      '<div class="r-card-body">' +
        '<div class="r-card-head"><h3><a href="' + href + '">' + D.esc(D.name(r)) + "</a></h3>" + D.heartButton(r.id) + "</div>" +
        '<p class="r-card-desc">' + D.esc(r.desc) + "</p>" +
        '<div class="r-meta">' + D.price(r) + " · " + D.esc(r.cuisine) + "</div>" +
        (r.hours ? '<div class="r-meta">' + D.icon("clock") + "<span>" + D.esc(r.hours) + "</span></div>" : "") +
      "</div></article>";
  };

  /* ---------- Header & footer ---------- */
  function logoHTML() {
    return C.logoImage
      ? '<img src="' + D.esc(C.logoImage) + '" alt="Damye">'
      : '<span class="logo-text">Damye</span>';
  }
  function signedInGuess() {
    if (userKnown) return !!currentUser;
    try { return localStorage.getItem("damye_signed_in") === "1"; } catch (e) { return false; }
  }
  function updateAccountLink() {
    var a = document.getElementById("nav-account");
    if (!a) return;
    var inn = signedInGuess();
    a.textContent = inn ? "Profile" : "Login";
    a.href = inn ? "profile.html" : "login.html";
  }

  function renderHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;
    var page = document.body.getAttribute("data-page");
    var links = [["about", "About Us", "about.html"], ["restaurants", "Restaurants", "restaurants.html"], ["quiz", "Quiz", "quiz.html"], ["contact", "Contact", "contact.html"]];
    var html = '<div class="container header-inner">' +
      '<a class="logo" href="index.html" aria-label="Damye home">' + logoHTML() + "</a>" +
      '<button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false">' + D.icon("menu") + "</button>" +
      '<nav class="nav" aria-label="Main">';
    links.forEach(function (l) {
      html += '<a href="' + l[2] + '"' + (page === l[0] ? ' class="active" aria-current="page"' : "") + ">" + l[1] + "</a>";
    });
    html += '<a id="nav-account"' + (page === "account" ? ' class="active" aria-current="page"' : "") + "></a></nav></div>";
    el.innerHTML = html;
    updateAccountLink();
    var btn = el.querySelector(".menu-btn");
    function setMenu(open) {
      el.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Menu");
      btn.innerHTML = D.icon(open ? "x" : "menu");
    }
    btn.addEventListener("click", function () { setMenu(!el.classList.contains("open")); });
    el.querySelectorAll(".nav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && el.classList.contains("open")) { setMenu(false); btn.focus(); } });
    window.addEventListener("resize", function () { if (window.innerWidth > 760 && el.classList.contains("open")) setMenu(false); });
  }

  function renderFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    var ig = C.instagram || "damye.kr";
    el.innerHTML = '<div class="container footer-inner">' +
      '<div><a class="logo" href="index.html">' + logoHTML() + "</a>" +
        "<p>Discover restaurants curated by DAMYE.</p><p>© DAMYE. All Rights Reserved.</p></div>" +
      '<div><h4>Quick Links</h4><a href="about.html">About Us</a><a href="restaurants.html">Restaurants</a><a href="quiz.html">Quiz</a><a href="contact.html">Contact</a></div>' +
      '<div><h4>Social Channels</h4><a class="social" href="https://instagram.com/' + D.esc(ig) + '" target="_blank" rel="noopener">' + D.icon("instagram") + "@" + D.esc(ig) + "</a></div>" +
      "</div>";
  }

  /* Fill [data-icon] placeholders written in page HTML */
  function fillIcons() {
    document.querySelectorAll("[data-icon]").forEach(function (n) {
      n.innerHTML = D.icon(n.getAttribute("data-icon"));
      n.removeAttribute("data-icon");
    });
  }

  renderHeader();
  renderFooter();
  fillIcons();
})();

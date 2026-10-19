// Personalise this file: add your own thumbnails, titles, links and social URLs.
const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/",
  discord: "https://discord.com/"
};

const ARCHIVE = {
  edits: {
    title: "Edits",
    intro: "Little scenes that refused to be forgotten.",
    items: [
      { title: "The Other Side", meta: "THE VAMPIRE DIARIES · EDIT", icon: "✦", url: "#" },
      { title: "A Thousand Years", meta: "CHARACTER EDIT · 4K", icon: "☾", url: "#" },
      { title: "After Dark", meta: "MOOD EDIT · 1080P", icon: "♜", url: "#" }
    ]
  },
  cc: {
    title: "Color Corrections",
    intro: "Midnight blues, candlelight, and the spaces between.",
    items: [
      { title: "Blue Hour", meta: "COLORING · .LOOK", icon: "✧", url: "#" },
      { title: "Cold Blood", meta: "CC · DARK / CINEMATIC", icon: "☽", url: "#" },
      { title: "Moonlit Skin", meta: "COLORING · SOFT CONTRAST", icon: "❖", url: "#" }
    ]
  },
  projects: {
    title: "Projects",
    intro: "Behind the scenes, timelines, and little experiments.",
    items: [
      { title: "TVD Scene Project", meta: "AFTER EFFECTS · AEP", icon: "▤", url: "#" },
      { title: "Velocity Study", meta: "AFTER EFFECTS · AEP", icon: "↗", url: "#" },
      { title: "Dream Sequence", meta: "PROJECT FILE · AEP", icon: "✦", url: "#" }
    ]
  },
  packs: {
    title: "Edit Pack",
    intro: "A few useful things for your next midnight masterpiece.",
    items: [
      { title: "Overlay Pack I", meta: "OVERLAYS · ZIP", icon: "▧", url: "#" },
      { title: "Texture Archive", meta: "TEXTURES · ZIP", icon: "▤", url: "#" },
      { title: "Light Leaks", meta: "ASSETS · ZIP", icon: "✧", url: "#" }
    ]
  }
};

const JOURNAL = [
  { date: "19 OCTOBER", title: "Dear midnight,", text: "Some moments fade. Others settle under your skin and become part of the person you are. This little book is for the scenes, sounds, and feelings I want to keep." },
  { date: "THE NEXT PAGE", title: "Things I keep,", text: "A song that feels like an old memory. The blue of a rainy evening. A scene that says everything without explaining a thing. Maybe a collection is just another way of saying: this mattered to me." },
  { date: "LAST, FOR NOW", title: "Until we meet again,", text: "If you found this page, leave a little room for mystery. Not everything needs a name, a reason, or a perfect ending. Some stories are better when they stay a little unfinished." }
];

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
$("#year").textContent = new Date().getFullYear();

$$("[data-link]").forEach(link => {
  const url = SOCIAL_LINKS[link.dataset.link];
  if (url) link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const collectionModal = $("#collectionModal");
const previewGrid = $("#previewGrid");
function openCollection(category) {
  const archive = ARCHIVE[category];
  if (!archive) return;
  $("#modalTitle").textContent = archive.title;
  $("#modalIntro").textContent = archive.intro;
  previewGrid.innerHTML = "";
  archive.items.forEach(item => {
    const card = document.createElement("article");
    card.className = "preview-item";
    const link = document.createElement("a");
    link.href = item.url;
    if (item.url && item.url !== "#") { link.target = "_blank"; link.rel = "noopener noreferrer"; }
    link.innerHTML = `<div class="preview-thumb"><span>${item.icon}</span></div><div class="preview-info"><strong></strong><small></small></div>`;
    link.querySelector("strong").textContent = item.title;
    link.querySelector("small").textContent = item.meta;
    card.append(link);
    previewGrid.append(card);
  });
  showModal(collectionModal);
}
$$(".collection-card").forEach(card => card.addEventListener("click", () => openCollection(card.dataset.category)));

function showModal(modal) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const close = $("[data-close]", modal);
  if (close) close.focus();
}
function hideModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  if (!$(".modal-backdrop.open")) document.body.style.overflow = "";
}
$$("[data-close]").forEach(btn => btn.addEventListener("click", () => hideModal(btn.closest(".modal-backdrop"))));
$$(".modal-backdrop").forEach(backdrop => backdrop.addEventListener("click", e => {
  if (e.target === backdrop) hideModal(backdrop);
}));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") $$(".modal-backdrop.open").forEach(hideModal);
});

const diaryModal = $("#diaryModal");
let page = 0;
function renderPage() {
  const entry = JOURNAL[page];
  $("#pageCount").textContent = `PAGE 0${page + 1} / 0${JOURNAL.length}`;
  $("#diaryPage .eyebrow").textContent = entry.date;
  $("#diaryTitle").textContent = entry.title;
  $("#diaryText").textContent = entry.text;
  $("#prevPage").disabled = page === 0;
  $("#nextPage").textContent = page === JOURNAL.length - 1 ? "Read again ↻" : "Turn the page →";
  $("#diaryPage").animate([{ opacity: .25, transform: "translateX(10px)" }, { opacity: 1, transform: "translateX(0)" }], { duration: 360, easing: "ease-out" });
}
$("#diaryOpen").addEventListener("click", () => { page = 0; renderPage(); showModal(diaryModal); });
$("#prevPage").addEventListener("click", () => { if (page > 0) page--; renderPage(); });
$("#nextPage").addEventListener("click", () => { page = (page + 1) % JOURNAL.length; renderPage(); });
$("#grimoireOpen").addEventListener("click", () => showModal($("#grimoireModal")));

$("#menuToggle").addEventListener("click", () => $(".nav").classList.toggle("open"));
$$(".nav-link").forEach(link => link.addEventListener("click", () => {
  $$(".nav-link").forEach(item => item.classList.remove("active"));
  link.classList.add("active");
  $(".nav").classList.remove("open");
}));

// Subtle, occasional bats and rising particles. No external animation libraries.
const batLayer = $("#bats"), emberLayer = $("#embers");
let ambienceOn = true;
function spawnBat() {
  if (!ambienceOn || document.hidden) return;
  const bat = document.createElement("span");
  bat.className = "bat";
  bat.textContent = Math.random() > .35 ? "⌁" : "⋈";
  bat.style.left = `${-5 + Math.random() * 18}%`;
  bat.style.animationDuration = `${13 + Math.random() * 11}s`;
  bat.style.fontSize = `${12 + Math.random() * 12}px`;
  batLayer.append(bat);
  setTimeout(() => bat.remove(), 26000);
}
function spawnEmber() {
  if (!ambienceOn || document.hidden) return;
  const dot = document.createElement("i");
  dot.className = "ember";
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.animationDuration = `${8 + Math.random() * 12}s`;
  dot.style.opacity = `${.25 + Math.random() * .45}`;
  emberLayer.append(dot);
  setTimeout(() => dot.remove(), 21000);
}
let batTimer = setInterval(spawnBat, 3600);
let emberTimer = setInterval(spawnEmber, 850);
$("#soundToggle").addEventListener("click", () => {
  ambienceOn = !ambienceOn;
  $("#soundToggle").textContent = ambienceOn ? "✧" : "✦";
  $("#soundToggle").title = ambienceOn ? "Pause ambience" : "Resume ambience";
  if (!ambienceOn) { batLayer.replaceChildren(); emberLayer.replaceChildren(); }
});
#bats-bg {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 5;
}

.flying-bat {
  position: absolute;
  left: -100px;
  color: #000;
  width: 42px;
  height: 28px;
  animation: bat-fly linear infinite;
  will-change: transform;
}

.flying-bat svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: #000;
}

@keyframes bat-fly {
  from {
    transform: translateX(-100px) rotate(-8deg);
  }
  to {
    transform: translateX(calc(100vw + 150px)) rotate(8deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .flying-bat {
    animation: none;
    display: none;
  }
}

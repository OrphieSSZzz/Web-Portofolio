// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") nav.classList.remove("open");
});

// Tombol sebelumnya / selanjutnya otomatis di tiap section
const sections = [...document.querySelectorAll("main > section")];

sections.forEach((sec, i) => {
  if (sec.id === "beranda") return; // Beranda tanpa tombol next

  const prev = sections[i - 1];
  const next = sections[i + 1];
  const wrap = document.createElement("div");
  wrap.className = "page-nav";

  if (prev) wrap.innerHTML += `<a href="#${prev.id}" class="prev">← Sebelumnya</a>`;
  if (next) wrap.innerHTML += `<a href="#${next.id}" class="next">Selanjutnya →</a>`;

  sec.appendChild(wrap);
});

// Animasi muncul saat scroll (IntersectionObserver, ringan)
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Highlight menu aktif sesuai section
const links = document.querySelectorAll("nav a");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-50% 0px -50% 0px" });

document.querySelectorAll("section[id]").forEach((s) => sectionObserver.observe(s));

// Efek ngetik
const typed = document.getElementById("typed");
const words = ["Informatika", "Universitas Udayana", "yang suka vibe coding"];
let w = 0, c = 0, del = false;

function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!del && c < word.length) c++;
  else if (!del) { del = true; return setTimeout(type, 1400); }
  else if (c > 0) c--;
  else { del = false; w = (w + 1) % words.length; }
  setTimeout(type, del ? 40 : 90);
}
type();

// Progress scroll + tombol kembali ke atas
const progress = document.getElementById("progress");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  toTop.classList.toggle("show", scrollY > 400);
}, { passive: true });

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hitung naik untuk statistik
const countObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target, target = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = n;
      if (n === target) clearInterval(t);
    }, 30);
    obs.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

// Tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();
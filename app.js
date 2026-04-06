const serviceItems = {
  social: {
    subtitle: "Posicionamento com consistencia e intencao.",
    title: "Gestao de redes sociais",
    points: [
      "Planejamento editorial e direcao criativa",
      "Calendario de conteudo e organizacao de campanhas",
      "Acompanhamento estrategico da presenca digital"
    ]
  },
  sites: {
    subtitle: "Experiencias digitais que valorizam a marca.",
    title: "Sites e landing pages",
    points: [
      "Paginas institucionais com visual premium",
      "Estrutura de conversao para captar clientes",
      "Design responsivo para mobile e desktop"
    ]
  },
  systems: {
    subtitle: "Ferramentas para simplificar a operacao do negocio.",
    title: "Sistemas sob medida",
    points: [
      "Solucoes para agendamento, cadastro e atendimento",
      "Fluxos internos mais leves e organizados",
      "Desenvolvimento alinhado a necessidades reais"
    ]
  }
};

const tabButtons = document.querySelectorAll(".tab-button");
const tabSubtitle = document.querySelector("#tab-subtitle");
const tabTitle = document.querySelector("#tab-title");
const tabPoints = document.querySelector("#tab-points");

function renderTab(tabId) {
  const data = serviceItems[tabId];
  if (!data) return;

  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  tabSubtitle.textContent = data.subtitle;
  tabTitle.textContent = data.title;
  tabPoints.innerHTML = data.points.map((point) => `<li>${point}</li>`).join("");
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => renderTab(button.dataset.tab));
});

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const button = item.querySelector(".faq-trigger");
  const content = item.querySelector("p");
  const symbol = item.querySelector("strong");

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((other) => {
      other.classList.remove("is-open");
      other.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
      other.querySelector("strong").textContent = "+";
      const paragraph = other.querySelector("p");
      if (paragraph) paragraph.hidden = true;
    });

    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      symbol.textContent = "-";
      content.hidden = false;
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.18 });

revealItems.forEach((item) => revealObserver.observe(item));

const heroWords = document.querySelectorAll(".hero-word");
let heroWordIndex = 0;

if (heroWords.length > 1) {
  setInterval(() => {
    heroWords[heroWordIndex].classList.remove("is-visible");
    heroWordIndex = (heroWordIndex + 1) % heroWords.length;
    heroWords[heroWordIndex].classList.add("is-visible");
  }, 2200);
}

const navLinks = document.querySelectorAll(".nav a");
const navTargets = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (navTargets.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeId = `#${entry.target.id}`;
      navLinks.forEach((link) => {
        link.setAttribute("aria-current", link.getAttribute("href") === activeId ? "true" : "false");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });

  navTargets.forEach((section) => sectionObserver.observe(section));
}

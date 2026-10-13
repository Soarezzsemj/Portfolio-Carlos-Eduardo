/* =========================
   CURRÍCULO (caminho único)
========================= */
const CV_URL = "CURRICULO/Carlos_Eduardo_Soares_CV_Portifolio.pdf";
const CV_FILENAME = "Carlos_Eduardo_Soares_CV_Portifolio.pdf";
// Currículo em inglês (opcional): enquanto for null, o modo EN usa o PDF em português
const CV_URL_EN = null;
const CV_FILENAME_EN = null;

/* =========================
   I18N (helpers; dicionários em i18n.js)
========================= */
const t = window.I18N?.t ?? ((chave) => chave);
const idiomaAtual = () => window.I18N?.getLang() ?? "pt";
const localeAtual = () => window.I18N?.locale() ?? "pt-BR";
const aoMudarIdioma = fn => window.I18N?.onChange(fn);

// Marca o elemento com a chave para ele ser retraduzido sozinho quando o idioma mudar
function traduzirTexto(el, chave) {
  el.dataset.i18n = chave;
  el.textContent = t(chave);
}

function traduzirAttr(el, attr, chave) {
  el.dataset.i18nAttr = `${attr}:${chave}`;
  el.setAttribute(attr, t(chave));
}

/* =========================
   REVEAL ANIMATION
========================= */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  }
);

reveals.forEach(r => observer.observe(r));

/* =========================
   SCROLL PROGRESS BAR
========================= */
window.addEventListener("scroll", () => {
  const scroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scroll / height) * 100;
  document.getElementById("scroll-progress").style.width = progress + "%";
});

/* =========================
   THEME TOGGLE
========================= */
const toggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Atualiza o emoji do botão
function updateThemeIcon() {
  const currentTheme = html.dataset.theme;
  toggle.textContent = currentTheme === "dark" ? "🌙" : "☀️";
  
  // Atualiza meta theme-color (barra do navegador) com o fundo do tema atual
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    const bg = getComputedStyle(html).getPropertyValue("--bg-primary").trim();
    if (bg) themeColorMeta.content = bg;
  }
}

// Toggle do tema
toggle.addEventListener("click", () => {
  const theme = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    // modo privado / storage bloqueado: o tema vale só nesta visita
  }
  updateThemeIcon();
});

// O tema inicial (salvo ou prefers-color-scheme) já é aplicado no <head> para evitar flash
updateThemeIcon();

/* =========================
   NAVIGATION ACTIVE LINK
========================= */
const navLinks = document.querySelectorAll(".floating-nav a");
const sections = document.querySelectorAll("section");
const nav = document.querySelector(".floating-nav nav");
const navMenuToggle = document.getElementById("nav-menu-toggle");

navMenuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("menu-open") ?? false;
  navMenuToggle.setAttribute("aria-expanded", String(isOpen));
  traduzirAttr(navMenuToggle, "aria-label", isOpen ? "nav.closeMenu" : "nav.openMenu");
  navMenuToggle.textContent = isOpen ? "×" : "☰";
});

function fecharMenu() {
  if (!nav?.classList.contains("menu-open")) return;
  nav.classList.remove("menu-open");
  navMenuToggle?.setAttribute("aria-expanded", "false");
  if (navMenuToggle) {
    traduzirAttr(navMenuToggle, "aria-label", "nav.openMenu");
    navMenuToggle.textContent = "☰";
  }
}

navLinks.forEach(link => link.addEventListener("click", fecharMenu));

document.addEventListener("click", event => {
  if (nav && !nav.contains(event.target)) fecharMenu();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") fecharMenu();
});

window.addEventListener("scroll", () => {
  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =========================
   PROJECT MODAL
========================= */
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalTech = document.getElementById("modal-tech");
const modalLink = document.getElementById("modal-link");
const closeModal = document.querySelector(".close-modal");
const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.getElementById("close-lightbox");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
let galleryImages = [];
let galleryIndex = 0;

// Placeholder gerado no idioma ativo (o texto aparece dentro da imagem)
function placeholderImg() {
  const texto = t("modal.imageNotFound").replace(/[<>&]/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><rect width="320" height="180" fill="#111318"/><text x="160" y="95" fill="#39D353" font-family="monospace" font-size="14" text-anchor="middle">${texto}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Textos (título, descrição, tecnologias, alt) ficam em i18n.js: project.<chave>.*
const projects = {
  korp: {
    link: "https://github.com/Soarezzsemj/Korp_Teste_CarlosEduardoSoares",
    images: [
      { src: "public/images/projects/korp-erp/estoque.png", alt: "project.korp.img.estoque" },
      { src: "public/images/projects/korp-erp/faturamento.png", alt: "project.korp.img.faturamento" },
      { src: "public/images/projects/korp-erp/danfe-pdf.png", alt: "project.korp.img.danfe" }
    ]
  },
  cripto: {
    link: "https://github.com/Soarezzsemj/Minha-Cripto",
    images: [
      { src: "MinhaCripto/cel2.png", alt: "project.cripto.img.tela2" },
      { src: "MinhaCripto/cel3.png", alt: "project.cripto.img.tela3" },
      { src: "MinhaCripto/cel4.png", alt: "project.cripto.img.tela4" }
    ]
  },
  resume: {
    link: "https://github.com/Soarezzsemj/Resumo-IA",
    liveLink: "https://resumo-ia.vercel.app/",
    images: [
      { src: "ResumeAi/tela-inicial.png", alt: "project.resume.img.inicial" },
      { src: "ResumeAi/resumo-gerado.png", alt: "project.resume.img.resumo" },
      { src: "ResumeAi/entrada-e-opcoes.png", alt: "project.resume.img.entrada" }
    ]
  },
  target: {
    link: "https://github.com/Soarezzsemj/TargetDesafio",
    images: [
      { src: "public/images/projects/target-desafio/menu.png", alt: "project.target.img.menu" },
      { src: "public/images/projects/target-desafio/comissoes.png", alt: "project.target.img.comissoes" },
      { src: "public/images/projects/target-desafio/detalhamento-vendas.png", alt: "project.target.img.vendas" },
      { src: "public/images/projects/target-desafio/menu-estoque.png", alt: "project.target.img.menuEstoque" },
      { src: "public/images/projects/target-desafio/consulta-estoque.png", alt: "project.target.img.consulta" },
      { src: "public/images/projects/target-desafio/historico-movimentacoes.png", alt: "project.target.img.historico" },
      { src: "public/images/projects/target-desafio/juros.png", alt: "project.target.img.juros" }
    ]
  }
};

let projetoAberto = null;

// Textos do modal no idioma ativo; a galeria é atualizada no lugar (sem recriar, mantém o foco)
function traduzirModal() {
  if (!projetoAberto) return;
  const project = projects[projetoAberto];
  modalTitle.textContent = t(`project.${projetoAberto}.title`);
  modalDesc.textContent = t(`project.${projetoAberto}.desc`);
  modalTech.textContent = t("modal.tech", { tech: t(`project.${projetoAberto}.tech`) });

  document.querySelectorAll("#modal-gallery .modal-gallery-item").forEach((item, index) => {
    const alt = t(project.images[index].alt);
    const imgEl = item.querySelector("img");
    item.setAttribute("aria-label", t("modal.zoom", { alt }));
    imgEl.alt = alt;
    if (imgEl.dataset.falhou) imgEl.src = placeholderImg();
  });

  if (!lightbox.classList.contains("hidden") && galleryImages[galleryIndex]) {
    lightboxImage.alt = galleryImages[galleryIndex].alt;
    if (galleryImages[galleryIndex].dataset.falhou) lightboxImage.src = galleryImages[galleryIndex].src;
  }
}

// Abre modal ao clicar em um projeto
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const projectKey = card.dataset.project;
    const project = projects[projectKey];
    if (!project) return;

    projetoAberto = projectKey;
    modalLink.href = project.link;

    // Botão de versão online (se existir)
    const liveBtn = document.getElementById("modal-live-link");
    if (project.liveLink) {
      liveBtn.href = project.liveLink;
      liveBtn.style.display = "inline-flex";
    } else {
      liveBtn.style.display = "none";
    }

    // Adiciona galeria de imagens
    const gallery = document.getElementById("modal-gallery");
    gallery.innerHTML = "";
    galleryImages = [];

    if (project.images && project.images.length > 0) {
      project.images.forEach((img, index) => {
        const imgItem = document.createElement("button");
        imgItem.type = "button";
        imgItem.className = "modal-gallery-item";
        const imgEl = document.createElement("img");
        imgEl.src = img.src;
        imgEl.loading = "lazy";
        imgEl.addEventListener("error", function onErr() {
          imgEl.removeEventListener("error", onErr);
          imgEl.dataset.falhou = "true";
          imgEl.src = placeholderImg();
        });
        imgItem.appendChild(imgEl);
        galleryImages.push(imgEl);
        imgItem.addEventListener("click", (event) => {
          event.stopPropagation();
          abrirLightbox(index);
        });
        gallery.appendChild(imgItem);
      });
    }

    traduzirModal();
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

aoMudarIdioma(traduzirModal);

document.querySelectorAll(".repo-action").forEach(link => {
  link.addEventListener("click", event => event.stopPropagation());
});

// Fecha modal
function fecharModal() {
  fecharLightbox();
  projetoAberto = null;
  modal.classList.add("hidden");
  document.body.style.overflow = ""; // Restaura scroll do body
}

closeModal.addEventListener("click", fecharModal);

function mostrarImagemLightbox(index) {
  const total = galleryImages.length;
  if (!total) return;
  galleryIndex = (index + total) % total;
  const imgEl = galleryImages[galleryIndex];
  // usa o src atual da miniatura (já trocado pelo placeholder se a imagem falhou)
  lightboxImage.src = imgEl.src;
  lightboxImage.alt = imgEl.alt;
}

function abrirLightbox(index) {
  mostrarImagemLightbox(index);
  const temVarias = galleryImages.length > 1;
  lightboxPrev.hidden = !temVarias;
  lightboxNext.hidden = !temVarias;
  lightbox.classList.remove("hidden");
}

function fecharLightbox() {
  lightbox.classList.add("hidden");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

closeLightbox.addEventListener("click", fecharLightbox);
lightboxPrev.addEventListener("click", () => mostrarImagemLightbox(galleryIndex - 1));
lightboxNext.addEventListener("click", () => mostrarImagemLightbox(galleryIndex + 1));

// Swipe horizontal no lightbox (touch)
let swipeStartX = 0;
let swipeStartY = 0;
lightbox.addEventListener("touchstart", (e) => {
  swipeStartX = e.changedTouches[0].clientX;
  swipeStartY = e.changedTouches[0].clientY;
}, { passive: true });
lightbox.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - swipeStartX;
  const dy = e.changedTouches[0].clientY - swipeStartY;
  if (galleryImages.length > 1 && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    mostrarImagemLightbox(galleryIndex + (dx < 0 ? 1 : -1));
  }
});
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    fecharLightbox();
  }
});

// Fecha modal ao clicar fora do conteúdo
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    fecharModal();
  }
});

// Fecha modal com tecla ESC
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("hidden") && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
    mostrarImagemLightbox(galleryIndex + (e.key === "ArrowRight" ? 1 : -1));
  }

  if (e.key === "Escape") {
    if (!lightbox.classList.contains("hidden")) {
      fecharLightbox();
    } else if (!modal.classList.contains("hidden")) {
      fecharModal();
    }
  }
});

/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    
    if (target) {
      const nav = document.querySelector(".floating-nav");
      const offset = (nav?.getBoundingClientRect().height || 0) + 40;
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

/* =========================
   FORM SUBMIT (WEB3FORMS)
========================= */
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const submitButton = contactForm.querySelector('button[type="submit"]');

  // Desabilita o botão e mostra loading (data-i18n mantém o texto certo se o idioma mudar no meio)
  submitButton.disabled = true;
  traduzirTexto(submitButton, "form.sending");
  
  // Esconde mensagens anteriores
  formStatus.classList.add("hidden");
  formStatus.classList.remove("success", "error");
  
  // Pega os dados do formulário
  const formData = new FormData(contactForm);
  
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Sucesso
      traduzirTexto(formStatus, "form.success");
      formStatus.classList.remove("hidden");
      formStatus.classList.add("success");
      contactForm.reset();
    } else {
      // Erro na resposta
      throw new Error(data.message || "Erro ao enviar mensagem");
    }
  } catch (error) {
    // Erro na requisição
    traduzirTexto(formStatus, "form.error");
    formStatus.classList.remove("hidden");
    formStatus.classList.add("error");
    console.error("Erro:", error);
  } finally {
    // Reabilita o botão
    submitButton.disabled = false;
    traduzirTexto(submitButton, "form.submit");
  }
});

/* =========================
   PROJECT TILT + MAGNETIC BUTTONS
========================= */
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canHover) {
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", event => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const rotateY = (x - 0.5) * 16;
      const rotateX = (0.5 - y) * 16;
      const shadowX = (x - 0.5) * -18;
      const shadowY = 18 + (y * 10);
      card.classList.add("is-tilting");
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, 0.42)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
      card.classList.remove("is-tilting");
    });
  });

  document.querySelectorAll(".btn.primary, .btn.ghost, button[type='submit']").forEach(button => {
    button.addEventListener("mousemove", event => {
      const bounds = button.getBoundingClientRect();
      const distanceX = event.clientX - (bounds.left + bounds.width / 2);
      const distanceY = event.clientY - (bounds.top + bounds.height / 2);
      button.style.transform = `translate(${distanceX * 0.08}px, ${distanceY * 0.08}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

/* =========================
   COMMAND PALETTE
========================= */
const commandPalette = document.getElementById("command-palette");
const commandSearch = document.getElementById("command-search-input");
const commandActions = document.getElementById("command-actions");
const commandHint = document.querySelector(".command-hint");

const commandItems = [
  { label: "palette.home", action: () => navegarPara("#home") },
  { label: "palette.projects", action: () => navegarPara("#projects") },
  { label: "palette.contact", action: () => navegarPara("#contact") },
  { label: "palette.github", action: () => window.open("https://github.com/Soarezzsemj", "_blank", "noopener noreferrer") },
  { label: "palette.linkedin", action: () => window.open("https://www.linkedin.com/in/carlos-eduardo-soares-081419343/", "_blank", "noopener noreferrer") },
  { label: "palette.cv", action: () => baixarCurriculo() },
  { label: "palette.copyEmail", action: () => {
    const email = "5carloseduardo2007@gmail.com";
    navigator.clipboard.writeText(email)
      .then(() => alert(t("palette.emailCopied", { email })))
      .catch(() => alert(t("palette.emailFallback", { email })));
  } },
  { label: "palette.theme", action: () => toggle.click() },
  { label: "palette.language", action: () => window.I18N?.setLang(idiomaAtual() === "pt" ? "en" : "pt") }
];

function navegarPara(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

function renderCommandActions(query = "") {
  commandActions.innerHTML = "";
  commandItems
    .filter(item => t(item.label).toLowerCase().includes(query.toLowerCase()))
    .forEach(item => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "command-action";
      button.textContent = t(item.label);
      button.addEventListener("click", () => {
        item.action();
        fecharCommandPalette();
      });
      commandActions.appendChild(button);
    });
}

function abrirCommandPalette() {
  commandPalette.classList.remove("hidden");
  commandHint.classList.add("hidden");
  document.body.style.overflow = "hidden";
  commandSearch.value = "";
  renderCommandActions();
  commandSearch.focus();
}

commandHint?.addEventListener("click", abrirCommandPalette);

function fecharCommandPalette() {
  commandPalette.classList.add("hidden");
  commandHint.classList.remove("hidden");
  if (modal.classList.contains("hidden") && lightbox.classList.contains("hidden")) {
    document.body.style.overflow = "";
  }
}

commandSearch.addEventListener("input", () => renderCommandActions(commandSearch.value));

// Paleta aberta durante a troca de idioma: refaz a lista e devolve o foco para o mesmo item
aoMudarIdioma(() => {
  if (commandPalette.classList.contains("hidden")) return;
  const botoes = [...commandActions.querySelectorAll(".command-action")];
  const indiceFoco = botoes.indexOf(document.activeElement);
  renderCommandActions(commandSearch.value);
  if (indiceFoco >= 0) {
    const novos = commandActions.querySelectorAll(".command-action");
    (novos[Math.min(indiceFoco, novos.length - 1)] ?? commandSearch).focus();
  }
});
commandPalette.addEventListener("click", event => {
  if (event.target === commandPalette) fecharCommandPalette();
});

const isMac = (() => {
  try {
    const platform = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "";
    return /mac|iphone|ipad|ipod/i.test(platform);
  } catch (e) {
    return false;
  }
})();

document.addEventListener("keydown", event => {
  const modifier = isMac ? event.metaKey : event.ctrlKey;
  if (modifier && event.key?.toLowerCase() === "k") {
    event.preventDefault();
    abrirCommandPalette();
  }

  if (event.key === "Escape" && !commandPalette.classList.contains("hidden")) {
    fecharCommandPalette();
  }
});

/* =========================
   PLATFORM DETECTION: ⌘K vs Ctrl K
========================= */
(function detectPlatform() {
  const kbd = document.getElementById("command-hint-kbd");
  if (kbd && !isMac) kbd.textContent = "Ctrl K";
})();

/* =========================
   TOAST
========================= */
let toastTimer;
// Recebe a chave do dicionário; com data-i18n o toast visível também troca de idioma
function mostrarToast(chave) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  traduzirTexto(toast, chave);
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200);
}

/* =========================
   BAIXAR CV
   Enquanto o PDF não existir em CURRICULO/, evita o 404 e mostra um aviso.
========================= */
const CV_PT = { url: CV_URL, nome: CV_FILENAME };
// Em EN usa o CV_URL_EN só se ele estiver configurado; senão, o PDF em português
const cvDoIdioma = () => (idiomaAtual() === "en" && CV_URL_EN)
  ? { url: CV_URL_EN, nome: CV_FILENAME_EN || CV_FILENAME }
  : CV_PT;

const cvChecagens = {}; // url -> Promise<boolean> (um HEAD por arquivo)
const cvStatus = {};    // url -> true/false (ausente = verificando)
function verificarCv(url) {
  if (!cvChecagens[url]) {
    cvChecagens[url] = fetch(url, { method: "HEAD", cache: "no-store" })
      .then(response => response.ok)
      .catch(() => false);
    cvChecagens[url].then(ok => { cvStatus[url] = ok; });
  }
  return cvChecagens[url];
}
verificarCv(cvDoIdioma().url);

function dispararDownloadCv({ url, nome }) {
  const link = document.createElement("a");
  link.href = url;
  link.download = nome;
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function baixarCurriculo() {
  const cv = cvDoIdioma();
  if (await verificarCv(cv.url)) return dispararDownloadCv(cv);
  // CV em inglês configurado mas indisponível: cai no PDF em português
  if (cv !== CV_PT && await verificarCv(CV_PT.url)) return dispararDownloadCv(CV_PT);
  mostrarToast("toast.cvSoon");
}

function atualizarLinksCv() {
  const cv = cvDoIdioma();
  document.querySelectorAll("[data-cv-link]").forEach(link => {
    link.href = cv.url;
    link.download = cv.nome;
  });
}

document.querySelectorAll("[data-cv-link]").forEach(link => {
  link.addEventListener("click", event => {
    if (cvStatus[cvDoIdioma().url] === true) return;
    event.preventDefault();
    baixarCurriculo();
  });
});
atualizarLinksCv();
aoMudarIdioma(() => {
  atualizarLinksCv();
  verificarCv(cvDoIdioma().url);
});

/* =========================
   CONTRIBUIÇÕES NO GITHUB
   API pública sem token; se falhar, volta para a imagem do ghchart.
========================= */
(function contribuicoesGithub() {
  const usuario = "Soarezzsemj";
  const container = document.getElementById("github-contributions");
  const scroll = document.getElementById("contrib-scroll");
  const chart = document.getElementById("contrib-chart");
  const totalEl = document.getElementById("contrib-total");
  const legend = document.getElementById("contrib-legend");
  const tooltip = document.getElementById("contrib-tooltip");
  if (!container || !chart) return;

  // Datas e números via Intl no locale ativo. Abreviações sem ponto e com inicial maiúscula
  // ("jan." -> "Jan", "seg." -> "Seg") para manter o visual atual em português.
  const abreviar = texto => {
    const limpo = texto.replace(/\.$/, "");
    return limpo.charAt(0).toUpperCase() + limpo.slice(1);
  };
  function criarFormatadores() {
    const locale = localeAtual();
    return {
      mes: new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" }),
      diaSemana: new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }),
      data: new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
      numero: new Intl.NumberFormat(locale)
    };
  }
  let fmt = criarFormatadores();

  // Singular só para 1 (pt: 0 contribuições; en: 0 contributions)
  const textoContribuicoes = n => t(n === 1 ? "contrib.one" : "contrib.other", { count: fmt.numero.format(n) });

  let dadosAtuais = null;
  let imgFallback = null;

  function usarFallback() {
    chart.remove();
    if (legend) legend.hidden = true;
    if (totalEl) totalEl.textContent = "";
    const img = document.createElement("img");
    img.src = `https://ghchart.rshah.org/39D353/${usuario}`;
    img.alt = t("contrib.chartAria", { user: usuario });
    img.loading = "lazy";
    scroll.appendChild(img);
    imgFallback = img;
  }

  function criar(tag, className, texto) {
    const el = document.createElement(tag);
    el.className = className;
    if (texto) el.textContent = texto;
    return el;
  }

  function desenhar(dados) {
    const dias = dados.contributions;
    const total = dados.total?.lastYear ?? dias.reduce((soma, d) => soma + d.count, 0);
    const primeiro = new Date(`${dias[0].date}T00:00:00Z`);
    const offset = primeiro.getUTCDay(); // semanas começam no domingo
    const semanas = Math.ceil((dias.length + offset) / 7);
    const fragment = document.createDocumentFragment();
    dadosAtuais = dados;

    // Rótulos dos dias: Seg, Qua, Sex nas linhas 2, 4 e 6 da semana (01/01/2024 foi segunda)
    [1, 3, 5].forEach(dia => {
      const label = criar("span", "contrib-day", abreviar(fmt.diaSemana.format(Date.UTC(2024, 0, dia))));
      label.style.gridRow = String(dia + 2);
      fragment.appendChild(label);
    });

    const colunasComMes = [];
    dias.forEach((dia, i) => {
      const data = new Date(`${dia.date}T00:00:00Z`);
      const posicao = i + offset;
      const coluna = Math.floor(posicao / 7);
      const linha = posicao % 7;

      // Mês rotulado na semana que contém o dia 1 (e na 1ª coluna, se houver espaço)
      if (data.getUTCDate() === 1 || i === 0) {
        colunasComMes.push({ coluna, mes: data.getUTCMonth(), inicio: i === 0 });
      }

      const cell = criar("span", "contrib-cell");
      cell.dataset.level = String(dia.level);
      cell.dataset.tip = t("contrib.tip", { count: textoContribuicoes(dia.count), date: fmt.data.format(data) });
      cell.style.gridColumn = String(coluna + 2);
      cell.style.gridRow = String(linha + 2);
      fragment.appendChild(cell);
    });

    colunasComMes.forEach((item, idx) => {
      const proximo = colunasComMes[idx + 1];
      if (item.inicio && proximo && proximo.coluna - item.coluna < 3) return;
      const label = criar("span", "contrib-month", abreviar(fmt.mes.format(Date.UTC(2024, item.mes, 1))));
      label.style.gridColumn = String(item.coluna + 2);
      fragment.appendChild(label);
    });

    chart.style.setProperty("--contrib-weeks", String(semanas));
    chart.setAttribute("aria-label", t("contrib.totalAria", { count: textoContribuicoes(total), user: usuario }));
    chart.appendChild(fragment);
    if (totalEl) totalEl.textContent = t("contrib.total", { count: textoContribuicoes(total) });

    // Em telas estreitas, começa mostrando a data mais recente
    scroll.scrollLeft = scroll.scrollWidth;
  }

  function mostrarTooltip(cell) {
    const caixa = container.getBoundingClientRect();
    const alvo = cell.getBoundingClientRect();
    tooltip.textContent = cell.dataset.tip;
    tooltip.hidden = false;
    const metade = tooltip.offsetWidth / 2;
    const centro = alvo.left + alvo.width / 2 - caixa.left;
    tooltip.style.left = `${Math.min(Math.max(centro, metade), caixa.width - metade)}px`;
    tooltip.style.top = `${alvo.top - caixa.top}px`;
  }

  chart.addEventListener("pointerover", e => {
    const cell = e.target.closest(".contrib-cell");
    if (cell) mostrarTooltip(cell);
  });
  chart.addEventListener("pointerleave", () => { tooltip.hidden = true; });
  scroll.addEventListener("scroll", () => { tooltip.hidden = true; }, { passive: true });

  // Troca de idioma: redesenha com os dados já baixados (sem nova requisição) e mantém a rolagem
  aoMudarIdioma(() => {
    fmt = criarFormatadores();
    tooltip.hidden = true;
    if (imgFallback) {
      imgFallback.alt = t("contrib.chartAria", { user: usuario });
    } else if (dadosAtuais) {
      const rolagem = scroll.scrollLeft;
      chart.replaceChildren();
      desenhar(dadosAtuais);
      scroll.scrollLeft = rolagem;
    } else {
      chart.setAttribute("aria-label", t("contrib.chartAria", { user: usuario }));
    }
  });

  // Antes dos dados chegarem, o aria-label do gráfico já segue o idioma ativo
  chart.setAttribute("aria-label", t("contrib.chartAria", { user: usuario }));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  fetch(`https://github-contributions-api.jogruber.de/v4/${usuario}?y=last`, { signal: controller.signal })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(dados => {
      if (!Array.isArray(dados?.contributions) || !dados.contributions.length) throw new Error("Resposta inválida");
      desenhar(dados);
    })
    .catch(usarFallback)
    .finally(() => clearTimeout(timeout));
})();


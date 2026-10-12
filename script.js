/* =========================
   CURRÍCULO (caminho único)
========================= */
const CV_URL = "CURRICULO/Carlos_Eduardo_Soares_CV_Portifolio.pdf";
const CV_FILENAME = "Carlos_Eduardo_Soares_CV_Portifolio.pdf";

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
  
  // Atualiza meta theme-color para iOS
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.content = currentTheme === "dark" ? "#0A0A0C" : "#F3F4F6";
  }
}

// Toggle do tema
toggle.addEventListener("click", () => {
  const theme = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  updateThemeIcon();
});

// Carrega o tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.dataset.theme = savedTheme;
}
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
  navMenuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  navMenuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav?.classList.remove("menu-open");
    navMenuToggle?.setAttribute("aria-expanded", "false");
    navMenuToggle?.setAttribute("aria-label", "Abrir menu");
    if (navMenuToggle) navMenuToggle.textContent = "☰";
  });
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

const PLACEHOLDER_IMG = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22180%22 viewBox=%220 0 320 180%22%3E%3Crect width=%22320%22 height=%22180%22 fill=%22%23111318%22/%3E%3Ctext x=%22160%22 y=%2295%22 fill=%22%2339D353%22 font-family=%22monospace%22 font-size=%2214%22 text-anchor=%22middle%22%3EImagem n%C3%A3o encontrada%3C/text%3E%3C/svg%3E';

const projects = {
  korp: {
    title: "KORP ERP — FATURAMENTO & ESTOQUE",
    desc: "Sistema corporativo com arquitetura de microsserviços, controle de concorrência com RowVersion, emissão e cancelamento de notas fiscais e geração de DANFE em PDF.",
    tech: ".NET 9 • Entity Framework Core • SQL Server • Angular 19 • Tailwind CSS • Docker Compose",
    link: "https://github.com/Soarezzsemj/Korp_Teste_CarlosEduardoSoares",
    images: [
      { src: "public/images/projects/korp-erp/01-login.png", alt: "Tela de Login" },
      { src: "public/images/projects/korp-erp/02-dashboard.png", alt: "Dashboard" },
      { src: "public/images/projects/korp-erp/03-faturamento.png", alt: "Faturamento" },
      { src: "public/images/projects/korp-erp/04-estoque.png", alt: "Estoque" },
      { src: "public/images/projects/korp-erp/05-danfe-pdf.png", alt: "DANFE em PDF" }
    ]
  },
  cripto: {
    title: "MINHA CRIPTO",
    desc: "App mobile focado em criptomoedas com usabilidade e segurança. Desenvolvido para facilitar transações e acompanhamento de ativos digitais.",
    tech: "Swift • Node.js • API REST",
    link: "https://github.com/Soarezzsemj/Minha-Cripto",
    images: [
      { src: "MinhaCripto/cel2.png", alt: "Tela 2" },
      { src: "MinhaCripto/cel3.png", alt: "Tela 3" },
      { src: "MinhaCripto/cel4.png", alt: "Tela 4" }
    ]
  },
  resume: {
    title: "RESUME AI",
    desc: "Aplicação full stack para geração automática de resumos usando inteligência artificial. Interface moderna e responsiva.",
    tech: "React • Node.js • TypeScript • IA",
    link: "https://github.com/Soarezzsemj/Resumo-IA",
    liveLink: "https://resumo-ia.vercel.app/",
    images: [
      { src: "ResumeAi/Resume2.png", alt: "Tela 1" },
      { src: "ResumeAi/Resume3.png", alt: "Tela 2" }
    ]
  },
  target: {
    title: "TARGET DESAFIO",
    desc: "Desafio técnico da Target Sistemas implementando cálculos de comissões, controle de estoque e juros em C#.",
    tech: "C# • .NET • Console App",
    link: "https://github.com/Soarezzsemj/TargetDesafio",
    images: [
      { src: "public/images/projects/target-desafio/01-comissoes.png", alt: "Cálculo de comissões" },
      { src: "public/images/projects/target-desafio/02-estoque.png", alt: "Controle de estoque" },
      { src: "public/images/projects/target-desafio/03-juros.png", alt: "Cálculo de juros" }
    ]
  }
};

// Abre modal ao clicar em um projeto
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const projectKey = card.dataset.project;
    const project = projects[projectKey];
    if (!project) return;
    
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.desc;
    modalTech.textContent = `Tecnologias: ${project.tech}`;
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
        imgItem.setAttribute("aria-label", `Ampliar ${img.alt}`);
        const imgEl = document.createElement("img");
        imgEl.src = img.src;
        imgEl.alt = img.alt;
        imgEl.loading = "lazy";
        imgEl.addEventListener("error", function onErr() {
          imgEl.removeEventListener("error", onErr);
          imgEl.src = PLACEHOLDER_IMG;
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
    
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll(".repo-action").forEach(link => {
  link.addEventListener("click", event => event.stopPropagation());
});

// Fecha modal
function fecharModal() {
  fecharLightbox();
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
  const originalText = submitButton.textContent;
  
  // Desabilita o botão e mostra loading
  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";
  
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
      formStatus.textContent = "✓ Mensagem enviada com sucesso! Entrarei em contato em breve.";
      formStatus.classList.remove("hidden");
      formStatus.classList.add("success");
      contactForm.reset();
    } else {
      // Erro na resposta
      throw new Error(data.message || "Erro ao enviar mensagem");
    }
  } catch (error) {
    // Erro na requisição
    formStatus.textContent = "✗ Erro ao enviar mensagem. Tente novamente mais tarde.";
    formStatus.classList.remove("hidden");
    formStatus.classList.add("error");
    console.error("Erro:", error);
  } finally {
    // Reabilita o botão
    submitButton.disabled = false;
    submitButton.textContent = originalText;
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
  { label: "Ir para Home", action: () => navegarPara("#home") },
  { label: "Ir para Projetos", action: () => navegarPara("#projects") },
  { label: "Ir para Contato", action: () => navegarPara("#contact") },
  { label: "Ver GitHub", action: () => window.open("https://github.com/Soarezzsemj", "_blank", "noopener noreferrer") },
  { label: "Ver LinkedIn", action: () => window.open("https://www.linkedin.com/in/carlos-eduardo-soares-081419343/", "_blank", "noopener noreferrer") },
  { label: "Baixar Currículo (PDF)", action: () => baixarCurriculo() },
  { label: "Copiar email", action: () => {
    navigator.clipboard.writeText("5carloseduardo2007@gmail.com")
      .then(() => alert("Email copiado: 5carloseduardo2007@gmail.com"))
      .catch(() => alert("Email: 5carloseduardo2007@gmail.com"));
  } },
  { label: "Alternar tema claro/escuro", action: () => toggle.click() }
];

function navegarPara(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

function renderCommandActions(query = "") {
  commandActions.innerHTML = "";
  commandItems
    .filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    .forEach(item => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "command-action";
      button.textContent = item.label;
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
function mostrarToast(mensagem) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = mensagem;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200);
}

/* =========================
   BAIXAR CV
   Enquanto o PDF não existir em CURRICULO/, evita o 404 e mostra um aviso.
========================= */
const cvDisponivel = fetch(CV_URL, { method: "HEAD", cache: "no-store" })
  .then(response => response.ok)
  .catch(() => false);
let cvStatus = null; // null = verificando, true/false = resultado
cvDisponivel.then(ok => { cvStatus = ok; });

function dispararDownloadCv() {
  const link = document.createElement("a");
  link.href = CV_URL;
  link.download = CV_FILENAME;
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function baixarCurriculo() {
  cvDisponivel.then(ok => {
    if (ok) dispararDownloadCv();
    else mostrarToast("Currículo disponível em breve");
  });
}

document.querySelectorAll("[data-cv-link]").forEach(link => {
  link.href = CV_URL;
  link.download = CV_FILENAME;
  link.addEventListener("click", event => {
    if (cvStatus === true) return;
    event.preventDefault();
    baixarCurriculo();
  });
});

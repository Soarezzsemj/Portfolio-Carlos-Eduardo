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
    themeColorMeta.content = currentTheme === "dark" ? "#0F1115" : "#F5F1EA";
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

const projects = {
  korp: {
    title: "KORP ERP — FATURAMENTO & ESTOQUE",
    desc: "Sistema corporativo com arquitetura de microsserviços, controle de concorrência com RowVersion, emissão e cancelamento de notas fiscais e geração de DANFE em PDF.",
    tech: ".NET 9 • Entity Framework Core • SQL Server • Angular 19 • Tailwind CSS • Docker Compose",
    link: "https://github.com/Soarezzsemj/Korp_Teste_CarlosEduardoSoares",
    images: []
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
  }
};

// Abre modal ao clicar em um projeto
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const projectKey = card.dataset.project;
    const project = projects[projectKey];
    
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
    
    if (project.images && project.images.length > 0) {
      project.images.forEach(img => {
        const imgItem = document.createElement("button");
        imgItem.type = "button";
        imgItem.className = "modal-gallery-item";
        imgItem.setAttribute("aria-label", `Ampliar ${img.alt}`);
        imgItem.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
        imgItem.addEventListener("click", (event) => {
          event.stopPropagation();
          abrirLightbox(img.src, img.alt);
        });
        gallery.appendChild(imgItem);
      });
    }
    
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

// Fecha modal
function fecharModal() {
  fecharLightbox();
  modal.classList.add("hidden");
  document.body.style.overflow = ""; // Restaura scroll do body
}

closeModal.addEventListener("click", fecharModal);

function abrirLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.remove("hidden");
}

function fecharLightbox() {
  lightbox.classList.add("hidden");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

closeLightbox.addEventListener("click", fecharLightbox);
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
  { label: "Ver GitHub", action: () => window.open("https://github.com/Soarezzsemj", "_blank", "noopener") },
  { label: "Ver LinkedIn", action: () => window.open("https://www.linkedin.com/in/carlos-eduardo-soares-081419343/", "_blank", "noopener") },
  { label: "Baixar Currículo (PDF)", action: () => window.open("curriculo.pdf", "_blank", "noopener") },
  { label: "Copiar email", action: () => {
    const emailField = document.getElementById("email");
    if (emailField?.value) {
      navigator.clipboard.writeText(emailField.value);
    } else {
      window.alert("Nenhum endereço de email informado.");
    }
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

document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    abrirCommandPalette();
  }

  if (event.key === "Escape" && !commandPalette.classList.contains("hidden")) {
    fecharCommandPalette();
  }
});
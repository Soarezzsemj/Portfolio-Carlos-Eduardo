/* =========================
   I18N (PT / EN)
   O texto em português do index.html é o fallback (sem JS) e precisa ser
   IDÊNTICO ao dicionário pt. O idioma inicial já vem definido em <html lang>
   pelo script inline do <head> (URL ?lang= > localStorage > navegador > pt).
========================= */
(function () {
  const DICT = {
    pt: {
      "meta.title": "Carlos Eduardo Soares - Desenvolvedor Full Stack",
      "meta.description": "Portfólio de Carlos Eduardo Soares, desenvolvedor Full Stack focado em backend, APIs e aplicações web modernas.",

      "nav.openMenu": "Abrir menu",
      "nav.closeMenu": "Fechar menu",
      "nav.projects": "Projetos",
      "nav.about": "Sobre",
      "nav.contact": "Contato",
      "nav.theme": "Alternar tema",
      "nav.footer": "Navegação do rodapé",

      "lang.group": "Idioma",
      "lang.pt": "Português",
      "lang.en": "Inglês",

      "hero.greeting": "Olá, eu sou Carlos Eduardo",
      "hero.tagline": "Construindo sistemas escaláveis do backend ao frontend.",
      "hero.text": "Sou Carlos Eduardo, estudante de Engenharia de Software, desenvolvedor full stack com foco em backend. Trabalho com APIs, aplicações web e interfaces modernas, sempre priorizando código limpo e soluções eficientes.",
      "hero.viewProjects": "▶ Ver Projetos",
      "hero.downloadCv": "⌥ Baixar CV",
      "hero.codeAria": "Código React de apresentação",
      "marquee.aria": "Tecnologias principais",

      "tech.title": "Stack Tecnológica",
      "tech.subtitle": "Ferramentas e tecnologias que uso no dia a dia",
      "tech.databases": "Banco de Dados",
      "tech.tools": "Ferramentas",
      "tech.ai": "Inteligência Artificial",

      "projects.title": "$ ls -la ~/projetos",
      "projects.subtitle": "Engenharia de software aplicada a problemas reais",
      "projects.status.test": "Teste técnico",
      "projects.status.personal": "Projeto pessoal",
      "projects.status.production": "Em produção",
      "projects.viewRepo": "Ver repositório →",
      "projects.aiTag": "IA",
      "projects.korp.card": "Sistema corporativo de faturamento e estoque com arquitetura de microsserviços, concorrência e DANFE em PDF.",
      "projects.cripto.card": "Aplicativo mobile focado no uso prático de criptomoedas.",
      "projects.resume.card": "Aplicação full stack para geração automática de resumos.",
      "projects.target.card": "Desafio técnico da Target Sistemas implementando cálculos de comissões, controle de estoque e juros em C#.",

      "project.korp.title": "KORP ERP — FATURAMENTO & ESTOQUE",
      "project.korp.desc": "Sistema corporativo com arquitetura de microsserviços, controle de concorrência com RowVersion, emissão e cancelamento de notas fiscais e geração de DANFE em PDF.",
      "project.korp.tech": ".NET 9 • Entity Framework Core • SQL Server • Angular 19 • Tailwind CSS • Docker Compose",
      "project.korp.img.estoque": "Gestão de estoque",
      "project.korp.img.faturamento": "Faturamento e notas fiscais",
      "project.korp.img.danfe": "DANFE em PDF",
      "project.cripto.title": "MINHA CRIPTO",
      "project.cripto.desc": "App mobile focado em criptomoedas com usabilidade e segurança. Desenvolvido para facilitar transações e acompanhamento de ativos digitais.",
      "project.cripto.tech": "Swift • Node.js • API REST",
      "project.cripto.img.tela2": "Tela 2",
      "project.cripto.img.tela3": "Tela 3",
      "project.cripto.img.tela4": "Tela 4",
      "project.resume.title": "RESUME AI",
      "project.resume.desc": "Aplicação full stack para geração automática de resumos usando inteligência artificial. Interface moderna e responsiva.",
      "project.resume.tech": "React • Node.js • TypeScript • IA",
      "project.resume.img.inicial": "Tela inicial",
      "project.resume.img.resumo": "Resumo gerado",
      "project.resume.img.entrada": "Entrada de texto e opções",
      "project.target.title": "TARGET DESAFIO",
      "project.target.desc": "Desafio técnico da Target Sistemas implementando cálculos de comissões, controle de estoque e juros em C#.",
      "project.target.tech": "C# • .NET • Console App",
      "project.target.img.menu": "Menu principal do console",
      "project.target.img.comissoes": "Comissão de cada vendedor",
      "project.target.img.vendas": "Detalhamento das vendas",
      "project.target.img.menuEstoque": "Menu da questão de estoque",
      "project.target.img.consulta": "Consulta de estoque",
      "project.target.img.historico": "Histórico de movimentações",
      "project.target.img.juros": "Cálculo de juros por atraso",

      "modal.tech": "Tecnologias: {tech}",
      "modal.live": "🚀 Ver Versão Online",
      "modal.zoom": "Ampliar {alt}",
      "modal.imageNotFound": "Imagem não encontrada",
      "lightbox.aria": "Screenshot ampliada",
      "lightbox.close": "Fechar imagem ampliada",
      "lightbox.prev": "Imagem anterior",
      "lightbox.next": "Próxima imagem",

      "about.title": "$ cat sobre.txt",
      "about.whoami": "Desenvolvedor focado em backend, arquitetura de software e construção de soluções escaláveis.",
      "about.missionCmd": "➜ cat missao.txt",
      "about.mission": "Busco evoluir constantemente e trabalhar em projetos com impacto real.",
      "about.statsAria": "Estatísticas profissionais",
      "about.statYears": "ANO DE EXPERIÊNCIA",
      "about.statProjects": "PROJETOS",
      "about.statTech": "TECNOLOGIAS",
      "about.experienceCmd": "# git log --experiencia",
      "about.infraero.period": "2026 - Presente",
      "about.infraero.role": "Desenvolvedor",
      "about.infraero.desc": "App VIA (Flutter) + sistema DEMANDAS (C#) para gestão de aeroportos.",
      "about.indie.period": "05/2025 - Presente",
      "about.indie.company": "Projetos Independentes",
      "about.indie.role": "Desenvolvedor Full Stack",
      "about.hackatruck.role": "Desenvolvedor iOS",
      "about.hackatruck.desc": "Desenvolvimento de apps iOS em Swift com serviços de nuvem e serviços cognitivos.",
      "about.cognitive": "Serviços Cognitivos",
      "about.education": "Formação",
      "about.degree": "Engenharia de Software",
      "about.university": "Universidade Católica de Brasília (UCB) · previsão 2028",
      "about.certifications": "Certificações",
      "cert.github": "Formação GitHub Certification",
      "cert.github.meta": "10 horas · 07/2026",
      "cert.agile": "Métodos Ágeis",
      "cert.agile.meta": "30 horas · 09/2026",
      "cert.cbl": "Soluções Tecnológicas com CBL (Challenge Based Learning)",
      "cert.cbl.meta": "30 horas · 09/2026",
      "cert.cloud": "Práticas de Cloud Services usando Swift com ênfase em Serviços Cognitivos",
      "cert.cloud.meta": "100 horas · 05/2025",

      "contrib.title": "Contribuições no GitHub",
      "contrib.chartAria": "Gráfico de contribuições de {user} no GitHub",
      "contrib.viewProfile": "Ver perfil no GitHub →",
      "contrib.less": "Menos",
      "contrib.more": "Mais",
      "contrib.one": "{count} contribuição",
      "contrib.other": "{count} contribuições",
      "contrib.tip": "{count} em {date}",
      "contrib.total": "{count} no último ano",
      "contrib.totalAria": "{count} no último ano no GitHub de {user}",

      "contact.file": "contato.json",
      "contact.title": "Conecte-se Comigo",
      "contact.jsonAria": "Informações de contato em formato JSON",
      "contact.status": "\"disponível\"",
      "contact.locationKey": "\"localizacao\"",
      "contact.formFile": "enviar_mensagem.ts",
      "contact.formTitle": "Enviar mensagem",

      "form.name": "Nome",
      "form.namePh": "Seu nome",
      "form.email": "Email",
      "form.emailPh": "Seu email",
      "form.subject": "Assunto",
      "form.subjectPh": "Assunto da mensagem",
      "form.message": "Mensagem",
      "form.messagePh": "Sua mensagem",
      "form.submit": "Enviar Mensagem",
      "form.sending": "Enviando...",
      "form.success": "✓ Mensagem enviada com sucesso! Entrarei em contato em breve.",
      "form.error": "✗ Erro ao enviar mensagem. Tente novamente mais tarde.",

      "footer.backToTop": "Voltar ao topo ↑",

      "palette.hint": "Abrir menu de comandos",
      "palette.press": "Pressione",
      "palette.aria": "Command palette",
      "palette.search": "Buscar uma ação...",
      "palette.home": "Ir para Home",
      "palette.projects": "Ir para Projetos",
      "palette.contact": "Ir para Contato",
      "palette.github": "Ver GitHub",
      "palette.linkedin": "Ver LinkedIn",
      "palette.cv": "Baixar Currículo (PDF)",
      "palette.copyEmail": "Copiar email",
      "palette.theme": "Alternar tema claro/escuro",
      "palette.language": "Idioma / Language: English",
      "palette.emailCopied": "Email copiado: {email}",
      "palette.emailFallback": "Email: {email}",

      "toast.cvSoon": "Currículo disponível em breve"
    },

    en: {
      "meta.title": "Carlos Eduardo Soares - Full Stack Developer",
      "meta.description": "Portfolio of Carlos Eduardo Soares, a Full Stack developer focused on backend, APIs and modern web applications.",

      "nav.openMenu": "Open menu",
      "nav.closeMenu": "Close menu",
      "nav.projects": "Projects",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.theme": "Toggle theme",
      "nav.footer": "Footer navigation",

      "lang.group": "Language",
      "lang.pt": "Portuguese",
      "lang.en": "English",

      "hero.greeting": "Hi, I'm Carlos Eduardo",
      "hero.tagline": "Building scalable systems from backend to frontend.",
      "hero.text": "I'm Carlos Eduardo, a Software Engineering student and full stack developer with a focus on backend. I work with APIs, web applications and modern interfaces, always prioritizing clean code and efficient solutions.",
      "hero.viewProjects": "▶ View Projects",
      "hero.downloadCv": "⌥ Download CV",
      "hero.codeAria": "React intro code",
      "marquee.aria": "Core technologies",

      "tech.title": "Tech Stack",
      "tech.subtitle": "Tools and technologies I use day to day",
      "tech.databases": "Databases",
      "tech.tools": "Tools",
      "tech.ai": "Artificial Intelligence",

      "projects.title": "$ ls -la ~/projects",
      "projects.subtitle": "Software engineering applied to real-world problems",
      "projects.status.test": "Technical assessment",
      "projects.status.personal": "Personal project",
      "projects.status.production": "In production",
      "projects.viewRepo": "View repository →",
      "projects.aiTag": "AI",
      "projects.korp.card": "Enterprise billing and inventory system with a microservices architecture, concurrency control and DANFE PDF generation.",
      "projects.cripto.card": "Mobile app focused on the practical, everyday use of cryptocurrencies.",
      "projects.resume.card": "Full stack application for automatic summary generation.",
      "projects.target.card": "Technical challenge from Target Sistemas implementing commission, inventory control and interest calculations in C#.",

      "project.korp.title": "KORP ERP — BILLING & INVENTORY",
      "project.korp.desc": "Enterprise system with a microservices architecture, concurrency control using RowVersion, invoice issuing and cancellation, and DANFE PDF generation.",
      "project.korp.tech": ".NET 9 • Entity Framework Core • SQL Server • Angular 19 • Tailwind CSS • Docker Compose",
      "project.korp.img.estoque": "Inventory management",
      "project.korp.img.faturamento": "Billing and invoices",
      "project.korp.img.danfe": "DANFE as PDF",
      "project.cripto.title": "MINHA CRIPTO",
      "project.cripto.desc": "Mobile app focused on cryptocurrencies, built with usability and security in mind. Designed to make transactions and digital asset tracking easier.",
      "project.cripto.tech": "Swift • Node.js • REST API",
      "project.cripto.img.tela2": "Screen 2",
      "project.cripto.img.tela3": "Screen 3",
      "project.cripto.img.tela4": "Screen 4",
      "project.resume.title": "RESUME AI",
      "project.resume.desc": "Full stack application that automatically generates summaries using artificial intelligence. Modern, responsive interface.",
      "project.resume.tech": "React • Node.js • TypeScript • AI",
      "project.resume.img.inicial": "Home screen",
      "project.resume.img.resumo": "Generated summary",
      "project.resume.img.entrada": "Text input and options",
      "project.target.title": "TARGET DESAFIO",
      "project.target.desc": "Technical challenge from Target Sistemas implementing commission, inventory control and interest calculations in C#.",
      "project.target.tech": "C# • .NET • Console App",
      "project.target.img.menu": "Console main menu",
      "project.target.img.comissoes": "Commission per salesperson",
      "project.target.img.vendas": "Sales breakdown",
      "project.target.img.menuEstoque": "Inventory exercise menu",
      "project.target.img.consulta": "Stock lookup",
      "project.target.img.historico": "Stock movement history",
      "project.target.img.juros": "Late payment interest calculation",

      "modal.tech": "Technologies: {tech}",
      "modal.live": "🚀 View Live Version",
      "modal.zoom": "Enlarge {alt}",
      "modal.imageNotFound": "Image not found",
      "lightbox.aria": "Enlarged screenshot",
      "lightbox.close": "Close enlarged image",
      "lightbox.prev": "Previous image",
      "lightbox.next": "Next image",

      "about.title": "$ cat about.txt",
      "about.whoami": "Developer focused on backend, software architecture and building scalable solutions.",
      "about.missionCmd": "➜ cat mission.txt",
      "about.mission": "I'm always looking to grow and to work on projects with real impact.",
      "about.statsAria": "Professional stats",
      "about.statYears": "YEAR OF EXPERIENCE",
      "about.statProjects": "PROJECTS",
      "about.statTech": "TECHNOLOGIES",
      "about.experienceCmd": "# git log --experience",
      "about.infraero.period": "2026 - Present",
      "about.infraero.role": "Developer",
      "about.infraero.desc": "VIA app (Flutter) + DEMANDAS system (C#) for airport management.",
      "about.indie.period": "05/2025 - Present",
      "about.indie.company": "Independent Projects",
      "about.indie.role": "Full Stack Developer",
      "about.hackatruck.role": "iOS Developer",
      "about.hackatruck.desc": "Built iOS apps in Swift using cloud services and cognitive services.",
      "about.cognitive": "Cognitive Services",
      "about.education": "Education",
      "about.degree": "Software Engineering",
      "about.university": "Universidade Católica de Brasília (UCB) · expected 2028",
      "about.certifications": "Certifications",
      "cert.github": "GitHub Certification Track",
      "cert.github.meta": "10 hours · 07/2026",
      "cert.agile": "Agile Methods",
      "cert.agile.meta": "30 hours · 09/2026",
      "cert.cbl": "Technology Solutions with CBL (Challenge Based Learning)",
      "cert.cbl.meta": "30 hours · 09/2026",
      "cert.cloud": "Cloud Services Practices using Swift with an emphasis on Cognitive Services",
      "cert.cloud.meta": "100 hours · 05/2025",

      "contrib.title": "GitHub Contributions",
      "contrib.chartAria": "{user}'s GitHub contributions chart",
      "contrib.viewProfile": "View GitHub profile →",
      "contrib.less": "Less",
      "contrib.more": "More",
      "contrib.one": "{count} contribution",
      "contrib.other": "{count} contributions",
      "contrib.tip": "{count} on {date}",
      "contrib.total": "{count} in the last year",
      "contrib.totalAria": "{count} in the last year on {user}'s GitHub",

      "contact.file": "contact.json",
      "contact.title": "Connect With Me",
      "contact.jsonAria": "Contact information in JSON format",
      "contact.status": "\"available\"",
      "contact.locationKey": "\"location\"",
      "contact.formFile": "send_message.ts",
      "contact.formTitle": "Send a message",

      "form.name": "Name",
      "form.namePh": "Your name",
      "form.email": "Email",
      "form.emailPh": "Your email",
      "form.subject": "Subject",
      "form.subjectPh": "Message subject",
      "form.message": "Message",
      "form.messagePh": "Your message",
      "form.submit": "Send Message",
      "form.sending": "Sending...",
      "form.success": "✓ Message sent successfully! I'll get back to you soon.",
      "form.error": "✗ Couldn't send your message. Please try again later.",

      "footer.backToTop": "Back to top ↑",

      "palette.hint": "Open command menu",
      "palette.press": "Press",
      "palette.aria": "Command palette",
      "palette.search": "Search for an action...",
      "palette.home": "Go to Home",
      "palette.projects": "Go to Projects",
      "palette.contact": "Go to Contact",
      "palette.github": "Open GitHub",
      "palette.linkedin": "Open LinkedIn",
      "palette.cv": "Download CV (PDF)",
      "palette.copyEmail": "Copy email",
      "palette.theme": "Toggle light/dark theme",
      "palette.language": "Idioma / Language: Português",
      "palette.emailCopied": "Email copied: {email}",
      "palette.emailFallback": "Email: {email}",

      "toast.cvSoon": "CV coming soon"
    }
  };

  const LOCALES = { pt: "pt-BR", en: "en-US" };
  const HTML_LANG = { pt: "pt-BR", en: "en" };
  const root = document.documentElement;
  const listeners = [];
  let lang = root.lang === "en" ? "en" : "pt";

  function t(key, vars) {
    let texto = DICT[lang][key] ?? DICT.pt[key] ?? key;
    if (vars) texto = texto.replace(/\{(\w+)\}/g, (match, nome) => (nome in vars ? String(vars[nome]) : match));
    return texto;
  }

  // Aplica o dicionário em [data-i18n], [data-i18n-html] e [data-i18n-attr="attr:chave;attr2:chave2"]
  function aplicarTraducoes(escopo = document) {
    escopo.querySelectorAll("[data-i18n]").forEach(el => {
      const texto = t(el.dataset.i18n);
      if (el.textContent !== texto) el.textContent = texto;
    });
    // Só conteúdo vindo do dicionário (nunca entrada de usuário)
    escopo.querySelectorAll("[data-i18n-html]").forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    escopo.querySelectorAll("[data-i18n-attr]").forEach(el => {
      el.dataset.i18nAttr.split(";").forEach(par => {
        const [attr, chave] = par.split(":").map(s => s.trim());
        if (attr && chave) el.setAttribute(attr, t(chave));
      });
    });

    document.title = t("meta.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });
  }

  function setLang(proximo) {
    if (proximo !== "pt" && proximo !== "en") return;
    if (proximo === lang) return;
    lang = proximo;
    root.lang = HTML_LANG[lang];
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {
      // storage bloqueado: o idioma vale só nesta visita
    }
    // Se a URL tem ?lang=, mantém em sincronia para o recarregar não voltar ao idioma anterior
    try {
      const url = new URL(location.href);
      if (url.searchParams.has("lang")) {
        url.searchParams.set("lang", lang);
        history.replaceState(history.state, "", url);
      }
    } catch (e) {}
    aplicarTraducoes();
    listeners.forEach(fn => fn(lang));
  }

  window.I18N = {
    t,
    setLang,
    getLang: () => lang,
    locale: () => LOCALES[lang],
    aplicar: aplicarTraducoes,
    onChange: fn => listeners.push(fn)
  };

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  aplicarTraducoes();
  root.classList.remove("i18n-pending");
})();

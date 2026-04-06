const { useEffect, useMemo, useState } = React;

const serviceItems = [
  {
    id: "social",
    title: "Gestao de redes sociais",
    subtitle: "Posicionamento com consistencia e intencao.",
    points: [
      "Planejamento editorial e direcao criativa",
      "Calendario de conteudo e organizacao de campanhas",
      "Acompanhamento estrategico da presenca digital"
    ]
  },
  {
    id: "sites",
    title: "Sites e landing pages",
    subtitle: "Experiencias digitais que valorizam a marca.",
    points: [
      "Paginas institucionais com visual premium",
      "Estrutura de conversao para captar clientes",
      "Design responsivo para mobile e desktop"
    ]
  },
  {
    id: "systems",
    title: "Sistemas sob medida",
    subtitle: "Ferramentas para simplificar a operacao do negocio.",
    points: [
      "Solucoes para agendamento, cadastro e atendimento",
      "Fluxos internos mais leves e organizados",
      "Desenvolvimento alinhado a necessidades reais"
    ]
  }
];

const cases = [
  {
    category: "Beauty & wellness",
    title: "Marca com feed sofisticado e agenda mais fluida",
    text: "Combinamos identidade visual, conteudo e estrutura digital para transformar a apresentacao da marca e melhorar a experiencia de atendimento."
  },
  {
    category: "Negocios autorais",
    title: "Site elegante com foco em autoridade e conversao",
    text: "A comunicacao ganha clareza, o visual transmite valor e a pagina trabalha como ponto de confianca para novos clientes."
  },
  {
    category: "Operacao digital",
    title: "Sistema pensado para a rotina e para crescimento",
    text: "Menos improviso, mais controle. Criamos solucoes para dar suporte ao bastidor e sustentar o proximo nivel do negocio."
  }
];

const faqs = [
  {
    q: "A Auralynne atende apenas redes sociais?",
    a: "Nao. A proposta e integrar branding, social media e desenvolvimento para que a marca tenha uma presenca bonita na frente e uma estrutura eficiente nos bastidores."
  },
  {
    q: "Voces criam projetos personalizados?",
    a: "Sim. Cada negocio tem um momento diferente, entao o escopo pode envolver apenas conteudo, um novo site ou tambem um sistema sob medida."
  },
  {
    q: "Essa landing page pode virar um site completo depois?",
    a: "Pode sim. A estrutura pode evoluir para paginas internas, portfolio, blog, area administrativa ou qualquer outra necessidade futura."
  }
];

function StatCounter({ value, suffix, label, duration = 1400 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration, value]);

  return (
    <article className="stat-card">
      <strong>{count}{suffix}</strong>
      <span>{label}</span>
    </article>
  );
}

function ServiceTabs() {
  const [active, setActive] = useState(serviceItems[0].id);
  const current = useMemo(
    () => serviceItems.find((item) => item.id === active) || serviceItems[0],
    [active]
  );

  return (
    <section className="services section" id="servicos">
      <div className="section-heading">
        <p className="eyebrow">Solucoes integradas</p>
        <h2>Uma marca forte precisa de imagem, estrategia e estrutura digital andando juntas.</h2>
      </div>

      <div className="tabs-shell">
        <div className="tabs-nav" role="tablist" aria-label="Servicos da Auralynne">
          {serviceItems.map((item) => (
            <button
              key={item.id}
              className={`tab-button ${item.id === active ? "is-active" : ""}`}
              onClick={() => setActive(item.id)}
              role="tab"
              aria-selected={item.id === active}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="tab-panel" role="tabpanel">
          <p className="eyebrow">{current.subtitle}</p>
          <h3>{current.title}</h3>
          <ul className="feature-list">
            {current.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      <div className="section-heading">
        <p className="eyebrow">Perguntas frequentes</p>
        <h2>Clareza para quem quer contratar com seguranca.</h2>
      </div>

      <div className="faq-list">
        {faqs.map((item, index) => {
          const open = openIndex === index;
          return (
            <article className={`faq-item ${open ? "is-open" : ""}`} key={item.q}>
              <button
                className="faq-trigger"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
              >
                <span>{item.q}</span>
                <strong>{open ? "-" : "+"}</strong>
              </button>
              {open && <p>{item.a}</p>}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Auralynne">
          <img src="./logo.png" alt="Logo da Auralynne" />
          <span>Auralynne</span>
        </a>

        <nav className="nav">
          <a href="#servicos">Servicos</a>
          <a href="#cases">Destaques</a>
          <a href="#faq">FAQ</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main>
        <section className="hero section" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow">Social media, sites e sistemas para marcas em expansao</p>
            <h1>
              Presenca digital com
              <span> sofisticacao, estrategia e tecnologia.</span>
            </h1>
            <p className="hero-text">
              A Auralynne transforma imagem em autoridade e processos em experiencias mais
              fluidas. Unimos conteudo, design e software para criar uma estrutura digital mais
              elegante e eficiente.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#contato">Solicitar proposta</a>
              <a className="button button-secondary" href="#servicos">Explorar servicos</a>
            </div>

            <div className="hero-mini-grid">
              <div>
                <strong>Presenca premium</strong>
                <span>Conteudo alinhado ao valor da marca.</span>
              </div>
              <div>
                <strong>Conversao com beleza</strong>
                <span>Paginas que encantam e conduzem.</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="orb orb-one"></div>
            <div className="orb orb-two"></div>
            <div className="hero-card-badge">Marca + performance + produto digital</div>
            <img src="./logo.png" alt="Marca Auralynne" />
            <div className="hero-card-content">
              <p>Projetos pensados para elevar a percepcao da marca e organizar o crescimento.</p>
              <strong>Da estrategia do feed ao sistema que sustenta a operacao.</strong>
            </div>
          </div>
        </section>

        <section className="stats-grid section">
          <StatCounter value={3} suffix="x" label="Mais valor percebido quando comunicacao e tecnologia caminham juntas" />
          <StatCounter value={100} suffix="%" label="Projetos personalizados ao contexto e ao momento do negocio" />
          <StatCounter value={24} suffix="h" label="Visao integrada entre marca, atendimento e experiencia digital" />
        </section>

        <ServiceTabs />

        <section className="showcase section" id="cases">
          <div className="showcase-panel">
            <p className="eyebrow">Posicionamento com profundidade</p>
            <h2>Mais do que postar bonito: criar uma base digital com coerencia.</h2>
            <p>
              A Auralynne foi pensada para marcas que querem crescer sem abrir mao de sensibilidade
              visual. Aqui, conteudo, site e sistema deixam de ser partes soltas e passam a formar
              uma experiencia unica.
            </p>
          </div>

          <div className="case-grid">
            {cases.map((item) => (
              <article className="case-card" key={item.title}>
                <p className="case-category">{item.category}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="process section">
          <div className="section-heading">
            <p className="eyebrow">Metodo</p>
            <h2>Um processo claro para transformar visao em presenca e estrutura.</h2>
          </div>

          <div className="process-steps">
            <article>
              <span>1</span>
              <h3>Imersao</h3>
              <p>Entendimento da marca, objetivos, publico e gargalos operacionais.</p>
            </article>
            <article>
              <span>2</span>
              <h3>Direcao</h3>
              <p>Definicao de linguagem visual, mensagem, canais e escopo tecnico.</p>
            </article>
            <article>
              <span>3</span>
              <h3>Construcao</h3>
              <p>Execucao do projeto com foco em refinamento, clareza e funcionalidade.</p>
            </article>
            <article>
              <span>4</span>
              <h3>Evolucao</h3>
              <p>Ajustes, novas entregas e crescimento continuo da estrutura digital.</p>
            </article>
          </div>
        </section>

        <section className="contact-banner section" id="contato">
          <div>
            <p className="eyebrow">Vamos construir seu proximo passo digital</p>
            <h2>Auralynne une imagem, experiencia e sistema para marcas que querem subir de nivel.</h2>
          </div>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:contato@auralynne.com.br">Falar por e-mail</a>
            <a className="button button-secondary" href="https://wa.me/5500000000000">Chamar no WhatsApp</a>
          </div>
        </section>

        <section className="faq section" id="faq">
          <FaqAccordion />
        </section>
      </main>

      <a className="floating-cta" href="#contato">Solicitar proposta</a>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

import { useEffect, useState } from "react";
import {
  aboutContent,
  awards,
  connections,
  contactSection,
  contactInfo,
  heroContent,
  heroVideo,
  navigation,
  portfolioProjects,
  serviceDetails,
  serviceSection,
  testimonials,
  values,
  whatsappDisplay,
  whatsappHref,
} from "./data/siteContent";
import BrandSafariLogo from "./components/BrandSafariLogo";

function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="section-intro">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2.2a9.62 9.62 0 0 0-8.3 14.46L2.3 21.7l5.16-1.34A9.63 9.63 0 1 0 12 2.2Zm0 17.42a7.76 7.76 0 0 1-3.95-1.08l-.28-.16-3.06.8.82-2.98-.18-.3A7.76 7.76 0 1 1 12 19.62Zm4.26-5.8c-.23-.11-1.37-.67-1.58-.75-.21-.08-.36-.11-.51.12-.15.23-.59.75-.72.91-.13.15-.26.17-.49.06-.23-.11-.96-.35-1.82-1.12-.67-.6-1.13-1.34-1.26-1.57-.13-.23-.01-.36.1-.47.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.11-.51-1.23-.7-1.69-.18-.43-.37-.37-.51-.38h-.43c-.15 0-.4.06-.61.29-.21.23-.8.78-.8 1.9 0 1.12.82 2.2.93 2.35.11.15 1.6 2.45 3.89 3.44.54.23.96.37 1.29.48.54.17 1.03.15 1.42.09.43-.06 1.37-.56 1.56-1.09.19-.53.19-.98.13-1.08-.05-.1-.2-.16-.43-.27Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="content-wrap site-header__inner">
          <div className="brand-lockup">
            <BrandSafariLogo className="brand-logo--header" />

            <div className="brand-lockup__meta">
              <span>creative company</span>
            </div>
          </div>

          <button
            type="button"
            className={isMobileMenuOpen ? "site-header__menu-toggle is-open" : "site-header__menu-toggle"}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="site-header__meta">
            <div className="connection-strip">
              <span>Conexoes</span>
              <a href="#connections">Safari Labs</a>
              <a href="#connections">Motion House</a>
            </div>

            <nav className="site-nav" aria-label="Navegacao principal">
              {navigation.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <a
            className="header-cta"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Conversar no WhatsApp pelo numero ${whatsappDisplay}`}
          >
            Vamos conversar
          </a>
        </div>

        <div
          id="mobile-navigation"
          className={
            isMobileMenuOpen ? "content-wrap site-header__mobile-panel is-open" : "content-wrap site-header__mobile-panel"
          }
        >
          <nav className="site-header__mobile-nav" aria-label="Navegacao mobile">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-header__mobile-links">
            <span>Conexoes</span>
            <a href="#connections" onClick={() => setIsMobileMenuOpen(false)}>
              Safari Labs
            </a>
            <a href="#connections" onClick={() => setIsMobileMenuOpen(false)}>
              Motion House
            </a>
          </div>

          <a
            className="site-header__mobile-cta"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label={`Conversar no WhatsApp pelo numero ${whatsappDisplay}`}
          >
            Vamos conversar
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section" id="about">
          <div className="hero-showcase">
            <div className="hero-carousel">
              <video
                className="hero-video"
                src={heroVideo.src}
                poster={heroVideo.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
              <div className="hero-carousel__overlay" />
              <div className="hero-carousel__pulse" />

              <div className="hero-carousel__top">
                <span>{heroVideo.label}</span>
              </div>
            </div>
          </div>

          <div className="content-wrap hero-intro">
            <div className="hero-brandline">
              <BrandSafariLogo className="brand-logo--hero" />
              <span className="eyebrow">{heroContent.subtitle}</span>
            </div>

            <div className="hero-topline">
              <div className="hero-copy">
                <h1>{heroContent.title}</h1>
              </div>

              <div className="hero-support">
                <div className="hero-actions">
                  <a
                    className="hero-button hero-button--primary"
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Conversar no WhatsApp pelo numero ${whatsappDisplay}`}
                  >
                    {heroContent.ctaLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="content-wrap about-band">
            <SectionIntro
              eyebrow={aboutContent.eyebrow}
              title={aboutContent.title}
              description={aboutContent.description}
            />

            <div className="about-band__copy">
              <p>{aboutContent.complementaryText}</p>
            </div>
          </div>
        </section>

        <section className="content-wrap content-section" id="portfolio">
          <SectionIntro
            eyebrow="Portfolio"
            title="Cases em destaque"
            description="Mantive o clima de vitrine editorial da referencia, com cards grandes, categorias visiveis e leitura mais de agencia do que de landing comum."
          />

          <div className="portfolio-grid">
            {portfolioProjects.map((project, index) => (
              <article
                key={project.client}
                className={index === 0 ? "project-card project-card--featured" : "project-card"}
              >
                <img src={project.image} alt={project.title} />
                <div className="project-card__overlay" />

                <div className="project-card__content">
                  <small>{project.client}</small>
                  <h3>{project.title}</h3>

                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <a className="section-link" href="#contact">
            Ver todos os formatos de projeto
          </a>
        </section>

        <section className="content-wrap content-section" id="services">
          <SectionIntro
            eyebrow={serviceSection.eyebrow}
            title={serviceSection.title}
          />

          <div className="service-detail-list">
            {serviceDetails.map((service) => (
              <article key={service.title} className="service-detail">
                <span className="service-detail__eyebrow">Servico</span>
                <h3>{service.title}</h3>
                <div className="service-detail__copy">
                  {service.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="value-section">
          <div className="content-wrap">
            <SectionIntro
              eyebrow="Nosso jeito"
              title="Todo job precisa de inteligencia, criatividade e performance"
              description="Essa parte copia a cadencia da referencia: tres blocos fortes, cada um com uma ideia central, imagem e texto manifesto."
            />

            <div className="value-list">
              {values.map((item) => (
                <article key={item.title} className="value-card">
                  <div className="value-card__copy">
                    <span>{item.eyebrow}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>

                  <div className="value-card__image">
                    <img src={item.image} alt={item.title} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-wrap content-section" id="recognitions">
          <SectionIntro
            eyebrow="Reconhecimentos"
            title="Premios e relevancia"
            description="Troquei os blocos generricos por uma grade mais proxima da pagina de referencia, com foco em premiacoes e selos de autoridade."
          />

          <div className="awards-grid">
            {awards.map((award) => (
              <article key={award.title} className="award-card">
                <strong>{award.title}</strong>
                <p>{award.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonial-section" id="testimonials">
          <div className="content-wrap">
            <SectionIntro
              eyebrow="Depoimentos"
              title="Parcerias que falam pela marca"
              description="Mantive a logica de depoimentos mais longos e com cara de relacao real entre cliente e agencia."
            />

            <div className="testimonials-grid">
              {testimonials.map((item) => (
                <article key={item.author} className="testimonial-card">
                  <p>{item.quote}</p>

                  <div>
                    <strong>{item.author}</strong>
                    <span>{item.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-wrap content-section" id="connections">
          <SectionIntro
            eyebrow="Conexoes"
            title="Nucleos parceiros"
            description="A referencia usa marcas irmas para ampliar a oferta. Modelei a mesma ideia aqui com duas frentes complementares."
          />

          <div className="connections-grid">
            {connections.map((item) => (
              <article key={item.name} className="connection-card">
                <span>{item.category}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <a href={item.href}>{item.cta}</a>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="content-wrap contact-shell">
            <div className="contact-lead">
              <span className="eyebrow">{contactSection.eyebrow}</span>
              <h2>{contactSection.title}</h2>
              <p>{contactSection.description}</p>

              <div className="contact-actions">
                <a
                  className="contact-action contact-action--primary"
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Conversar no WhatsApp pelo numero ${whatsappDisplay}`}
                >
                  {contactSection.ctaLabel}
                </a>
              </div>
            </div>

            <div className="contact-rail">
              <article className="contact-band contact-band--primary">
                <span className="contact-band__eyebrow">Canal principal</span>
                <strong>{whatsappDisplay}</strong>
                <p>
                  Atendimento comercial da Brand Safari para novos projetos, campanhas e
                  reposicionamentos de marca.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir WhatsApp para ${whatsappDisplay}`}
                >
                  Vamos conversar
                </a>
              </article>

              <div className="contact-band-list">
                {contactInfo.slice(1).map((item) => (
                  <article key={item.label} className="contact-band">
                    <span className="contact-band__eyebrow">{item.label}</span>
                    <strong>{item.value}</strong>
                    <p>{item.description}</p>
                    {item.href ? <a href={item.href}>{item.cta}</a> : <span className="contact-band__meta">Brand Safari</span>}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <a
        className="whatsapp-float"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`Abrir WhatsApp para conversar com ${whatsappDisplay}`}
      >
        <span className="whatsapp-float__icon">
          <WhatsAppIcon />
        </span>
        <span className="whatsapp-float__label">WhatsApp</span>
      </a>
    </div>
  );
}

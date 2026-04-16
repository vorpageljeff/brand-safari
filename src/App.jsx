import { useEffect, useState } from "react";
import {
  aboutContent,
  contactCompany,
  contactEmail,
  contactEmailHref,
  contactFormEndpoint,
  contactFormFields,
  contactLocation,
  contactSection,
  heroContent,
  heroVideo,
  navigation,
  portfolioProjects,
  serviceDetails,
  serviceSection,
  socialLinks,
} from "./data/siteContent";
import BrandSafariLogo from "./components/BrandSafariLogo";

function SectionIntro({ eyebrow, title, description }) {
  const titleLines = title ? title.split("\n") : [];

  return (
    <div className="section-intro">
      {eyebrow ? <span>{eyebrow}</span> : null}
      {title ? (
        <h2>
          {titleLines.length > 1
            ? titleLines.map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  className={index === 0 ? "section-intro__line section-intro__line--first" : "section-intro__line"}
                >
                  {line}
                </span>
              ))
            : title}
        </h2>
      ) : null}
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2.2A1.8 1.8 0 0 0 5.2 7v10A1.8 1.8 0 0 0 7 18.8h10a1.8 1.8 0 0 0 1.8-1.8V7A1.8 1.8 0 0 0 17 5.2H7Zm10.35 1.3a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3Zm0 2.2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M14.8 3c.35 1.9 1.48 3.1 3.2 3.45v2.32a6.4 6.4 0 0 1-3.02-1V14.6a5.47 5.47 0 1 1-5.47-5.47c.35 0 .67.03.98.1v2.37a3.18 3.18 0 0 0-.98-.15 3.15 3.15 0 1 0 3.15 3.15V3h2.13Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openServiceIndex, setOpenServiceIndex] = useState(-1);
  const [formState, setFormState] = useState({
    status: "idle",
    message: "",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormState({
      status: "sending",
      message: "Enviando seu contato...",
    });

    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Nao foi possivel enviar o formulario.");
      }

      form.reset();
      setFormState({
        status: "success",
        message: "Contato enviado com sucesso. A Brand Safari recebe isso no email e retorna em breve.",
      });
    } catch (error) {
      setFormState({
        status: "error",
        message: "Nao foi possivel enviar agora. Tente novamente em alguns instantes ou use o email exibido ao lado.",
      });
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="content-wrap site-header__inner">
          <div className="brand-lockup">
            <BrandSafariLogo className="brand-logo--header" />
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
            <nav className="site-nav" aria-label="Navegacao principal">
              {navigation.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="site-header__actions">
            <div className="social-strip" aria-label="Redes sociais">
              <a href={socialLinks[0].href} target="_blank" rel="noreferrer" aria-label="Instagram Brand Safari">
                <InstagramIcon />
              </a>
              <a href={socialLinks[1].href} target="_blank" rel="noreferrer" aria-label="TikTok Brand Safari">
                <TikTokIcon />
              </a>
            </div>
          </div>
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
            <span>Redes</span>
            <a href={socialLinks[0].href} target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
              Instagram
            </a>
            <a href={socialLinks[1].href} target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
              TikTok
            </a>
          </div>

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
            </div>
          </div>

          <div className="content-wrap hero-intro">
            <div className="hero-topline">
              <div className="hero-copy">
                {heroContent.subtitle ? <span className="eyebrow">{heroContent.subtitle}</span> : null}
                {heroContent.title ? <h1>{heroContent.title}</h1> : null}
              </div>
            </div>
          </div>

          <div className="content-wrap about-band">
            <SectionIntro
              eyebrow={aboutContent.eyebrow}
              title={aboutContent.title}
              description={aboutContent.description}
            />

            {aboutContent.complementaryText ? (
              <div className="about-band__copy">
                <p>{aboutContent.complementaryText}</p>
              </div>
            ) : null}
          </div>

          {heroContent.ctaLabel ? (
            <div className="content-wrap midway-cta-wrap">
              <a className="midway-cta" href="#contact">
                {heroContent.ctaLabel}
              </a>
            </div>
          ) : null}
        </section>

        <section className="content-wrap content-section" id="services">
          <SectionIntro
            eyebrow={serviceSection.eyebrow}
            title={serviceSection.title}
            description={serviceSection.description}
          />

          <div className="service-accordion">
            {serviceDetails.map((service, index) => {
              const isOpen = openServiceIndex === index;

              return (
                <article
                  key={service.title}
                  className={isOpen ? "service-accordion__item is-open" : "service-accordion__item"}
                >
                  <button
                    type="button"
                    className="service-accordion__trigger"
                    onClick={() => setOpenServiceIndex((current) => (current === index ? -1 : index))}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${index}`}
                  >
                    <span>{service.title}</span>
                    <span className="service-accordion__icon" aria-hidden="true">
                      <span className="service-accordion__icon-line service-accordion__icon-line--horizontal" />
                      <span className="service-accordion__icon-line service-accordion__icon-line--vertical" />
                    </span>
                  </button>

                  <div
                    id={`service-panel-${index}`}
                    className={isOpen ? "service-accordion__panel is-open" : "service-accordion__panel"}
                    aria-hidden={!isOpen}
                  >
                    <div className="service-accordion__panel-inner">
                      {service.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="content-wrap content-section" id="portfolio">
          <SectionIntro
            eyebrow="Portfolio"
            title="Cases em destaque"
            description="Uma seleção dos formatos de projeto que a Brand Safari constrói para posicionar, comunicar e expandir marcas."
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

        {/* Section hidden for now: Nosso jeito */}

        {/* Section hidden for now: Premios e relevancia */}

        {/* Section hidden for now: Conexoes */}

        <section className="contact-section" id="contact">
          <div className="content-wrap">
            <div className="contact-surface">
              <div className="contact-summary">
                <span className="eyebrow">{contactSection.eyebrow}</span>
                <h2>{contactSection.title}</h2>
                <p>{contactSection.description}</p>

                <div className="contact-summary__details">
                  <div className="contact-summary__item">
                    <span>Empresa</span>
                    <strong>{contactCompany}</strong>
                  </div>
                  <div className="contact-summary__item">
                    <span>Localizacao</span>
                    <strong>{contactLocation}</strong>
                  </div>
                  <div className="contact-summary__item">
                    <span>Email</span>
                    <a href={contactEmailHref}>{contactEmail}</a>
                  </div>
                </div>

                <div className="contact-summary__links">
                  <a href={socialLinks[0].href} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                  <a href={socialLinks[1].href} target="_blank" rel="noreferrer">
                    TikTok
                  </a>
                </div>

                <div className="contact-actions">
                  <a
                    className="contact-action contact-action--primary"
                    href="#contact-form"
                    aria-label="Ir para o formulario de contato"
                  >
                    {contactSection.ctaLabel}
                  </a>
                </div>
              </div>

              <div className="contact-form-card" id="contact-form">
                <span className="contact-form-card__eyebrow">Formulario</span>
                <h3>Conte sobre a sua marca</h3>
                <p>
                  Preencha os dados abaixo e a Brand Safari recebe esse contato direto no email.
                </p>

                <form className="contact-form contact-form--surface" onSubmit={handleContactSubmit}>
                  <input type="hidden" name="_subject" value="Novo contato pelo site da Brand Safari" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="text" name="_honey" className="contact-form__honeypot" tabIndex="-1" autoComplete="off" />

                  {contactFormFields.map((field) => (
                    <label key={field.id} htmlFor={field.id}>
                      <span>{field.label}</span>
                      {field.name === "message" ? (
                        <textarea
                          id={field.id}
                          name={field.name}
                          placeholder={field.placeholder}
                          required
                        />
                      ) : (
                        <input
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          autoComplete={field.autoComplete}
                          required
                        />
                      )}
                    </label>
                  ))}

                  <button type="submit" disabled={formState.status === "sending"}>
                    {formState.status === "sending" ? "Enviando..." : "Enviar contato"}
                  </button>

                  {formState.message ? (
                    <p
                      className={
                        formState.status === "success"
                          ? "contact-form__status is-success"
                          : formState.status === "error"
                            ? "contact-form__status is-error"
                            : "contact-form__status"
                      }
                      role="status"
                      aria-live="polite"
                    >
                      {formState.message}
                    </p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

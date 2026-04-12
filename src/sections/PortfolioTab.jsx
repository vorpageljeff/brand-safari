import SectionTitle from "../components/SectionTitle";

export default function PortfolioTab({ projects }) {
  return (
    <section className="glass-panel">
      <SectionTitle
        eyebrow="Portfolio"
        title="Casos apresentados em cards"
        description="Cada projeto vira um bloco claro com imagem, categoria e resumo comercial."
      />

      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`portfolio-card ${index === 0 || index === 3 ? "portfolio-card--wide" : ""}`}
          >
            <img src={project.image} alt={project.title} />
            <div className="portfolio-card__content">
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

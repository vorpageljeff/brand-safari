import HeroCarousel from "../components/HeroCarousel";
import SectionTitle from "../components/SectionTitle";

export default function OverviewTab({ heroImages, quickStats, spotlightCards }) {
  return (
    <div className="tab-panel-grid">
      <HeroCarousel images={heroImages} />

      <div className="tab-panel-stack">
        <section className="glass-panel intro-panel">
          <SectionTitle
            eyebrow="Visao do studio"
            title="Estrutura principal"
            description="A abertura resume o posicionamento e aponta o usuario para as outras abas."
          />

          <div className="stats-grid">
            {quickStats.map((item) => (
              <article key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="spotlight-grid">
          {spotlightCards.map((card) => (
            <article key={card.title} className="glass-panel spotlight-card">
              <span>{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

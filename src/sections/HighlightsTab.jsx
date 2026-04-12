import SectionTitle from "../components/SectionTitle";

export default function HighlightsTab({ badges, testimonials }) {
  return (
    <div className="highlights-layout">
      <section className="glass-panel">
        <SectionTitle
          eyebrow="Destaques"
          title="Pontos fortes da marca"
          description="Aqui entram credenciais, especialidades e itens de reconhecimento."
        />

        <div className="badge-grid">
          {badges.map((badge) => (
            <article key={badge} className="badge-card">
              <span className="badge-card__dot" />
              <h3>{badge}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <article key={testimonial.author} className="glass-panel testimonial-card">
            <p>"{testimonial.quote}"</p>
            <strong>{testimonial.author}</strong>
            <span>{testimonial.role}</span>
          </article>
        ))}
      </section>
    </div>
  );
}

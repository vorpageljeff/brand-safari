import SectionTitle from "../components/SectionTitle";

export default function ServicesTab({ services, workflow }) {
  return (
    <div className="services-layout">
      <section className="glass-panel">
        <SectionTitle
          eyebrow="Servicos"
          title="Oferta organizada em modulos"
          description="A aba de servicos mostra o que o studio faz sem esconder informacao em uma rolagem longa."
        />

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <span className="service-card__label">Modulo</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel workflow-panel">
        <SectionTitle
          eyebrow="Fluxo"
          title="Como o projeto avanca"
          description="Uma aba secundaria pode detalhar processo, prazos e formato de entrega."
        />

        <div className="workflow-list">
          {workflow.map((item) => (
            <article key={item.step} className="workflow-item">
              <strong>{item.step}</strong>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

import SectionTitle from "../components/SectionTitle";

export default function ContactTab({ channels }) {
  return (
    <div className="contact-layout">
      <section className="glass-panel contact-panel">
        <SectionTitle
          eyebrow="Contato"
          title="Fechamento direto e claro"
          description="Em vez de deixar o contato perdido no rodape, a aba final concentra CTA, canais e briefing."
        />

        <div className="contact-list">
          {channels.map((item) => (
            <article key={item.label} className="contact-list__item">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel form-panel">
        <div className="form-heading">
          <span>Briefing rapido</span>
          <h3>Deixe a base do projeto aqui</h3>
        </div>

        <form className="contact-form">
          <label>
            Nome
            <input type="text" placeholder="Seu nome ou sua marca" />
          </label>

          <label>
            Objetivo
            <input type="text" placeholder="Ex.: reposicionar marca, renovar portfolio" />
          </label>

          <label>
            Escopo
            <textarea placeholder="Conte o que voce quer priorizar nesta nova estrutura em abas." rows="5" />
          </label>

          <button type="button">Solicitar proposta</button>
        </form>
      </section>
    </div>
  );
}

const principles = [
  {
    title: 'Clear goals',
    body: 'A guided path from a problem, goal, or idea to shared understanding.',
  },
  {
    title: 'Evidence you can review',
    body: 'Project knowledge and Lumos research inform decisions without replacing judgment.',
  },
  {
    title: 'Connected product thinking',
    body: 'Goals, evidence, solutions, and direction stay linked as one product narrative.',
  },
] as const

export function WhyIdeate() {
  return (
    <section
      className="section why"
      id="why-ideate"
      aria-labelledby="why-heading"
    >
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Why Ideate</p>
          <h2 id="why-heading">Evidence before confidence.</h2>
          <p className="section-intro">
            Strong product direction comes from better questions, clearer
            framing, and evidence that holds up under scrutiny.
          </p>
        </div>

        <div className="principle-grid">
          {principles.map((principle, index) => (
            <article className="principle-card" key={principle.title}>
              <span className="principle-card__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

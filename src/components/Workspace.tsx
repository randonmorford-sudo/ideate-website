import { ProductPreview } from './ProductPreview'

export function Workspace() {
  return (
    <section
      className="section workspace"
      id="product"
      aria-labelledby="workspace-heading"
    >
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Product workspace</p>
          <h2 id="workspace-heading">
            One connected workspace for discovery.
          </h2>
          <p className="section-intro">
            Brief, evidence, solution exploration, direction, and Lumos stay
            linked in one place. Product thinking stays together instead of
            splitting across tools and documents.
          </p>
        </div>

        <ProductPreview variant="workspace" />
      </div>
    </section>
  )
}

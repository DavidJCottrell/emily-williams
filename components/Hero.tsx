export function Hero() {
    const currentYear = new Date().getFullYear();
  return (
    <header className="hero" id="top">
      <div className="hero__top">
        <div className="hero__eyebrow">
          <span>Portfolio — {currentYear}</span>
          <span>Available for freelance projects</span>
        </div>
      </div>

      <div className="marquee" aria-label="Emily Williams">
        <div className="marquee__track">
          <span>Emily Williams</span>
          <span className="marquee__sep">—</span>
          <span>Emily Williams</span>
          <span className="marquee__sep">—</span>
          <span>Emily Williams</span>
          <span className="marquee__sep">—</span>
          <span>Emily Williams</span>
          <span className="marquee__sep">—</span>
        </div>
      </div>

      <div className="hero__bottom">
        <p className="hero__intro">brand & marketing manager{" "}<br></br>
          <em>marketing strategy, brand identity & digital communications</em>
        </p>
        <div className="hero__meta">
          <span>
            <strong>Based in Banbury</strong>
          </span>
          <span>Working globally</span>
          <span>Now freelance</span>
        </div>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
      </div>
    </header>
  );
}

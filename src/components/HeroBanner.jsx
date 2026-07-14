function HeroBanner() {
  return (
    <section className="hero-section">
      <div className="main-banner">
        <div className="main-banner-content">
          <span className="banner-badge">GROZO EXPRESS</span>

          <h1>Groceries delivered in minutes.</h1>

          <p>
            Fresh groceries, everyday essentials, snacks and more delivered
            straight to your doorstep.
          </p>

          <button className="shop-now-button">Shop Now</button>
        </div>

        <div className="grocery-visual" aria-hidden="true">
          <span className="grocery-item item-one">🥬</span>
          <span className="grocery-item item-two">🥛</span>
          <span className="grocery-item item-three">🍎</span>
          <span className="grocery-item item-four">🥖</span>
        </div>
      </div>

      <div className="promo-banner-grid">
        <article className="promo-banner promo-yellow">
          <div>
            <span className="promo-label">DAILY ESSENTIALS</span>
            <h2>Everything you need, every day.</h2>
            <p>Starting from ₹20</p>
          </div>

          <span className="promo-emoji" aria-hidden="true">
            🛒
          </span>
        </article>

        <article className="promo-banner promo-green">
          <div>
            <span className="promo-label">FRESH PICKS</span>
            <h2>Fresh fruits and vegetables.</h2>
            <p>Quality you can trust.</p>
          </div>

          <span className="promo-emoji" aria-hidden="true">
            🥑
          </span>
        </article>

        <article className="promo-banner promo-purple">
          <div>
            <span className="promo-label">SNACK TIME</span>
            <h2>Cravings delivered quickly.</h2>
            <p>Explore snacks and beverages.</p>
          </div>

          <span className="promo-emoji" aria-hidden="true">
            🍿
          </span>
        </article>
      </div>
    </section>
  );
}

export default HeroBanner;
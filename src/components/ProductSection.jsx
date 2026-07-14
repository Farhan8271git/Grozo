import ProductCard from "./ProductCard";

function ProductSection({
  title,
  products,
  addToCart,
  decreaseQuantity,
  getProductQuantity,
}) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="product-section">
      <div className="product-section-header">
        <h2>{title}</h2>

        <button className="see-all-products" type="button">
          See all
        </button>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={getProductQuantity(product.id)}
            addToCart={addToCart}
            decreaseQuantity={decreaseQuantity}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
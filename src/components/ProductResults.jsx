import { FiSearch } from "react-icons/fi";

import ProductCard from "./ProductCard";

function ProductResults({
  products,
  searchQuery,
  selectedCategory,
  addToCart,
  decreaseQuantity,
  getProductQuantity,
  onClearFilters,
}) {
  const hasFilters = searchQuery || selectedCategory;

  if (!hasFilters) {
    return null;
  }

  return (
    <section className="product-results-section">
      <div className="product-results-header">
        <div>
          <span className="section-eyebrow">
            PRODUCT RESULTS
          </span>

          <h2>
            {selectedCategory
              ? selectedCategory
              : `Search results for "${searchQuery}"`}
          </h2>

          <p>
            {products.length}{" "}
            {products.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <button
          type="button"
          className="clear-filters-button"
          onClick={onClearFilters}
        >
          Clear filters
        </button>
      </div>

      {products.length > 0 ? (
        <div className="filtered-product-grid">
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
      ) : (
        <div className="no-products-found">
          <div className="no-products-icon">
            <FiSearch />
          </div>

          <h3>No products found</h3>

          <p>
            Try another search term or remove the active
            category filter.
          </p>

          <button
            type="button"
            onClick={onClearFilters}
          >
            View all products
          </button>
        </div>
      )}
    </section>
  );
}

export default ProductResults;